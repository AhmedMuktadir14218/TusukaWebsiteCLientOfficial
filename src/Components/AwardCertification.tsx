import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Import certificate images
import CF1 from '../assets/Award&Certificate/CF1.jpg';
import CF2 from '../assets/Award&Certificate/CF2.png';
import CF3 from '../assets/Award&Certificate/CF3.png';
import CF4 from '../assets/Award&Certificate/CF4.gif';
import CF5 from '../assets/Award&Certificate/CF5.gif';
import CF6 from '../assets/Award&Certificate/CF6.jpg';
import CF7 from '../assets/Award&Certificate/CF2.png';
import CF8 from '../assets/Award&Certificate/CF3.png';

const AwardCertification: React.FC = () => {
  const certificates = [
    { image: CF1, title: 'Certificate 1' },
    { image: CF2, title: 'Certificate 2' },
    { image: CF3, title: 'Certificate 3' },
    { image: CF4, title: 'Certificate 4' },
    { image: CF5, title: 'Certificate 5' },
    { image: CF6, title: 'Certificate 6' },
    { image: CF7, title: 'Certificate 7 (Example)' },
    { image: CF8, title: 'Certificate 8 (Example)' },
  ];

  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      const childNodes = Array.from(trackRef.current.children);
      const widthOfOneSet = childNodes
        .slice(0, certificates.length)
        .reduce((acc, childNode) => {
          const child = childNode as HTMLElement;
          return acc + child.offsetWidth;
        }, 0);

      setSingleSetWidth(widthOfOneSet);
    }
  }, [certificates.length]);

  useEffect(() => {
    if (singleSetWidth > 0) {
      const animationDefinition = {
        x: [0, -singleSetWidth],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: certificates.length * 5, // Slower by default
            ease: 'linear',
          },
        },
      };

      if (isHovered) {
        controls.stop();
      } else {
        controls.start(animationDefinition);
      }
    }
    return () => {
      controls.stop();
    };
  }, [isHovered, controls, singleSetWidth, certificates.length]);

  const duplicatedCertificates = [...certificates, ...certificates];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 relative inline-block pb-2">
            Awards & Certifications
            <span className="block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#040270] rounded-full"></span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our commitment to excellence has been recognized globally through these prestigious awards and certifications.
          </p>
        </div>

        <div
          className="w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            ref={trackRef}
            className="flex"
            animate={controls}
          >
            {duplicatedCertificates.map((cert, index) => (
              <motion.div
                key={`${cert.title}-${index}`}
                className="flex-shrink-0 mx-4 p-4 cursor-pointer"
                onClick={() => window.open(cert.image, '_blank', 'noopener,noreferrer')}
                whileHover={{
                  scale: 1.1,
                  zIndex: 10,
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
                }}
                style={{ transition: 'transform 0.3s ease' }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden w-56 md:w-72 lg:w-80">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-36 md:h-48 lg:h-56 w-full object-contain p-2 bg-gray-100"
                  />
                  {/* <p className="text-center text-sm md:text-base p-2 text-gray-700 truncate" title={cert.title}>
                    {cert.title}
                  </p> */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AwardCertification;




// import React, { useState, useEffect, useCallback } from 'react';
// import { motion } from 'framer-motion';

// // Import certificate images
// import CF1 from '../assets/Award&Certificate/CF1.jpg';
// import CF2 from '../assets/Award&Certificate/CF2.png';
// import CF3 from '../assets/Award&Certificate/CF3.png';
// import CF4 from '../assets/Award&Certificate/CF4.gif';
// import CF5 from '../assets/Award&Certificate/CF5.gif';
// import CF6 from '../assets/Award&Certificate/CF6.jpg';
// import CF7 from '../assets/Award&Certificate/CF2.png';
// import CF8 from '../assets/Award&Certificate/CF3.png';

// const AwardCertification: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const autoPlayInterval = 2000; // 3 seconds between slides

//   // Array of certificate images
//   const certificates = [
//     { image: CF1, title: 'Certificate 1' },
//     { image: CF2, title: 'Certificate 2' },
//     { image: CF3, title: 'Certificate 3' },
//     { image: CF4, title: 'Certificate 4' },
//     { image: CF5, title: 'Certificate 5' },
//     { image: CF6, title: 'Certificate 6' },
    
//     { image: CF7, title: 'Certificate 7' },
//     { image: CF8, title: 'Certificate 8' },
//   ];

//   // Handle automatic sliding
//   const moveToNextSlide = useCallback(() => {
//     setActiveIndex((prevIndex) => 
//       prevIndex === certificates.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [certificates.length]);

//   // Set up automatic sliding
//   useEffect(() => {
//     let slideInterval: ReturnType<typeof setInterval>;
    
//     if (isAutoPlaying) {
//       slideInterval = setInterval(() => {
//         moveToNextSlide();
//       }, autoPlayInterval);
//     }
    
//     return () => {
//       if (slideInterval) clearInterval(slideInterval);
//     };
//   }, [isAutoPlaying, moveToNextSlide]);

//   // Pause autoplay when user interacts
//   const pauseAutoPlay = () => {
//     setIsAutoPlaying(false);
//     // Resume after 8 seconds of inactivity
//     setTimeout(() => setIsAutoPlaying(true), 8000);
//   };

//   const handlePrev = () => {
//     pauseAutoPlay();
//     setActiveIndex((prevIndex) =>
//       prevIndex === 0 ? certificates.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     pauseAutoPlay();
//     moveToNextSlide();
//   };

//   const handleImageClick = (index: number) => {
//     pauseAutoPlay();
//     if (index === activeIndex) {
//       // If the clicked image is the active one, open it in a new tab
//       window.open(certificates[index].image, '_blank');
//     } else {
//       // Otherwise, make it the active image
//       setActiveIndex(index);
//     }
//   };

//   const slideVariants = {
//     // State for non-active certificates
//     inactive: { 
//       opacity: 0.5, 
//       scale: 0.8, 
//       filter: 'blur(1px)',
//       transition: { 
//         duration: 0.5, 
//         ease: 'easeInOut' 
//       } 
//     },
//     // State for the active certificate
//     active: { 
//       opacity: 1, 
//       scale: 1, 
//       filter: 'blur(0px)',
//       transition: { 
//         duration: 0.5, 
//         ease: 'easeInOut' 
//       } 
//     },
//     // Hover state for all certificates
//     hover: { 
//       scale: 1.03,
//       boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
//       transition: { 
//         duration: 0.2 
//       } 
//     }
//   };

//   return (
//     <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 relative inline-block pb-2">
//             Awards & Certifications
//             <span className="block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#040270] rounded-full"></span>
//           </h2>
//           <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
//             Our commitment to excellence has been recognized globally through these prestigious awards and certifications.
//           </p>
//         </div>

//         <div className="relative w-full flex items-center justify-center min-h-[300px] md:min-h-[400px]">
//           {/* Previous Button */}
//           <motion.button
//             onClick={handlePrev}
//             className="absolute left-4 md:left-8 z-30 p-3 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#040270] transition-all duration-300"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             aria-label="Previous certificate"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </motion.button>

//           {/* Certificates Slider */}
//           <div className="flex items-center justify-center space-x-4 md:space-x-8 max-w-full">
//             {certificates.map((cert, index) => {
//               const position = (index - activeIndex + certificates.length) % certificates.length;
//               const isActive = index === activeIndex;
              
//               return (
//                 <motion.div
//                   key={index}
//                   variants={slideVariants}
//                   animate={isActive ? "active" : "inactive"}
//                   whileHover="hover"
//                   className={`
//                     relative rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300
//                     ${isActive
//                       ? 'w-64 md:w-80 lg:w-[450px] z-20 border-4 border-[#040270]'
//                       : 'w-48 md:w-64 lg:w-80 z-10 border border-gray-200'}
//                   `}
//                   onClick={() => handleImageClick(index)}
//                   style={{ willChange: 'transform, opacity, filter' }}
//                 >
//                   <img 
//                     src={cert.image} 
//                     alt={cert.title}
//                     className="w-full h-full object-contain bg-white"
//                   />
//                   {isActive && (
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-center rounded-b-lg">
//                       <p className="font-semibold text-lg">{cert.title}</p>
//                       <p className="text-sm opacity-80 mt-1">Click to view full size</p>
//                     </div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Next Button */}
//           <motion.button
//             onClick={handleNext}
//             className="absolute right-4 md:right-8 z-30 p-3 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#040270] transition-all duration-300"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             aria-label="Next certificate"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </motion.button>
//         </div>

//         {/* Navigation Dots and Auto-play Controls */}
//         <div className="flex flex-col items-center mt-8">
//           <div className="flex justify-center space-x-2 mb-4">
//             {certificates.map((_, index) => (
//               <motion.button
//                 key={index}
//                 onClick={() => {
//                   pauseAutoPlay();
//                   setActiveIndex(index);
//                 }}
//                 className={`
//                   h-3 w-3 rounded-full transition-all duration-300
//                   ${index === activeIndex 
//                     ? 'bg-[#040270] w-8' 
//                     : 'bg-gray-300'}
//                 `}
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//                 aria-label={`Go to certificate ${index + 1}`}
//               />
//             ))}
//           </div>
          
//           {/* Auto-play toggle button */}
//           {/* <motion.button
//             onClick={() => setIsAutoPlaying(!isAutoPlaying)}
//             className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors
//               ${isAutoPlaying 
//                 ? 'bg-[#040270] text-white' 
//                 : 'bg-gray-200 text-gray-700'}
//             `}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {isAutoPlaying ? (
//               <>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Pause Slideshow
//               </>
//             ) : (
//               <>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Resume Slideshow
//               </>
//             )}
//           </motion.button> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AwardCertification;