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
      {/* Background Image Slider */}
      <AnimatePresence initial={false} custom={currentImageIndex}>
        <motion.img
          key={currentImageIndex}
          src={bannerImages[currentImageIndex]}
          alt="Banner Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Overlay for the red shape. We'll use a larger div and adjust its border-radius and position */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-red-600 mix-blend-multiply shadow-2xl" // Apply mix-blend-mode and shadow directly
        initial={{ opacity: 0, x: '-100%' }} // Animate from left
        animate={{ opacity: 1, x: '0%' }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
        style={{
          // Apply the border-radius logic here. This creates the specific half-ellipse shape.
          // The percentages refer to the width and height of the element respectively.
          borderBottomRightRadius: '100% 100%', // Equivalent to 100% 100%
          borderBottomLeftRadius: '50% 100%', // Equivalent to 50% 100%
          borderTopRightRadius: '0% 0%', // Default 0
          borderTopLeftRadius: '0% 0%', // Default 0

          // Crucial for positioning the "half" on the screen and revealing it
          // You might need to fine-tune these 'transform' values based on your exact image look
          transform: 'translateY(-20%) translateX(-40%) scaleX(1.5)', // Push up, push left, stretch horizontally
          width: 'clamp(800px, 120vw, 1500px)', // Make it very wide
          height: 'clamp(600px, 100vh, 1000px)', // Make it very tall
          left: '0', // Position it from the left
          top: '0', // Position it from the top
          pointerEvents: 'none', // Allow clicks to pass through to elements below
          // Adjust 'transform' origin if needed for custom animation behavior
          transformOrigin: 'left center',
        }}
      >
        {/* The content will be placed outside this div, but visually on top of it */}
      </motion.div>

      {/* Content (Text and Play Button) - positioned relative to the whole banner */}
      <div className="absolute z-20 text-white w-full px-4 sm:px-8 md:px-16 text-center"
           style={{
             // Position content to align with the visible part of the red shape
             left: '50%',
             top: '50%',
             transform: 'translate(-30%, -50%)', // Adjust these to place content over the red shape
             maxWidth: '600px', // Constrain width of content
             margin: '0 auto', // Center horizontally within its space
             pointerEvents: 'none', // Allow clicks to pass through unless on the button
           }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          We make your <br /> corporate brand ideation
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Unlocking performance excellence for thriving work forces for generations.
        </motion.p>
        <motion.button
          className="bg-white text-red-600 p-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 pointer-events-auto"
          onClick={() => setIsModalOpen(true)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <FaPlay className="text-xl sm:text-2xl" />
        </motion.button>
      </div>

      {/* Fixed Social Media Icons */}
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

      {/* Fixed Settings Icon */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 p-4 bg-gray-800 text-white rounded-l-lg shadow-lg z-40 cursor-pointer">
        <FiSettings className="h-6 w-6 animate-spin-slow" />
      </div>

      {/* Slider Navigation Arrows */}
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

      {/* Video Modal */}
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