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

      {/* Red Stylized Shape (SVG) - z-index to overlay parts of the background, but the content will be on top of it.*/}
      {/* It will be positioned to visually frame the content through its "opening". */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start z-10" // Lower z-index than content
        initial={{ opacity: 0, x: '-100%' }} // Animate from left
        animate={{ opacity: 1, x: '0%' }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
        style={{ pointerEvents: 'none' }} // Allow clicks to pass through
      >
        <svg
          className="absolute w-[180vw] h-[180vh] left-0 top-1/2 -translate-y-1/2 -translate-x-[40%]" // Adjusted size and position for the 'C' shape
          viewBox="0 0 1000 1000" // Increased viewBox for more flexibility
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.3))' }} // Shadow effect
        >
          {/* This path attempts to recreate the large, rounded, inverted 'C' or 'U' shape.
              It starts from the top-left, curves out, then in, then back out to bottom-left.
              The internal cutout for text is achieved by careful positioning of the text div relative to this shape.
              *** FOR PIXEL PERFECTION, THIS PATH NEEDS TO BE TRACED IN A GRAPHICS EDITOR (e.g., Figma, Illustrator). ***
              This is a challenging path to get exactly right without a visual tool.
          */}
          <path
            d="M0,0
               C 350,50 700,0 900,200
               C 1000,400 950,700 700,850
               C 450,1000 0,900 0,0 Z"
            fill="#DC2626" // Tailwind's red-600
            fillOpacity="1" // Ensure it's opaque
          />
        </svg>
      </motion.div>

      {/* Content (Video Play Icon and Text) - positioned on top of the background and visually within the SVG's opening */}
      <div className="absolute z-20 w-full h-full flex flex-col items-center justify-center text-white px-4 sm:px-8 md:px-16"
           style={{
             // Adjust these 'left' and 'transform' values to position the content correctly
             // It needs to appear to the right of the SVG's main body, within its opening
             left: '50%',
             top: '50%',
             transform: 'translate(-20%, -50%)', // Fine-tune this positioning for the opening
             maxWidth: '600px', // Constrain width of content
             pointerEvents: 'none', // Allow clicks to pass through except for the button
           }}
      >
        {/* Video Play Icon - positioned above the text, centered */}
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
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          We make your <br /> corporate brand ideation
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-xl mx-auto text-center" // mx-auto to center text block
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Unlocking performance excellence for thriving work forces for generations.
        </motion.p>
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