// // components/PageHeader.tsx
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/pagination';

// interface PageHeaderProps {
//   images: string[];
//   title: string;
//   description: string;
//   className?: string;
// }

// const PageHeader: React.FC<PageHeaderProps> = ({ 
//   images, 
//   title, 
//   description,
//   className = ""
// }) => {
//   return (
//     <div className="flex flex-col w-full">
//       {/* Full-screen slider section */}
//       <div className="relative w-full h-screen">
//         <Swiper
//           modules={[EffectFade, Autoplay, Pagination]}
//           effect="fade"
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//             el: '.custom-pagination',
//           }}
//           loop={true}
//           className="w-full h-full"
//         >
//           {images.map((image, index) => (
//             <SwiperSlide key={index}>
//               <div className="relative w-full h-full">
//                 <img
//                   src={image}
//                   alt={`Slide ${index + 1}`}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//                 {/* Dark overlay */}
//                 <div className="absolute inset-0 bg-black/50" />
//               </div>
//             </SwiperSlide>
//           ))}

//           {/* Title Overlay - Centered */}
//           <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
//             <div className="container mx-auto px-4 text-center">
//               <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wider">
//                 {title}
//               </h1>
//               <div className="w-20 h-1 bg-blue-500 mx-auto mb-6" />
//             </div>
//           </div>

//           {/* Custom Pagination */}
//           <div className="custom-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2" />
//         </Swiper>
//       </div>

//       {/* Description Section */}
//       <div className="w-full bg-white py-16 md:py-20">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto text-center">
//             <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
//               {description}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Custom styles */}
//       <style jsx global>{`
//         .custom-pagination {
//           display: flex;
//           justify-content: center;
//           gap: 8px;
//         }

//         .custom-pagination .swiper-pagination-bullet {
//           width: 12px;
//           height: 12px;
//           background: rgba(255, 255, 255, 0.5);
//           border-radius: 50%;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .custom-pagination .swiper-pagination-bullet-active {
//           background: white;
//           transform: scale(1.2);
//         }

//         @media (max-width: 768px) {
//           .custom-pagination .swiper-pagination-bullet {
//             width: 8px;
//             height: 8px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PageHeader;


// components/PageHeader.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

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
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]"> {/* Responsive heights */}
        <Swiper
          modules={[EffectFade, Autoplay, Pagination]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: function (_index, className) {
              return `<span class="${className} bg-white"></span>`;
            },
          }}
          loop={true}
          className="w-full h-full" // Full height of parent
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full"> {/* Full dimensions */}
              <div className="relative w-full h-full"> {/* Full dimensions container */}
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover brightness-50" // Changed to brightness-50 for consistent overlay
                />
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
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
              </div>
            </SwiperSlide>
          ))}
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