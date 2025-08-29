import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import banVideo from "../assets/TusukaBanner.mp4";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import NewsTicker from "./NewsTicker";

const slides = [
  {
    title: "Crafting Denim Excellence",
    highlight: "with",
    year: "Passion.",
    desc: "World-class jeans manufacturing, delivering quality and style on time.",
    buttonText: "Explore More",
  },
  {
    title: "From Denim",
    highlight: "to",
    year: "Dreams.",
    desc: "Trusted partner in fashion, innovation, and global connectivity.",
    buttonText: "Discover Us",
  },
  {
    title: "Fashion Forward",
    highlight: "Driven",
    year: "by Innovation.",
    desc: "Sustainable, stylish, and smart solutions for modern lifestyles.",
    buttonText: "Our Vision",
  },
  {
    title: "Beyond Clothing",
    highlight: "We",
    year: "Fly.",
    desc: "Proud creators of Tusuka garments and NOVOAIR airline services.",
    buttonText: "See Journey",
  },
  {
    title: "Quality Jeans",
    highlight: "Trusted",
    year: "Worldwide.",
    desc: "Fashioned with care, delivered with precision and excellence.",
    buttonText: "Our Products",
  },
];


const HeroBanner2: React.FC = () => {
  const [isPlayingBackgroundVideo, setIsPlayingBackgroundVideo] =
    useState(true);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (backgroundVideoRef.current) {
      if (isPlayingBackgroundVideo) {
        backgroundVideoRef.current.play();
      } else {
        backgroundVideoRef.current.pause();
      }
    }
  }, [isPlayingBackgroundVideo]);

  useEffect(() => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.muted = true;
      backgroundVideoRef.current.playsInline = true;
      backgroundVideoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        setIsPlayingBackgroundVideo(false);
      });
    }
  }, []);

  const toggleBackgroundVideoPlay = () => {
    setIsPlayingBackgroundVideo((prev) => !prev);
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden cursor-pointer select-none"
      onClick={toggleBackgroundVideoPlay} // ✅ whole section clickable
    >
      {/* Background Video */}
      <video
        ref={backgroundVideoRef}
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100 blur-[1px] brightness-90"
        src={banVideo}
        loop
      >
        Your browser does not support the video tag.
      </video>

      {/* Swiper Content */}
      <div className="absolute inset-0 flex items-center justify-start z-10 px-4 sm:px-8">
        <Swiper
          spaceBetween={30}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          // pagination={{ clickable: true }}
          modules={[Autoplay]}
          className="w-full  "
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>

   <div
                className="container mx-auto  "
              
              >
                {/* <div className="absolute inset-0 bg-[#1B1E35]/40  "></div> */}
                <div className="px-4 py-14 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 w-full">
                  {/* Left Side - Text */}
                  <motion.div
                    className="flex flex-col justify-center space-y-6 text-left text-white"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="max-w-prose text-left p-12"
                      style={{
                  // background: "rgba(185, 206, 227, 0.46)",
                  background: " rgba(4, 3, 18, 0.19)",
                  // background: "rgb(255 255 255 / 31%)",

                  // background: "  rgba(110, 109, 120, 0.49)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(5px)",
                  // border: "1px solid rgba(185, 206, 227, 0.3)",
                }}
                    >
                      <h1 className="font-bold text-white text-6xl uppercase">
                        {slide.title}{" "}
                        <strong className="text-[#20409A]">
                          {slide.highlight}
                        </strong>{" "}
                        {slide.year}
                      </h1>

                      <p className="mt-4 text-base text-pretty text-gray-300 sm:text-lg/relaxed">
                        {slide.desc}
                      </p>

                      <div className="mt-4 flex gap-4 sm:mt-6">
                        {/* <a
                          className="inline-block rounded border border-[#20409A] bg-[#20409A] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#05038f] xl:text-xl lg:text-lg "
                          href="#"
                          onClick={(e) => e.stopPropagation()} // ✅ don’t pause when clicking link
                        >
                          {slide.buttonText}
                        </a> */}
                        {/* <a
                          className="inline-block rounded border border-[#f2f2f5] hover:border-[#20409A] bg-[#e3e8f5] px-5 py-3 font-medium text-[#20409A] shadow-sm transition-colors hover:bg-[#20409A] xl:text-xl lg:text-lg hover:text-white"
                          href="#"
                          onClick={(e) => e.stopPropagation()} // ✅ don’t pause when clicking link
                        >
                          Watch Video
                        </a> */}
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Side - Video Play/Pause Icon */}
                  {/* <motion.div
                    className="flex items-center justify-center lg:justify-end"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="relative group">
                      <motion.div
                        className="absolute inset-0 bg-[#040270] bg-opacity-70 rounded-full animate-pulse"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 0.3, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="relative z-10 bg-[#040270] opacity-50 text-gray-200 p-6 md:p-8 lg:p-10 rounded-full shadow-2xl group-hover:shadow-[#040270]/50 transition-all duration-300">
                        {isPlayingBackgroundVideo ? (
                          <FaPause className="text-2xl md:text-3xl lg:text-4xl" />
                        ) : (
                          <FaPlay className="text-2xl md:text-3xl lg:text-4xl" />
                        )}
                      </div>
                    </div>
                  </motion.div> */}
                </div>
              </div>



              {/* <div
                className="container mx-auto lg:p-8 "
                style={{
                  // background: "rgba(185, 206, 227, 0.46)",
                  background: " rgba(4, 3, 18, 0.19)",
                  // background: "  rgba(110, 109, 120, 0.49)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(5px)",
                  // border: "1px solid rgba(185, 206, 227, 0.3)",
                }}
              >
                
                <div className="px-4 py-14 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 w-full">
                    
                  <motion.div
                    className="flex flex-col justify-center space-y-6 text-left text-white"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="max-w-prose text-left">
                      <h1 className="font-bold text-white text-6xl uppercase">
                        {slide.title}{" "}
                        <strong className="text-[#20409A]">
                          {slide.highlight}
                        </strong>{" "}
                        {slide.year}
                      </h1>

                      <p className="mt-4 text-base text-pretty text-gray-300 sm:text-lg/relaxed">
                        {slide.desc}
                      </p>

                      <div className="mt-4 flex gap-4 sm:mt-6">
                        <a
                          className="inline-block rounded border border-[#20409A] bg-[#20409A] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#05038f] xl:text-xl lg:text-lg "
                          href="#"
                          onClick={(e) => e.stopPropagation()} // ✅ don’t pause when clicking link
                        >
                          {slide.buttonText}
                        </a>
                     
                      </div>
                    </div>
                  </motion.div>
 
                  <motion.div
                    className="flex items-center justify-center lg:justify-end"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="relative group">
                      <motion.div
                        className="absolute inset-0 bg-[#040270] bg-opacity-70 rounded-full animate-pulse"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 0.3, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="relative z-10 bg-[#040270] opacity-50 text-gray-200 p-6 md:p-8 lg:p-10 rounded-full shadow-2xl group-hover:shadow-[#040270]/50 transition-all duration-300">
                        {isPlayingBackgroundVideo ? (
                          <FaPause className="text-2xl md:text-3xl lg:text-4xl" />
                        ) : (
                          <FaPlay className="text-2xl md:text-3xl lg:text-4xl" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div> */}
            </SwiperSlide>
          ))}
        </Swiper>

        
      </div>
         <div className="absolute bottom-0 left-0 w-full z-20">
        <NewsTicker />
      </div>
    </section>
  );
};

