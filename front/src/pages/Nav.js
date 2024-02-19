import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import'./Nav.css'
function NavBar() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'));
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8081/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setCart([])
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  
  return (
    <div className="navbar-container">
      <strong className="brand">SHOP</strong>
      <div className="navL">
        <span className="nav-link" onClick={() => navigate('/')}>
          Home
        </span>
        <span className="nav-link" onClick={() => navigate('/about')}>
          About
        </span>
        {user && (
          <>
            <span className="nav-link" onClick={() => navigate('/ajouter')}>
              Ajouter un produit
            </span>
            <span className="nav-link" onClick={() => navigate('/voir')}>
              My product
            </span>
          </>
        )}
        <span className="nav-link" onClick={() => navigate('/product')}>
          Product
        </span>
      </div>
      <div className="buttons-container">
      <button 
          onClick={() => handleShowModal(selectedProduct)}
          style={{
    width: '2.5rem',
    height: '2rem',
    position: 'relative',
    border: 'none',
    backgroundColor: 'rgb(134, 160, 172)' // Set the desired background color
  }}
  variant="outline-primary"
  className="rounded-circle"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 6000" fill="currentColor">
    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
  </svg>
</button>
        {!user ? (
          <button onClick={() => navigate('/login')} className="btn btn-sm logout-button" style={{ backgroundColor: 'rgb(134, 160, 172)', color: 'white',width:'80%' }}>
          Login
        </button>
        
        ) : (
          <>
            <button onClick={logout} className="btn btn-sm logout-button" style={{backgroundColor: 'rgb(134, 160, 172)',color: 'white',width:'80%'}}>
              Logout
            </button>

          </>
        )}
         <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>All Chosen Products</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <table style={{width:'450px',textAlign: "center" }}>
          <thead>
           <tr>
               <th>photo</th>
               <th>Name</th>
               <th>Taill</th>
               <th>Gender</th>
               <th>Prix</th>
             </tr>
           </thead>
           <tbody>
           {cart.map((product, index) => (
           <tr key={product.id}>
             <td>
               <img src={`http://localhost:8081/${product.photo}`} style={{ height: '20px' }} alt={product.name} />
             </td>
             <td>{product.name}</td>
             <td>{product.taill}</td>
             <td>{product.gender}</td>
             <td>{product.prix}</td>
      
          </tr>
         ))}

         </tbody>
       </table>
       <strong>Total: {cart.reduce((sum, product) => sum + product.prix, 0)}DH</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default NavBar;
