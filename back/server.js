const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signUp"
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const uploadMiddleware = multer({ storage: storage });

app.post("/create", uploadMiddleware.single("photo"), (req, res) => {
    const { name, taill, gender, prix, user_id } = req.body;
    const sql = "INSERT INTO product (name, taill, gender, prix, photo, user_id) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, taill, gender, prix, req.file.filename, user_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing database query:', err.message);
            return res.status(500).json({ Error: 'Error executing database query' });
        }
        return res.json({ Status: 'Success' });
    });
});

app.get('/getData/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT product.id, product.name, product.taill, product.gender, product.prix, product.photo, login.id AS user_id, login.name
        FROM product
        JOIN login ON product.user_id = login.id
        WHERE login.id = ?
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return res.status(500).json({ error: 'Error fetching data', details: err.message });
        }
        return res.json(result);
    });
});

app.use(express.static('uploads'));

app.get('/product', (req, res) => {
    const sql = 'SELECT * FROM product';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching data', err.message);
            return res.status(500).json({ error: 'Error fetching data', details: err.message });
        }
        console.log('Fetched data:', result);
        return res.json(result);
    });
});

app.post('/addC', (req, res) => {
    const { name, prix, user_id ,user_email} = req.body;
    const sql = `INSERT INTO carte (name, prix, user_id , user_email) VALUES (?, ?, ? ,?)`;

    db.query(sql, [name, prix, user_id , user_email], (err, result) => {
        if (err) {
            console.error('Error adding to cart:', err.message);
            return res.status(500).json({ Error: 'Error adding to cart' });
        }
        return res.json({ Status: 'Success', result });
    });
});

app.get("/cart/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT carte.id, carte.name, carte.prix, login.id AS user_id, login.email AS user_email
        FROM carte
        JOIN login ON carte.user_email = login.email 
        WHERE login.id = ?
    `;
  
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return res.status(500).json({ error: 'Error fetching data', details: err.message });
        }
        console.log('Fetched data:', result);
        return res.json(result);
    });
  });
  


app.delete('/delete/:id', (req, res) => {
    const productId = req.params.id;
    const sql = "DELETE FROM product WHERE id = ?";
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err.message);
            return res.status(500).json({ Error: 'Error deleting data' });
        }
        if (result.affectedRows > 0) {
            return res.json({ Status: 'Success' });
        } else {
            return res.status(404).json({ Error: 'Product not found' });
        }
    });
});

app.delete('/deleteCart/:id', (req, res) => {
    const carteId = req.params.id;
    const sql = "DELETE FROM carte WHERE id = ?";
    db.query(sql, [carteId], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err.message);
            return res.status(500).json({ Error: 'Error deleting data' });
        }
        if (result.affectedRows > 0) {
            return res.json({ Status: 'Success' });
        } else {
            return res.status(404).json({ Error: 'Cart item not found' });
        }
    });
});

app.get('/search', (req, res) => {
    const searchTerm = req.query.name;
    const sql = `SELECT * FROM product WHERE name LIKE ?`;
    db.query(sql, [`%${searchTerm}%`], (err, result) => {
        if (err) {
            console.error('Error fetching data', err.message);
            return res.status(500).json({ error: 'Error fetching data', details: err.message });
        }
        console.log('Fetched data:', result);
        return res.json(result);
    });
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query('SELECT * FROM login WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('MySQL query error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        db.query('INSERT INTO login (name, email, password) VALUES (?, ?, ?)', [name, email, password], (insertError) => {
            if (insertError) {
                console.error('MySQL insert error:', insertError);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query('SELECT * FROM login WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            console.error('MySQL query error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const userInfo = { id: results[0].id, email: results[0].email };
        res.status(200).json({ message: 'Login successful', userInfo });
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});