export default HeroBanner2;




// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { FaPlay, FaPause } from "react-icons/fa";
// import banVideo from "../assets/TusukaBanner.mp4";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination, Autoplay } from "swiper/modules";

// const slides = [
//   {
//     title: "We make your Clothes",
//     highlight: "Since",
//     year: "1990.",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident accusamus impedit minima harum corporis iusto.",
//     buttonText: "See Details",
//   },
//   {
//     title: "Innovative Solutions",
//     highlight: "for",
//     year: "Fashion.",
//     desc: "Cutting-edge technology empowering your fashion business to grow faster.",
//     buttonText: "Learn More",
//   },
//   {
//     title: "Creative Designs",
//     highlight: "with",
//     year: "Impact.",
//     desc: "Designs that tell stories and connect emotionally with your audience.",
//     buttonText: "Our Portfolio",
//   },
// ];

// const HeroBanner2: React.FC = () => {
//   const [isPlayingBackgroundVideo, setIsPlayingBackgroundVideo] = useState(true);
//   const backgroundVideoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (backgroundVideoRef.current) {
//       if (isPlayingBackgroundVideo) {
//         backgroundVideoRef.current.play();
//       } else {
//         backgroundVideoRef.current.pause();
//       }
//     }
//   }, [isPlayingBackgroundVideo]);

