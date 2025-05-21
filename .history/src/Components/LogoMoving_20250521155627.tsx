import React from 'react';
import { motion } from 'framer-motion';

// Import your logo images
// Make sure these paths are correct relative to this component's location
import logo1 from '../assets/logo1.png'; // Replace with your actual logo file names
import logo2 from '../assets/logo1.png';
import logo3 from '../assets/logo1.png';
import logo4 from '../assets/logo4.webp';
import logo5 from '../assets/logo5.webp';
import logo6 from '../assets/logo6.webp';
import logo7 from '../assets/logo7.webp';
import logo8 from '../assets/logo1.png';
import logo9 from '../assets/logo1.png';


const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  // Add all your logo imports here
];

const LogoMoving: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 overflow-hidden relative">
      <div className="container mx-auto flex items-center justify-start border-l border-r border-gray-300 py-6 px-4 md:px-8">
        <div className="w-1/4 pr-8 hidden md:block"> {/* Left text section */}
          <div className="border-l-4 border-red-600 pl-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 leading-tight">
              Worked with world's <br /> famous brands and <br /> partners
            </h3>
          </div>
        </div>

        <div className="flex-1 overflow-hidden"> {/* Right scrolling logos section */}
          <div className="whitespace-nowrap animate-scroll-right flex items-center">
            {/* Render logos and duplicate them for seamless scrolling */}
            {[...logos, ...logos].map((logo, index) => ( // Duplicate logos
              <div key={index} className="inline-block mx-8 sm:mx-12 lg:mx-16 flex-shrink-0">
                <img src={logo} alt={`Client Logo ${index}`} className="h-12 md:h-16 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind CSS keyframes for the scrolling animation */}
      <style>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%); /* Start halfway back to hide the jump */
          }
          100% {
            transform: translateX(0%); /* Scroll to the start */
          }
        }
        .animate-scroll-right {
          animation: scrollRight 40s linear infinite; /* Adjust duration as needed */
        }
      `}</style>
    </section>
  );
};

export default LogoMoving;