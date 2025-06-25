import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();

  // Get All Products
  const getAllProducts = async () => {
    try {
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
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mb-4">
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link text-decoration-none text-dark"
                >
                  <div className="card">
                    <img
                      src={`http://localhost:8000/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