//   useEffect(() => {
//     if (backgroundVideoRef.current) {
//       backgroundVideoRef.current.muted = true;
//       backgroundVideoRef.current.playsInline = true;
//       backgroundVideoRef.current.play().catch((error) => {
//         console.log("Autoplay prevented:", error);
//         setIsPlayingBackgroundVideo(false);
//       });
//     }
//   }, []);

//   const toggleBackgroundVideoPlay = () => {
//     setIsPlayingBackgroundVideo((prev) => !prev);
//   };

//   return (
//     <section
//       className="relative w-full h-screen overflow-hidden cursor-pointer select-none"
//       onClick={toggleBackgroundVideoPlay}
//     >
//       {/* Background Video */}
//       <video
//         ref={backgroundVideoRef}
//         className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100 blur-[3px] brightness-70"
//         src={banVideo}
//         loop
//       >
//         Your browser does not support the video tag.
//       </video>

//       {/* Shared Glass Background Shape */}
//       <div className="absolute inset-0 flex items-center justify-start z-10 px-4 sm:px-8">
//         <div
//           className="container mx-auto lg:p-8"
//           style={{
//             background: "rgba(185, 206, 227, 0.46)",
//             borderRadius: "16px",
//             boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//             backdropFilter: "blur(5px)",
//             WebkitBackdropFilter: "blur(5px)",
//           }}
//         >
//           {/* Swiper Inside One Shared Shape */}
//           <Swiper
//             spaceBetween={30}
//             loop
//             autoplay={{ delay: 5000, disableOnInteraction: false }}
//             pagination={{ clickable: true }}
//             modules={[Autoplay, Pagination]}
//             className="w-full"
//           >
//             {slides.map((slide, index) => (
//               <SwiperSlide key={index}>
//                 <div className="px-4 py-14 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 w-full">
//                   {/* Left Side - Text */}
//                   <motion.div
//                     className="flex flex-col justify-center space-y-6 text-left text-white"
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6 }}
//                   >
//                     <div className="max-w-prose text-left">
//                       <h1 className="font-bold text-white text-6xl uppercase">
//                         {slide.title}{" "}
//                         <strong className="text-[#20409A]">{slide.highlight}</strong>{" "}
//                         {slide.year}
//                       </h1>

//                       <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
//                         {slide.desc}
//                       </p>

