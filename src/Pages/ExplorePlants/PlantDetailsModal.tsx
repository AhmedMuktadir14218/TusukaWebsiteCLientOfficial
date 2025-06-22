// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import { motion, AnimatePresence } from 'framer-motion';

// interface PlantDetails {
//   [key: string]: any;
// }

// interface Plant {
//   id: string;
//   name: string;
//   images: string[];
//   shortDescription: string;
//   details: PlantDetails;
// }

// interface PlantDetailsModalProps {
//   plant: Plant;
//   onClose: () => void;
// }

// const PlantDetailsModal: React.FC<PlantDetailsModalProps> = ({ plant, onClose }) => {
   
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-opacity-75 backdrop-blur-sm"
//           onClick={onClose}
//         />

//         <div className="flex items-center justify-center min-h-screen p-4">
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ type: 'spring', damping: 20, stiffness: 300 }}
//             className="relative bg-white modal-no-scrollbar rounded-xl max-w-6xl w-full max-h-[90vh] shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="overflow-y-auto max-h-[90vh] hide-scrollbar">
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>

//               <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
//                 {/* Left Side - Image Slider */}
//                 <div className="md:w-3/5 h-[400px] md:h-auto">
//                   <Swiper
//                     modules={[Navigation, Pagination, Autoplay]}
//                     spaceBetween={0}
//                     slidesPerView={1}
//                     navigation
//                     pagination={{ clickable: true }}
//                     autoplay={{ delay: 5000 }}
//                     loop
//                     className="h-full w-full rounded-lg overflow-hidden shadow-lg"
//                   >
//                     {plant.images.map((image, index) => (
//                       <SwiperSlide key={index}>
//                         <img
//                           src={image}
//                           alt={`${plant.name} - ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </SwiperSlide>
//                     ))}
//                   </Swiper>
//                 </div>

//                 {/* Right Side - Info Grid */}
//                 <div className="md:w-2/5 flex flex-col justify-between">
//                   <div>
//                     <motion.h2 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="text-2xl md:text-3xl font-bold mb-6 text-gray-800"
//                     >
//                       {plant.name || 'Plant Name'}
//                     </motion.h2>

//                     {/* Info Grid */}
//                     <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4  'max-h-[200px] overflow-hidden' }`}>
//                       {['employees', 'lines', 'machines', 'space', 'capacity', 'revenue'].map((item, idx) => (
//                         <motion.div 
//                           key={idx}
//                           className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
//                           whileHover={{ y: -3 }}
//                           transition={{ type: "spring", stiffness: 300 }}
//                         >
//                           <div className="flex items-center mb-2">
//                             <div className={`p-2 rounded-full bg-${['blue', 'green', 'purple', 'yellow', 'red', 'indigo'][idx]}-100 text-${['blue', 'green', 'purple', 'yellow', 'red', 'indigo'][idx]}-600 mr-3`}>
//                               {/* Replace with corresponding SVGs */}
//                             </div>
//                             <h3 className="font-semibold text-gray-900">{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
//                           </div>
//                           <p className="text-gray-600 pl-11">{plant.details[item] || 'N/A'}</p>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
//                   {/* {!showMore && (
//                     <button
//                       onClick={() => setShowMore(true)}
//                       className="text-blue-600 mt-4 text-sm cursor-pointer hover:underline"
//                     >
//                       See More
//                     </button>
//                   )} */}
//                 </div>
//               </div>

//               {/* Description Section */}
//               <motion.div 
//                 className="mt-8 mb-4 px-6 md:px-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
//                     {/* Replace with SVG */}
//                   </div>
//                   <h3 className="font-semibold text-gray-900">Description</h3>
//                 </div>
//                 <p className="text-gray-600">{plant.shortDescription || 'No description available'}</p>
//               </motion.div>

