import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineDashboard,
  AiOutlineHeart,
  AiOutlineStar,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../../styles/UserMenu.css";

const UserMenu = () => {
  return (
    <div className="user-menu">
      <div className="user-menu-header">
        <div className="user-icon">
          <BsWatch />
        </div>
        <h4 className="user-title">User Dashboard</h4>
        <div className="star-icon">
          <AiOutlineStar />
        </div>
      </div>

      <div className="menu-items">
        <NavLink to="/dashboard/user" className="menu-item" end>
          <AiOutlineDashboard className="menu-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/user/profile" className="menu-item">
          <AiOutlineUser className="menu-icon" />
          <span>My Profile</span>
        </NavLink>

        <NavLink to="/dashboard/user/orders" className="menu-item">
          <AiOutlineShoppingCart className="menu-icon" />
          <span>My Orders</span>
        </NavLink>
      </div>

      <div className="menu-footer">
        <div className="user-badge">
          <span>Customer</span>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