//                       <div className="mt-4 flex gap-4 sm:mt-6">
//                         <a
//                           className="inline-block rounded border border-[#20409A] bg-[#20409A] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#05038f] xl:text-xl lg:text-lg"
//                           href="#"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           {slide.buttonText}
//                         </a>
//  <a
//                           className="inline-block rounded border border-[#f2f2f5] bg-[#e3e8f5] px-5 py-3 font-medium text-[#20409A] shadow-sm transition-colors hover:bg-[#20409A] xl:text-xl lg:text-lg hover:text-white"
//                           href="#"
//                           onClick={(e) => e.stopPropagation()} // ✅ don’t pause when clicking link
//                         >
//                           Watch Video
//                         </a>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Right Side - Play/Pause Icon */}
//                   <motion.div
//                     className="flex items-center justify-center lg:justify-end"
//                     initial={{ opacity: 0, x: 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6 }}
//                   >
//                     <div className="relative group">
//                       <motion.div
//                         className="absolute inset-0 bg-[#040270] bg-opacity-70 rounded-full animate-pulse"
//                         initial={{ scale: 1, opacity: 0 }}
//                         animate={{
//                           scale: [1, 1.2, 1],
//                           opacity: [0.6, 0.3, 0.6],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                         }}
//                       />
//                       <div className="relative z-10 bg-[#040270] opacity-50 text-gray-200 p-6 md:p-8 lg:p-10 rounded-full shadow-2xl group-hover:shadow-[#040270]/50 transition-all duration-300">
//                         {isPlayingBackgroundVideo ? (
//                           <FaPause className="text-2xl md:text-3xl lg:text-4xl" />
//                         ) : (
//                           <FaPlay className="text-2xl md:text-3xl lg:text-4xl" />
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner2;









// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaPlay,
//   FaPause,
//   FaFacebookF,
//   FaTwitter,
//   FaLinkedinIn,
//   FaInstagram,
// } from "react-icons/fa";
// // import { FiSettings } from 'react-icons/fi';

// import banVideo from "../assets/TusukaBanner.mp4";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-creative";

// import { Pagination, Autoplay } from "swiper/modules";
// const slides = [
//   {
//     title: "Innovative Solutions",
//     tagline: "Empowering your business with cutting-edge technology.",
//     buttonText: "Learn More",
//   },
//   {
//     title: "Creative Design",
//     tagline: "Designs that speak for your brand.",
//     buttonText: "Our Portfolio",
//   },
//   {
//     title: "Reliable Support",
//     tagline: "Always here to help you grow.",
//     buttonText: "Contact Us",
//   },
// ];

// const HeroBanner2: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPlayingBackgroundVideo, setIsPlayingBackgroundVideo] =
//     useState(true);
//   const backgroundVideoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (backgroundVideoRef.current) {
//       if (isPlayingBackgroundVideo) {
//         backgroundVideoRef.current.play();
//       } else {
//         backgroundVideoRef.current.pause();
//       }
//     }
//   }, [isPlayingBackgroundVideo]);

//   useEffect(() => {
//     if (backgroundVideoRef.current) {
//       backgroundVideoRef.current.muted = true;
//       backgroundVideoRef.current.playsInline = true;
//       backgroundVideoRef.current.play().catch((error) => {
//         console.log("Autoplay prevented:", error);
//         setIsPlayingBackgroundVideo(false);
//       });
//     }
//   }, []);

//   const toggleBackgroundVideoPlay = () => {
//     setIsPlayingBackgroundVideo((prev) => !prev);
//   };

//   return (
//     // <section className="relative w-full lg:h-[80vh] md:h-[40vh] sm:h-[25vh] overflow-hidden">
//     <section className="relative w-full h-screen md:h-[100vh]  sm:h-[40vh] overflow-hidden">
//       {/* Background Video */}
//       <video
//         ref={backgroundVideoRef}
//         className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100 blur-[3px] brightness-70"
//         //         className="absolute inset-0 w-full h-full object-cover object-center z-0 "
//         src={banVideo}
//         loop
//       >
//         Your browser does not support the video tag.
//       </video>

