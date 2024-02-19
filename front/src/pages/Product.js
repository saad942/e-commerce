// Product.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import Footer from './Footer';
import Nav from './Nav';
import './pr.css';
import { useNavigate, useParams } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]); // State to track the items in the cart

  useEffect(() => {
    axios.get(`http://localhost:8081/product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching products. Please try again later.");
      });
  }, []);

  const viewProductDetail = (productId) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const search = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/search?name=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSale = async () => {
    if (selectedProduct) {
      try {
        await axios.post("http://localhost:8081/addToCart", { product: selectedProduct });
        setCart([...cart, selectedProduct]); // Update the cart on the client side
        setShowModal(false); // Close the modal after sale
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Nav />
      <div className="proBac" style={{ color: 'white', textAlign: 'center' }}>
        <br /><br /><br />
        <h1 style={{ fontSize: '60px' }}>Choose your Product</h1>
        <h4>Free instant access, no credit card required.</h4>
        <input style={{ color: 'black', width: '500px', marginLeft: "50px" }} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={search} style={{ backgroundColor: 'rgb(134, 160, 172)', width: '100px' }}>search</button>
      </div>
      <div className="container" style={{ color: "azure", marginTop: '-65px' }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="row">
          {products.map((product) => (
            <div className="col-lg-4" key={product.id}>
              <div className="card">
                <div className="card-body">
                  <img src={`http://localhost:8081/${product.photo}`} alt={product.name} />
                  <p style={{ textAlign: 'center', marginBottom: '10px' }}> {product.name}</p>
                  <span
                    style={{ textAlign: 'center', marginBottom: '10px', fontSize: '17px ', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => viewProductDetail(product.id)}
                  >
                    Detail
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <>
                <img src={`http://localhost:8081/${selectedProduct.photo}`} style={{width:'300px',marginLeft:'80px'}} alt={selectedProduct.name} />
                <p>Name: {selectedProduct.name}</p>
                <p>Price: {selectedProduct.prix}</p>
                <p>Gender: {selectedProduct.gender}</p>
                <p>Taill: {selectedProduct.taill}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSale}>
              Sell
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <br /><br />

    

      <Footer />
    </div>
  );
}

export default Product;
