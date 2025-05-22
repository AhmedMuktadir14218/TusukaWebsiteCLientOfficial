import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Added LinkedIn for common social icons
import binoxLogo from '../../assets/Tusuka_Logo_tr.png'; // Assuming your footer logo is named binox-logo.png in assets

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f2f2f2] py-16 text-gray-700">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* Column 1: Logo and Follow Us */}
        <div className="col-span-1 lg:col-span-1 flex flex-col items-start">
          <img src={binoxLogo} alt="Binox Logo" className="h-10 mb-6" />
          <p className="text-sm font-semibold mb-4">Follow Us</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">
              <FaLinkedinIn size={18} /> {/* Added LinkedIn as it's common */}
            </a>
          </div>
        </div>

        {/* Column 2: Florida Office */}
        <div className="col-span-1 lg:col-span-1">
          <h4 className="text-base font-semibold text-gray-800 mb-4">Florida</h4>
          <p className="text-sm mb-2">Binox Consultancy</p>
          <p className="text-sm">1712 Down Street</p>
          <p className="text-sm">Monmouth Alex Junction,</p>
          <p className="text-sm">Florida 08852</p>
        </div>
        

        {/* Column 3: Company Links */}
        <div className="col-span-1 lg:col-span-1">
          <h4 className="text-base font-semibold text-gray-800 mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-blue-800 transition-colors">Contact Us</a></li>
            <li><a href="#" className="text-sm hover:text-blue-800 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-sm hover:text-blue-800 transition-colors">Awards & Recognitions</a></li>
            <li><a href="#" className="text-sm hover:text-blue-800 transition-colors">Careers</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter / Call to Action */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <h4 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-4">
            We build really better idea
          </h4>
          <p className="text-sm mb-4 text-gray-600">
            Subscribe for newsletter & get day news, service updates
          </p>
          <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm"
            />
            <button className="ml-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Separator / Additional Info Row */}
        <div className="col-span-full md:col-span-2 lg:col-span-3 mt-8">
          <h4 className="text-base font-semibold text-gray-800 mb-4">New York</h4>
          <p className="text-sm mb-2">Binox Digital Studio</p>
          <p className="text-sm">4613 Granville Lake Lake</p>
          <p className="text-sm">View Street, NJ 07087</p>
        </div>

        {/* Work Inquiries */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 mt-8">
          <h4 className="text-base font-semibold text-gray-800 mb-4">Work inquiries</h4>
          <p className="text-sm mb-2">Interested in working with us?</p>
          <a href="mailto:inquiry@binox.com" className="text-sm text-blue-800 hover:underline transition-colors">
            inquiry@binox.com
          </a>
        </div>

        {/* Copyright */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 mt-8 text-sm text-gray-500 lg:text-right">
          <p>© 2023 <span className="font-semibold text-gray-800">Crowdyflow</span> Agency</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;