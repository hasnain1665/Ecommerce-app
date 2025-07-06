import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio, Badge, Spin } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import {
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineFilter,
  AiOutlineClear,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../styles/HomePage.css";

const HomePage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/product/product-count",
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/category/get-category"
      );
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async (reset = false) => {
    try {
      if (reset) setInitialLoading(true);
      const currentPage = reset ? 1 : page; // <- ADD THIS LINE
      const { data } = await axios.get(
        `http://localhost:8000/product/product-list/${currentPage}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      if (reset) setInitialLoading(false);
      if (data?.success) {
        setProducts(reset ? data.products : [...products, ...data.products]);
      } else {
        setProducts([]);
      }
    } catch (error) {
      if (reset) setInitialLoading(false);
      console.log(error);
      setProducts([]);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/product/product-list/${page}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const filterProduct = async () => {
    try {
      setInitialLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/product/product-filters",
        { checked, radio },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      setInitialLoading(false);
      setProducts(data?.products || []);
    } catch (error) {
      setInitialLoading(false);
      console.log(error);
      setProducts([]);
    }
  };

  const clearFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    setProducts([]);
    getAllProducts(true);
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

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

  // INITIAL LOAD
  useEffect(() => {
    setPage(1); // reset page when HomePage is mounted
    getAllCategory();
    getTotal();
    getAllProducts(true);
  }, []);

  // LOAD MORE HANDLER
  useEffect(() => {
    if (page === 1) return;
    if (!checked.length && !radio.length) loadMore();
  }, [page]);

  // FILTER TRIGGER
  useEffect(() => {
    setPage(1);
    if (checked.length || radio.length) {
      filterProduct();
    } else if (auth?.token) {
      setProducts([]);
      getAllProducts(true);
    }
  }, [checked, radio]);

  return (
    <div className="homepage-container">
      <Layout title="All Products - Best Offers">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-icon">
              <BsWatch />
            </div>
            <h1 className="hero-title">Premium Watch Collection</h1>
            <p className="hero-subtitle">
              Discover timeless elegance and precision craftsmanship
            </p>
          </div>
        </div>

        <div className="main-content">
          {/* Filters */}
          <div className="filters-sidebar">
            <div className="filter-section">
              <div className="filter-header">
                <AiOutlineFilter className="filter-icon" />
                <h4>Filter By Category</h4>
              </div>
              <div className="filter-options">
                {categories?.map((c) => (
                  <div key={c._id} className="filter-checkbox">
                    <Checkbox
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      checked={checked.includes(c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-header">
                <h4>Filter By Price</h4>
              </div>
              <div className="filter-options">
                <Radio.Group
                  onChange={(e) => setRadio(e.target.value)}
                  value={radio}
                >
                  {Prices?.map((p) => (
                    <div key={p._id} className="filter-radio">
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>

            <div className="filter-actions">
              <button className="clear-filters-btn" onClick={clearFilters}>
                <AiOutlineClear />
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="products-section">
            <div className="products-header">
              <h2 className="products-title">Our Watch Collection</h2>
            </div>

            {initialLoading ? (
              <div className="loading-container">
                <Spin size="large" />
                <p>Loading premium watches...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="products-grid">
                  {products.map((p) => (
                    <div key={p._id} className="product-card">
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

                {products &&
                  products.length < total &&
                  !checked.length &&
                  !radio.length && (
                    <div className="load-more-section">
                      <button
                        className="load-more-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                        }}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spin size="small" /> Loading...
                          </>
                        ) : (
                          "Load More Watches"
                        )}
                      </button>
                    </div>
                  )}
              </>
            ) : (
              <div className="no-products">
                <BsWatch className="no-products-icon" />
                <h3>No watches found</h3>
                <p>Try adjusting your filters to see more products</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
