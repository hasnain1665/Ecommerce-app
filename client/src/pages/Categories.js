import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import { BiCategory, BiRightArrowAlt } from "react-icons/bi";
import { BsWatch } from "react-icons/bs";
import "../styles/CategoriesPage.css";

const Categories = () => {
  const categories = useCategory();

  return (
    <div className="categories-container">
      <Layout title="All Categories - Browse by Category">
        {/* Hero Section */}
        <div className="categories-hero">
          <div className="hero-content">
            <div className="hero-icon">
              <BiCategory />
            </div>
            <h1 className="hero-title">Browse Categories</h1>
            <p className="hero-subtitle">
              Explore our curated collection of premium timepieces by category
            </p>
          </div>
        </div>

        {/* Categories Section */}
        <div className="categories-main">
          <div className="categories-header">
            <h2 className="section-title">All Categories</h2>
            <div className="section-subtitle">
              <BsWatch className="subtitle-icon" />
              <span>Find the perfect watch for every occasion</span>
            </div>
          </div>

          <div className="categories-grid">
            {categories && categories.length > 0 ? (
              categories.map((c) => (
                <div key={c._id} className="category-card">
                  <Link to={`/category/${c.slug}`} className="category-link">
                    <div
                      className="category-background"
                      style={{
                        backgroundImage: `url(/images/categories/${c.slug}.jpg)`,
                      }}
                    />
                    <div className="category-content">
                      <div className="category-icon">
                        <BsWatch />
                      </div>
                      <h3 className="category-name">{c.name}</h3>
                      <div className="category-arrow">
                        <BiRightArrowAlt />
                      </div>
                    </div>
                    <div className="category-overlay">
                      <span className="overlay-text">Explore {c.name}</span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-categories">
                <BiCategory className="no-categories-icon" />
                <h3>No Categories Found</h3>
                <p>
                  Categories will appear here once they are added to the system.
                </p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Categories;
