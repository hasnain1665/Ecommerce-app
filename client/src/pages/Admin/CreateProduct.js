import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import {
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineUpload,
  AiOutlineTag,
  AiOutlineDollarCircle,
  AiOutlineFileText,
  AiOutlineNumber,
  AiOutlineGlobal,
} from "react-icons/ai";
import { BsWatch, BsImage } from "react-icons/bs";
import "../../styles/CreateProduct.css";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [auth] = useAuth();

  // Create Product Function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("photo", photo);
      const { data } = await axios.post(
        "http://localhost:8000/product/create-product",
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
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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
    <Layout title="Dashboard - Create Product">
      <div className="create-product-container">
        <div className="product-content">
          <div className="sidebar-section">
            <AdminMenu />
          </div>

          <div className="main-section">
            <div className="product-header">
              <div className="header-icon">
                <AiOutlinePlus />
              </div>
              <div className="header-content">
                <h1 className="product-title">Create New Product</h1>
                <p className="product-subtitle">
                  Add a premium watch to your collection
                </p>
              </div>
            </div>

            <div className="product-form-card">
              <form onSubmit={handleCreate} className="product-form">
                <div className="form-row">
                  <div className="form-group full-width">
                    <label className="form-label">
                      Product Category
                    </label>
                    <div className="select-wrapper">
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
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Enter Premium Watch Name"
                      className="form-input"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label className="form-label">
                      Product Description
                    </label>
                    <textarea
                      name="description"
                      value={description}
                      placeholder="Describe the watch features, materials, and craftsmanship..."
                      className="form-textarea"
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      required
                    />
                  </div>
                </div>

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
                      min="0"
                      step="0.01"
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
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Shipping Available
                    </label>
                    <div className="select-wrapper">
                      <Select
                        bordered={false}
                        placeholder="Select Shipping Option"
                        size="large"
                        className="custom-select"
                        onChange={(value) => setShipping(value)}
                        value={shipping}
                      >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                      </Select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Product Image
                    </label>
                    <label className="file-upload-btn">
                      <AiOutlineUpload />
                      {photo ? photo.name : "Upload Photo"}
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

                {photo && (
                  <div className="photo-preview">
                    <div className="preview-container">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        className="preview-image"
                      />
                      <div className="preview-overlay">
                        <BsImage />
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="create-btn">
                    <AiOutlinePlus />
                    Create Product
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

export default CreateProduct;
