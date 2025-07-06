import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Input validation
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/forgot-password",
        { email: email.trim() }
      );

      if (res.data.success) {
        setIsSuccess(true);
        toast.success(
          res.data.message || "Reset instructions sent to your email!"
        );
      } else {
        toast.error(res.data.message || "Failed to send reset instructions");
      }
    } catch (error) {
      console.error("Forgot password error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 404) {
        toast.error("Email address not found");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleBackToLogin = () => {
    if (!loading) {
      navigate("/login");
    }
  };

  const handleResetPassword = () => {
    if (!loading) {
      navigate("/reset-Password");
    }
  };

  return (
    <Layout title="Forgot Password - TimeZone Watch Store">
      <div className="forgot-password-bg">
        <div className="form-container">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-header">
                <div className="forgot-icon">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h4 className="title">Forgot Password</h4>
                <p className="subtitle">
                  Enter your registered email address and we'll send you
                  instructions to reset your password.
                </p>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  className={`form-control ${errors.email ? "error" : ""}`}
                  id="email"
                  placeholder="Enter your registered email address"
                  onChange={handleEmailChange}
                  disabled={loading}
                  autoComplete="email"
                  required
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <button type="submit" className="button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    SENDING...
                  </>
                ) : (
                  "SEND RESET INSTRUCTIONS"
                )}
              </button>

              <div className="form-footer">
                <p>
                  Remember your password?{" "}
                  <span
                    onClick={handleBackToLogin}
                    className={`auth-link ${loading ? "disabled-link" : ""}`}
                  >
                    Back to Login
                  </span>
                </p>
              </div>
            </form>
          ) : (
            <div className="success-container">
              <div className="success-icon">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <h4 className="success-title">Check Your Email</h4>
              <p className="success-message">
                We've sent password reset instructions to{" "}
                <strong>{email}</strong>
              </p>
              <p className="success-submessage">
                Check your inbox and follow the link to reset your password. If
                you don't see the email, check your spam folder.
              </p>
              <button
                onClick={handleResetPassword}
                className="button success-button"
              >
                RESET PASSWORD
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
