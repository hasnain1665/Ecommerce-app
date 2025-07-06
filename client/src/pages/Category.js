import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { Spin } from "antd";
import toast from "react-hot-toast";
import {
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineAppstore,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../styles/Category.css";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useCart();
  const params = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params.slug]);

  const getProductsByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/product/product-category/${params.slug}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setProducts([]);
      setCategory({});
    }
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

  return (
    <div className="category-container">
      <Layout title={`${category?.name || "Category"} - Premium Watches`}>
        {/* Category Hero Section */}
        <div className="category-hero">
          <div className="category-hero-content">
            <div className="category-icon">
              <AiOutlineAppstore />
            </div>
            <h1 className="category-title">{category?.name || "Loading..."}</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="category-main">
          {loading ? (
            <div className="loading-container">
              <Spin size="large" />
              <p>Loading premium watches...</p>
            </div>
          ) : products?.length > 0 ? (
            <div className="products-section">
              <div className="products-header">
                <h2 className="section-title">{category?.name} Collection</h2>
              </div>

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
                        {p.description?.length > 80 && "..."}
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
            </div>
          ) : (
            <div className="no-products">
              <BsWatch className="no-products-icon" />
              <h3>No watches found</h3>
              <p>This category doesn't have any products yet.</p>
              <button
                className="back-to-home-btn"
                onClick={() => navigate("/")}
              >
                Browse All Watches
              </button>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Category;
