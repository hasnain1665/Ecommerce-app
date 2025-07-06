import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineLogin,
  AiOutlineCreditCard,
  AiOutlineGift,
} from "react-icons/ai";
import { BsWatch, BsShieldCheck } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import "../styles/CartPage.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = (pid, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  };

  const getSavings = () => {
    const total = getTotal();
    return total > 50000 ? total * 0.1 : 0;
  };

  return (
    <div className="cart-page-container">
      <Layout title="Shopping Cart - Premium Watches">
        <div className="cart-header">
          <div className="cart-header-content">
            <div className="cart-icon">
              <AiOutlineShoppingCart />
            </div>
            <div className="cart-title-section">
              <h1 className="cart-title">Shopping Cart</h1>
              {auth?.token && (
                <p className="cart-welcome">
                  Welcome back,{" "}
                  <span className="user-name">{auth?.user?.name}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="cart-main-content">
          {cart?.length > 0 ? (
            <div className="cart-layout">
              <div className="cart-items-section">
                <div className="cart-items-header">
                  <h2>Your Items ({cart.length})</h2>
                  <div className="free-shipping-notice">
                    <MdLocalShipping className="shipping-icon" />
                    <span>Free shipping on all orders</span>
                  </div>
                </div>

                <div className="cart-items-list">
                  {cart.map((p) => (
                    <div key={p._id} className="cart-item">
                      <div className="item-image-container">
                        <img
                          src={`http://localhost:8000/product/product-photo/${p._id}`}
                          className="item-image"
                          alt={p.name}
                        />
                      </div>

                      <div className="item-details">
                        <h3 className="item-name">{p.name}</h3>
                        <p className="item-description">
                          {p.description?.substring(0, 120) ||
                            "Premium timepiece"}
                          ...
                        </p>

                        <div className="item-price-section">
                          <span className="item-price">
                            Rs. {p.price?.toLocaleString()}
                          </span>
                          <span className="price-label">per item</span>
                        </div>

                        <div className="item-controls">
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn decrease"
                              onClick={() =>
                                updateQuantity(p._id, (p.quantity || 1) - 1)
                              }
                              disabled={p.quantity <= 1}
                            >
                              <AiOutlineMinus />
                            </button>
                            <span className="quantity-display">
                              {p.quantity || 1}
                            </span>
                            <button
                              className="quantity-btn increase"
                              onClick={() =>
                                updateQuantity(p._id, (p.quantity || 1) + 1)
                              }
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>

                          <button
                            className="remove-btn"
                            onClick={() => removeCartItem(p._id)}
                          >
                            <AiOutlineDelete />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="item-subtotal">
                        <span className="subtotal-label">Subtotal</span>
                        <span className="subtotal-amount">
                          Rs. {(p.price * (p.quantity || 1)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cart-summary-section">
                <div className="cart-summary">
                  <h3 className="summary-title">Order Summary</h3>

                  <div className="summary-breakdown">
                    <div className="summary-row">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>Rs. {getTotal().toLocaleString()}</span>
                    </div>

                    {getSavings() > 0 && (
                      <div className="summary-row savings-row">
                        <span>
                          <AiOutlineGift className="savings-icon" />
                          Premium Discount (10%)
                        </span>
                        <span className="savings-amount">
                          -Rs. {getSavings().toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="summary-divider"></div>

                    <div className="summary-row total-row">
                      <span>Total</span>
                      <span>
                        Rs. {(getTotal() - getSavings()).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="checkout-section">
                    {auth?.token ? (
                      <button className="checkout-btn">
                        <AiOutlineCreditCard />
                        Proceed to Checkout
                      </button>
                    ) : (
                      <button
                        className="login-btn"
                        onClick={() => navigate("/login", { state: "/cart" })}
                      >
                        <AiOutlineLogin />
                        Login to Checkout
                      </button>
                    )}

                    <div className="security-badges">
                      <div className="security-badge">
                        <BsShieldCheck />
                        <span>Secure Checkout</span>
                      </div>
                      <div className="security-badge">
                        <MdLocalShipping />
                        <span>Fast Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <AiOutlineShoppingCart />
              </div>
              <h2>Your cart is empty</h2>
              <p>
                Discover our premium watch collection and find your perfect
                timepiece
              </p>
              <button
                className="continue-shopping-btn"
                onClick={() => navigate("/")}
              >
                <BsWatch />
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default CartPage;
