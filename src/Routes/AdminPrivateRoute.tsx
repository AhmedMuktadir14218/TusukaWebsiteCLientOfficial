// AdminPrivateRoute.tsx (unchanged)
import { Navigate, Outlet } from "react-router-dom";

export default function AdminPrivateRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
