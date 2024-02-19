const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bodyParser = require('body-parser');


const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};


const app =express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"signUp"
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
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

      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ Error: 'Duplicate entry' });
      } else {
        return res.status(500).json({ Error: 'Error executing database query' });
      }
    }

    

    return res.json({ Status: 'Success' });
  });
});



app.use(bodyParser.json());

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
 

let cart = [];

app.post("/addToCart", (req, res) => {
  const product = req.body.product;
  cart.push(product);
  res.json({ success: true, message: "Product added to cart successfully" });
});

app.get("/cart", (req, res) => {
  res.json(cart);
});






app.get('/search', (req, res) => {
  const searchTerm = req.query.name;
  const sql = `SELECT * FROM product WHERE name LIKE '%${searchTerm}%'`;

  db.query(sql, [searchTerm], (err, result) => {
    if (err) {
      console.error('Error fetching data', err.message);
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
    return res.json({ Status: 'Success' });
  });
});





  app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
  
    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Check if the email is already registered
    db.query('SELECT * FROM login WHERE email = ?', [email], (error, results) => {
      if (error) {
        console.error('MySQL query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
  
      // Save user data to the MySQL database
      db.query('INSERT INTO login (name, email, password) VALUES (?, ?, ?)', [name, email, password], (insertError) => {
        if (insertError) {
          console.error('MySQL insert error:', insertError);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        // Send a response indicating successful signup
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
  










  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Check user credentials in the MySQL database
    db.query('SELECT * FROM login WHERE email = ? AND password = ?', [email, password], (error, results) => {
      if (error) {
        console.error('MySQL query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Send a response indicating successful login
      const userInfo = { id: results[0].id, email: results[0].email, /* Add more user data as needed */ };
      res.status(200).json({ message: 'Login successful', userInfo });
    });
  });
  

app.listen(8081,()=>{
    console.log('listing');
})




//req.body  body
//req.params.id njibo id