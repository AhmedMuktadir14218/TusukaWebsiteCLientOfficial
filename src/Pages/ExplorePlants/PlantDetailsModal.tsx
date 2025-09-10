/* eslint-disable @typescript-eslint/no-explicit-any */
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

  // Define both API base URL and Image base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const VITE_API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL; // Add this line

  useEffect(() => {
    // Helper function to get the full image URL
    // Defined inside useEffect to be part of its closure and dependencies
    const getFullImageUrl = (imagePath: string): string => {
      // If the imagePath already starts with 'http', it's likely an absolute URL
      if (imagePath.startsWith('http')) {
        return imagePath;
      }
      // Prepend the VITE_API_IMAGE_URL and ensure no double slashes
      return `${VITE_API_IMAGE_URL}/${imagePath.replace(/^\/+/, '')}`;
    };

    // 1️⃣ Fetch images + normalize details when modal opens
    fetch(`${API_BASE_URL}/api/explore-plants/plants/${plant.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch plant details');
        return res.json() as Promise<DetailedPlantResponse>;
      })
      .then(json => {
        // build full URLs for each image using VITE_API_IMAGE_URL
        setImages(json.plant_images.map(pi => getFullImageUrl(pi.image_path))); // <-- IMPORTANT CHANGE HERE
        // normalize detail keys to camelCase
        setDetails(
          Object.fromEntries(
            Object.entries(json.details).map(([k, v]) => [toCamel(k), v])
          )
        );
      })
      .catch(err => console.error(err));
  }, [plant.id, API_BASE_URL, VITE_API_IMAGE_URL]); // Add VITE_API_IMAGE_URL to dependency array

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
      <div className="fixed inset-0 z-50 overflow-y-auto border-2">
        {/* backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-opacity-75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* modal container */}
        <div className="flex items-center justify-center min-h-screen p-4 ">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative   bg-[var(--color-navFootBG)]  rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden  shadow-2xl border-4 border-[var(--color-webBg)]"
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
                    // pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop
                    className={`${isMobile ? 'h-64' : 'h-[400px]'} w-full rounded-lg overflow-hidden shadow-lg`}
                  >
                    {images.map((src, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={src} // This `src` now correctly holds the full image URL
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
                    className="text-2xl text-center md:text-3xl font-bold mb-6 text-white bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text"
                  >
                    {plant.name}
                  </motion.h2>

                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                    {infoItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className=" bg-[var(--color-webBg)] p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
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
                className="mt-8    bg-[var(--color-webBg)] p-6 rounded-xl border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-blue-100 text-[#363D44] mr-3">
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
              <div className="mt-8    bg-[var(--color-webBg)] p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* contact info */}
                  <div className="md:w-1/2">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center mr-4">
                        <img src={CompanyLogo} alt="Logo" />
                      </div>
                      <h3 className="text-xl font-bold text-[#363D44]">{plant.name}</h3>
                    </div>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mt-1 mr-3 text-[#363D44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <svg className="w-5 h-5 mt-1 mr-3 text-[#363D44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <svg className="w-5 h-5 mt-1 mr-3 text-[#363D44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="mt-6    bg-[var(--color-webBg)] p-6 rounded-xl border border-gray-200 shadow-sm">
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