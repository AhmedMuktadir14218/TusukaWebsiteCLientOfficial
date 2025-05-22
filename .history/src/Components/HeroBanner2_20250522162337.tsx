import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import banVideo from '../assets/TusukaBanner.mp4';
import LogoMoving from './LogoMoving';

const videoUrl = banVideo;

const HeroBanner2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingBackgroundVideo, setIsPlayingBackgroundVideo] = useState(true);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (backgroundVideoRef.current) {
      if (isPlayingBackgroundVideo) {
        backgroundVideoRef.current.play();
      } else {
        backgroundVideoRef.current.pause();
      }
    }
  }, [isPlayingBackgroundVideo]);

  useEffect(() => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.muted = true;
      backgroundVideoRef.current.playsInline = true;
      backgroundVideoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
        setIsPlayingBackgroundVideo(false);
      });
    }
  }, []);

  const toggleBackgroundVideoPlay = () => {
    setIsPlayingBackgroundVideo((prev) => !prev);
  };

  return (
    <div>
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Video */}
      <video
        ref={backgroundVideoRef}
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100 blur-[2px] brightness-50"
        src={videoUrl}
        loop
      >
        Your browser does not support the video tag.
      </video>

      {/* Main Content Area - Refined Positioning */}
      <div className="absolute inset-0 flex items-center justify-start z-10 px-4 sm:px-8">
        <div className="bg-amber-500 p-9 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
          {/* Left Side - Text Content */}
          <motion.div 
            className="flex flex-col justify-center space-y-6 text-left pl-4 lg:pl-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Heading */}
            <motion.h2
              className="text-white font-BeatriceTRIAL_bold  text-3xl sm:text-4xl md:text-5xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              From Bangladesh to the World – <br />Quality You Can Count On.
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              className="text-gray-200 max-w-xl text-base font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Tusuka: Engineered for Efficiency, Designed for the Future.
            </motion.p>

            {/* Call to Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button
                className="bg-[#040270] opacity-40 text-white py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - Video Play Button with Glow Animation */}
          <motion.div 
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              className="relative group"
              onClick={toggleBackgroundVideoPlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-[#040270] bg-opacity-70 rounded-full animate-pulse"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Main Button */}
              <div 
                className="relative z-10 bg-[#040270] opacity-50 text-white p-6 md:p-8 lg:p-10 rounded-full 
                shadow-2xl group-hover:shadow-[#040270]/50 transition-all duration-300"
              >
                {isPlayingBackgroundVideo ? (
                  <FaPause className="text-2xl md:text-3xl lg:text-4xl" />
                ) : (
                  <FaPlay className="text-2xl md:text-3xl lg:text-4xl" />
                )}
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Fixed Social Media Icons */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 p-4 hidden md:flex flex-col space-y-4 bg-white/80 rounded-r-lg shadow-lg z-40">
        <span className="transform -rotate-90 origin-bottom-left absolute top-1/2 left-0 -translate-x-1/2 translate-y-1/2 text-sm text-gray-500 font-semibold uppercase tracking-widest">
          Follow Us
        </span>
        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
          <a 
            key={index} 
            href="#" 
            className="text-[#040270] hover:text-opacity-70 transition-colors"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>

      {/* Fixed Settings Icon */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 p-4 bg-[#040270] text-white rounded-l-lg shadow-lg z-40 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
        <FiSettings className="h-6 w-6 animate-spin-slow" />
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
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
    <LogoMoving></LogoMoving>
    </div>
  );
};

export default HeroBanner2;