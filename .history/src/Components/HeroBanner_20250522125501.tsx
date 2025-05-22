// import React, { useState, useEffect } from 'react'; 
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaPlay, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
// import { FiSettings } from 'react-icons/fi';
// import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

// import image1 from '../assets/homeban11.webp';
// import image2 from '../assets/homeban22.webp';
// import image3 from '../assets/homeban33.webp';
// import image4 from '../assets/homeban44.webp';
// import banVideo from '../assets/TusukaBanner.mp4';

// const bannerImages = [image1, image2, image3, image4];
// const videoUrl = banVideo;

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

//   // --- New useEffect hook for automatic banner change ---
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToNextImage();
//     }, 4000); // Change image every 4000 milliseconds (4 seconds)

//     // Cleanup function: Clear the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, [currentImageIndex]); // Re-run effect if currentImageIndex changes to restart timer

//   return (
//     <section className="relative w-full h-[85vh] overflow-hidden">
//       {/* Background Image */}
//       <AnimatePresence initial={false} custom={currentImageIndex}>
//         <motion.img
//           key={currentImageIndex}
//           src={bannerImages[currentImageIndex]}
//           alt="Banner Background"
//           className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100 blur-[2px] brightness-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8 }}
//         />
//       </AnimatePresence>

//       {/* Banner Content */}
//       <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-8">
//         <div className="relative max-w-[950px] w-full text-center pb-28 sm:pb-16">
//           {/* Red Background Shape */}
//           <div
//             className="absolute inset-x-0 top-0 bottom-0 bg-[#E32E2E] -z-10 opacity-60 brightness-100"
//             style={{
//               mixBlendMode: 'multiply',
//               // Use JS for responsive border-radius as a fallback to ensure override
//               borderRadius: window.innerWidth <= 767
//                 ? '0'
//                 : '0 100% 50% 50% / 0 0 100% 100%',
//               // Explicitly set height based on your previous request for increased size
//               height: window.innerWidth <= 767 ? '50vh' : 'clamp(400px, 55vh, 600px)',
//               width: window.innerWidth <= 767 ? '90vw' : 'clamp(500px, 80vw, 900px)',
//               left: '50%', // Center horizontally
//               transform: 'translateX(-50%)', // Center horizontally
//               // Remove the 'top-0' and 'bottom-0' and rely on height/flex centering for the parent
//             }}
//           >
//           </div>

//           {/* Play Button */}
//           <motion.div
//             className="mb-8 inline-block"
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 1.2, duration: 0.5 }}
//           >
//             <button
//               className="bg-white text-red-600 p-6 rounded-full shadow-lg hover:scale-110 transition-transform"
//               onClick={() => setIsModalOpen(true)}
//             >
//               <FaPlay className="text-2xl" />
//             </button>
//           </motion.div>

//           {/* Heading */}
//           <motion.h2
//             className="text-[#FEF2ED] font-BeatriceTRIAL_semibold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.4, duration: 0.8 }}
//           >
//             We make your <br /> corporate brand ideation
//           </motion.h2>

//           {/* Paragraph */}
//           <motion.p
//             className="text-[#FEF2ED] max-w-2xl mx-auto text-base sm:text-lg font-oaksans"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.6, duration: 0.8 }}
//           >
//             Unlocking performance excellence for thriving work forces for generations.
//           </motion.p>
//         </div>
//       </div>

//       {/* Social Icons */}
//       <div className="fixed left-0 top-1/2 -translate-y-1/2 p-4 hidden md:flex flex-col space-y-4 bg-white/80 rounded-r-lg shadow-lg z-40">
//         <span className="transform -rotate-90 origin-bottom-left absolute top-1/2 left-0 -translate-x-1/2 translate-y-1/2 text-sm text-gray-500 font-semibold uppercase tracking-widest">
//           Follow Us
//         </span>
//         {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
//           <a key={index} href="#" className="text-gray-600 hover:text-red-600 transition-colors">
//             <Icon className="h-5 w-5" />
//           </a>
//         ))}
//       </div>

//       {/* Settings Icon */}
//       <div className="fixed right-0 top-1/2 -translate-y-1/2 p-4 bg-gray-800 text-[#FEF2ED] rounded-l-lg shadow-lg z-40 cursor-pointer opacity-50">
//         <FiSettings className="h-6 w-6 animate-spin-slow " />
//       </div>

//       {/* Arrow Navigation */}
//       <div className="absolute bottom-8 right-8 flex space-x-4 z-30">
//         <button
//           onClick={goToPreviousImage}
//           className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700"
//         >
//           <MdArrowBackIos className="h-5 w-5" />
//         </button>
//         <button
//           onClick={goToNextImage}
//           className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700"
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
//             onClick={() => setIsModalOpen(false)}
//           >
//             <motion.div
//               className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
//               initial={{ scale: 0.8, y: 50 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.8, y: 50 }}
//               onClick={(e) => e.stopPropagation()}
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
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

// Correctly import images and video
import image1 from '../assets/homeban11.webp';
import image2 from '../assets/homeban22.webp';
import image3 from '../assets/homeban33.webp';
import image4 from '../assets/homeban44.webp';
import banVideo from '../assets/TusukaBanner.mp4';

const bannerImages = [image1, image2, image3, image4];
const videoUrl = banVideo;

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

  // Effect for automatic banner image change
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextImage();
    }, 4000); // Change image every 4000 milliseconds (4 seconds)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentImageIndex]); // Re-run effect if currentImageIndex changes to restart timer

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Image Slider */}
      <AnimatePresence initial={false} custom={currentImageIndex}>
        <motion.img
          key={currentImageIndex}
          src={bannerImages[currentImageIndex]}
          alt="Banner Background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100 blur-[2px] brightness-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Banner Content Area */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-8">
        <div className="relative max-w-[950px] w-full text-center pb-28 sm:pb-16">
          {/* Red Background Shape */}
          <div
            className="absolute inset-x-0 top-0 bottom-0 bg-[#E32E2E] -z-10 opacity-60 brightness-100"
            style={{
              mixBlendMode: 'multiply',
              // Use JS for responsive border-radius as a fallback to ensure override
              borderRadius: window.innerWidth <= 767
                ? '0'
                : '0 100% 50% 50% / 0 0 100% 100%',
              // Explicitly set height based on your previous request for increased size
              height: window.innerWidth <= 767 ? '50vh' : 'clamp(400px, 55vh, 600px)',
              width: window.innerWidth <= 767 ? '90vw' : 'clamp(500px, 80vw, 900px)',
              left: '50%', // Center horizontally
              transform: 'translateX(-50%)', // Center horizontally
            }}
          >
          </div>

          {/* Play Button */}
          <motion.div
            className="mb-8 inline-block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <button
              className="bg-white text-red-600 p-6 rounded-full shadow-lg hover:scale-110 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlay className="text-2xl" />
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
            transition={{ delay: 1., duration: 0.8 }}
          >
            Tusuka: Engineered for Efficiency, Designed for the Future.
          </motion.p>
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

      {/* Slider Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex space-x-4 z-30">
        <button
          onClick={goToPreviousImage}
          className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700"
        >
          <MdArrowBackIos className="h-5 w-5" />
        </button>
        <button
          onClick={goToNextImage}
          className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700"
        >
          <MdArrowForwardIos className="h-5 w-5" />
        </button>
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

export default HeroBanner;