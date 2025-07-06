import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/About.css"; // Import the CSS file
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout title={"About Us - TimeZone Watch Store"}>
      <div className="about-page">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">About TimeZone</h1>
              <p className="hero-subtitle">Where Time Meets Elegance</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="about-container">
          {/* Story Section */}
          <section className="about-story">
            <div className="story-content">
              <div className="story-text">
                <h2 className="section-title">Our Story</h2>
                <p className="story-paragraph">
                  Welcome to <strong>TimeZone</strong>, where quality meets
                  convenience in the world of luxury timepieces. We are
                  committed to providing a seamless shopping experience with a
                  curated collection of premium watches that blend
                  craftsmanship, innovation, and timeless elegance.
                </p>
                <p className="story-paragraph">
                  Our team works around the clock to ensure timely deliveries
                  and exceptional customer support. At the heart of our service
                  is a passion for customer satisfaction and trust. We believe
                  that every watch tells a story, and we're here to help you
                  find yours.
                </p>
              </div>
              <div className="story-image">
                <div className="image-wrapper">
                  <img
                    src="/images/about.jpeg"
                    alt="Luxury watches collection"
                  />
                  <div className="image-overlay">
                    <div className="overlay-icon">⌚</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="about-values">
            <h2 className="section-title centered">Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h3 className="value-title">Quality First</h3>
                <p className="value-description">
                  Every timepiece in our collection is carefully selected for
                  its superior craftsmanship and reliability.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🚀</div>
                <h3 className="value-title">Fast Delivery</h3>
                <p className="value-description">
                  Quick and secure shipping worldwide, ensuring your perfect
                  watch reaches you in pristine condition.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">💎</div>
                <h3 className="value-title">Premium Service</h3>
                <p className="value-description">
                  24/7 customer support and lifetime warranty on all our luxury
                  timepieces for complete peace of mind.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="about-stats">
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Premium Watches</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Luxury Brands</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">Satisfaction Rate</div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="about-cta">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Find Your Perfect Watch?</h2>
              <p className="cta-subtitle">
                Explore our collection of premium timepieces and discover the
                watch that defines your style.
              </p>
              <Link to={"/"}>
                <button className="cta-button">Shop Now ⌚</button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
