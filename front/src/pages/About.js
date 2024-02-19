import React, { Component } from "react";
import Nav from './Nav';
import Footer from "./Footer";
import './Ab.css'; // Import CSS file for styling

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [
        {
          id: 1,
          name: 'Kasket',
          img: './images/KAS.jpeg'
        },
        {
          id: 3,
          name: 'Vetement',
          img: './images/VT).jpeg'
        },
        {
          id: 4,
          name: 'Chausure',
          img: './images/CH.jpeg'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Nav />

        <div className="container mt-4">
          <h1 className="heading">About Us</h1>
          <p className="paragraph">Welcome to our platform! We are dedicated to providing high-quality products and excellent service to our customers. Our mission is to create a seamless shopping experience for you.</p>
          <p className="paragraph">If you have any questions or feedback, feel free to reach out to us. We'd love to hear from you!</p>
          <div className="contact-info">
            <p><strong>Email:</strong> saad@gmail.com</p>
            <p><strong>Phone:</strong> +2120600000</p>
          </div>
        </div>

        <div className="container mt-4">
          <h2 className="heading">Popular Products</h2>
          <div className="row">
            {this.state.product.map(user => (
              <div className="col-lg-3" key={user.id}>
                <div className="card">
                  <img className="card-img-top" alt="" src={user.img} />
                  <div className="card-body">
                    <h6 className="card-title">{user.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="paragraph">Explore our selection of popular products. From trendy fashion items to must-have accessories, we've got something for everyone!</p>
        </div>

        <Footer />
      </div>
    );
  }
}

export default About;
