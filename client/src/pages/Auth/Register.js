import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Input validation
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    } else if (address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
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
      const res = await axios.post("http://localhost:8000/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        address: address.trim(),
      });

      if (res.data.success) {
        toast.success(res.data.message || "Registration successful!");

        // Small delay for better UX
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 409) {
        toast.error("Email already exists. Please use a different email.");
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
  const handleInputChange = (field, value, setter) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Layout title={"Register - TimeZone Watch Store"}>
      <div className="register-bg">
        <div className="form-container">
          <form onSubmit={handleSubmit} noValidate>
            <h4 className="title">REGISTER</h4>

            <div className="mb-3">
              <input
                type="text"
                value={name}
                className={`form-control ${errors.name ? "error" : ""}`}
                id="name"
                placeholder="Enter your full name"
                onChange={(e) =>
                  handleInputChange("name", e.target.value, setName)
                }
                disabled={loading}
                autoComplete="name"
                required
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                value={email}
                className={`form-control ${errors.email ? "error" : ""}`}
                id="email"
                placeholder="Enter your email address"
                onChange={(e) =>
                  handleInputChange("email", e.target.value, setEmail)
                }
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
                type="tel"
                value={phone}
                className={`form-control ${errors.phone ? "error" : ""}`}
                id="phone"
                placeholder="Enter your phone number"
                onChange={(e) =>
                  handleInputChange("phone", e.target.value, setPhone)
                }
                disabled={loading}
                autoComplete="tel"
                required
              />
              {errors.phone && (
                <div className="error-message">{errors.phone}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={address}
                className={`form-control ${errors.address ? "error" : ""}`}
                id="address"
                placeholder="Enter your address"
                onChange={(e) =>
                  handleInputChange("address", e.target.value, setAddress)
                }
                disabled={loading}
                autoComplete="street-address"
                required
              />
              {errors.address && (
                <div className="error-message">{errors.address}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="password"
                value={password}
                className={`form-control ${errors.password ? "error" : ""}`}
                id="password"
                placeholder="Create a strong password"
                onChange={(e) =>
                  handleInputChange("password", e.target.value, setPassword)
                }
                disabled={loading}
                autoComplete="new-password"
                required
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <button type="submit" className="button" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  CREATING ACCOUNT...
                </>
              ) : (
                "REGISTER"
              )}
            </button>

            <div className="auth-footer">
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => !loading && navigate("/login")}
                  className={`auth-link ${loading ? "disabled-link" : ""}`}
                >
                  Login here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
