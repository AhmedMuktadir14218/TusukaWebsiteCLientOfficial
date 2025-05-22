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
        // Only play if not already playing and explicitly set to play
        backgroundVideoRef.current.play().catch(error => {
          console.error("Autoplay/Play prevented:", error);
          // If play fails (e.g., due to user interaction policies), set state to paused
          setIsPlayingBackgroundVideo(false);
        });
      } else {
        backgroundVideoRef.current.pause();
      }
    }
  }, [isPlayingBackgroundVideo]);

  // Initial setup for background video on component mount
  useEffect(() => {
    if (backgroundVideoRef.current) {
      // Ensure video is muted and plays inline for consistent autoplay behavior
      backgroundVideoRef.current.muted = true;
      backgroundVideoRef.current.playsInline = true;

      // Attempt to autoplay initially
      backgroundVideoRef.current.play().catch(error => {
        console.warn("Initial autoplay prevented, user interaction required:", error);
        setIsPlayingBackgroundVideo(false); // Set to paused if initial autoplay fails
      });
    }
  }, []); // Runs only once on mount

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
        loop // Video will loop continuously
        // autoPlay and muted/playsInline handled in useEffect for better control
      >
        Your browser does not support the video tag.
      </video>

      {/* Banner Content Area with Red Shape */}
      {/* Positioned on the left side */}
      <div className="absolute inset-0 flex items-center justify-start z-10 px-4 sm:px-8"> {/* Changed justify-end to justify-start */}
        <div
          className="relative max-w-sm md:max-w-md lg:max-w-lg w-full text-center py-16 md:py-20 lg:py-24" // Added responsive padding
          style={{
            // Previous red background shape styling
            backgroundColor: '#E32E2E', // Red color
            opacity: 0.6, // Opacity
            mixBlendMode: 'multiply', // Blend mode
            // Adjust dimensions and border-radius for the shape
            borderRadius: '0 100% 50% 50% / 0 0 100% 100%',
            height: 'clamp(400px, 55vh, 600px)', // Maintain height
            width: 'clamp(300px, 80vw, 500px)', // Adjust width for the left side
            marginLeft: 'auto', // Push it right within the flex container
            marginRight: '1rem', // Space from left edge
            // Positioning within its flex container (which is items-center, justify-start)
            // No absolute positioning on this div itself, rely on flexbox
          }}
        >
          {/* Content inside the red shape */}
          <div className="relative z-20 text-white"> {/* Ensure text is on top and white */}
            {/* Play/Pause Button for Background Video */}
            <motion.div
              className="mb-6 inline-block"
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
              className="font-BeatriceTRIAL_semibold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              From Bangladesh to the World – Quality <br />You Can Count On.
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              className="max-w-xl mx-auto text-base sm:text-lg font-oaksans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              Tusuka: Engineered for Efficiency, Designed for the Future.
            </motion.p>

            {/* "Watch Corporate Video" button for Modal */}
            <motion.div
               className="mt-6 inline-block"
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1.2, duration: 0.5 }}
            >
               <button
                 className="bg-white text-red-600 py-3 px-8 rounded-full shadow-lg hover:bg-red-700 hover:text-white transition-colors"
                 onClick={() => setIsModalOpen(true)} // Opens the video modal
               >
                 Watch Corporate Video
               </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fixed Social Media Icons (remains unchanged) */}
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

      {/* Fixed Settings Icon (remains unchanged) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 p-4 bg-gray-800 text-[#FEF2ED] rounded-l-lg shadow-lg z-40 cursor-pointer opacity-50">
        <FiSettings className="h-6 w-6 animate-spin-slow " />
      </div>

      {/* Video Modal (remains unchanged) */}
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