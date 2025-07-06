import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCrown,
  AiOutlineCalendar,
  AiOutlineDashboard,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard - Premium Watch Store"}>
      <div className="admin-dashboard-container">
        <div className="dashboard-content">
          <div className="sidebar-section">
            <AdminMenu />
          </div>

          <div className="main-section">
            <div className="dashboard-header">
              <div className="header-icon">
                <AiOutlineDashboard />
              </div>
              <div className="header-content">
                <h1 className="dashboard-title">Admin Dashboard</h1>
                <p className="dashboard-subtitle">
                  Welcome to your premium control center
                </p>
              </div>
            </div>

            <div className="admin-profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <AiOutlineUser />
                </div>
                <div className="profile-badge">
                  <AiOutlineCrown />
                  <span>Administrator</span>
                </div>
              </div>

              <div className="profile-content">
                <div className="profile-item">
                  <div className="profile-icon">
                    <AiOutlineUser />
                  </div>
                  <div className="profile-details">
                    <label>Admin Name</label>
                    <span>{auth?.user?.name || "Admin User"}</span>
                  </div>
                </div>

                <div className="profile-item">
                  <div className="profile-icon">
                    <AiOutlineMail />
                  </div>
                  <div className="profile-details">
                    <label>Email Address</label>
                    <span>{auth?.user?.email || "admin@example.com"}</span>
                  </div>
                </div>

                <div className="profile-item">
                  <div className="profile-icon">
                    <AiOutlinePhone />
                  </div>
                  <div className="profile-details">
                    <label>Contact Number</label>
                    <span>{auth?.user?.phone || "Not provided"}</span>
                  </div>
                </div>

                <div className="profile-item">
                  <div className="profile-icon">
                    <AiOutlineCalendar />
                  </div>
                  <div className="profile-details">
                    <label>Last Login</label>
                    <span>
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
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
                  <span>Online & Active</span>
                </div>
              </div>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <BsWatch />
                </div>
                <div className="stat-content">
                  <h3>Premium</h3>
                  <p>Watch Store</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <AiOutlineCrown />
                </div>
                <div className="stat-content">
                  <h3>Admin</h3>
                  <p>Access Level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
