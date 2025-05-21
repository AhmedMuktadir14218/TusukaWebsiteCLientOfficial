import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

// Placeholder paths - YOU MUST REPLACE THESE WITH YOUR ACTUAL ASSET PATHS
const bannerImages = [
  '/src/assets/images/banner-1.jpg', // e.g., an image with people
  '/src/assets/images/banner-2.jpg',
  '/src/assets/images/banner-3.jpg',
];

const videoUrl = '/src/assets/videos/sample-video.mp4';

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

      {/* Subtle overlay (adjust opacity as needed) */}
      <div className="absolute inset-0 bg-white/40 md:bg-white/30 lg:bg-white/20"></div>

      {/* Red Half-Circle Container */}
      {/* This container will control the visible portion of the circle */}
      <div className="absolute inset-0 flex items-center justify-start overflow-hidden"> {/* Added overflow-hidden */}
        <motion.div
          className="relative bg-red-600 rounded-full shadow-2xl" // Apply shadow to the circle itself
          initial={{ scale: 0.7, opacity: 0, x: '-50%' }} // Start from further left, scale up
          animate={{ scale: 1, opacity: 1, x: '0%' }} // Animate to final position
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
          style={{
            width: 'clamp(700px, 120vw, 1500px)', // Make it very large to form a gentle curve
            height: 'clamp(700px, 120vw, 1500px)', // Keep height same as width for a perfect circle
            // Position it off-screen to the left to reveal only the right half/segment
            position: 'absolute',
            left: 'calc(-50% + 150px)', // Adjust 150px based on how much of the circle you want to show
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {/* Content (Text and Play Button) - positioned relative to the half-circle's visible area */}
          <div className="absolute text-white text-center w-full px-4 sm:px-8"
               style={{
                 top: '50%',
                 left: '50%',
                 transform: 'translate(-50%, -50%)',
                 // Adjust content position within the *visible* part of the circle
                 // This requires careful fine-tuning.
                 // For now, center it and allow it to be slightly off if the circle is huge.
               }}>
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
              className="bg-white text-red-600 p-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              onClick={() => setIsModalOpen(true)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <FaPlay className="text-xl sm:text-2xl" />
            </motion.button>
          </div>
        </motion.div>
      </div>

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