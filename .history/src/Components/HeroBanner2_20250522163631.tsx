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
          <div 
            className="relative w-full max-w-6xl mx-auto bg-black bg-opacity-30 
            rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Left Side - Text Content */}
              <motion.div 
                className="flex flex-col justify-center space-y-6 text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Heading */}
                <motion.h2
                  className="text-white font-BeatriceTRIAL_bold text-3xl sm:text-4xl md:text-5xl leading-tight"
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
                    className="bg-[#040270] text-white py-3 px-8 rounded-full 
                    shadow-lg hover:bg-opacity-90 transition-colors"
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
                    className="relative z-10 bg-[#040270] text-white p-6 md:p-8 lg:p-10 rounded-full 
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
        </div>

        {/* Rest of the component remains the same */}
        {/* Fixed Social Media Icons, Settings Icon, Video Modal */}
      </section>
      <LogoMoving />
    </div>
  );
};

export default HeroBanner2;