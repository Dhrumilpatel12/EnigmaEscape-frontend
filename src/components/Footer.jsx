import React from 'react';
import "./FooterStyles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Enigma Escapes</h3>
          <p>Decode Your Unforgettable Journey</p>
          <div className="contact">
            <span><i className="fas fa-phone"></i> &nbsp; 123-456-7890</span>
            <span><i className="fas fa-envelope"></i> &nbsp; enigma@escapes.com</span>
          </div>
          <div className="socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>
        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Stay updated with our latest</p>
          <form>
            <input type="email" name="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Enigma Escapes | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
