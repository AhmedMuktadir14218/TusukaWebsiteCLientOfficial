import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Added FaPause
import { FiSettings } from 'react-icons/fi';

// Import your banner video
import banVideo from '../assets/TusukaBanner.mp4';

const videoUrl = banVideo;

const HeroBanner2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingBackgroundVideo, setIsPlayingBackgroundVideo] = useState(true); // Initial state: playing
  const backgroundVideoRef = useRef<HTMLVideoElement>(null); // Ref to control the background video

  // Effect to control background video play/pause
  useEffect(() => {
    if (backgroundVideoRef.current) {
      if (isPlayingBackgroundVideo) {
        backgroundVideoRef.current.play().catch(error => {
          console.error("Autoplay prevented:", error);
          // This catch block handles cases where autoplay is prevented by browsers.
          // For initial load, setting muted and playsInline is crucial.
          // If it still fails, it means user interaction is needed.
          setIsPlayingBackgroundVideo(false); // Set to paused if play fails
        });
      } else {
        backgroundVideoRef.current.pause();
      }
    }
  }, [isPlayingBackgroundVideo]);

  // Ensure video settings for autoplay on mount
  useEffect(() => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.muted = true; // Crucial for auto-play
      backgroundVideoRef.current.playsInline = true; // For iOS compatibility
      if (isPlayingBackgroundVideo) { // Only attempt to play if state indicates playing
         backgroundVideoRef.current.play().catch(error => {
           console.error("Initial autoplay prevented:", error);
           setIsPlayingBackgroundVideo(false); // Update state if autoplay fails
         });
      }
    }
  }, []); // Run once on component mount

  const toggleBackgroundVideoPlay = () => {
    setIsPlayingBackgroundVideo((prev) => !prev);
  };

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Video */}
      <video
        ref={backgroundVideoRef} // Assign ref to the video element
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100 blur-[2px] brightness-50"
        src={videoUrl}
        loop
        // autoPlay and muted/playsInline are handled in useEffect for better control
      >
        Your browser does not support the video tag.
      </video>

      {/* Main Content Area - Box with Text, positioned to the left */}
      <div className="absolute inset-0 flex items-center justify-start z-10 px-4 sm:px-8"> {/* Changed justify-end to justify-start */}
        <div className="relative max-w-[950px] w-full text-center">
          {/* Red Background Shape (reverted to original style and position) */}
          <div
            className="absolute -top-16 -left-16 right-0 bottom-0 bg-[#E32E2E] -z-10 opacity-60 brightness-100 hidden md:block" // Hidden on mobile, block on md and up
            style={{
              mixBlendMode: 'multiply',
              // Use JS for responsive border-radius as a fallback to ensure override
              borderRadius: '0 100% 50% 50% / 0 0 100% 100%',
              // Explicitly set height based on your previous request for increased size
              height: 'clamp(400px, 55vh, 600px)', // Fixed height for desktop
              width: 'clamp(500px, 80vw, 900px)', // Fixed width for desktop
              left: '50%', // Center horizontally
              transform: 'translateX(-50%)', // Center horizontally
            }}
          >
          </div>

          {/* Text and Play/Pause Button - Positioned within the red shape area conceptually */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-0"
               style={{ minHeight: '400px' }}> {/* Adjust minHeight as needed for vertical alignment */}
            {/* Custom Play/Pause Button for Background Video */}
            <motion.div
              className="mb-8 inline-block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <button
                className="bg-white text-red-600 p-6 rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={toggleBackgroundVideoPlay} // Toggles background video
              >
                {isPlayingBackgroundVideo ? (
                  <FaPause className="text-2xl" />
                ) : (
                  <FaPlay className="text-2xl" />
                )}
              </button>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-[#FEF2ED] font-BeatriceTRIAL_semibold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              From Bangladesh to the World – Quality <br />You Can Count On.
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              className="text-[#FEF2ED] max-w-2xl mx-auto text-base sm:text-lg font-oaksans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              Tusuka: Engineered for Efficiency, Designed for the Future.
            </motion.p>
          </div>
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
        <FiSettings className="h-6 w-6 animate-spin-slow " />
      </div>

      {/* Video Modal (This is for the play button, which still opens the video) */}
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
                // autoPlay // Removed autoPlay here so it only plays when modal opens
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