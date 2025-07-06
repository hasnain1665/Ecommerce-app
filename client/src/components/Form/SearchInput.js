import React, { useState } from "react";
import { useSearch } from "../../context/search.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "../../styles/SearchInput.css"; // Import the CSS file

const SearchInput = ({ theme = "dark" }) => {
  const [auth] = useAuth();
  const [values, setValues] = useSearch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.keyword.trim()) return;

    setLoading(true);

    try {
      const { data } = await axios.get(
        `http://localhost:8000/product/search/${values.keyword}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setValues({ ...values, result: data.result });
      navigate("/search");
    } catch (error) {
      console.error("Search error:", error);
      // You might want to show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setValues({ ...values, keyword });
  };

  return (
    <div
      className={`watch-search-container ${
        theme === "light" ? "light-theme" : ""
      }`}
    >
      <form
        className={`watch-search-form ${loading ? "loading" : ""}`}
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="watch-search-input"
          type="search"
          placeholder="Search luxury watches..."
          aria-label="Search for watches"
          value={values.keyword}
          onChange={handleInputChange}
          disabled={loading}
          autoComplete="off"
        />
        <button
          className="watch-search-button"
          type="submit"
          disabled={loading}
          aria-label="Search"
        >
          {loading ? (
            <div className="watch-search-loading" />
          ) : (
            <span className="watch-search-icon">🔍</span>
          )}
          <span className="watch-search-button-text">
            {loading ? "Searching..." : "Search"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
