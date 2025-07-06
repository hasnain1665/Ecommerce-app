import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import {
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../styles/Search.css";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      toast.success("Increased quantity in cart");
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success("Item added to cart");
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearSearch = () => {
    setValues({ ...values, keyword: "", result: [] });
  };

  return (
    <div className="search-page-container">
      <Layout>
        {/* Search Header */}
        <div className="search-header">
          <div className="search-header-content">
            <div className="search-icon-wrapper">
              <AiOutlineSearch className="search-main-icon" />
            </div>
            <div className="search-title-section">
              <h1 className="search-title">Search Results</h1>
              {values?.keyword && (
                <div className="search-query-display">
                  <span className="search-query-text">
                    Searching for: "{values.keyword}"
                  </span>
                  <button className="clear-search-btn" onClick={clearSearch}>
                    <AiOutlineClose />
                  </button>
                </div>
              )}
            </div>
          </div>

          {values?.result?.length > 0 && (
            <div className="results-count">
              <div className="count-badge">
                <span className="count-number">{values.result.length}</span>
                <span className="count-label">
                  {values.result.length === 1 ? "Watch Found" : "Watches Found"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="search-content">
          {values?.result?.length > 0 ? (
            <div className="search-results-grid">
              {values.result.map((p) => (
                <div key={p._id} className="search-product-card">
                  <div className="product-image-container">
                    <img
                      src={`http://localhost:8000/product/product-photo/${p._id}`}
                      className="product-image"
                      alt={p.name}
                    />
                    <div className="product-overlay">
                      <button
                        className="overlay-btn view-btn"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        <AiOutlineEye />
                      </button>
                      <button
                        className="overlay-btn cart-btn"
                        onClick={() => handleAddToCart(p)}
                      >
                        <AiOutlineShoppingCart />
                      </button>
                    </div>
                  </div>

                  <div className="product-info">
                    <h5 className="product-name">{p.name}</h5>
                    <p className="product-description">
                      {p.description?.substring(0, 80) ?? "No description"}
                      ...
                    </p>
                    <div className="product-price">
                      Rs. {p.price?.toLocaleString()}
                    </div>

                    <div className="product-actions">
                      <button
                        className="btn-details"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        <AiOutlineEye />
                        View Details
                      </button>
                      <button
                        className="btn-cart"
                        onClick={() => handleAddToCart(p)}
                      >
                        <AiOutlineShoppingCart />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <BsWatch />
              </div>
              <h3 className="no-results-title">No watches found</h3>
              <p className="no-results-text">
                {values?.keyword
                  ? `Sorry, we couldn't find any watches matching "${values.keyword}"`
                  : "Try searching for your favorite watch brands or styles"}
              </p>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Search;
