import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa'; // For mobile menu icon
import { IoSearchOutline } from 'react-icons/io5'; // For search icon

const Navbar2: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-6 md:px-12 flex justify-between items-center"
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/src/assets/logo.png" alt="Logo" className="h-8" /> {/* Replace with your logo path */}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 items-center text-gray-700 font-medium">
        <a href="#" className="hover:text-red-600 transition-colors duration-300">Home <span className="text-xs ml-1">⌵</span></a>
        <a href="#" className="hover:text-red-600 transition-colors duration-300">Service <span className="text-xs ml-1">⌵</span></a>
        <a href="#" className="hover:text-red-600 transition-colors duration-300">Pages <span className="text-xs ml-1">⌵</span></a>
        <a href="#" className="hover:text-red-600 transition-colors duration-300">Project <span className="text-xs ml-1">⌵</span></a>
        <a href="#" className="hover:text-red-600 transition-colors duration-300">Blog <span className="text-xs ml-1">⌵</span></a>
      </div>

      {/* Right side icons and button */}
      <div className="flex items-center space-x-4">
        <button className="hidden md:block bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
          Let's Talk
        </button>
        <button className="hidden md:block text-gray-700 hover:text-red-600 transition-colors duration-300">
          <IoSearchOutline className="h-6 w-6" />
        </button>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden flex flex-col items-center py-4 space-y-4 text-gray-700 font-medium"
        >
          <a href="#" className="hover:text-red-600 transition-colors duration-300">Home</a>
          <a href="#" className="hover:text-red-600 transition-colors duration-300">Service</a>
          <a href="#" className="hover:text-red-600 transition-colors duration-300">Pages</a>
          <a href="#" className="hover:text-red-600 transition-colors duration-300">Project</a>
          <a href="#" className="hover:text-red-600 transition-colors duration-300">Blog</a>
          <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300 w-fit">
            Let's Talk
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar2;