import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../../styles/Header.css"; // Import the CSS file

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: null });
    localStorage.removeItem("auth");
    toast.success("You have been logged out successfully.");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg watch-navbar">
        <div className="container-fluid">
          <button
            className="navbar-toggler watch-navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon watch-navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand watch-brand">
              <div className="watch-icon">
                <BsWatch />
              </div>
              <span className="brand-name">TimeZone</span>
            </Link>

            <div className="search-container">
              <SearchInput />
            </div>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 watch-nav">
              <li className="nav-item watch-nav-item">
                <NavLink to="/" className="nav-link watch-nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown watch-nav-item watch-dropdown">
                <Link
                  className="nav-link dropdown-toggle watch-nav-link watch-dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu watch-dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item watch-dropdown-item"
                      to={"/categories"}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item watch-dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item watch-nav-item">
                    <NavLink to="/register" className="nav-link watch-nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item watch-nav-item">
                    <NavLink to="/login" className="nav-link watch-nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown watch-nav-item watch-dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle watch-nav-link watch-dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu watch-dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item watch-dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item watch-dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item watch-nav-item">
                <NavLink to="/cart" className="nav-link watch-cart-link">
                  <Badge count={cart?.length} showZero>
                    <AiOutlineShoppingCart className="watch-cart-icon" />
                  </Badge>
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
