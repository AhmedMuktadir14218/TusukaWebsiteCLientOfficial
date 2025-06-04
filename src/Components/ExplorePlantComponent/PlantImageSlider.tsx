// src/Components/ExplorePlantComponent/PlantImageSlider.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

interface PlantImageSliderProps {
  images: string[];
  title: string;
}

const PlantImageSlider: React.FC<PlantImageSliderProps> = ({ images, title }) => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Slider Container with responsive height */}
        <div className="w-full">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            speed={700}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              waitForTransition: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            className="mySwiper"
            breakpoints={{
              // Mobile
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
                coverflowEffect: {
                  depth: 0,
                  modifier: 1,
                  slideShadows: false
                }
              },
              // Tablet
              768: {
                slidesPerView: 1.2,
                spaceBetween: 20,
                coverflowEffect: {
                  depth: 100,
                  modifier: 2,
                  slideShadows: true
                }
              },
              // Desktop
              1024: {
                slidesPerView: 1.5,
                spaceBetween: 30,
                coverflowEffect: {
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: true
                }
              }
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`transition-all duration-500 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
                    }`}
                  >
                    <div className="relative w-full">
                      {/* Responsive image container */}
                      <div className="relative w-full">
                        {/* Mobile height: 30vh, Tablet: 50vh, Desktop: normal */}
                        <div className="w-full h-[30vh] md:h-[50vh] lg:h-[70vh]">
                          <img
                            src={image}
                            alt={`${title} - Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Title below slider */}
        {/* <div className="text-center py-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {title}
          </h2>
        </div> */}
      </div>
          
      <style>{`
        .swiper-container {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .swiper-slide {
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Navigation buttons */
        .swiper-button-next,
        .swiper-button-prev {
          color: #3B82F6;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }

        /* Hide navigation buttons on mobile */
        @media (max-width: 767px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }

        /* Pagination bullets */
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #3B82F6;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
        }

        /* Adjust spacing for different screen sizes */
        @media (max-width: 767px) {
          .swiper-container {
            padding-top: 10px;
            padding-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default PlantImageSlider;