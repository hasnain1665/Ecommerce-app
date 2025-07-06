import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { MdLocationOn, MdAccessTime, MdSend } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/Contact.css"; // Import the CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Layout title={"Contact Us - TimeZone Watch Store"}>
      <div className="contact-page">
        {/* Hero Section */}
        <div className="contact-hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">Get In Touch</h1>
              <p className="hero-subtitle">
                We're here to help you find your perfect timepiece
              </p>
            </div>
          </div>
        </div>

        <div className="contact-container">
          {/* Main Contact Section */}
          <div className="contact-main">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-header">
                <h2 className="section-title">Contact Information</h2>
                <p className="section-subtitle">
                  Any query or info required about our luxury watches? Feel free
                  to reach out anytime. We are available 24/7 to assist you.
                </p>
              </div>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <BiMailSend />
                  </div>
                  <div className="method-details">
                    <h3>Email Us</h3>
                    <a href="mailto:help@timezone.com">help@timezone.com</a>
                    <span>Quick response within 2 hours</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <BiPhoneCall />
                  </div>
                  <div className="method-details">
                    <h3>Call Us</h3>
                    <a href="tel:0123456789">012-3456789</a>
                    <span>Mon - Fri, 9AM - 8PM</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <BiSupport />
                  </div>
                  <div className="method-details">
                    <h3>Support Hotline</h3>
                    <a href="tel:180000000000">1800-0000-0000</a>
                    <span>24/7 Toll Free Support</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <MdLocationOn />
                  </div>
                  <div className="method-details">
                    <h3>Visit Our Store</h3>
                    <address>
                      123 Luxury Watch District
                      <br />
                      Premium Shopping Center
                      <br />
                      New York, NY 10001
                    </address>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="business-hours">
                <h3 className="hours-title">
                  <MdAccessTime /> Business Hours
                </h3>
                <div className="hours-list">
                  <div className="hour-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hour-item">
                    <span>Sunday</span>
                    <span>12:00 PM - 5:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="social-media">
                <h3 className="social-title">Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <FaFacebook />
                  </a>
                  <a href="#" className="social-link">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-link">
                    <FaInstagram />
                  </a>
                  <a href="#" className="social-link">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2 className="section-title">Send Us a Message</h2>
                <p className="section-subtitle">
                  Have a specific question about our watches? Fill out the form
                  below and we'll get back to you shortly.
                </p>
              </div>

              <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows="6"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-button">
                    <MdSend />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="contact-image-section">
            <div className="image-wrapper">
              <img
                src="/images/contactus.jpeg"
                alt="Luxury watch consultation"
                className="contact-image"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <h3>Premium Consultation</h3>
                  <p>Expert advice for your perfect timepiece</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="contact-features">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Response</h3>
              <p>
                We respond to all inquiries within 2 hours during business hours
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Communication</h3>
              <p>Your personal information is always protected and secure</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Expert Support</h3>
              <p>Our watch specialists are here to help with any questions</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
