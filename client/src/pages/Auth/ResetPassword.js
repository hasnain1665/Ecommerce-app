import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../../styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/reset-password",
        {
          token,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout title="Reset Password">
      <div className="register-bg">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">Reset Password</h4>
            <div className="mb-3">
              <input
                type="text"
                value={token}
                className="form-control"
                placeholder="Enter Reset Token"
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                className="form-control"
                placeholder="Enter New Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