//       {/* Main Content */}
//       <div className="absolute inset-0 flex items-center justify-start z-10 px-4 sm:px-8">
//         <div
//           className="container mx-auto lg:p-8 "
//           style={{
//             background: "rgba(185, 206, 227, 0.46)",
//             borderRadius: "16px",
//             boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//             backdropFilter: "blur(5px)",
//             WebkitBackdropFilter: "blur(5px)",
//             border: "1px solid rgba(185, 206, 227, 0.3)",
//           }}
//         >
//           <div className="   px-4 py-14 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 w-full">
//             {/* Left Side - Swiper Text */}
//             <motion.div
//               className="flex flex-col justify-center space-y-6 text-left     text-white"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="max-w-prose text-left">
//                 <h1 className="  font-bold text-white  text-6xl uppercase">
//                   We make your Clothes
//                   <strong className="text-[#20409A]"> Since </strong>1990.
//                 </h1>

//                 <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                   Eaque, nisi. Natus, provident accusamus impedit minima harum
//                   corporis iusto.
//                 </p>

//                 <div className="mt-4 flex gap-4 sm:mt-6">
//                   <a
//                     className="inline-block rounded border border-[#20409A] bg-[#20409A] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#05038f] xl:text-xl lg:text-lg "
//                     href="#"
//                   >
//                     See Details
//                   </a>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Side - Video Play/Pause */}
//             <motion.div
//               className="flex items-center justify-center lg:justify-end"
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <motion.button
//                 className="relative group"
//                 onClick={toggleBackgroundVideoPlay}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.div
//                   className="absolute inset-0 bg-[#040270] bg-opacity-70 rounded-full animate-pulse"
//                   initial={{ scale: 1, opacity: 0 }}
//                   animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.3, 0.6] }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 />
//                 <div className="relative z-10 bg-[#040270] opacity-50 text-gray-200 p-6 md:p-8 lg:p-10 rounded-full shadow-2xl group-hover:shadow-[#040270]/50 transition-all duration-300">
//                   {isPlayingBackgroundVideo ? (
//                     <FaPause className="text-2xl md:text-3xl lg:text-4xl" />
//                   ) : (
//                     <FaPlay className="text-2xl md:text-3xl lg:text-4xl" />
//                   )}
//                 </div>
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner2;

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaPlay, FaPause, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
// import { FiSettings } from 'react-icons/fi';
// import banVideo from '../assets/TusukaBanner.mp4';
// // import LogoMoving from './LogoMoving';
// // import { Link } from 'react-router-dom';

// const videoUrl = banVideo;

// const HeroBanner2: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPlayingBackgroundVideo, setIsPlayingBackgroundVideo] = useState(true);
//   const backgroundVideoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (backgroundVideoRef.current) {
//       if (isPlayingBackgroundVideo) {
//         backgroundVideoRef.current.play();
//       } else {
//         backgroundVideoRef.current.pause();
//       }
//     }
//   }, [isPlayingBackgroundVideo]);

//   useEffect(() => {
//     if (backgroundVideoRef.current) {
//       backgroundVideoRef.current.muted = true;
//       backgroundVideoRef.current.playsInline = true;
//       backgroundVideoRef.current.play().catch(error => {
//         console.log("Autoplay prevented:", error);
//         setIsPlayingBackgroundVideo(false);
//       });
//     }
//   }, []);

//   const toggleBackgroundVideoPlay = () => {
//     setIsPlayingBackgroundVideo((prev) => !prev);
//   };

//   return (
//     <div>
//     <section className="relative  w-full lg:h-[80vh] md:h-[40vh] sm:h-[25vh] overflow-hidden">
//       {/* Background Video */}
//       <video
//         ref={backgroundVideoRef}
//         // className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-100 blur-[1px] brightness-80"
//         className="absolute inset-0 w-full h-full object-cover object-center z-0 "
//         src={videoUrl}
//         loop
//       >
//         Your browser does not support the video tag.
//       </video>