//               {/* Address Section - Original design with Google Maps */}
//               <div className="px-6 md:px-8 pb-6">
//                 <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-gray-800">
//                   Location
//                 </h2>
//                 <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
//                   {plant.details.locationEmbed ? (
//                     <iframe
//                       width="100%"
//                       height="100%"
//                       frameBorder="0"
//                       scrolling="no"
//                       marginHeight={0}
//                       marginWidth={0}
//                       src={plant.details.locationEmbed}
//                       className="w-full h-full"
//                       allowFullScreen
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <p className="text-gray-500">Map not available</p>
//                     </div>
//                   )}
                  
//                   <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md max-w-xs z-10">
//                     <h3 className="font-bold text-gray-900 mb-2">Location Details</h3>
//                     <p className="text-gray-600 text-sm">
//                       {plant.details.address || 'Address not specified'}
//                       {plant.details.distanceFromAirport && (
//                         <span className="block mt-1">
//                           {plant.details.distanceFromAirport} from airport
//                         </span>
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default PlantDetailsModal;








// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { motion, AnimatePresence } from 'framer-motion';
// import CompanyLogo from '../../../public/logo.png'; // Adjust the path as necessary
// import { 
//   FaUsers, 
//   // FaIndustry, 
//   FaCogs, 
//   FaRulerCombined, 
//   // FaChartLine, 
//   FaMoneyBillWave,
//   // FaPhone,
//   // FaEnvelope,
//   // FaMapMarkerAlt
// } from 'react-icons/fa';
// import { GiFactory } from 'react-icons/gi';
// import { MdPrecisionManufacturing} from 'react-icons/md';

// interface PlantDetails {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [key: string]: any;
// }

// interface Plant {
//   id: string;
//   name: string;
//   images: string[];
//   short_description: string;
//   details: PlantDetails;
// }

// interface PlantDetailsModalProps {
//   plant: Plant;
//   onClose: () => void;
// }

// const PlantDetailsModal: React.FC<PlantDetailsModalProps> = ({ plant, onClose }) => {
//   // const [showFullDetails, setShowFullDetails] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   // const toggleDetails = () => {
//   //   setShowFullDetails(!showFullDetails);
//   // };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const renderDetailValue = (value: any) => {
//     if (typeof value === 'object' && value !== null) {
//       return (
//         <div className="space-y-1">
//           {Object.entries(value).map(([key, val]) => (
//             <div key={key}>
//               <span className="font-medium">{key}:</span> {String(val)}
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return value || 'N/A';
//   };

//  const infoItems = [
//     {
//       key: 'employees',
//       title: 'Employees',
//       icon: <FaUsers className="w-5 h-5" />,
//       color: 'blue'
//     },
//     {
//       key: 'lines',
//       title: 'Production Lines',
//       icon: <GiFactory className="w-5 h-5" />,
//       color: 'green'
//     },
//     {
//       key: 'machines',
//       title: 'Total Machines',
//       icon: <FaCogs className="w-5 h-5" />,
//       color: 'purple'
//     },
//     {
//       key: 'space',
//       title: 'Space',
//       icon: <FaRulerCombined className="w-5 h-5" />,
//       color: 'yellow'
//     },
//     {
//       key: 'capacity',
//       title: 'Capacity',
//       icon: <MdPrecisionManufacturing className="w-5 h-5" />,
//       color: 'red'
//     },
//     {
//       key: 'revenue',
//       title: 'Revenue',
//       icon: <FaMoneyBillWave className="w-5 h-5" />,
//       color: 'indigo'
//     }
//   ];



//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0   bg-opacity-75 backdrop-blur-sm"
//           onClick={onClose}
//         />

//         <div className="flex items-center justify-center min-h-screen p-4">
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             transition={{ type: 'spring', damping: 20, stiffness: 300 }}
//             className="relative bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="overflow-y-auto max-h-[90vh] hide-scrollbar">
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
//                 aria-label="Close modal"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>

