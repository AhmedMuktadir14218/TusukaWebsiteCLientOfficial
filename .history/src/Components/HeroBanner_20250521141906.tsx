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
      {/* Background Image Slider (z-index 0) */}
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

      {/* Main Content Area - This will contain the red background and the text/video icon */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="relative bg-[#B32424] shadow-xl flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 lg:p-16
                     rounded-none sm:rounded-none md:rounded-b-full lg:rounded-b-full" // Responsive border-radius
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
          style={{
            // // Increased default size for larger screens (lg and up)
            // width: 'clamp(500px, 80vw, 900px)', // Larger default width
            // height: 'clamp(400px, 55vh, 600px)', // Larger default height
            // // The borderRadius will be overridden by responsive classes where applicable
            // borderRadius: '0 0 50% 50% / 0 0 100% 100%', // Default for large screens (rounded bottom)
            // mixBlendMode: 'multiply',
            // transform: 'translate(-10%, -10%)', // Still slightly offset
            // pointerEvents: 'none',

            
  position: "absolute";
  content: "";
  width: "100%";
  height: "100%";
  background:" #E32E2E";
  mix-blend-mode: multiply;
  z-index: -1;
  bottom: 0;
  border-radius: 0 100% 50% 50%/0 0 100% 100%;

          }}
        >
          {/* Responsive overrides for smaller screens */}
          {/* For small screens (up to md breakpoint), make it more square.
              Using Tailwind's classes directly in className for this is better
              as style property is harder to make responsive.
          */}
          <style>{`
            @media (max-width: 767px) { /* Tailwing 'md' breakpoint is typically 768px */
              .banner-red-shape {
                border-radius: 0 !important; /* Force square on small screens */
                width: 90vw !important; /* Make it almost full width */
                height: 50vh !important; /* Adjust height */
              }
            }
          `}</style>
          {/* Apply a class to the element that can be targeted by the style tag */}
          <div className="banner-red-shape w-full h-full flex flex-col items-center justify-center">
            {/* Content (Video Play Icon and Text) - positioned inside the red background */}
            <div className="relative text-white text-center w-full max-w-lg mx-auto" style={{ pointerEvents: 'auto' }}>
              {/* Video Play Icon - positioned above the text, centered */}
              <motion.button
                className="bg-white text-red-600 p-5 sm:p-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 mb-6 sm:mb-8"
                onClick={() => setIsModalOpen(true)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <FaPlay className="text-xl sm:text-2xl" />
              </motion.button>

              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                We make your <br /> corporate brand ideation
              </motion.h1>
              <motion.p
                className="text-sm sm:text-base md:text-lg max-w-xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Unlocking performance excellence for thriving work forces for generations.
              </motion.p>
            </div>
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


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaPlay } from 'react-icons/fa';
// import { FiSettings } from 'react-icons/fi';
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
// import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
// import image1 from '../assets/homeban11.webp';
// import image2 from '../assets/homeban22.webp';
// import image3 from '../assets/homeban33.webp';
// import image4 from '../assets/homeban44.webp';
// import banVideo from '../assets/TusukaBanner.mp4';


// const bannerImages = [
//   '../assets/homeban11.webp', // Replace with your image paths
//   '../assets/homeban22.webp',
//   '../assets/homeban33.webp',
//   '../assets/homeban44.webp',
// ];

// const videoUrl = '../assets/TusukaBanner.mp4'; // Replace with your video path

// const HeroBanner: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const goToNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const goToPreviousImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       {/* Background Image Slider */}
//       <AnimatePresence initial={false} custom={currentImageIndex}>
//         <motion.img
//           key={currentImageIndex}
//           src={bannerImages[currentImageIndex]}
//           alt="Banner Background"
//           className="absolute inset-0 w-full h-full object-cover object-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8 }}
//         />
//       </AnimatePresence>

//       {/* Overlay with red shape and text */}
//       <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-white/0 flex items-center justify-center p-4 sm:p-8 md:p-16">
//         <div className="relative w-full h-full flex items-center justify-center">
//           {/* Red semi-circle / abstract shape */}
//           <motion.div
//             className="relative bg-red-600 rounded-b-full flex items-center justify-center p-8 sm:p-12 md:p-20 lg:p-32"
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
//             style={{
//               width: 'clamp(300px, 70vw, 800px)', // Responsive width
//               height: 'clamp(300px, 50vw, 800px)', // Responsive height
//               transform: 'translate(-20%, 0%)', // Adjust position
//               clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', // This makes it a full circle, adjust as needed
//             }}
//           >
//              {/* Content within the red shape */}
//              <div className="relative text-white text-center z-10 w-full px-4 flex flex-col items-center">
//               <motion.h1
//                 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1, duration: 0.8 }}
//               >
//                 We make your <br /> corporate brand ideation
//               </motion.h1>
//               <motion.p
//                 className="text-sm sm:text-base md:text-lg max-w-lg mb-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.2, duration: 0.8 }}
//               >
//                 Unlocking performance excellence for thriving work forces for generations.
//               </motion.p>
//               <motion.button
//                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-red-600 p-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
//                 onClick={() => setIsModalOpen(true)}
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 1.5, duration: 0.5 }}
//               >
//                 <FaPlay className="text-xl" />
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Fixed Social Media Icons */}
//       <div className="fixed left-0 top-1/2 -translate-y-1/2 p-4 hidden md:flex flex-col space-y-4 bg-white/80 rounded-r-lg shadow-lg z-40">
//         <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
//           <FaFacebookF className="h-5 w-5" />
//         </a>
//         <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
//           <FaTwitter className="h-5 w-5" />
//         </a>
//         <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
//           <FaLinkedinIn className="h-5 w-5" />
//         </a>
//         <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
//           <FaInstagram className="h-5 w-5" />
//         </a>
//       </div>

//       {/* Fixed Settings Icon */}
//       <div className="fixed right-0 top-1/2 -translate-y-1/2 p-4 bg-gray-800 text-white rounded-l-lg shadow-lg z-40 cursor-pointer">
//         <FiSettings className="h-6 w-6 animate-spin-slow" /> {/* Add a keyframe for spin-slow in your CSS */}
//       </div>

//       {/* Slider Navigation Arrows */}
//       <div className="absolute bottom-8 right-8 flex space-x-4 z-30">
//         <button
//           onClick={goToPreviousImage}
//           className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
//         >
//           <MdArrowBackIos className="h-5 w-5" />
//         </button>
//         <button
//           onClick={goToNextImage}
//           className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
//         >
//           <MdArrowForwardIos className="h-5 w-5" />
//         </button>
//       </div>

//       {/* Video Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsModalOpen(false)} // Close modal on overlay click
//           >
//             <motion.div
//               className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
//               initial={{ scale: 0.8, y: 50 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.8, y: 50 }}
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside video
//             >
//               <button
//                 className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-gray-300"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 &times;
//               </button>
//               <video
//                 className="w-full h-auto"
//                 src={videoUrl}
//                 controls
//                 autoPlay
//                 loop
//                 onEnded={() => setIsModalOpen(false)}
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default HeroBanner;