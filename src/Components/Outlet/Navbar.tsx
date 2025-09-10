import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import bgNav from "../../assets/bg.png";
import logo from "../../assets/LogoWhite.png";
import { useTheme } from "../../Context/ThemeContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const location = useLocation(); // React Router hook
// const { theme } = useTheme();
// console.log("Theme colors:", theme?.navFoot); // ✅ should log colors from DB
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Explore Plants", path: "/plants" },
    { label: "Laboratory", path: "/laboratory" },
    { label: "Join With Us", path: "/joinwithus" },
    { label: "Contact Us", path: "/contact-us" },
  ];
  // helper function
const hexToRgba = (hex: string, alpha = 1) => {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


  // Update active menu based on URL
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname);
    setActiveMenu(currentIndex !== -1 ? currentIndex : null);
  }, [location.pathname]);

  // Scroll detection for shadow and hide/show
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      if (window.scrollY > lastScrollY.current) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="fixed w-full z-50 transition-transform duration-300  "
      // style={{ backgroundImage: `url(${bgNav})` }}
              style={{
    backgroundColor: hexToRgba(getComputedStyle(document.documentElement).getPropertyValue('--color-navFootBG'), 0.90),
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    // border: "1px solid rgba(185, 206, 227, 0.3)",
  }}
    >
      <div className="container mx-auto  px-3 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Company Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`px-2 py-3 font-medium transition-colors ${
                activeMenu === index
                  ? "border-b-4 border-[var(--color-activeBorder)] rounded-none text-[var(--color-navFootText)] xl:text-lg lg:text-md font-extrabold"
                  : "text-[var(--color-navFootText)] xl:text-lg lg:text-md hover:text-[var(--color-webBg)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Button */}
        <div className="hidden xl:flex items-center space-x-4">
          <Link
            to="/contact-us"
            className="bg-[var(--color-navFootText)] text-[var(--color-navFootBG)] py-2 px-6 rounded-full font-bold xl:text-lg lg:text-md"


          >
            Collections
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block py-2 px-3 rounded-md font-medium transition-colors ${
                activeMenu === index
                  ? "bg-[var(--color-navFootText)] text-[var(--color-navFootBG)]"
                  : "text-white hover:text-[#ccddaf]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
 




// import React, { useState, useEffect, useRef } from "react";
// import { FaSearch } from "react-icons/fa";
// import { HiMenu, HiX } from "react-icons/hi";
// import { Link } from "react-router-dom";
// import bgNav from "../../assets/bg.png";
// import logo from "../../assets/Logo of Tusuka.png";

// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState<number | null>(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true); // ✅ new state
//   const lastScrollY = useRef(0);

//   const menuRef = useRef<HTMLDivElement>(null);

//   const navItems = [
//     { label: "Home", path: "/" },
//     { label: "About Us", path: "/about" },
//     { label: "Explore Plants", path: "/plants" },
//     { label: "Laboratory", path: "/laboratory" },
//     { label: "Join With Us", path: "/joinwithus" },
//     { label: "Contact Us", path: "/contact-us" },
//   ];

  

//   // detect scroll for shadow
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);

//       if (window.scrollY > lastScrollY.current) {
//         // scrolling down
//         setShowNavbar(false);
//       } else {
//         // scrolling up
//         setShowNavbar(true);
//       }
//       lastScrollY.current = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-transform duration-300 ${
//         showNavbar ? "translate-y-0" : "-translate-y-full"
//       } ${scrolled ? "shadow-lg py-2" : "py-4"}`}
//       style={{ backgroundImage: `url(${bgNav})` }}
//     >
//       <div className="container mx-auto px-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img src={logo} alt="Company Logo" className="h-10 w-auto" />
//         </Link>

//         {/* Desktop Navigation (xl and above) */}
//         <div className="hidden xl:flex items-center space-x-6">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               onClick={() => setActiveMenu(index)}
//               className={`px-4 py-4 font-medium transition-colors ${
//                 activeMenu === index
//                   ? " border-b-4 border-[#ccddaf] rounded-none text-[#ccddaf] xl:text-xl lg:text-lg font-bold"
//                   : "text-black xl:text-xl lg:text-lg hover:text-[#ccddaf]"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* Right (xl and above) */}
//         <div className="hidden xl:flex items-center space-x-4">
//           {/* <FaSearch size={18} className="cursor-pointer" /> */}
//           <Link
//             to="/contact-us"
//             className="bg-[#ccddaf] text-white py-4 px-9 rounded-full font-bold xl:text-xl lg:text-lg"
//           >
//             Let's Talk
//           </Link>
//         </div>

