// src/Components/Outlet/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Outlet/Navbar';
import Footer from './Outlet/Footer';
 
const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet /> {/* This renders the child routes */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;