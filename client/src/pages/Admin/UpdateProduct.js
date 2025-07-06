import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineUpload,
  AiOutlineShoppingCart,
  AiOutlineDollarCircle,
  AiOutlineFileText,
  AiOutlineNumber,
  AiOutlineDeliveredProcedure,
  AiOutlineAppstore,
  AiOutlineCamera,
  AiOutlineSave,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../../styles/UpdateProduct.css";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  // Update Product Function
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `http://localhost:8000/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Update error:", error.response || error.message || error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete Product Function
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4757",
      cancelButtonColor: "#ffd700",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      background: "#2d2d2d",
      color: "#e0e0e0",
      customClass: {
        popup: "swal-custom-popup",
        title: "swal-custom-title",
        confirmButton: "swal-custom-confirm",
        cancelButton: "swal-custom-cancel",
      },
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const { data } = await axios.delete(
          `http://localhost:8000/product/delete-product/${id}`,
          {
            headers: {
              Authorization: `${auth?.token}`,
            },
          }
        );
        if (data?.success) {
          toast.success(data?.message);
          navigate("/dashboard/admin/products");
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  // Get Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/product/single-product/${params.slug}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log("Update error:", error.response || error.message || error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/category/get-category",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    if (auth?.token) getAllCategory();
  }, [auth?.token]);

  return (
    <Layout title="Dashboard - Update Product">
      <div className="update-product-container">
        <div className="update-product-content">
          <div className="sidebar-section">
            <AdminMenu />
          </div>

          <div className="main-section">
            {/* Header */}
            <div className="update-header">
              <div className="header-left">
                <button
                  className="back-btn"
                  onClick={() => navigate("/dashboard/admin/products")}
                >
                  <AiOutlineArrowLeft />
                </button>
                <div className="header-icon">
                  <AiOutlineEdit />
                </div>
                <div className="header-content">
                  <h1 className="page-title">Update Product</h1>
                  <p className="page-subtitle">
                    Edit your premium watch details
                  </p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="product-form-card">
              <div className="form-header">
                <div className="form-title">
                  <AiOutlineShoppingCart />
                  <span>Product Information</span>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="product-form">
                {/* Category Selection */}
                <div className="form-group">
                  <label className="form-label">

                    Category
                  </label>
                  <Select
                    bordered={false}
                    placeholder="Select a Category"
                    size="large"
                    showSearch
                    className="custom-select"
                    onChange={(value) => setCategory(value)}
                    value={category}
                  >
                    {categories.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Product Name */}
                <div className="form-group">
                  <label className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Enter product name"
                    className="form-input"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    placeholder="Enter product description"
                    className="form-textarea"
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                {/* Price and Quantity Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Price (Rs)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={price}
                      placeholder="0.00"
                      className="form-input"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={quantity}
                      placeholder="0"
                      className="form-input"
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Shipping */}
                <div className="form-group">
                  <label className="form-label">
                    Shipping Available
                  </label>
                  <Select
                    bordered={false}
                    placeholder="Select shipping option"
                    size="large"
                    className="custom-select"
                    onChange={(value) => setShipping(value)}
                    value={shipping ? "1" : "0"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                {/* Photo Upload */}
                <div className="form-group">
                  <label className="form-label">
                    Product Photo
                  </label>
                  <div className="photo-upload-section">
                    <label className="photo-upload-btn">
                      <AiOutlineUpload />
                      {photo ? photo.name : "Choose Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                </div>

                {/* Photo Preview */}
                {(photo || id) && (
                  <div className="photo-preview">
                    <div className="preview-label">
                      Current Photo
                    </div>
                    <div className="preview-container">
                      <img
                        src={
                          photo
                            ? URL.createObjectURL(photo)
                            : `http://localhost:8000/product/product-photo/${id}`
                        }
                        alt="product preview"
                        className="preview-image"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="form-actions">
                  <button
                    type="submit"
                    className="update-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <AiOutlineSave />
                    )}
                    {loading ? "Updating..." : "Update Product"}
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    <AiOutlineDelete />
                    Delete Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
