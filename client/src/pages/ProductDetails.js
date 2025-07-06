import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { Spin, Rate, Badge } from "antd";
import toast from "react-hot-toast";
import {
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShare,
  AiOutlineLeft,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BsWatch, BsShieldCheck } from "react-icons/bs";
import { MdLocalShipping, MdVerifiedUser } from "react-icons/md";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Get product
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/product/single-product/${params.slug}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setProduct(data?.product || {});
      if (data?.product?._id && data?.product?.category?._id) {
        getSimilarProduct(data.product._id, data.product.category._id);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setProduct({});
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProduct();
      setQuantity(1);
      setSelectedImage(0);
    }
  }, [params.slug]);

  // Get Related Products
  const getSimilarProduct = async (pid, cid) => {
    try {
      setRelatedLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/product/related-product/${pid}/${cid}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setRelatedProduct(data?.products || []);
      setRelatedLoading(false);
    } catch (error) {
      console.log(error);
      setRelatedProduct([]);
      setRelatedLoading(false);
    }
  };

  const handleAddToCart = (productToAdd = product, qty = quantity) => {
    const existingProduct = cart.find((item) => item._id === productToAdd._id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item._id === productToAdd._id
          ? { ...item, quantity: (item.quantity || 1) + qty }
          : item
      );
      toast.success("Increased quantity in cart");
    } else {
      updatedCart = [...cart, { ...productToAdd, quantity: qty }];
      toast.success("Item added to cart");
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRelatedProductClick = (relatedProduct) => {
    navigate(`/product/${relatedProduct.slug}`);
  };

  return (
    <div className="product-details-container">
      <Layout title={`${product?.name || "Product"} - Premium Watch Details`}>
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
            <p>Loading product details...</p>
          </div>
        ) : Object.keys(product).length > 0 ? (
          <>
            {/* Main Product Section */}
            <div className="product-main">
              <div className="product-container">
                {/* Product Images */}
                <div className="product-images">
                  <div className="main-image">
                    <img
                      src={`http://localhost:8000/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="main-product-image"
                    />
                    <div className="product-badges">
                      <Badge className="premium-badge" count="Premium" />
                      <Badge className="verified-badge" count="Verified" />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <div className="product-header">
                    <div className="product-category">
                      {product.category?.name}
                    </div>
                    <h1 className="product-title">{product.name}</h1>

                    <div className="product-rating">
                      <Rate disabled defaultValue={4.5} />
                      <span className="rating-text">(4.5/5 - 124 reviews)</span>
                    </div>
                  </div>

                  <div className="product-price-section">
                    <div className="price">
                      <span className="current-price">
                        Rs. {product.price?.toLocaleString()}
                      </span>
                      <span className="original-price">
                        Rs. {(product.price * 1.2)?.toLocaleString()}
                      </span>
                      <span className="discount">20% OFF</span>
                    </div>
                  </div>

                  <div className="product-description">
                    <h3>Description</h3>
                    <p>{product.description}</p>
                  </div>

                  <div className="product-features">
                    <div className="feature">
                      <BsShieldCheck className="feature-icon" />
                      <span>1 Year Warranty</span>
                    </div>
                    <div className="feature">
                      <MdLocalShipping className="feature-icon" />
                      <span>Free Shipping</span>
                    </div>
                    <div className="feature">
                      <MdVerifiedUser className="feature-icon" />
                      <span>Authentic Product</span>
                    </div>
                  </div>

                  <div className="quantity-selector">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange("decrease")}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="qty-display">{quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange("increase")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="product-actions">
                    <button
                      className="btn-add-to-cart"
                      onClick={() => handleAddToCart(product, quantity)}
                    >
                      <AiOutlineShoppingCart />
                      Add to Cart
                    </button>
                    <button className="btn-wishlist">
                      <AiOutlineHeart />
                    </button>
                    <button className="btn-share">
                      <AiOutlineShareAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="related-products-section">
              <div className="section-header">
                <h2 className="section-title">Similar Watches</h2>
                <p className="section-subtitle">
                  Discover more premium timepieces
                </p>
              </div>

              {relatedLoading ? (
                <div className="loading-container">
                  <Spin size="large" />
                  <p>Loading similar watches...</p>
                </div>
              ) : relatedProduct.length > 0 ? (
                <div className="related-products-grid">
                  {relatedProduct.map((p) => (
                    <div key={p._id} className="related-product-card">
                      <div className="related-image-container">
                        <img
                          src={`http://localhost:8000/product/product-photo/${p._id}`}
                          className="related-product-image"
                          alt={p.name}
                        />
                        <div className="related-overlay">
                          <button
                            className="overlay-btn view-btn"
                            onClick={() => handleRelatedProductClick(p)}
                          >
                            <AiOutlineEye />
                          </button>
                          <button
                            className="overlay-btn cart-btn"
                            onClick={() => handleAddToCart(p, 1)}
                          >
                            <AiOutlineShoppingCart />
                          </button>
                        </div>
                      </div>

                      <div className="related-info">
                        <h5 className="related-name">{p.name}</h5>
                        <p className="related-description">
                          {p.description?.substring(0, 60)}...
                        </p>
                        <div className="related-price">
                          Rs. {p.price?.toLocaleString()}
                        </div>
                        <button
                          className="related-cart-btn"
                          onClick={() => handleAddToCart(p, 1)}
                        >
                          <AiOutlineShoppingCart />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-related-products">
                  <BsWatch className="no-products-icon" />
                  <h3>No similar watches found</h3>
                  <p>Check out our full collection for more options</p>
                  <button
                    className="browse-all-btn"
                    onClick={() => navigate("/")}
                  >
                    Browse All Watches
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="product-not-found">
            <BsWatch className="not-found-icon" />
            <h2>Product Not Found</h2>
            <p>
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button className="back-home-btn" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default ProductDetails;
