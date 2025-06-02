import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
 
import { motion, AnimatePresence } from 'framer-motion';
import { FaIndustry, FaUsers, FaRuler, FaMapMarkerAlt, FaBuilding, FaBoxes } from 'react-icons/fa';
import { GiFactory } from 'react-icons/gi';
import { MdOutlinePrecisionManufacturing } from 'react-icons/md';

interface PlantDetails {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Flexible to accommodate all your detail fields
}

interface Plant {
  id: string;
  name: string;
  images: string[];
  shortDescription: string;
  details: PlantDetails;
}

interface PlantDetailsModalProps {
  plant: Plant;
  onClose: () => void;
}
const iconMap: Record<string, React.ReactNode> = {
  employees: <FaUsers className="text-blue-500" />,
  lines: <MdOutlinePrecisionManufacturing className="text-green-500" />,
  capacity: <FaIndustry className="text-purple-500" />,
  space: <FaRuler className="text-yellow-500" />,
  machines: <GiFactory className="text-red-500" />,
  address: <FaMapMarkerAlt className="text-pink-500" />,
  default: <FaBuilding className="text-indigo-500" />
};

const PlantDetailsModal: React.FC<PlantDetailsModalProps> = ({ plant, onClose }) => {
useEffect(() => {
  document.body.style.overflow = 'hidden';
  const scrollContainer = document.getElementById('plant-modal-scroll');
  if (scrollContainer) scrollContainer.scrollTop = 0;

  return () => {
    document.body.style.overflow = 'auto';
  };
}, []);




  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0  bg-opacity-75 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    className="relative bg-white modal-no-scrollbar rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="overflow-y-auto max-h-[90vh] hide-scrollbar">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="overflow-y-auto h-full">
              {/* Image Slider - Keep your original design */}
              <div className="relative h-64 md:h-96 w-full">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000 }}
                  loop
                  className="h-full w-full"
                >
                  {plant.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`${plant.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

{/* Basic Information Section - Enhanced layout with animations */}
<div className="p-6 md:p-8">
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-center text-2xl md:text-3xl font-bold mb-8 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
  >
    {plant.name}
  </motion.h2>
  
  <div className="flex flex-col md:flex-row gap-8">
    {/* Left Column - Enhanced with animation */}
    <motion.div 
      className="md:w-1/3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
        <motion.img
          src={plant.images[0]}
          alt={plant.name}
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          whileHover={{ scale: 1.03 }}
        />
      </div>
      <motion.div 
        className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm"
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-start mb-3">
          <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-700 font-medium">{plant.shortDescription}</p>
        </div>
      </motion.div>
    </motion.div>

    {/* Right Column - Enhanced info cards */}
    <motion.div 
      className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, staggerChildren: 0.1 }}
    >
      {plant.details.employees && (
        <motion.div 
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Employees</h3>
          </div>
          <p className="text-gray-600 pl-11">{plant.details.employees}</p>
        </motion.div>
      )}
      
      {plant.details.lines && (
        <motion.div 
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Production Lines</h3>
          </div>
          <p className="text-gray-600 pl-11">
            {typeof plant.details.lines === 'object' 
              ? Object.values(plant.details.lines).join(', ') 
              : plant.details.lines}
          </p>
        </motion.div>
      )}
      
      {plant.details.capacity && (
        <motion.div 
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Capacity</h3>
          </div>
          <div className="text-gray-600 pl-11">
            {typeof plant.details.capacity === 'object'
              ? Object.entries(plant.details.capacity).map(([key, value]) => (
                  <div key={key} className="mb-1 last:mb-0">
                    <span className="font-medium">{key}:</span> {String(value)}
                  </div>
                ))
              : plant.details.capacity}
          </div>
        </motion.div>
      )}
      
      {plant.details.space && (
        <motion.div 
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Space</h3>
          </div>
          <p className="text-gray-600 pl-11">{plant.details.space}</p>
        </motion.div>
      )}
      
      {plant.details.machines && (
        <motion.div 
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Machines</h3>
          </div>
          <p className="text-gray-600 pl-11">{plant.details.machines}</p>
        </motion.div>
      )}
      
      {plant.details.address && (
        <motion.div 
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all sm:col-span-2"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Address</h3>
          </div>
          <p className="text-gray-600 pl-11">{plant.details.address}</p>
        </motion.div>
      )}
    </motion.div>
  </div>
</div>
              {/* Address Section - Original design with Google Maps */}
              <div className="px-6 md:px-8 pb-6">
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent ">
                  Location
                </h2>
                
                <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                  {plant.details.locationEmbed ? (
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={plant.details.locationEmbed}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">Map not available</p>
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md max-w-xs z-10">
                    <h3 className="font-bold text-gray-900 mb-2">Location Details</h3>
                    <p className="text-gray-600 text-sm">
                      {plant.details.address || 'Address not specified'}
                      {plant.details.distanceFromAirport && (
                        <span className="block mt-1">
                          {plant.details.distanceFromAirport} from airport
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default PlantDetailsModal;