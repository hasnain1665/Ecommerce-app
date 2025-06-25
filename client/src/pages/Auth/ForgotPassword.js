import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../../styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/forgot-password",
        { email }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/reset-password");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout title="Forgot Password">
      <div className="register-bg">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">Forgot Password</h4>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                className="form-control"
                placeholder="Enter Your Registered Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button">
              Send Reset Token
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
