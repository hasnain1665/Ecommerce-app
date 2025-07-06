import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Login.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Input validation
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const res = await axios.post("http://localhost:8000/auth/login", {
        email: email.trim(),
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Login successful!");
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Small delay for better UX
        setTimeout(() => {
          navigate(location.state || "/");
        }, 500);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear error when user starts typing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <Layout title={"Login - TimeZone Watch Store"}>
      <div className="register-bg">
        <div className="form-container">
          <form onSubmit={handleSubmit} noValidate>
            <h4 className="title">LOGIN</h4>

            <div className="mb-3">
              <input
                type="email"
                value={email}
                className={`form-control ${errors.email ? "error" : ""}`}
                id="email"
                placeholder="Enter your email address"
                onChange={handleEmailChange}
                disabled={loading}
                autoComplete="email"
                required
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="password"
                value={password}
                className={`form-control ${errors.password ? "error" : ""}`}
                id="password"
                placeholder="Enter your password"
                onChange={handlePasswordChange}
                disabled={loading}
                autoComplete="current-password"
                required
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <div className="mb-3 text-end">
              <span
                onClick={() => !loading && navigate("/forgot-password")}
                className={loading ? "disabled-link" : ""}
              >
                Forgot Password?
              </span>
            </div>

            <button type="submit" className="button" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  LOGGING IN...
                </>
              ) : (
                "LOGIN"
              )}
            </button>

            <div className="auth-footer">
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => !loading && navigate("/register")}
                  className={`auth-link ${loading ? "disabled-link" : ""}`}
                >
                  Register here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
