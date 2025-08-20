// src/Routes/AdminPrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react"; 
import { useAuth } from "../Context/AuthContext";

export default function AdminPrivateRoute() {
  const { token, validateToken, loading } = useAuth();
  const [isValidToken, setIsValidToken] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

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