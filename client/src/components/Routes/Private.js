import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(null); // start as null to detect "checking"
  const [auth] = useAuth();

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
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
    }
  }, [auth?.token]);

  if (ok === null) {
    return <Spinner />;
  }

  return ok ? <Outlet /> : <Navigate to="/login" />;
}
