import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import {
  AiOutlineShop,
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineFilter,
} from "react-icons/ai";
import { BsWatch, BsGrid3X3Gap } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";
import "../../styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [auth] = useAuth();

  // Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:8000/product/get-product",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        setProducts(data?.products);
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
    getAllProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={"All Products - Premium Watch Store"}>
      <div className="products-container">
        <div className="products-content">
          <div className="sidebar-section">
            <AdminMenu />
          </div>

          <div className="main-section">
            {/* Header Section */}
            <div className="products-header">
              <div className="header-icon">
                <AiOutlineShop />
              </div>
              <div className="header-content">
                <h1 className="products-title">Product Management</h1>
                <p className="products-subtitle">
                  Manage your premium watch collection
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="action-bar">
              <div className="search-section">
                <div className="search-container">
                  <AiOutlineSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="products-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <MdOutlineInventory />
                </div>
                <div className="stat-content">
                  <h3>{products.length}</h3>
                  <p>Total Products</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <BsGrid3X3Gap />
                </div>
                <div className="stat-content">
                  <h3>{filteredProducts.length}</h3>
                  <p>Filtered Results</p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid-container">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner">
                    <BsWatch />
                  </div>
                  <p>Loading premium watches...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="no-products">
                  <div className="no-products-icon">
                    <AiOutlineShop />
                  </div>
                  <h3>No Products Found</h3>
                  <p>
                    {searchTerm
                      ? `No products match "${searchTerm}"`
                      : "Start by adding your first premium watch"}
                  </p>
                  <Link
                    to="/dashboard/admin/create-product"
                    className="add-first-product-btn"
                  >
                    <AiOutlinePlus />
                    <span>Add Your First Product</span>
                  </Link>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="product-card">
                      <div className="product-image-container">
                        <img
                          src={`http://localhost:8000/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="product-image"
                          onError={(e) => {
                            e.target.src = "/placeholder-watch.jpg";
                          }}
                        />
                      </div>

                      <div className="product-details">
                        <div className="product-header">
                          <h3 className="product-name">{product.name}</h3>
                          <div className="product-price">
                            Rs. {product.price?.toLocaleString()}
                          </div>
                        </div>

                        <p className="product-description">
                          {product.description?.length > 100
                            ? `${product.description.substring(0, 100)}...`
                            : product.description}
                        </p>

                        <div className="product-meta">
                          <span className="product-category">
                            {product.category?.name || "Uncategorized"}
                          </span>
                          <span className="product-stock">
                            Stock: {product.quantity || 0}
                          </span>
                        </div>

                        <div className="product-actions">
                          <Link
                            to={`/dashboard/admin/product/${product.slug}`}
                            className="primary-action-btn"
                          >
                            <AiOutlineEye />
                            <span>View Details</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
