import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:8000/auth/user-auth", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setOk(res.data.ok);
      } catch (error) {
        console.error("Auth check failed", error);
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    } else {
    }
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner />;
}
