import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
// import bgImage from '../../assets/bg-header2.jpg';
// import logoimg from "../../assets/Tusuka_Logo_tr.png";
import logoimg from "../../assets/logotusuka-removebg-preview.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

interface NavbarProps {
  logoSrc?: string;
  jeansTextureSrc?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navItems = [
    {
      label: (
        <Link to="/" className="inline">
          Home
        </Link>
      ),
    },
    {
      label: (
        <Link to="/about" className="inline">
          About Us <IoMdArrowDropdown className="inline" />
        </Link>
      ),
      subItems: [
        {
          label: (
            <Link to="/companyprofile" className="inline">
              Company Profile
            </Link>
          ),
        },
        {
          label: (
            <Link to="/quality" className="inline">
              Quality
            </Link>
          ),
        },
     {
  label: <Link to="/mvc?tab=mission" className="inline">Mission</Link>,
},
{
  label: <Link to="/mvc?tab=vision" className="inline">Vision</Link>,
},
{
  label: <Link to="/mvc?tab=commitment" className="inline">Commitment</Link>,
},
        // {
        //   label: (
        //     <Link to="/laboratory" className="inline">
        //       Laboratory
        //     </Link>
        //   ),
        // },
      ],
    },

    // {
    //   label: ( <> <Link to="/plants"> Explore Plants <IoMdArrowDropdown className="inline" /> </Link></>),
    //   subItems: [
    //     { label: <Link to="/plants" className="inline">Manufacturing Units</Link>   },
    //     { label: <Link to="/plants" className="inline">Laundry Unit</Link>   },
    //     { label: <Link to="/plants" className="inline">Packaging Unit</Link>   },
    //     { label: <Link to="/plants" className="inline">Embroidery Unit</Link>   },

    //   ],
    // },
    {
      label: (
        <>
          {" "}
          <Link to="/plants"> Explore Plants</Link>
        </>
      ),
    },
{
      // label: (
      //   <Link to="/eventsmedia" className="inline">
      //     Events & Media
      //   </Link>
      // ),

      label: (
            <Link to="/laboratory" className="inline">
              Laboratory
            </Link>
          ),
    },
    {
      label: (
        <Link to="/joinwithus" className="inline">
          Join With Us
        </Link>
      ),
    },
    

    {
      label: (
        <Link to="/contact-us" className="inline">
          Contact Us
        </Link>
      ),
    },
    // {
    //   label: (
    //     <Link to="/admin" className="inline">
    //       Admin
    //     </Link>
    //   ),
    // },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`fixed bg-gradient-to-r from-blue-50 to-indigo-50 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 shadow-lg" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logoimg} alt="Company Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                to="#"
                className="text-black hover:text-blue-400 transition-colors font-medium px-2 py-1"
              >
                {item.label}
              </Link>

              {/* Submenu if exists */}
              {item.subItems && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-300 z-40">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-blue-500"
                    >
                      {subItem.label}
                    </Link>
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
          <button className="bg-gradient-to-r from-[#1e1e9c] to-[#6267f5] text-white py-2 px-6 rounded-full font-bold hover:brightness-90 transition-colors">
            <Link to="/contact-us" className="inline">
              Let's Talk
            </Link>
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

      {/* Mobile Menu - (Optional: You can enhance with collapsible submenus if needed) */}
      <div
        className={`lg:hidden bg-white overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          {navItems.map((item, index) => (
            <div key={index}>
              <Link to="#" className="text-black block py-2 font-medium">
                {item.label}
              </Link>
              {item.subItems && (
                <div className="ml-4 text-sm space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to="#"
                      className="block text-gray-600 hover:text-blue-600"
                    >
                      ↳ {subItem.label}
                    </Link>
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
