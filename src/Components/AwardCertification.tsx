import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import certificate images
import CF1 from '../assets/Award&Certificate/CF1.jpg';
import CF2 from '../assets/Award&Certificate/CF2.png';
import CF3 from '../assets/Award&Certificate/CF3.png';
import CF4 from '../assets/Award&Certificate/CF4.gif';
import CF5 from '../assets/Award&Certificate/CF5.gif';
import CF6 from '../assets/Award&Certificate/CF6.jpg';

const AwardCertification: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of certificate images
  const certificates = [
    { image: CF1, title: 'Certificate 1' },
    { image: CF2, title: 'Certificate 2' },
    { image: CF3, title: 'Certificate 3' },
    { image: CF4, title: 'Certificate 4' },
    { image: CF5, title: 'Certificate 5' },
    { image: CF6, title: 'Certificate 6' }
  ];

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5 
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Awards & Certifications
          </h2>
          <p className="text-gray-600 mt-4">
            Our commitment to excellence recognized globally
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Main Slider */}
          <motion.div 
            className="flex items-center justify-center space-x-4 md:space-x-8"
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                variants={slideVariants}
                initial="hidden"
                animate={index === activeIndex ? "visible" : "hidden"}
                whileHover="hover"
                className={`
                  transition-all duration-300 
                  ${index === activeIndex 
                    ? 'w-64 md:w-80 lg:w-96 z-20' 
                    : 'w-56 md:w-72 lg:w-84 opacity-50 z-10'}
                `}
                onClick={() => handleImageClick(index)}
              >
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-auto object-cover rounded-lg shadow-lg cursor-pointer"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {certificates.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleImageClick(index)}
                className={`
                  h-3 w-3 rounded-full transition-all duration-300
                  ${index === activeIndex 
                    ? 'bg-[#040270] w-8' 
                    : 'bg-gray-300'}
                `}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardCertification;