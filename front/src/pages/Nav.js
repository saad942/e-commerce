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
  const [added, setAdded] = useState(0);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/cart/${user.id}`);
        setCart(response.data);
        setAdded(added + 1);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [cart  , added]);

  const handleCloseModal = () => {
    setShowModal(false);
    setCart([])
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deleteCart/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
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
<Modal show={showModal} onHide={handleCloseModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title className="text-center">Your Cart</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="cart-total text-center mb-4">
      <h4>Total: {cart.reduce((sum, product) => sum + product.prix, 0)} DH</h4>
    </div>
    <div className="cart-items">
      <table className="table table-bordered">
        <thead>
        <tr className="text-center bg-dark">
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={product.id} className="text-center">
              <td>{product.name}</td>
              <td>{product.prix} DH</td>
              <td>
              <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-danger mr-2"
                  >
                    Delete
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Modal.Body>
  <Modal.Footer className="justify-content-center">
    <button className="btn btn-success">Payment</button>
  </Modal.Footer>
</Modal>


      </div>
    </div>
  );
}

export default NavBar;
