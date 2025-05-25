import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import certificate images
import CF1 from '../assets/Award&Certificate/CF1.jpg';
import CF2 from '../assets/Award&Certificate/CF2.png';
import CF3 from '../assets/Award&Certificate/CF3.png';
import CF4 from '../assets/Award&Certificate/CF4.gif';
import CF5 from '../assets/Award&Certificate/CF5.gif';
import CF6 from '../assets/Award&Certificate/CF6.jpg';
import CF7 from '../assets/Award&Certificate/CF7.jpg';
import CF8 from '../assets/Award&Certificate/CF3.png';

// Certificate data
const certificates = [
  { image: CF1, title: 'Quality Assurance Certificate', description: 'Detailed description 1.' },
  { image: CF2, title: 'Environmental Compliance Award', description: 'Detailed description 2.' },
  { image: CF3, title: 'Safety Excellence Recognition', description: 'Detailed description 3.' },
  { image: CF4, title: 'Innovation in Technology', description: 'Detailed description 4.' },
  { image: CF5, title: 'Global Partnership Achievement', description: 'Detailed description 5.' },
  { image: CF6, title: 'Customer Service Distinction', description: 'Detailed description 6.' },
  { image: CF7, title: 'Ethical Business Practices', description: 'Detailed description 7.' },
  { image: CF8, title: 'Industry Leadership Award', description: 'Detailed description 8.' },
];

const WORD_LIMIT = 10;

const TruncatedDescription: React.FC<{ text: string }> = ({ text }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const words = text.split(' ');
  const isLong = words.length > WORD_LIMIT;
  const displayedText = showFullDescription ? text : words.slice(0, WORD_LIMIT).join(' ') + (isLong ? '...' : '');

  return (
    <div>
      <p className="text-gray-700 text-sm md:text-base">{displayedText}</p>
      {isLong && (
        <button
          onClick={() => setShowFullDescription((prev) => !prev)}
          className="text-[#040270] hover:text-[#030150] text-sm font-medium mt-1 focus:outline-none"
        >
          {showFullDescription ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

function AwardCertificationsPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % certificates.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? certificates.length - 1 : prevIndex - 1
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.03, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)" },
  };

  return (
    <div className=" py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className=" mt-9 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 relative inline-block pb-2">
            Awards & Certifications
            <span className="block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#040270] rounded-full"></span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Recognizing excellence in quality and innovation globally.
          </p>
        </div>

        <div className="mb-16 relative overflow-hidden rounded-xl shadow-2xl bg-white group">
          <div className="w-full h-72 md:h-96 lg:h-[500px] flex items-center justify-center relative">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlideIndex ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`absolute inset-0 flex items-center justify-center p-4 ${
                  index === currentSlideIndex ? 'z-10' : 'z-0'
                }`}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cursor-pointer max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  loading="lazy"
                  onClick={() => window.open(cert.image, '_blank', 'noopener,noreferrer')}
                />
              </motion.div>
            ))}
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full shadow-lg text-gray-800 
                      hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#040270]
                      opacity-0 group-hover:opacity-100 md:opacity-100"
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full shadow-lg text-gray-800 
                      hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#040270]
                      opacity-0 group-hover:opacity-100 md:opacity-100"
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {certificates.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentSlideIndex ? 'bg-[#040270] w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentSlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8 relative inline-block pb-2">
            Explore All Certifications
            <span className="block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#040270] rounded-full"></span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover="hover"
                onClick={() => window.open(cert.image, '_blank', 'noopener,noreferrer')}
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => window.open(cert.image, '_blank', 'noopener,noreferrer')}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-bold" >View Full</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{cert.title}</h3>
                  <TruncatedDescription text={cert.description} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwardCertificationsPage;