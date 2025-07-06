import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineAppstore,
  AiOutlineShoppingCart,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineCrown,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../../styles/AdminMenu.css";

const AdminMenu = () => {
  return (
    <div className="admin-menu">
      <div className="admin-menu-header">
        <div className="admin-icon">
          <BsWatch />
        </div>
        <h4 className="admin-title">Admin Panel</h4>
        <div className="crown-icon">
          <AiOutlineCrown />
        </div>
      </div>

      <div className="menu-items">
        <NavLink to="/dashboard/admin" className="menu-item" end>
          <AiOutlineDashboard className="menu-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/admin/create-category" className="menu-item">
          <AiOutlineAppstore className="menu-icon" />
          <span>Manage Categories</span>
        </NavLink>

        <NavLink to="/dashboard/admin/products" className="menu-item">
          <AiOutlineShoppingCart className="menu-icon" />
          <span>Manage Products</span>
        </NavLink>

        <NavLink to="/dashboard/admin/create-product" className="menu-item">
          <AiOutlinePlus className="menu-icon" />
          <span>Create Product</span>
        </NavLink>

        <NavLink to="/dashboard/admin/users" className="menu-item">
          <AiOutlineUser className="menu-icon" />
          <span>Users</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
