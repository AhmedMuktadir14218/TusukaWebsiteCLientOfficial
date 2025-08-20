// src/Components/AdminLayout.tsx
 
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar'; // Corrected relative path

export default function AdminLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {/* This is where the nested admin routes will render */}
        <Outlet />
      </div>
    </div>
  );
}