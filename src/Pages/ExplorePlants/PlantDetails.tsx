// // src/Pages/ExplorePlants/PlantDetails.tsx
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useExplorePlants } from '../../hooks/useExplorePlantsHooks';
// import PlantImageSlider from '../../Components/ExplorePlantComponent/PlantImageSlider';
// import logoImg from '../../assets/Tusuka_Logo_tr.png';
// // Import icons
// import { FaUsers, FaIndustry, FaChartLine, FaRulerCombined } from 'react-icons/fa';
// import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';

// const PlantDetails: React.FC = () => {
//  const { plantId } = useParams<{ plantId: string }>();
//   const data = useExplorePlants();

//   if (!data) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
//     </div>
//   );

//   const plant = data.units.flatMap(unit => unit.plants).find(p => p.id === plantId);

//   if (!plant) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <h2 className="text-2xl text-gray-600">Plant not found</h2>
//     </div>
//   );


//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="pt-16">
//         <PlantImageSlider images={plant.images} title={plant.name} />
//       </div>

//       {/* Plant Overview Section */}
//       <motion.section
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="container mx-auto px-4 py-12"
//       >
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="text-center mb-12"
//         >
//           <p className="text-gray-500 font-medium mb-4">PLANT OVERVIEW</p>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
//             {plant.name}
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             {/* {plant.shortDescription} */}
//           </p>
//         </motion.div>

//         {/* Stats Grid - Two Columns Layout */}
//         <div className="grid md:grid-cols-2 gap-8 mb-16">
//           {/* Left Column */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.5 }}
//             className="space-y-6"
//           >
//             <StatsCard
//               icon={<FaUsers className="text-4xl text-blue-500" />}
//               title="Total Employees"
//               value={plant.details.employees ?? 'N/A'}
//               description="Skilled workforce dedicated to quality production"
//             />
//             <StatsCard
//               icon={<FaIndustry className="text-4xl text-green-500" />}
//               title="Production Lines"
//               value={
//                 typeof plant.details.lines === 'object'
//                   ? Object.entries(plant.details.lines)
//                       .map(([k, v]) => `${k}: ${v}`)
//                       .join(', ')
//                   : plant.details.lines
//               }
//               description="State-of-the-art production facilities"
//             />
//           </motion.div>

//           {/* Right Column */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.7 }}
//             className="space-y-6"
//           >
//             <StatsCard
//               icon={<FaChartLine className="text-4xl text-purple-500" />}
//               title="Daily Capacity"
//               value={
//                 typeof plant.details.capacity === 'object'
//                   ? Object.entries(plant.details.capacity)
//                       .map(([k, v]) => `${k}: ${v}`)
//                       .join(', ')
//                   : plant.details.capacity
//               }
//               description="Optimized production capacity"
//             />
//             <StatsCard
//               icon={<FaRulerCombined className="text-4xl text-orange-500" />}
//               title="Total Space"
//               value={plant.details.space}
//               description="Modern facility with extensive manufacturing space"
//             />
//           </motion.div>
//         </div>

//         {/* Location Section */}
//         <div className="relative w-full">
//           <motion.div
//             className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <iframe
//               src={plant.details.locationEmbed}
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               allowFullScreen
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               className="w-full h-full rounded-lg"
//             />
//           </motion.div>

//           {/* Location Info Box */}
//           <motion.div
//             className="relative md:absolute 
//                       w-full md:w-[400px] lg:w-[450px]
//                       mt-4 md:mt-0
//                       md:right-0 md:top-1/2 md:-translate-y-1/2
//                       bg-[#8DCF9B] text-white 
//                       p-6 sm:p-8 lg:p-10
//                       rounded-lg shadow-xl"
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             <motion.img
//               src={logoImg}
//               alt="Company Logo"
//               className="h-8 mb-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.8 }}
//             />

//             <motion.div className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <MdLocationOn className="text-2xl" />
//                 <div>
//                   <h3 className="text-xl font-bold">Location</h3>
//                   <p className="text-lg">{plant.details.address}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <MdPhone className="text-2xl" />
//                 <div>
//                   <h3 className="text-xl font-bold">Contact</h3>
//                   <p className="text-lg">+8809666722222</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <MdEmail className="text-2xl" />
//                 <div>
//                   <h3 className="text-xl font-bold">Email</h3>
//                   <p className="text-lg">info@tusuka.com</p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// const StatsCard = ({ 
//   icon, 
//   title, 
//   value, 
//   description 
// }: { 
//   icon: React.ReactNode;
//   title: string; 
//   value: string | number;
//   description: string;
// }) => (
//   <motion.div
//     whileHover={{ y: -5 }}
//     className="bg-white p-8 rounded-xl shadow-lg"
//   >
//     <div className="flex items-start space-x-4">
//       <div className="flex-shrink-0">
//         {icon}
//       </div>
//       <div>
//         <h3 className="text-gray-500 text-lg font-medium mb-2">{title}</h3>
//         <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
//         <p className="text-gray-600">{description}</p>
//       </div>
//     </div>
//   </motion.div>
// );

// export default PlantDetails;