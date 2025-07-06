import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineStar,
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../../styles/Dashboard.css"

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"User Dashboard - Premium Watch Store"}>
      <div className="user-dashboard-container">
        <div className="dashboard-content">
          <div className="sidebar-section">
            <UserMenu />
          </div>

          <div className="main-section">
            <div className="dashboard-header">
              <div className="header-icon">
                <AiOutlineDashboard />
              </div>
              <div className="header-content">
                <h1 className="dashboard-title">My Dashboard</h1>
                <p className="dashboard-subtitle">
                  Welcome to your personal watch collection
                </p>
              </div>
              <div className="header-decoration">
                <BsWatch />
              </div>
            </div>

            <div className="user-profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <AiOutlineUser />
                </div>
                <div className="profile-badge">
                  <AiOutlineStar />
                  <span>Premium Customer</span>
                </div>
              </div>

              <div className="profile-content">
                <div className="profile-item">
                  <div className="profile-icon">
                    <AiOutlineUser />
                  </div>
                  <div className="profile-details">
                    <label>Full Name</label>
                    <span>{auth?.user?.name || "Customer Name"}</span>
                  </div>
                </div>

                <div className="profile-item">
                  <div className="profile-icon">
                    <AiOutlineMail />
                  </div>
                  <div className="profile-details">
                    <label>Email Address</label>
                    <span>{auth?.user?.email || "customer@example.com"}</span>
                  </div>
                </div>

                <div className="profile-item">
                  <div className="profile-icon">
                    <AiOutlinePhone />
                  </div>
                  <div className="profile-details">
                    <label>Phone Number</label>
                    <span>{auth?.user?.phone || "Not provided"}</span>
                  </div>
                </div>

                <div className="profile-item">
                  <div className="profile-icon">
                    <AiOutlineCalendar />
                  </div>
                  <div className="profile-details">
                    <label>Member Since</label>
                    <span>
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="profile-footer">
                <div className="status-indicator">
                  <div className="status-dot"></div>
                  <span>Active Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
