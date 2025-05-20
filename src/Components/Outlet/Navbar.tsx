import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import bgImage from '../../assets/bg-header2.jpg';
import logoimg from '../../assets/Tusuka_Logo_tr.png';

interface NavbarProps {
  logoSrc?: string;
  jeansTextureSrc?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navItems = [
    'Home',
    'Explore Our Plant',
    'Quality',
    'Laboratory',
    'Join With Us',
    'Company Profile',
    'Contact Us'
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      style={{ 
        // backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className={`  fixed bg-[#fef2ed] w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={logoimg} alt="Company Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-black hover:text-blue-200 transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Side - Search & Let's Talk */}
        <div className="hidden lg:flex items-center space-x-6">
          <button className="text-black hover:text-blue-200">
            <FaSearch size={18} />
          </button>
          <button className="bg-white text-blue-800 py-2 px-6 rounded-full font-bold hover:bg-blue-100 transition-colors">
            Let's Talk
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden bg-blue-900 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-black hover:text-blue-200 py-2 transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-blue-700">
            <button className="text-black">
              <FaSearch size={18} />
            </button>
            <button className="bg-white text-blue-800 py-2 px-6 rounded-full font-bold">
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;