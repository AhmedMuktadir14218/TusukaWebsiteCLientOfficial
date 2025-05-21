import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

// Correctly import images and video
import image1 from '../assets/homeban11.webp';
import image2 from '../assets/homeban22.webp';
import image3 from '../assets/homeban33.webp';
import image4 from '../assets/homeban44.webp';
import banVideo from '../assets/TusukaBanner.mp4';


const bannerImages = [
  image1, // Use imported variables directly
  image2,
  image3,
  image4,
];

const videoUrl = banVideo; // Use imported variable

const HeroBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image Slider (lowest z-index implicitly) */}
      <AnimatePresence initial={false} custom={currentImageIndex}>
        <motion.img
          key={currentImageIndex}
          src={bannerImages[currentImageIndex]}
          alt="Banner Background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Content (Text and Play Button) - positioned behind the red shape but on top of background */}
      <div className="absolute z-10 text-white w-full px-4 sm:px-8 md:px-16 text-center flex flex-col items-center justify-center h-full"
           style={{
             // Adjust these to place content visually within the "cut-out" of the red shape
             left: '50%',
             top: '50%',
             transform: 'translate(-30%, -50%)', // Fine-tune this positioning
             maxWidth: '500px', // Constrain width of content
             // Ensure pointer events are active for the button, but not the general div
             pointerEvents: 'none',
           }}
      >
        {/* Video Play Icon - positioned above the text */}
        <motion.button
          className="bg-white text-red-600 p-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 mb-8 pointer-events-auto" // mb-8 for spacing
          onClick={() => setIsModalOpen(true)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <FaPlay className="text-xl sm:text-2xl" />
        </motion.button>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          We make your <br /> corporate brand ideation
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-xl mx-auto" // Removed mb-8 as button is now above
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Unlocking performance excellence for thriving work forces for generations.
        </motion.p>
      </div>

      {/* Red Stylized Shape (SVG) - positioned above content, creating the "cut-out" effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start z-10" // Z-index to be above content
        initial={{ opacity: 0, x: '-100%' }} // Animate from left
        animate={{ opacity: 1, x: '0%' }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
        style={{
          pointerEvents: 'none', // Allow clicks to pass through
        }}
      >
        <svg
          className="w-[150vw] h-[150vh] absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[20%]" // Larger size and position
          viewBox="0 0 1000 800" // Adjust viewBox to fit the path
          preserveAspectRatio="xMidYMid slice" // Scale uniformly but fill the container
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.3))' }} // Shadow effect
        >
          {/* This path is a refined approximation of the shape from the image.
              It forms the outer boundary of the red area.
              The 'cut-out' is achieved by the absence of red where the text/icon are.
              You will need to trace the exact shape in a graphics editor for pixel perfection.
          */}
          <path
            d="M0,0 C 300,50 600,0 750,100 C 900,200 950,500 850,650 C 750,800 400,800 200,700 C 50,600 0,300 0,0 Z"
            fill="#DC2626" // Tailwind's red-600
            fillOpacity="1" // Ensure it's opaque
          />
        </svg>
      </motion.div>

      {/* Fixed Social Media Icons (unchanged) */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 p-4 hidden md:flex flex-col space-y-4 bg-white/80 rounded-r-lg shadow-lg z-40">
        <span className="transform -rotate-90 origin-bottom-left absolute top-1/2 left-0 -translate-x-1/2 translate-y-1/2 text-sm text-gray-500 font-semibold uppercase tracking-widest">
          Follow Us
        </span>
        <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
          <FaFacebookF className="h-5 w-5" />
        </a>
        <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
          <FaTwitter className="h-5 w-5" />
        </a>
        <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
          <FaLinkedinIn className="h-5 w-5" />
        </a>
        <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
          <FaInstagram className="h-5 w-5" />
        </a>
      </div>

      {/* Fixed Settings Icon (unchanged) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 p-4 bg-gray-800 text-white rounded-l-lg shadow-lg z-40 cursor-pointer">
        <FiSettings className="h-6 w-6 animate-spin-slow" />
      </div>

      {/* Slider Navigation Arrows (unchanged) */}
      <div className="absolute bottom-8 right-8 flex space-x-4 z-30">
        <button
          onClick={goToPreviousImage}
          className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
        >
          <MdArrowBackIos className="h-5 w-5" />
        </button>
        <button
          onClick={goToNextImage}
          className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
        >
          <MdArrowForwardIos className="h-5 w-5" />
        </button>
      </div>

      {/* Video Modal (unchanged) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              <video
                className="w-full h-auto"
                src={videoUrl}
                controls
                autoPlay
                loop
                onEnded={() => setIsModalOpen(false)}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroBanner;