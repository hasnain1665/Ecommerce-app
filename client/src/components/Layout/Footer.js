import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css"; // Import the CSS file

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription logic here
      alert("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="watch-footer">
      <div className="watch-footer-content">
        <div className="watch-footer-main">
          {/* Brand & Description */}
          <div className="footer-section">
            <div className="footer-brand">⌚ TimeZone</div>
            <p className="footer-description">
              Discover the finest collection of luxury watches from world-renowned brands. 
              Quality, precision, and elegance - that's what defines our timepieces.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">All Categories</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h5>Customer Service</h5>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/policy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="footer-section">
            <h5>Stay Connected</h5>
            <ul className="footer-contact-info">
              <li>
                <span className="footer-contact-icon">📧</span>
                info@timezone.com
              </li>
              <li>
                <span className="footer-contact-icon">📞</span>
                +1 (555) 123-4567
              </li>
              <li>
                <span className="footer-contact-icon">📍</span>
                123 Watch Street, NY 10001
              </li>
              <li>
                <span className="footer-contact-icon">🕒</span>
                Mon-Fri: 9AM-6PM EST
              </li>
            </ul>
            
            <div className="footer-newsletter">
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Subscribe for exclusive deals & updates
              </p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} TimeZone. All Rights Reserved.
          </div>
          <div className="footer-links-bottom">
            <Link to="/about">About</Link>
            <span className="footer-separator">|</span>
            <Link to="/contact">Contact</Link>
            <span className="footer-separator">|</span>
            <Link to="/policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;