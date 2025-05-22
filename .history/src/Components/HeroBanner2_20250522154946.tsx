import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Added FaPause
import { FiSettings } from 'react-icons/fi';
// MdArrowBackIos, MdArrowForwardIos are removed as there's no slider navigation
// import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

// Import your banner video
import banVideo from '../assets/TusukaBanner.mp4';

const videoUrl = banVideo;

const HeroBanner2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingBackgroundVideo, setIsPlayingBackgroundVideo] = useState(true); // New state for background video play/pause
  const backgroundVideoRef = useRef<HTMLVideoElement>(null); // Ref to control the background video

  useEffect(() => {
    // Control background video play/pause
    if (backgroundVideoRef.current) {
      if (isPlayingBackgroundVideo) {
        backgroundVideoRef.current.play();
      } else {
        backgroundVideoRef.current.pause();
      }
    }
  }, [isPlayingBackgroundVideo]);

  // Handle auto-play on load (ensure muted for auto-play best practice)
  useEffect(() => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.muted = true; // Ensure it's muted for auto-play
      backgroundVideoRef.current.playsInline = true; // For iOS
      backgroundVideoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
        // Fallback or user instruction if autoplay fails
        setIsPlayingBackgroundVideo(false); // Set to false if autoplay didn't work
      });
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
        // autoPlay and muted/playsInline handled in useEffect for better control and fallback
      >
        Your browser does not support the video tag.
      </video>

      {/* Main Content Area - Now positioned on the right */}
      <div className="absolute inset-0 flex items-center justify-end z-10 px-4 sm:px-8">
        <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg bg-[#040270] -z-10 opacity-60 brightness-100 rounded-lg p-6 md:p-8 lg:p-10 text-center mr-0 md:mr-16 lg:mr-24 shadow-lg"> {/* Added right margin */}
          {/* Custom Play/Pause Button for Background Video */}
          <motion.div
            className="mb-6 inline-block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <button
              className="bg-red-600 text-white p-6 rounded-full shadow-lg hover:scale-110 transition-transform"
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
            className="text-gray-900 font-BeatriceTRIAL_semibold text-2xl sm:text-3xl md:text-4xl leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            From Bangladesh to the World – Quality <br />You Can Count On.
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            className="text-gray-700 max-w-xl mx-auto text-sm sm:text-base font-oaksans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Tusuka: Engineered for Efficiency, Designed for the Future.
          </motion.p>

          {/* Play Button for Modal Video - kept separate if you still need a separate button for the modal */}
          {/* You might want to move this or redesign how the modal is triggered if this button is redundant */}
          <motion.div
             className="mt-6 inline-block" // Adjusted margin-top
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 1.2, duration: 0.5 }}
          >
             <button
               className="bg-red-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-colors"
               onClick={() => setIsModalOpen(true)} // Opens the video modal
             >
               Watch Corporate Video
             </button>
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
        <FiSettings className="h-6 w-6 animate-spin-slow " />
      </div>

      {/* Slider Navigation Arrows - Permanently removed as there's no image slider */}
      {/* Video Modal (This remains the same for the separate "Watch Corporate Video" button) */}
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