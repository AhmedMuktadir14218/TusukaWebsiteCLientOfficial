import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import banVideo from '../assets/TusukaBanner.mp4';

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
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end z-10 px-4 sm:px-8">
        <div 
          className="relative w-full max-w-xl lg:max-w-2xl 
          bg-[#040270] bg-opacity-80 
          rounded-xl 
          p-8 md:p-10 lg:p-12 
          text-center 
          lg:mr-12 xl:mr-24 
          shadow-2xl 
          backdrop-blur-sm"
        >
          {/* Content Inside the Box */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Play/Pause Button */}
            <motion.div
              className="mb-6 inline-block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={toggleBackgroundVideoPlay}
              >
                {isPlayingBackgroundVideo ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaPlay className="text-xl" />
                )}
              </button>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-white font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              From Bangladesh to the World – <br />Quality You Can Count On.
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              className="text-gray-200 max-w-xl mx-auto text-base font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Tusuka: Engineered for Efficiency, Designed for the Future.
            </motion.p>

            {/* Watch Corporate Video Button */}
            <motion.div
              className="mt-6 inline-block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <button
                className="bg-red-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                Watch Corporate Video
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Fixed Social Media Icons */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 p-4 hidden md:flex flex-col space-y-4 bg-white/80 rounded-r-lg shadow-lg z-40">
        <span className="transform -rotate-90 origin-bottom-left absolute top-1/2 left-0 -translate-x-1/2 translate-y-1/2 text-sm text-gray-500 font-semibold uppercase tracking-widest">
          Follow Us
        </span>
        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
          <a key={index} href="#" className="text-gray-600 hover:text-red-600 transition-colors">
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>

      {/* Fixed Settings Icon */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 p-4 bg-gray-800 text-[#FEF2ED] rounded-l-lg shadow-lg z-40 cursor-pointer opacity-50">
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
  );
};

export default HeroBanner2;