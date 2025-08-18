// src/Routes/AdminPrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react"; 
import { useAuth } from "../Context/AuthContext";

export default function AdminPrivateRoute() {
  const { token, validateToken, loading } = useAuth();
  const [isValidToken, setIsValidToken] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const isValid = await validateToken();
        setIsValidToken(isValid);
      }
      setCheckingToken(false);
    };
    checkToken();
  }, [token, validateToken]);

  if (loading || checkingToken) {
    return <div>Loading...</div>;
  }

  if (!token || !isValidToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}