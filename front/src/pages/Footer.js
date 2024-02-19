import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={logoContainer}>
        <strong style={logo}>SHOP</strong>
      </div>
      <div style={linksContainer}>
        <div style={linkColumn}>
          <h4 style={linkHeader}>Company</h4>
          <a href="/about" style={linkStyle}>About Us</a>
          <a href="/about" style={linkStyle}>Contact Us</a>
        </div>
        <div style={linkColumn}>
          <h4 style={linkHeader}>Services</h4>
          <a href="/product" style={linkStyle}>Product</a>
          <a href="/login" style={linkStyle}>join</a>
        </div>
        <div style={linkColumn}>
          <h4 style={linkHeader}>Connect</h4>
          <a href="https://www.facebook.com" style={iconLink}><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
          <a href="https://www.instagram.com" style={iconLink}><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
          <a href="https://www.linkedin.com" style={iconLink}><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
          <a href="mailto:info@example.com" style={iconLink}><FontAwesomeIcon icon={faEnvelope} size="lg" /></a>
        </div>
      </div>
      <div style={bottomBar}>
        <p style={copyright}>Website made by Saad</p>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#39464e', // Adjust the color here to match your site
  color: '#fff',
  padding: '50px 20px',
  textAlign: 'center',
};

const logoContainer = {
  marginBottom: '30px',
};

const logo = {
  fontSize: '36px',
};

const linksContainer = {
  display: 'flex',
  justifyContent: 'space-between',
};

const linkColumn = {
  flex: '1',
  margin: '0 20px',
};

const linkHeader = {
  fontSize: '20px',
  marginBottom: '10px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '8px',
  fontSize: '16px',
};

const iconLink = {
  color: '#fff',
  margin: '0 10px',
  textDecoration: 'none',
};

const bottomBar = {
  padding: '10px 0',
  marginTop: '50px',
};

const copyright = {
  margin: '0',
};

export default Footer;
