import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';
import image1 from '../assets/homeban11.webp';
import image2 from '../assets/homeban22.webp';
import image3 from '../assets/homeban33.webp';
import image4 from '../assets/homeban44.webp';
import banVideo from '../assets/TusukaBanner.mp4';

type BannerAsset = {
  id: number;
  image: string;
  video?: string;
  alt: string;
};

const BannerHome: React.FC = () => {
  const bannerAssets: BannerAsset[] = [
    {
      id: 1,
      image: `${image1}`,
      video: `${banVideo}`,
      alt: 'First banner image'
    },
    {
      id: 2,
      image: `${image2}`,
      video: `${banVideo}`,
      alt: 'Second banner image'
    },
    {
      id: 3,
      image: `${image3}`,
      video: `${banVideo}`,
      alt: 'Third banner image'
    },
    {
      id: 4,
      image: `${image4}`,
      video: `${banVideo}`,
      alt: 'Fourth banner image'
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerAssets.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerAssets.length]);

  const handleVideoOpen = (videoUrl: string | undefined) => {
    if (videoUrl) {
      setCurrentVideo(videoUrl);
      setIsVideoOpen(true);
    }
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
    setCurrentVideo('');
  };

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="relative w-full h-screen max-h-[700px] min-h-[400px] overflow-hidden">
      {/* Banner Slides */}
      <div className="relative w-full h-full">
        {bannerAssets.map((asset, index) => (
          <div
            key={asset.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {/* Background Image */}
            <img
              src={asset.image}
              alt={asset.alt}
              className="w-full h-full object-cover object-center blur-[2px] brightness-90"
            />
            
            {/* Content Container */}
            <div className="absolute inset-0 container mx-auto px-6 flex items-center justify-between">
              {/* Text on left side - always visible */}
              <motion.div
                className="w-full md:w-1/2 pr-4"
                initial="hidden"
                animate={index === currentSlide ? "visible" : "hidden"}
                variants={textVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FEF2ED] mb-4 leading-tight">
                  
                  We make your   Clothes   <br /> <span className='text-[#0603a6]'> Since 1990 </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#FEF2ED] opacity-90">
                  Premium quality garments with decades of expertise
                </p>
              </motion.div>

              {/* Play button on right side - always visible */}
              <div className="hidden md:flex items-center justify-end pl-4">
                <button
                  onClick={() => handleVideoOpen(asset.video)}
                  className="group relative glow-animation"
                  aria-label="Play video"
                >
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#0603a6] rounded-full opacity-20 animate-glow"></div>
                    {/* Main button */}
                    <div className="bg-[#0603a6] bg-opacity-70 rounded-full p-5 md:p-6 group-hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center relative z-10">
                      <FaPlay className="text-[#FEF2ED] text-4xl md:text-5xl" />
                    </div>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[#FEF2ED] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Watch Video
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile play button (centered) */}
            <div className="md:hidden absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => handleVideoOpen(asset.video)}
                className="group relative glow-animation"
                aria-label="Play video"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#0603a6] rounded-full opacity-20 animate-glow"></div>
                  <div className="bg-[#0603a6] bg-opacity-70 rounded-full p-5 group-hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center relative z-10">
                    <FaPlay className="text-[#FEF2ED] text-4xl" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {bannerAssets.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50 hover:bg-opacity-70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={handleVideoClose}
              className="absolute -top-12 right-0 text-[#FEF2ED] hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <IoClose className="text-3xl" />
            </button>
            
            <div className="aspect-w-16 aspect-h-9 w-full">
              <video 
                controls 
                autoPlay 
                className="w-full h-full"
                src={currentVideo}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Glow animation styles */}
      <style>{`
        @keyframes glow {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BannerHome;

 