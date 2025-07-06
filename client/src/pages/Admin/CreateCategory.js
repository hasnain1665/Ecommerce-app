import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";
import {
  AiOutlineTag,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineTable,
  AiOutlineWarning,
} from "react-icons/ai";
import { BsWatch } from "react-icons/bs";
import "../../styles/CreateCategory.css";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/category/create-category",
        { name },
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost:8000/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    setDeleteLoading(id);
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setDeleteLoading(null);
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
    <Layout title="Dashboard - Create Category">
      <div className="category-management-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="category-main-content">
                {/* Header Section */}
                <div className="category-header">
                  <div className="header-icon">
                    <AiOutlineTag />
                  </div>
                  <div className="header-content">
                    <h1 className="category-title">Category Management</h1>
                    <p className="category-subtitle">
                      Organize your premium watch collections
                    </p>
                  </div>
                </div>

                {/* Create Category Form */}
                <div className="category-form-card">
                  <div className="form-header">
                    <div className="form-icon">
                      <AiOutlinePlus />
                    </div>
                    <h2>Create New Category</h2>
                  </div>
                  <div className="form-content">
                    <CategoryForm
                      handleSubmit={handleSubmit}
                      value={name}
                      setValue={setName}
                      loading={loading}
                    />
                  </div>
                </div>

                {/* Categories Table */}
                <div className="categories-table-card">
                  <div className="table-header">
                    <div className="table-icon">
                      <AiOutlineTable />
                    </div>
                    <div className="table-title-section">
                      <h2>All Categories</h2>
                      <p>Manage your existing watch categories</p>
                    </div>
                    <div className="table-stats">
                      <span className="category-count">
                        {categories.length} Categories
                      </span>
                    </div>
                  </div>

                  <div className="table-content">
                    {categories.length === 0 ? (
                      <div className="empty-state">
                        <div className="empty-icon">
                          <AiOutlineTag />
                        </div>
                        <h3>No Categories Found</h3>
                        <p>Create your first category to get started</p>
                      </div>
                    ) : (
                      <div className="premium-table">
                        <div className="table-wrapper">
                          <table className="categories-table">
                            <thead>
                              <tr>
                                <th>
                                  <div className="th-content">
                                    <AiOutlineTag />
                                    <span>Category Name</span>
                                  </div>
                                </th>
                                <th>
                                  <div className="th-content">
                                    <AiOutlineEdit />
                                    <span>Actions</span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {categories.map((c, index) => (
                                <tr key={c._id} className="category-row">
                                  <td>
                                    <div className="category-name">
                                      <span>{c.name}</span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="action-buttons">
                                      <button
                                        className="action-btn edit-btn"
                                        onClick={() => {
                                          setVisible(true);
                                          setUpdatedName(c.name);
                                          setSelected(c);
                                        }}
                                        disabled={loading}
                                      >
                                        <AiOutlineEdit />
                                        <span>Edit</span>
                                      </button>
                                      <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(c._id)}
                                        disabled={deleteLoading === c._id}
                                      >
                                        {deleteLoading === c._id ? (
                                          <div className="btn-spinner"></div>
                                        ) : (
                                          <AiOutlineDelete />
                                        )}
                                        <span>Delete</span>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Modal */}
        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          centered
          className="category-modal"
          title={
            <div className="modal-title">
              <AiOutlineEdit />
              <span>Update Category</span>
            </div>
          }
        >
          <div className="modal-content">
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
              loading={loading}
            />
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
