// src/components/NewsAndMedia.tsx
import React from "react";
import image1 from "../assets/NewsAndMedia/1.jpg";
import image2 from "../assets/NewsAndMedia/2.jpg";
import image3 from "../assets/NewsAndMedia/3.jpg";
import image4 from "../assets/NewsAndMedia/Tusuka Washing Ltd 06.jpg";
import image5 from "../assets/NewsAndMedia/Tusuka Washing Ltd 05.jpg";
import image6 from "../assets/NewsAndMedia/IMG_1126.jpg";
import NewsCard from "./NewsCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LogoMoving from "./LogoMoving";

const NewsAndMedia: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      image: image1,
      title: "Tusuka Sports Tournament",
      description:
        "Tusuka organized its annual sports tournament, bringing together employees for a day of healthy competition, teamwork, and fun.",
      date: "Jan 15, 2025",
    },
    {
      id: 2,
      image: image4,
      title: "Tusuka GROUP Waste Management",
      description:
        "Tusuka is committed to sustainable waste management practices, ensuring minimal environmental impact.",
      date: "Apr 01, 2025",
    },
    {
      id: 3,
      image: image3,
      title: "Tusuka GROUP ACQUIRES XYZ TEXTILE.",
      description:
        "Tusuka Group expands its footprint in the textile industry with the acquisition of XYZ Textile & Apparels, strengthening global operations.",
      date: "Mar 05, 2025",
    },
    {
      id: 4,
      image: image2,
      title: "Tusuka GROUP PROUDLY ACHIEVES ",
      description:
        "Tusuka Group is proud to announce a 'B-' in the CDP Water Report 2024, exceeding the global average and reaffirming our commitment to sustainability.",
      date: "Feb 10, 2025",
    },
    {
      id: 5,
      image: image5,
      title: "Most Powerful Wash Machine Now at Tusuka",
      description:
        "Tusuka is proud to introduce the most powerful wash machine setting new standards for efficiency and performance.",
      date: "Apr 01, 2025",
    },
    {
      id: 6,
      image: image6,
      title: "Tusuka Believes in Nature",
      description:
        "Tusuka is committed to sustainable practices, including our innovative rooftop garden initiative.",
      date: "Aug 01, 2025",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <LogoMoving></LogoMoving> */}
      <h1 className="text-center font-bold py-16 md:text-5xl sm:text-3xl text-[#0B36AF] uppercase">
        News & Media
      </h1>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 }, // Mobile
          768: { slidesPerView: 2 }, // Tablet
          1024: { slidesPerView: 3 }, // Desktop
        }}
      >
        {newsItems.map((item) => (
          <SwiperSlide key={item.id}>
            <NewsCard
              image={item.image}
              title={item.title}
              description={item.description}
              date={item.date}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsAndMedia;







// // src/components/NewsAndMedia.tsx
// import React from "react";
// import image1 from "../assets/NewsAndMedia/1.jpg";
// import image2 from "../assets/NewsAndMedia/2.jpg";
// import image3 from "../assets/NewsAndMedia/3.jpg";
// import image4 from "../assets/NewsAndMedia/Tusuka Washing Ltd 06.jpg";
// import image5 from "../assets/NewsAndMedia/Tusuka Washing Ltd 05.jpg";
// import image6 from "../assets/NewsAndMedia/IMG_1126.jpg";
// import NewsCard from "./NewsCard";

// const NewsAndMedia: React.FC = () => {
//   const newsItems = [
//     {
//       id: 1,
//       image: image1,
//       title: "Tusuka Sports Tournament",
//       description:
//         "Tusuka organized its annual sports tournament, bringing together employees for a day of healthy competition, teamwork, and fun.",
//       date: "Jan 15, 2025",
//     },
//     {
//       id: 2,
//       image: image4,
//         title: "Tusuka GROUP Waste Management",
//       description:
//         "Tusuka is committed to sustainable waste management practices, ensuring minimal environmental impact.",
//       date: "Apr 01, 2025",
//     },
//     {
//       id: 3,
//       image: image3,
//       title: "Tusuka GROUP ACQUIRES XYZ TEXTILE.",
//       description:
//         "Tusuka Group expands its footprint in the textile industry with the acquisition of XYZ Textile & Apparels, strengthening global operations.",
//       date: "Mar 05, 2025",
//     },
//     {
//       id: 4,
//       image: image2,
      
//       title:
//         'Tusuka GROUP PROUDLY ACHIEVES ',
//       description:
//         "Tusuka Group is proud to announce a 'B-' in the CDP Water Report 2024, exceeding the global average and reaffirming our commitment to sustainability.",
//       date: "Feb 10, 2025",
    
//     },
//     {
//       id: 5,
//       image: image5,
//       title: "Most Powerful Wash Machine Now at Tusuka",
//       description:
//         "Tusuka is proud to introduce the most powerful wash machine setting new standards for efficiency and performance.",
//       date: "Apr 01, 2025",
//     },
//     {
//       id: 6,
//       image: image6,
//       title: 'Tusuka Believes in Nature',
//       description:
//         "Tusuka is committed to sustainable practices, including our innovative rooftop garden initiative.",
//       date: "Aug 01, 2025",
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-24">
//       <h1 className="text-center font-bold py-16 md:text-5xl sm:text-3xl text-[#0B36AF] uppercase">
//         News & Media
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {newsItems.map((item) => (
//           <NewsCard
//             key={item.id}
//             image={item.image}
//             title={item.title}
//             description={item.description}
//             date={item.date}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewsAndMedia;


// // src/components/NewsAndMedia.tsx
// import React from "react";
// import image1 from "../assets/NewsAndMedia/1.jpg";
// import image2 from "../assets/NewsAndMedia/2.jpg";
// import image3 from "../assets/NewsAndMedia/3.jpg";
// import image4 from "../assets/NewsAndMedia/5.gif";
// import bgNav from "../assets/bg2.png";

// const NewsAndMedia: React.FC = () => {
//   const newsItems = [
//     {
//       id: 1,
//       image: image1,
//       title: "Tusuka Sports Tournament",
//       date: "2025-07-02",
//       shortDate: { year: "2025", month: "JUL", day: "02" },
//       description:
//         "Tusuka organized its annual sports tournament, bringing together employees for a day of healthy competition, teamwork, and fun.",
//     },
//     {
//       id: 2,
//       image: image2,
//       title:
//         'Tusuka GROUP PROUDLY ACHIEVES A "B-" IN THE CDP WATER REPORT 2024, SURPASSING THE GLOBAL AVERAGE OF "C"',
//       date: "2025-04-23",
//       shortDate: { year: "2025", month: "APR", day: "23" },
//       description:
//         "Tusuka Group is proud to announce a 'B-' in the CDP Water Report 2024, exceeding the global average and reaffirming our commitment to sustainability.",
//     },
//     {
//       id: 3,
//       image: image3,
//       title: "Tusuka GROUP ACQUIRES GLORY TEXTILE & APPARELS",
//       date: "2025-03-19",
//       shortDate: { year: "2025", month: "MAR", day: "19" },
//       description:
//         "Tusuka Group expands its footprint in the textile industry with the acquisition of Glory Textile & Apparels, strengthening global operations.",
//     },
//     {
//       id: 4,
//       image: image4,
//       title: "Tusuka GROUP Cultural Initiatives",
//       date: "2025-03-19",
//       shortDate: { year: "2025", month: "MAR", day: "19" },
//       description:
//         "Tusuka continues to promote cultural activities, encouraging creativity and community building among employees and partners.",
//     },
//   ];

//   return (
//     <div className="relative container mx-auto px-4 py-12 mt-12"
    
//     >
//       <h1 className="text-center font-bold py-16 md:text-5xl sm:text-3xl text-[#0B36AF] uppercase">
//         News & Media
//       </h1>

//       {/* Responsive Grid: 1 on mobile, 2 on sm, 3 on lg+ */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {newsItems.map((item) => (
//           <article
//             key={item.id}
//             className="flex bg-white rounded-lg overflow-hidden shadow-md transition hover:shadow-xl min-h-[340px]"
//           >
//             {/* Vertical Date Strip */}
//             <div className="rotate-180 p-2 [writing-mode:_vertical-lr] bg-[#EEF2FF]">
//               <time
//                 dateTime={item.date}
//                 className="flex items-center justify-between gap-4 text-xs font-bold text-[#0B36AF] uppercase"
//               >
//                 <span>{item.shortDate.year}</span>
//                 <span className="w-px flex-1 bg-[#0B36AF]/30"></span>
//                 <span>
//                   {item.shortDate.month} {item.shortDate.day}
//                 </span>
//               </time>
//             </div>

//             {/* Image (60%) */}
//             <div className="hidden sm:block basis-[60%]">
//               <img
//                 alt={item.title}
//                 src={item.image}
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             {/* Content (40%) */}
//             <div className="flex flex-col justify-between basis-[40%]"
//             style={{ backgroundImage: `url(${bgNav})` }}
//             >
//               <div className="border-s border-gray-200 p-4 sm:border-l-transparent sm:p-6">
//                 <h3 className="font-bold text-gray-900 uppercase line-clamp-2">
//                   {item.title}
//                 </h3>
//                 <p className="mt-2 text-sm text-gray-700 line-clamp-4">
//                   {item.description}
//                 </p>
//               </div>

//               {/* Button */}
//               <div className="sm:flex sm:items-end sm:justify-end">
//                 <button
//                   href="#"
//                   className="block bg-[#20409A] px-5 py-3 text-center text-xs font-bold text-white uppercase transition hover:bg-blue-900"
//                 >
//                   Read More
//                 </button>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewsAndMedia;


// import React from 'react';
// import image1 from "../assets/NewsAndMedia/1.jpg";
// import image2 from "../assets/NewsAndMedia/2.jpg";
// import image3 from "../assets/NewsAndMedia/3.jpg";
// import image4 from "../assets/NewsAndMedia/5.gif";
// const NewsAndMedia: React.FC = () => {
//   const newsItems = [
//     {
//       id: 1,
//       image: image1,
//       title: 'Tusuka Sports Tournament',
//       date: 'JUL 02, 2025',
//     },
//     {
//       id: 2,
//       image: image2,
//       title: 'Tusuka GROUP PROUDLY ACHIEVES A "B-" IN THE CDP WATER REPORT 2024, SURPASSING THE GLOBAL AVERAGE OF "C"',
//       date: 'APR 23, 2025',
//     },
//     {
//       id: 3,
//       image: image3,
//       title: 'Tusuka GROUP ACQUIRES GLORY TEXTILE & APPARELS',
//       date: 'MAR 19, 2025',
//     },
//     {
//       id: 4,
//       image: image4,
//       title: 'Tusuka GROUP Cultural Initiatives',
//       date: 'MAR 19, 2025',
//     },
//   ];

//   return (
//     <div className="relative container mx-auto px-4 py-12 mt-12"> 
//       <h1 className="text-center font-bold py-16 md:text-5xl sm:text-3xl text-blue-900 uppercase">News & Media</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {newsItems.map((item) => (
//           <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
//             <div className="relative h-64">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-full object-cover"
//               />
//               {/* This is a placeholder for the overlay content like the scores in the first image */}

//             </div>
//             <div className="p-6">
//               <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-2">
//                 {item.title}
//               </h3>
//               <p className="text-sm text-gray-500">{item.date}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewsAndMedia;