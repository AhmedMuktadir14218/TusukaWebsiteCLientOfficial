// src/Components/about/DirectorSlider.tsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import DirectorCard from './DirectorCard';

export interface RawDirector {
  id: number;
  name: string;
  title: string;
  image: string;
  address: { email: string; house: string };
  social_media: { linkedin?: string; twitter?: string; facebook?: string; github?: string };
  description: { section: string; content: string }[];
}

const DirectorSlider: React.FC = () => {
  const [directors, setDirectors] = useState<RawDirector[]>([]);

  useEffect(() => {
    fetch('/DirectorsData.json')
      .then(res => res.json())
      .then(setDirectors)
      .catch(console.error);
  }, []);

  return (
    <div className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 max-w-[2000px]">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12 drop-shadow-lg">
          Meet Our Leaders
        </h2>
        <Swiper
          effect={'coverflow'}
          grabCursor
          centeredSlides
          loop
          speed={700}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false, waitForTransition: true }}
          pagination={{ clickable: true }}
          navigation
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          className="mySwiper w-full h-full pb-16"
          breakpoints={{
            0:    { slidesPerView:1,   spaceBetween:20, coverflowEffect:{ depth:0, modifier:1, slideShadows:false } },
            768:  { slidesPerView:1.6, spaceBetween:30 },
            1280: { slidesPerView:1.8, spaceBetween:40 },
          }}
        >
          {directors.map(d => (
            <SwiperSlide key={d.id} className="swiper-slide">
              {({ isActive }) => (
                <div
                  className={`flex justify-center transition-all duration-500 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? '0 20px 40px rgba(0,0,0,0.2)'
                      : '0 10px 20px rgba(0,0,0,0.1)',
                    borderRadius: '2rem',
                  }}
                >
                  <DirectorCard director={d} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DirectorSlider;



// // DirectorSlider.tsx
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-coverflow';

// // Example images - replace with your actual images
// import image1 from '../../assets/homeban33.webp';
// import image2 from '../../assets/homeban22.webp';
// import image3 from '../../assets/homeban44.webp';
// import DirectorCard from './DirectorCard';

// interface Director {
//   image?: string;
//   name: string;
//   designation: string;
//   description: string;
//   email: string;
//   linkedin?: string;
//   twitter?: string;
//   github?: string;
// }

// const directors: Director[] = [
//   {
//     image: image1,
//     name: "John Doe",
//     designation: "Managing Director",
//     description: "John is a visionary leader with over 20 years of experience in the industry. He has a proven track record of driving growth and innovation, and is passionate about building high-performing teams.",
//     email: "john.doe@example.com",
//     linkedin: "https://www.linkedin.com/in/johndoe",
//     twitter: "https://twitter.com/johndoe",
//     github: "https://github.com/johndoe",
//   },
//   {
//     image: image2,
//     name: "Jane Smith",
//     designation: "Operations Director",
//     description: "Jane is an expert in streamlining operations and enhancing efficiency. Her dedication to excellence ensures that all projects are delivered on time and to the highest standards.",
//     email: "jane.smith@example.com",
//     linkedin: "https://www.linkedin.com/in/janesmith",
//     twitter: "https://twitter.com/janesmith",
//     github: "https://github.com/janesmith",
//   },
//   {
//     image: image3,
//     name: "Peter Jones",
//     designation: "Marketing Director",
//     description: "Peter leads our marketing efforts with creative strategies and a deep understanding of market trends. He's passionate about brand building and connecting with our audience.",
//     email: "peter.jones@example.com",
//     linkedin: "https://www.linkedin.com/in/peterjones",
//     twitter: "https://twitter.com/peterjones",
//     github: "https://github.com/peterjones",
//   },
//   {
//     image: image2, // Reusing image2 for demonstration, replace with a unique image if possible
//     name: "Michael Brown", // Changed name for clarity
//     designation: "Product Lead",
//     description: "Michael excels at bringing innovative products to market, focusing on user experience and strategic development. His vision has driven significant product successes.",
//     email: "michael.brown@example.com",
//     linkedin: "https://www.linkedin.com/in/michaelbrown",
//     twitter: "https://twitter.com/michaelbrown",
//     github: "https://github.com/michaelbrown",
//   },
//   {
//     image: image1, // Reusing image1 for demonstration
//     name: "Emily White", // Changed name for clarity
//     designation: "HR Manager",
//     description: "Emily ensures our team thrives in a supportive and engaging environment. Her expertise in human resources fosters a positive and productive company culture.",
//     email: "emily.white@example.com",
//     linkedin: "https://www.linkedin.com/in/emilywhite",
//     twitter: "https://twitter.com/emilywhite",
//     github: "https://github.com/emilywhite",
//   },
// ];

// // Update the breakpoints and styles in your DirectorSlider component:

// const DirectorSlider: React.FC = () => {
//   return (
//     <div className="py-12 bg-gradient-to-br from-blue-50 to-purple-100 min-h-[60vh] flex items-center justify-center overflow-hidden">
//       <div className="container mx-auto px-4 max-w-[2000px]"> {/* Increased max-width */}
//         <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12 drop-shadow-lg">
//           Meet Our Leaders
//         </h2>
//         <Swiper
//           effect={'coverflow'}
//           grabCursor={true}
//           centeredSlides={true}
//           loop={true}
//           speed={700}
//           coverflowEffect={{
//             rotate: 0,
//             stretch: 0,
//             depth: 100,
//             modifier: 2.5,
//             slideShadows: true,
//           }}
//           autoplay={{
//             delay: 4000,
//             disableOnInteraction: false,
//             waitForTransition: true,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           navigation={true}
//           modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
//           className="mySwiper w-full h-full pb-16"
//           breakpoints={{
//             // Mobile (<768px)
//             0: {
//               slidesPerView: 1,
//               spaceBetween: 20,
//               coverflowEffect: {
//                 rotate: 0,
//                 stretch: 0,
//                 depth: 0, // No depth effect on mobile
//                 modifier: 1,
//                 slideShadows: false
//               }
//             },
//             // Tablet and Desktop (>=768px)
//             768: {
//               slidesPerView: 1.6, // Show partial previous/next slides
//               spaceBetween: 30,
//               coverflowEffect: {
//                 rotate: 0,
//                 stretch: 0,
//                 depth: 100,
//                 modifier: 2,
//                 slideShadows: true
//               }
//             },
//             // Large Desktop (>=1280px)
//             1280: {
//               slidesPerView: 1.8, // Show more of previous/next slides
//               spaceBetween: 40,
//               coverflowEffect: {
//                 rotate: 0,
//                 stretch: 0,
//                 depth: 100,
//                 modifier: 2.5,
//                 slideShadows: true
//               }
//             }
//           }}
//         >
//           {directors.map((director, index) => (
//             <SwiperSlide
//               key={index}
//               className="swiper-slide"
//             >
//               {({ isActive }) => (
//                 <div
//                   className={`flex justify-center transition-all duration-500 ${
//                     isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
//                   }`}
//                   style={{
//                     boxShadow: isActive ? '0 20px 40px rgba(0, 0, 0, 0.2)' : '0 10px 20px rgba(0, 0, 0, 0.1)',
//                     borderRadius: '2rem',
//                   }}
//                 >
//                   <DirectorCard {...director} />
//                 </div>
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       <style>{`
//         .swiper-container {
//           overflow: visible !important;
//         }

//         .swiper-slide {
//           transition: all 0.3s ease;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         /* Card width control */
//         .swiper-slide > div {
//           width: 100%;
//           max-width: 1200px; /* Increased card width */
//           margin: 0 auto;
//         }

//         /* Mobile styles */
//         @media (max-width: 767px) {
//           .swiper-slide > div {
//             max-width: 100%;
//             padding: 0 20px;
//           }
          
//           .swiper-button-next,
//           .swiper-button-prev {
//             display: none !important; /* Hide navigation on mobile */
//           }
//         }

//         /* Tablet and Desktop styles */
//         @media (min-width: 768px) {
//           .swiper-slide > div {
//             padding: 0;
//           }
//         }

//         .swiper-button-next,
//         .swiper-button-prev {
//           color: #3B82F6;
//           background: white;
//           width: 50px;
//           height: 50px;
//           border-radius: 50%;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         }

//         .swiper-button-next:after,
//         .swiper-button-prev:after {
//           font-size: 24px;
//         }

//         .swiper-button-next {
//           right: 5%;
//         }

//         .swiper-button-prev {
//           left: 5%;
//         }

//         .swiper-pagination-bullet {
//           width: 12px;
//           height: 12px;
//           background: #3B82F6;
//           opacity: 0.5;
//         }

//         .swiper-pagination-bullet-active {
//           opacity: 1;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DirectorSlider;