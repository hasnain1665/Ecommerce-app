import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import {
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineCrown,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  // Get All Users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8000/user/get-users", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (data?.success) {
        toast.success(data?.message);
        setUsers(data?.users);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getRoleBadge = (role) => {
    if (role === 1) {
      return (
        <div className="role-badge admin">
          <AiOutlineCrown />
          <span>Admin</span>
        </div>
      );
    } else {
      return (
        <div className="role-badge user">
          <AiOutlineUser />
          <span>User</span>
        </div>
      );
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Layout title="Dashboard - All Users">
      <div className="users-container">
        <div className="users-content">
          <div className="sidebar-section">
            <AdminMenu />
          </div>

          <div className="main-section">
            <div className="users-header">
              <div className="header-icon">
                <AiOutlineTeam />
              </div>
              <div className="header-content">
                <h1 className="users-title">User Management</h1>
                <p className="users-subtitle">
                  Manage all registered users and administrators
                </p>
              </div>
              <div className="header-decoration">
                <BsWatch />
              </div>
            </div>

            <div className="users-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <AiOutlineTeam />
                </div>
                <div className="stat-content">
                  <h3>{users.length}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <AiOutlineCrown />
                </div>
                <div className="stat-content">
                  <h3>{users.filter((user) => user.role === 1).length}</h3>
                  <p>Administrators</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <AiOutlineUser />
                </div>
                <div className="stat-content">
                  <h3>{users.filter((user) => user.role === 0).length}</h3>
                  <p>Regular Users</p>
                </div>
              </div>
            </div>

            <div className="users-table-card">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner">
                    <AiOutlineLoading3Quarters />
                  </div>
                  <p>Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="no-users">
                  <AiOutlineTeam />
                  <h3>No Users Found</h3>
                  <p>There are no registered users in the system.</p>
                </div>
              ) : (
                <div className="table-container">
                  <div className="table-header">
                    <h2>All Users ({users.length})</h2>
                  </div>
                  <div className="users-table">
                    <div className="table-head">
                      <div className="table-row">
                        <div className="table-cell">User</div>
                        <div className="table-cell">Contact</div>
                        <div className="table-cell">Address</div>
                        <div className="table-cell">Role</div>
                      </div>
                    </div>
                    <div className="table-body">
                      {users.map((user, index) => (
                        <div key={user._id || index} className="table-row">
                          <div className="table-cell user-cell">
                            <div className="user-avatar">
                              {getInitials(user.name)}
                            </div>
                            <div className="user-info">
                              <h4>{user.name || "No Name"}</h4>
                              <div className="user-email">
                                <AiOutlineMail />
                                <span>{user.email || "No Email"}</span>
                              </div>
                            </div>
                          </div>
                          <div className="table-cell">
                            <AiOutlinePhone />
                            <span>{user.phone || "Not provided"}</span>
                          </div>
                          <div className="table-cell address-cell">
                            <div className="address-info">
                              <AiOutlineHome />
                              <span>{user.address || "Not provided"}</span>
                            </div>
                          </div>
                          <div className="table-cell role-cell">
                            {getRoleBadge(user.role)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
