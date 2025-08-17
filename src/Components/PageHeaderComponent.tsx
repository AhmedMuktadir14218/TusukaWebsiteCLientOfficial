 

// components/PageHeader.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface PageHeaderProps {
  images: string[];
  title: string;
  description: string;
  className?: string;
}

// components/PageHeader.tsx
const PageHeaderComponent: React.FC<PageHeaderProps> = ({ 
  images, 
  title, 
  description,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Image Slider */}
      <div className="relative w-full h-[50vh] sm:h-[35vh] md:h-[55vh] lg:h-[70vh]"> {/* Responsive heights */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover brightness-50"
            />
          </SwiperSlide>
        ))}
        {/* Fixed Title & Description Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                {title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-2xl mx-auto">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Swiper>
      </div>

      {/* Pagination styles */}
      <style >{`
        .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-slide {
          width: 100%;
          height: 100%;
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }

        @media (max-width: 640px) {
          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default PageHeaderComponent;