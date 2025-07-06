import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/ResetPassword.css";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Input validation
  const validateForm = () => {
    const newErrors = {};

    if (!token.trim()) {
      newErrors.token = "Reset token is required";
    } else if (token.length < 6) {
      newErrors.token = "Reset token must be at least 6 characters";
    }

    if (!password.trim()) {
      newErrors.password = "New password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        "http://localhost:8000/auth/reset-password",
        {
          token: token.trim(),
          password: password.trim(),
        }
      );

      if (res.data.success) {
        setIsSuccess(true);
        toast.success(res.data.message || "Password reset successful!");
      } else {
        toast.error(res.data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        toast.error("Invalid or expired reset token");
      } else if (error.response?.status === 404) {
        toast.error("Reset token not found");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
    if (errors.token) {
      setErrors((prev) => ({ ...prev, token: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    if (
      errors.confirmPassword &&
      confirmPassword &&
      e.target.value === confirmPassword
    ) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleBackToLogin = () => {
    if (!loading) {
      navigate("/login");
    }
  };

  const handleBackToForgot = () => {
    if (!loading) {
      navigate("/forgot-password");
    }
  };

  return (
    <Layout title="Reset Password - TimeZone Watch Store">
      <div className="reset-password-bg">
        <div className="form-container">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-header">
                <div className="reset-icon">
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
                    <path d="M12 1v6m0 6v6" />
                    <path d="m9 9 3-3 3 3" />
                    <path d="m9 15 3 3 3-3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h4 className="title">Reset Password</h4>
                <p className="subtitle">
                  Enter your reset token and create a new secure password for
                  your account.
                </p>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={token}
                  className={`form-control ${errors.token ? "error" : ""}`}
                  id="token"
                  placeholder="Enter your reset token"
                  onChange={handleTokenChange}
                  disabled={loading}
                  autoComplete="off"
                  required
                />
                {errors.token && (
                  <div className="error-message">{errors.token}</div>
                )}
              </div>

              <div className="mb-3">
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className={`form-control ${errors.password ? "error" : ""}`}
                    id="password"
                    placeholder="Enter new password"
                    onChange={handlePasswordChange}
                    disabled={loading}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    disabled={loading}
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <div className="mb-3">
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    className={`form-control ${
                      errors.confirmPassword ? "error" : ""
                    }`}
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    onChange={handleConfirmPasswordChange}
                    disabled={loading}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                    disabled={loading}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
              </div>

              <button type="submit" className="button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    RESETTING PASSWORD...
                  </>
                ) : (
                  "RESET PASSWORD"
                )}
              </button>

              <div className="form-footer">
                <p>
                  Don't have a reset token?{" "}
                  <span
                    onClick={handleBackToForgot}
                    className={`auth-link ${loading ? "disabled-link" : ""}`}
                  >
                    Request New Token
                  </span>
                </p>
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
              <h4 className="success-title">Password Reset Successful!</h4>
              <p className="success-message">
                Your password has been successfully reset.
              </p>
              <p className="success-submessage">
                You can now login with your new password. You will be redirected
                to the login page shortly.
              </p>
              <button
                onClick={handleBackToLogin}
                className="button success-button"
              >
                GO TO LOGIN
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