//               <div className="overflow-y-auto h-full">
//                 {/* Main Content Layout */}
//                 <div className="p-6 md:p-8">
//                   {/* Image Slider and Info Grid Container */}
//                   <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8`}>
//                     {/* Left Side - Image Slider */}
//                     <div className={`${isMobile ? 'w-full' : 'w-1/2'}`}>
//                       <Swiper
//                         modules={[Navigation, Pagination, Autoplay]}
//                         spaceBetween={0}
//                         slidesPerView={1}
//                         navigation
//                         pagination={{ clickable: true }}
//                         autoplay={{ delay: 5000 }}
//                         loop
//                         className={`${isMobile ? 'h-64' : 'h-[400px]'} w-full rounded-lg overflow-hidden shadow-lg text-[#05038f]`}
//                       >
//                         {plant.images.map((image, index) => (
//                           <SwiperSlide key={index}>
//                             <img
//                               src={image}
//                               alt={`${plant.name} - ${index + 1}`}
//                               className="w-full h-full object-cover text-[#05038f]"
//                             />
//                           </SwiperSlide>
//                         ))}

                        
//                       </Swiper>
//                     </div>

//                     {/* Right Side - Info Grid */}
//                     <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex flex-col`}>
//                       {/* Title */}
//                       <motion.h2 
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 }}
//                         className="text-2xl md:text-3xl font-bold mb-6 text-[#05038f] bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text"
//                       >
//                         {plant.name || 'Plant Name'}
//                       </motion.h2>

//                       {/* Info Grid - Removed max-height and overflow */}
//                       <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
//                         {infoItems.map((item, index) => (
//                           <motion.div 
//                             key={index}
//                             className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
//                             whileHover={{ y: -3 }}
//                             transition={{ type: "spring", stiffness: 300 }}
//                           >
//                             <div className="flex items-center mb-2">
//                               <div className={`p-2 rounded-full bg-${item.color}-100 text-${item.color}-600 mr-3`}>
//                                 {item.icon}
//                               </div>
//                               <h3 className="font-semibold text-gray-900">{item.title}</h3>
//                             </div>
//                             <div className="text-gray-600 pl-11">
//                               {renderDetailValue(plant.details[item.key])}
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Description Section */}
//                   <motion.div 
//                     className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     <div className="flex items-center mb-4">
//                       <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                       </div>
//                       <h3 className="font-semibold text-gray-900">Description</h3>
//                     </div>
//                     {/* <div className={`text-gray-600 pl-11 ${!showFullDetails && 'line-clamp-3'}`}> */}
//                     <div className={`text-gray-600 pl-11  `}>
//                       {plant.short_description || 'No description available'}
//                     </div>
//                     {/* {plant.shortDescription && plant.shortDescription.length > 150 && (
//                       <button 
//                         onClick={toggleDetails}
//                         className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 pl-11"
//                       >
//                         {showFullDetails ? 'Show less' : 'Read more'}
//                       </button>
//                     )} */}
//                   </motion.div>

//                   {/* Location Section */}
//                   {/* Location Section */}
// <div className="px-0 md:px-0 pb-6 mt-8">
//   {/* <h2 className="text-2xl md:text-3xl font-bold mb-6 font-BeatriceTRIAL_bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text">
//     Location
//   </h2> */}
  
//   <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
//     <div className="flex flex-col md:flex-row gap-6">
//       {/* Left side - Location details */}
//       <div className="md:w-1/2">
//         <div className="flex items-center mb-4">
//           {/* Logo placeholder - replace with actual logo if available */}
//           <div className="w-12 h-12   bg-gray-200 flex items-center justify-center mr-4">
//             {/* <span className="text-gray-500 font-bold">{plant.name.charAt(0)}</span> */}
//            <img src={CompanyLogo} alt="" />
//           </div>
//           <h3 className="text-xl font-bold text-[#05038f]">{plant.name || 'Plant Name'}</h3>
//         </div>
        
//         <div className="space-y-3 text-gray-600">
//           <div className="flex items-start">
//             <svg className="w-5 h-5 mt-1 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//             </svg>
//             <span>{plant.details.phone || 'IP Phone: +8809666722222'}</span>
//           </div>
          