//       {/* Main Content Area - Refined Positioning */}
//       <div className=" absolute inset-0 flex items-center justify-start z-10 px-4 sm:px-8">
//         <div className=" container mx-auto  bg-transparent  p-4 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24   w-full  ">
//           {/* Left Side - Text Content */}
//           <motion.div
//             className="flex flex-col justify-center space-y-6 text-left pl-4 lg:pl-12"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             {/* Heading */}
//             <motion.h2
//               className="text-white font-BeatriceTRIAL_bold   text-3xl sm:text-4xl md:text-5xl leading-tight"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.6 }}
//             >
//               {/* From Bangladesh to the World – <br />Quality You Can Count On. */}
//             </motion.h2>

//             {/* Paragraph */}
//             <motion.p
//               className="text-gray-200 max-w-xl text-base font-medium"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5, duration: 0.6 }}
//             >
//               {/* Tusuka: Engineered for Efficiency, Designed for the Future. */}
//             </motion.p>

//             {/* Call to Action Button */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7, duration: 0.6 }}
//             >
//           {/* <Link to="/contact-us" className="inline">     <button
//                 className="bg-[#040270] text-[#fef2ed] py-2 px-6 rounded-full font-bold hover:bg-blue-800 transition-colors"
//                 onClick={() => setIsModalOpen(true)}
//               >

//                 Learn More
//               </button></Link>  */}
//             </motion.div>
//           </motion.div>

//           {/* Right Side - Video Play Button with Glow Animation */}
//           <motion.div
//             className="flex items-center justify-center lg:justify-end"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <motion.button
//               className="relative group"
//               onClick={toggleBackgroundVideoPlay}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {/* Glow Effect */}
//               <motion.div
//                 className="absolute inset-0 bg-[#040270] bg-opacity-70 rounded-full animate-pulse"
//                 initial={{ scale: 1, opacity: 0 }}
//                 animate={{
//                   scale: [1, 1.2, 1],
//                   opacity: [0.6, 0.3, 0.6],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               />

//               {/* Main Button */}
//               <div
//                 className="relative z-10 bg-[#040270] opacity-50 text-gray-200 p-6 md:p-8 lg:p-10 rounded-full
//                 shadow-2xl group-hover:shadow-[#040270]/50 transition-all duration-300"
//               >
//                 {isPlayingBackgroundVideo ? (
//                   <FaPause className="text-2xl md:text-3xl lg:text-4xl" />
//                 ) : (
//                   <FaPlay className="text-2xl md:text-3xl lg:text-4xl" />
//                 )}
//               </div>
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Fixed Social Media Icons */}
//       <div className="fixed left-0 top-1/2 -translate-y-1/2 p-4 hidden md:flex flex-col space-y-4 bg-white/80 rounded-r-lg shadow-lg z-40">
//         <span className="transform -rotate-90 origin-bottom-left absolute top-1/2 left-0 -translate-x-1/2 translate-y-1/2 text-sm text-gray-500 font-semibold uppercase tracking-widest">
//           Follow Us
//         </span>
//         {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
//           <a
//             key={index}
//             href="#"
//             className="text-[#040270] hover:text-opacity-70 transition-colors"
//           >
//             <Icon className="h-5 w-5" />
//           </a>
//         ))}
//       </div>

//       {/* Fixed Settings Icon */}
//       <div className="fixed right-0 top-1/2 -translate-y-1/2 p-4 bg-[#040270] text-white rounded-l-lg shadow-lg z-40 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
//         <FiSettings className="h-6 w-6 animate-spin-slow" />
//       </div>

//       {/* Video Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsModalOpen(false)}
//           >
//             <motion.div
//               className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
//               initial={{ scale: 0.8, y: 50 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.8, y: 50 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 className="absolute top-4 right-4 text-white text-3xl z-10 hover:text-gray-300"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 &times;
//               </button>
//               <video
//                 className="w-full h-auto"
//                 src={videoUrl}
//                 controls
//                 autoPlay
//                 loop
//                 onEnded={() => setIsModalOpen(false)}
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//    </section>

//     </div>
//   );
// };

// export default HeroBanner2;
