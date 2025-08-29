// // Components/Laboratory/LabIntroSection.tsx
// import React from "react";
// import sideImage1 from "../../assets/laboratory/Ban_Tushuka_USAID (48).jpg";
// import sideImage2 from "../../assets/laboratory/Ban_Tushuka_USAID (42).jpg";
// import sideImage3 from "../../assets/laboratory/Ban_Tushuka_USAID (25).jpg";
// import sideImage4 from "../../assets/laboratory/Ban_Tushuka_USAID (55).jpg";
// interface LabIntroSectionProps {
//   title: string;
//   paragraphs: string[];
//   image: string;
//   bgColor?: string;
// }

// const LabIntroSection: React.FC<LabIntroSectionProps> = ({
//   title,
//   paragraphs,
//   image,
//   bgColor = "bg-white",
// }) => {
//   return (
//     // <section
//     //   className={`py-12 sm:py-16 md:py-20 lg:py-24  ${bgColor} relative z-10`}
//     // >
//     //   `
//     //   <div className="container mx-auto px-4 sm:px-6 lg:px-8  ">
//     //     <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
//     //            {/* Image */}
//     //       <div
//     //         className="relative animate-fade-in-right flex justify-center"
//     //         style={{ animationDelay: "400ms" }}
//     //       >
//     //         <div
//     //           className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-in-out 
//     //               max-w-sm sm:max-w-md md:max-w-lg mx-auto"
//     //         >
//     //           <img
//     //             src={image}
//     //             alt="Laboratory Equipment"
//     //             className="w-full h-[220px] sm:h-[300px] md:h-[350px] object-cover filter brightness-90"
//     //           />
//     //           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
//     //         </div>
//     //         {/* <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full z-0 animate-bounce-slow"></div> */}
//     //       </div>
          
//     //       {/* Text Content */}
//     //       <div
//     //         className="space-y-4 sm:space-y-6 animate-fade-in-left"
//     //         style={{ animationDelay: "200ms" }}
//     //       >
//     //         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
//     //           {title}
//     //         </h2>
//     //         <div className="space-y-4">
//     //           {paragraphs.map((paragraph, index) => (
//     //             <p
//     //               key={index}
//     //               className="text-base sm:text-lg text-gray-600 leading-relaxed"
//     //             >
//     //               {paragraph}
//     //             </p>
//     //           ))}
//     //         </div>
//     //       </div>

     
//     //     </div>
//     //   </div>



//     // </section>

//  <div className="relative w-full  overflow-visible ">
//     {/* Top Polygon */}
// <div
//   className="absolute bottom-[1px] left-0 w-full h-96 bg-[#EEF2FF]"
//   style={{
//     clipPath: "polygon(100% 100%, 0 0, 0 100%)",
//   }}
// />

//     {/* Bottom Polygon */}
 
// {/* <div
//   className="absolute top-[-230px] left-0 w-full h-60 bg-[#EEF2FF]"
//   style={{
//     clipPath: "polygon(100% 100%, 0 0, 0 100%)",
//   }}
// /> */}
 

//     {/* Content */}
//     <div className="relative container mx-auto px-4 py-12 z-30 ">
//       <section className="container mx-auto px-6 py-12  text-gray-800  ">
//   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//     {/* Image Gallery */}
//     <div className="grid grid-cols-2 gap-6">
//       {/* First Column */}
//       <div className="flex flex-col gap-6">
//         <div className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
//           <img 
//             src={sideImage1} 
//             alt="Tusuka Group Quality Image 1" 
//             className="w-full h-full object-cover" 
//           />
//         </div>
//         <div className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
//           <img 
//             src={sideImage2} 
//             alt="Tusuka Group Quality Image 2" 
//             className="w-full h-full object-cover" 
//           />
//         </div>
//       </div>