//           <div className="flex items-start">
//             <svg className="w-5 h-5 mt-1 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//             <span>{plant.details.email || 'hello@tusuka.com'}</span>
//           </div>
          
//           <div className="flex items-start">
//             <svg className="w-5 h-5 mt-1 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <div>
//               <p>{plant.details.addressLine1 || 'Block-F, Banani, Dhaka-1213, Bangladesh.'}</p>
//               <p>{plant.details.addressLine2 || 'House-50 (5th floor), Road no-11'}</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Right side - Map */}
//       <div className="md:w-1/2">
//         <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-lg">
//           {plant.details.locationEmbed ? (
//             <iframe
//               width="100%"
//               height="100%"
//               frameBorder="0"
//               scrolling="no"
//               marginHeight={0}
//               marginWidth={0}
//               src={plant.details.locationEmbed}
//               className="w-full h-full"
//               allowFullScreen
//               title="Plant location"
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <p className="text-gray-500">Map not available</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
  
//   {/* Additional location details if available */}
//   {(plant.details.distanceFromAirport || plant.details.otherLocationInfo) && (
//     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//       <h3 className="font-bold text-gray-900 mb-4">Additional Location Information</h3>
//       <div className="text-gray-600 space-y-2">
//         {plant.details.distanceFromAirport && (
//           <p>Distance from airport: {plant.details.distanceFromAirport}</p>
//         )}
//         {plant.details.otherLocationInfo && (
//           <p>{plant.details.otherLocationInfo}</p>
//         )}
//       </div>
//     </div>
//   )}
// </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default PlantDetailsModal;



// src/Pages/ExplorePlants/PlantDetailsModal.tsx
// src/Pages/ExplorePlants/PlantDetailsModal.tsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyLogo from '../../../public/logo.png';
import {
  FaUsers,
  FaCogs,
  FaRulerCombined,
  FaMoneyBillWave
} from 'react-icons/fa';
import { GiFactory } from 'react-icons/gi';
import { MdPrecisionManufacturing } from 'react-icons/md';

interface PlantDetails {
  [key: string]: any;
}

interface Plant {
  id: string;
  name: string;
  images: string[];            // fetched on open
  shortDescription: string;    // now camelCase
  details: PlantDetails;       // normalized detail fields
}

interface PlantDetailsModalProps {
  plant: Plant;
  onClose: () => void;
}

interface DetailedPlantResponse {
  id: number;
  plant_images: Array<{ image_path: string }>;
  details: Record<string, any>;
}

function toCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

