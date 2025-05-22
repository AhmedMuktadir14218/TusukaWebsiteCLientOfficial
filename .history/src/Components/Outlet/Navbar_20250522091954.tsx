import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import bgImage from '../../assets/bg-header2.jpg';
import logoimg from '../../assets/Tusuka_Logo_tr.png';
import { IoMdArrowDropdown } from "react-icons/io";

interface NavbarProps {
  logoSrc?: string;
  jeansTextureSrc?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navItems = [
    {
      label: 'Home',
      link: '#home',
    },
    {
      label: 'About Us ',
      subItems: [
        { label: 'Company Profile', link: '#company-profile' },
        { label: 'Vision', link: '#vision' },
        { label: 'Mission', link: '#mission' },
        { label: 'Commitment', link: '#commitment' },
        { label: 'Quality', link: '#quality' },
        { label: 'Laboratory', link: '#laboratory' },
      ],
    },
    {
      label: 'Explore Plants',
      subItems: [
        { label: 'Manufacturing Units', link: '#manufacturing-units' },
        { label: 'Laundry Unit', link: '#laundry-unit' },
        { label: 'Packaging Unit', link: '#packaging-unit' },
        { label: 'Embroidery Unit', link: '#embroidery-unit' },
      ],
    },
    {
      label: 'Core Points',
      subItems: [
        { label: 'Our Market', link: '#our-market' },
        { label: 'Sourcing', link: '#sourcing' },
        { label: 'Code of Conduct', link: '#code-of-conduct' },
        { label: 'Research & Development', link: '#rnd' },
        { label: 'Safety', link: '#safety' },
        { label: 'Social Benefit', link: '#social-benefit' },
      ],
    },
    {
      label: 'Join With Us',
      link: '#join-with-us',
    },
    {
      label: 'Contact Us',
      link: '#contact-us',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={`fixed bg-[#fef2ed] w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={logoimg} alt="Company Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <a
                href={item.link || '#'}
                className="text-black hover:text-blue-400 transition-colors font-medium px-2 py-1"
              >
                {item.label}
              </a>

              {/* Submenu if exists */}
              {item.subItems && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-300 z-40">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.link}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right - Search + CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="text-black hover:text-blue-400">
            <FaSearch size={18} />
          </button>
          <button className="bg-white text-blue-800 py-2 px-6 rounded-full font-bold hover:bg-blue-100 transition-colors">
            Let's Talk
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - (Optional: You can enhance with collapsible submenus if needed) */}
      <div
        className={`lg:hidden bg-white overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          {navItems.map((item, index) => (
            <div key={index}>
              <a
                href={item.link || '#'}
                className="text-black block py-2 font-medium"
              >
                {item.label}
              </a>
              {item.subItems && (
                <div className="ml-4 text-sm space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.link}
                      className="block text-gray-600 hover:text-blue-600"
                    >
                      ↳ {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-gray-300">
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