//       {/* Second Column */}
//       <div className="flex flex-col gap-6 mt-12 lg:mt-24">
//         <div className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
//           <img 
//             src={sideImage3} 
//             alt="Tusuka Group Quality Image 3" 
//             className="w-full h-full object-cover" 
//           />
//         </div>
//         <div className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
//           <img 
//             src={sideImage4} 
//             alt="Tusuka Group Quality Image 4" 
//             className="w-full h-full object-cover" 
//           />
//         </div>
//       </div>
//     </div>

//     {/* Content */}
//     <div className="">
//       <h2 className="text-4xl font-bold mb-6 text-blue-900">
//         Ensuring Excellence in Every Thread
//       </h2>
//       <p className="mb-4 text-lg text-gray-600">
//         At Tusuka Group, we believe that uncompromising quality is the foundation of global
//         trust. Our state-of-the-art laboratories are equipped with world-class testing facilities to
//         ensure that every fabric, trim, and garment meets international standards.
//       </p>
//       <p className="text-lg text-gray-600">
//         Tusuka has established its own in-house fabric and garment testing laboratory, built with
//         the latest technology and approved by multiple international accreditation bodies. Our
//         lab is fully equipped to test all types of fabrics, ensuring strict compliance with buyer and
//         global requirements.
//       </p>
//                 <div className="mt-8 flex flex-wrap gap-4">
//                 <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
//                   ISO 9001 Certified
//                 </div>
//                 <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
//                   Eco-Friendly Testing
//                 </div>
//                 <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
//                   Global Standards
//                 </div>
//                 </div>
  
//     </div>
//   </div>


// </section>
//       </div>
//       </div>

 
//   );
// };

// export default LabIntroSection;








// Components/Laboratory/LabIntroSection.tsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import sideImage1 from "../../assets/laboratory/Ban_Tushuka_USAID (48).jpg";
import sideImage2 from "../../assets/laboratory/Ban_Tushuka_USAID (42).jpg";
import sideImage3 from "../../assets/laboratory/Ban_Tushuka_USAID (25).jpg";
import sideImage4 from "../../assets/laboratory/Ban_Tushuka_USAID (55).jpg";

const LabIntroSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Variants for animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 3, ease: "easeOut" } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 3, ease: "easeOut" } },
  };

  return (
    <div className="relative w-full overflow-visible" ref={ref}>
      {/* Top Polygon */}
      <div
        className="absolute bottom-[1px] left-0 w-full h-96 bg-[#EEF2FF]"
        style={{
          clipPath: "polygon(100% 100%, 0 0, 0 100%)",
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 z-30">
        <section className="container mx-auto px-6 py-12 text-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Gallery */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-6"
            >
              {/* First Column */}
              <div className="flex flex-col gap-6">
                <motion.div variants={fadeInUp} className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={sideImage1}
                    alt="Tusuka Group Quality Image 1"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeInUp} className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={sideImage2}
                    alt="Tusuka Group Quality Image 2"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Second Column */}
              <div className="flex flex-col gap-6 mt-12 lg:mt-24">
                <motion.div variants={fadeInUp} className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={sideImage3}
                    alt="Tusuka Group Quality Image 3"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div variants={fadeInUp} className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={sideImage4}
                    alt="Tusuka Group Quality Image 4"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className=""
            >
              <h2 className="text-4xl font-bold mb-6 text-blue-900">
                Ensuring Excellence in Every Thread
              </h2>
              <p className="mb-4 text-lg text-gray-600">
                At Tusuka Group, we believe that uncompromising quality is the foundation of
                global trust. Our state-of-the-art laboratories are equipped with world-class testing
                facilities to ensure that every fabric, trim, and garment meets international
                standards.
              </p>
              <p className="text-lg text-gray-600">
                Tusuka has established its own in-house fabric and garment testing laboratory,
                built with the latest technology and approved by multiple international
                accreditation bodies. Our lab is fully equipped to test all types of fabrics,
                ensuring strict compliance with buyer and global requirements.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  ISO 9001 Certified
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  Eco-Friendly Testing
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  Global Standards
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LabIntroSection;