//         {/* Mobile Menu Button (below xl) */}
//         <div className="xl:hidden">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
//             {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         ref={menuRef}
//         className={`xl:hidden overflow-hidden transition-all duration-300 ${
//           isMenuOpen ? "max-h-screen py-4" : "max-h-0"
//         }`}
//       >
//         <div className="container mx-auto px-4 flex flex-col space-y-3">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               onClick={() => {
//                 setActiveMenu(index);
//                 setIsMenuOpen(false);
//               }}
//               className={`block py-2 px-3 rounded-md font-medium transition-colors ${
//                 activeMenu === index
//                   ? "bg-[#ccddaf] text-white"
//                   : "text-black hover:text-[#ccddaf]"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };







// import React, { useState, useEffect, useRef } from "react";
// import { FaSearch } from "react-icons/fa";
// import { HiMenu, HiX } from "react-icons/hi";
// // import logoimg from "../../assets/logotusuka-removebg-preview.png";
// // import { IoMdArrowDropdown } from "react-icons/io";
// import { Link } from "react-router-dom";
// import bgNav from "../../assets/bg.png";
// import logo from "../../assets/Logo of Tusuka.png";

// interface NavbarProps {
//   logoSrc?: string;
//   jeansTextureSrc?: string;
// }

// const Navbar: React.FC<NavbarProps> = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
//   const [scrolled, setScrolled] = useState(false);

//   const menuRef = useRef<HTMLDivElement>(null);

//   const navItems = [
//     { label: <Link to="/">Home</Link> },
//     {
//       label: (
//         <Link to="/about">
//           About Us 
//           {/* <IoMdArrowDropdown className="inline" /> */}
//         </Link>
//       ),
//       // subItems: [
//       //   { label: <Link to="/companyprofile">Company Profile</Link> },
//       //   { label: <Link to="/quality">Quality</Link> },
//       //   { label: <Link to="/mvc?tab=mission">Mission</Link> },
//       //   { label: <Link to="/mvc?tab=vision">Vision</Link> },
//       //   { label: <Link to="/mvc?tab=commitment">Commitment</Link> },
//       // ],
//     },
//     { label: <Link to="/plants">Explore Plants</Link> },
//     { label: <Link to="/laboratory">Laboratory</Link> },
//     { label: <Link to="/joinwithus">Join With Us</Link> },
//     { label: <Link to="/contact-us">Contact Us</Link> },
//   ];

//   // detect scroll
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsMenuOpen(false);
//         setActiveSubmenu(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav
//       className={`fixed  w-full z-50 transition-all duration-300 ${
//         scrolled ? "py-2 shadow-lg" : "py-4"
//       }` }
//       style={{ backgroundImage: `url(${bgNav})` }}
//     >
//       <div className="container mx-auto px-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img src={logo} alt="Company Logo" className="h-10 w-auto" />
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden lg:flex items-center space-x-6">
//           {navItems.map((item, index) => (
//             <div key={index} className="relative">
//               <button
//                 onClick={() =>
//                   setActiveSubmenu(activeSubmenu === index ? null : index)
//                 }
//                 className="text-black hover:text-blue-400 lg:text-md xl:text-lg   transition-colors font-medium px-2 py-1"
//               >
//                 {item.label}
//               </button>

//               {/* {item.subItems && activeSubmenu === index && (
//                 <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-md rounded-md z-40">
//                   {item.subItems.map((subItem, subIndex) => (
//                     <div key={subIndex} className="px-4 py-2 hover:bg-gray-100">
//                       {subItem.label}
//                     </div>
//                   ))}
//                 </div>
//               )} */}
//             </div>
//           ))}
//         </div>

//         {/* Right */}
//         <div className="hidden lg:flex items-center space-x-4">
//           <FaSearch size={18} className="cursor-pointer" />
//           <Link
//             to="/contact-us"
//             className="bg-gradient-to-r from-[#1e1e9c] to-[#6267f5] text-white py-2 px-6 rounded-full font-bold hover:brightness-90"
//           >
//             Let's Talk
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="lg:hidden">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
//             {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         ref={menuRef}
//         className={`lg:hidden  overflow-hidden transition-all duration-300 ${
//           isMenuOpen ? "max-h-screen py-4" : "max-h-0"
//         }`}
//       >
//         <div className="container mx-auto px-4 flex flex-col space-y-3">
//           {navItems.map((item, index) => (
//             <div key={index}>
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-black block py-2 font-medium w-full text-left"
//               >
//                 {item.label}
//               </button>
//               {/* {item.subItems && (
//                 <div className="ml-4 text-sm space-y-1">
//                   {item.subItems.map((subItem, subIndex) => (
//                     <button
//                       key={subIndex}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="block text-gray-600 hover:text-[#ccddaf] text-left w-full"
//                     >
//                       ↳ {subItem.label}
//                     </button>
//                   ))}
//                 </div>
//               )} */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

export default Navbar;
