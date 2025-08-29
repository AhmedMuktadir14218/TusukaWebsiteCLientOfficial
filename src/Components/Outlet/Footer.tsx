import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import binoxLogo from '../../assets/Tusuka_Logo_tr.png';
import { Link } from 'react-router-dom';
import bgNav from "../../assets/bg.png"

const Footer: React.FC = () => {
  return (
    <footer className="  text-gray-700"     
    // style={{ backgroundImage: `url(${bgNav})` }}
              style={{
  background: "rgb(173 208 244 / 52%)", 
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  // border: "1px solid rgba(185, 206, 227, 0.3)"
}}>

 
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Logo & Socials */}
        <div className="flex flex-col items-start">
          <img src={binoxLogo} alt="Tusuka Logo" className="h-12 mb-4" />
          <p className="text-sm font-semibold mb-4">Follow Us</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors"><FaFacebookF size={18} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors"><FaTwitter size={18} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors"><FaInstagram size={18} /></a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors"><FaLinkedinIn size={18} /></a>
          </div>
        </div>

        {/* Office Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Our Office</h4>
          <p className="text-sm mb-1">Tusuka Group</p>
          <p className="text-sm mb-1">House-50 (5th Floor), Road no-11</p>
          <p className="text-sm mb-1">Block-F, Banani, Dhaka-1213, Bangladesh</p>
          <p className="text-sm mt-2">Phone: +8809666722222</p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/contact-us" className="text-sm hover:text-blue-700 transition-colors">Contact Us</Link></li>
            <li><Link to="#" className="text-sm hover:text-blue-700 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/acp" className="text-sm hover:text-blue-700 transition-colors">Awards & Recognitions</Link></li>
            <li><Link to="/joinwithus" className="text-sm hover:text-blue-700 transition-colors">Careers</Link></li>
            <li><Link to="/admin" className="text-sm hover:text-blue-700 transition-colors">Login</Link></li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Subscribe</h4>
          <p className="text-sm mb-4 text-gray-600">Get the latest updates and offers.</p>
          <div className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-0 xl:px-4  py-2 rounded-l-full outline-none border border-[#20409a] text-gray-800 placeholder-gray-500 text-sm"
            />
            <button className="px-0 xl:px-4  py-2 bg-blue-700 text-white rounded-r-full hover:bg-blue-800 transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-8 py-4 text-center sm:text-left sm:flex sm:justify-between sm:items-center px-4">
        <p className="text-sm text-gray-500">&copy; 2025 <span className="font-semibold text-gray-800">Tusuka Group</span>. All rights reserved.</p>
        <p className="text-sm text-gray-500 mt-2 sm:mt-0">
          Work inquiries: <a href="mailto:inquiry@tusuka.com" className="text-blue-700 hover:underline">inquiry@tusuka.com</a>
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;