const PlantDetailsModal: React.FC<PlantDetailsModalProps> = ({ plant, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [images, setImages] = useState<string[]>(plant.images);
  const [details, setDetails] = useState<PlantDetails>(plant.details);

  // 1️⃣ Fetch images + normalize details when modal opens
  useEffect(() => {
    fetch(`http://localhost:8000/api/explore-plants/plants/${plant.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch plant details');
        return res.json() as Promise<DetailedPlantResponse>;
      })
      .then(json => {
        // build full URLs for each image
        setImages(json.plant_images.map(pi => `http://localhost:8000/${pi.image_path}`));
        // normalize detail keys to camelCase
        setDetails(
          Object.fromEntries(
            Object.entries(json.details).map(([k, v]) => [toCamel(k), v])
          )
        );
      })
      .catch(err => console.error(err));
  }, [plant.id]);

  // 2️⃣ Responsive: track mobile vs desktop
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // 3️⃣ Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // helper to render nested detail objects
  const renderDetailValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([key, val]) => (
            <div key={key}>
              <span className="font-medium">{key}:</span> {String(val)}
            </div>
          ))}
        </div>
      );
    }
    return value ?? 'N/A';
  };

  const infoItems = [
    { key: 'employees', title: 'Employees', icon: <FaUsers className="w-5 h-5" />, color: 'blue' },
    { key: 'lines', title: 'Production Lines', icon: <GiFactory className="w-5 h-5" />, color: 'green' },
    { key: 'machines', title: 'Total Machines', icon: <FaCogs className="w-5 h-5" />, color: 'purple' },
    { key: 'space', title: 'Space', icon: <FaRulerCombined className="w-5 h-5" />, color: 'yellow' },
    { key: 'capacity', title: 'Capacity', icon: <MdPrecisionManufacturing className="w-5 h-5" />, color: 'red' },
    { key: 'revenue', title: 'Revenue', icon: <FaMoneyBillWave className="w-5 h-5" />, color: 'indigo' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0  bg-opacity-75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* modal container */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div className="overflow-y-auto max-h-[90vh] hide-scrollbar p-6 md:p-8">
              {/* top section: image slider + info grid */}
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8`}>
                {/* image slider */}
                <div className={`${isMobile ? 'w-full' : 'w-1/2'}`}>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop
                    className={`${isMobile ? 'h-64' : 'h-[400px]'} w-full rounded-lg overflow-hidden shadow-lg`}
                  >
                    {images.map((src, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={src}
                          alt={`${plant.name} #${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* info grid */}
                <div className={`${isMobile ? 'w-full' : 'w-1/2'}`}>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold mb-6 text-[#05038f] bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text"
                  >
                    {plant.name}
                  </motion.h2>

                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                    {infoItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                        whileHover={{ y: -3 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`p-2 rounded-full bg-${item.color}-100 text-${item.color}-600 mr-3`}>
                            {item.icon}
                          </div>
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        </div>
                        <div className="text-gray-600 pl-11">
                          {renderDetailValue(details[item.key])}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* description */}
              <motion.div
                className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0
                            11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Description</h3>
                </div>
                <p className="text-gray-600 pl-11">
                  {plant.shortDescription || 'No description available'}
                </p>
              </motion.div>

              {/* location & contacts */}
              <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* contact info */}
                  <div className="md:w-1/2">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center mr-4">
                        <img src={CompanyLogo} alt="Logo" />
                      </div>
                      <h3 className="text-xl font-bold text-[#05038f]">{plant.name}</h3>
                    </div>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mt-1 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1
                                1 0 01.948.684l1.498 4.493a1
                                1 0 01-.502 1.21l-2.257
                                1.13a11.042 11.042 0
                                005.516 5.516l1.13-2.257a1
                                1 0 011.21-.502l4.493
                                1.498a1 1 0
                                01.684.949V19a2 2 0
                                01-2 2h-1C9.716 21
                                3 14.284
                                3 6V5z"/>
                        </svg>
                        <span>{details.phone || '+8809666722222'}</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mt-1 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0
                                002.22 0L21 8M5 19h14a2 2
                                0 002-2V7a2 2 0 00-2-2H5a2
                                2 0 00-2 2v10a2 2
                                0 002 2z"/>
                        </svg>
                        <span>{details.email || 'hello@tusuka.com'}</span>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mt-1 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998
                                1.998 0 01-2.827
                                0l-4.244-4.243a8
                                8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0
                                3 3 0 016 0z"/>
                        </svg>
                        <div>
                          <p>{details.addressLine1 || 'Block-F, Banani, Dhaka-1213, Bangladesh.'}</p>
                          <p>{details.addressLine2 || 'House-50 (5th floor), Road no-11'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* map */}
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-lg">
                      {details.locationEmbed ? (
                        <iframe
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          src={details.locationEmbed}
                          allowFullScreen
                          title="Plant location"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">Map not available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* any extra location info */}
              {(details.distanceFromAirport || details.otherLocationInfo) && (
                <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Additional Location Information</h3>
                  <div className="text-gray-600 space-y-2">
                    {details.distanceFromAirport && <p>Distance from airport: {details.distanceFromAirport}</p>}
                    {details.otherLocationInfo && <p>{details.otherLocationInfo}</p>}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default PlantDetailsModal;
