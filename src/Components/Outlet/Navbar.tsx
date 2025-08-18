import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import logoimg from "../../assets/logotusuka-removebg-preview.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

interface NavbarProps {
  logoSrc?: string;
  jeansTextureSrc?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: <Link to="/">Home</Link> },
    {
      label: (
        <>
          About Us <IoMdArrowDropdown className="inline" />
        </>
      ),
      subItems: [
        { label: <Link to="/companyprofile">Company Profile</Link> },
        { label: <Link to="/quality">Quality</Link> },
        { label: <Link to="/mvc?tab=mission">Mission</Link> },
        { label: <Link to="/mvc?tab=vision">Vision</Link> },
        { label: <Link to="/mvc?tab=commitment">Commitment</Link> },
      ],
    },
    { label: <Link to="/plants">Explore Plants</Link> },
    { label: <Link to="/laboratory">Laboratory</Link> },
    { label: <Link to="/joinwithus">Join With Us</Link> },
    { label: <Link to="/contact-us">Contact Us</Link> },
  ];

  // detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed bg-gradient-to-r from-blue-50 to-indigo-50 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 shadow-lg" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logoimg} alt="Company Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() =>
                  setActiveSubmenu(activeSubmenu === index ? null : index)
                }
                className="text-black hover:text-blue-400 transition-colors font-medium px-2 py-1"
              >
                {item.label}
              </button>

              {item.subItems && activeSubmenu === index && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-md rounded-md z-40">
                  {item.subItems.map((subItem, subIndex) => (
                    <div key={subIndex} className="px-4 py-2 hover:bg-gray-100">
                      {subItem.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center space-x-4">
          <FaSearch size={18} className="cursor-pointer" />
          <Link
            to="/contact-us"
            className="bg-gradient-to-r from-[#1e1e9c] to-[#6267f5] text-white py-2 px-6 rounded-full font-bold hover:brightness-90"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`lg:hidden bg-white overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          {navItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-black block py-2 font-medium w-full text-left"
              >
                {item.label}
              </button>
              {item.subItems && (
                <div className="ml-4 text-sm space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-600 hover:text-blue-600 text-left w-full"
                    >
                      ↳ {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
