// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import type { SliderImage } from '../../types/about'

// interface AboutHeroProps {
//   title: string
//   tagline: string
//   introduction: string
//   sliderImages: SliderImage[]
//   bgColor?: string
//   ctaText?: string
//   onCtaClick?: () => void
// }

// const SketchfabEmbed: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
//         <iframe
//           title="Jeans Jacket Stylish Decorated"
//           frameBorder="0"
//           allowFullScreen
//           mozallowfullscreen="true"
//           webkitallowfullscreen="true"
//           allow="autoplay; fullscreen; xr-spatial-tracking"
//           xr-spatial-tracking
//           executionWhileOutOfViewport
//           executionWhileNotRendered
//           webShare
//           className="w-full h-full"
//           src="https://sketchfab.com/models/536937463a974239b3e772cabe0a738a/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_theme=dark"
//         />
//       </div>
//       <p className="mt-2 text-sm font-normal text-gray-600 text-center">
//         <a 
//           href="https://sketchfab.com/3d-models/jeans-jacket-stylish-decorated-536937463a974239b3e772cabe0a738a?utm_medium=embed&utm_campaign=share-popup&utm_content=536937463a974239b3e772cabe0a738a" 
//           target="_blank" 
//           rel="nofollow noopener noreferrer"
//           className="font-bold text-blue-500 hover:text-blue-700"
//         >
//           Jeans Jacket Stylish Decorated
//         </a> by 
//         <a 
//           href="https://sketchfab.com/Polygonal_Miniatures?utm_medium=embed&utm_campaign=share-popup&utm_content=536937463a974239b3e772cabe0a738a" 
//           target="_blank" 
//           rel="nofollow noopener noreferrer"
//           className="font-bold text-blue-500 hover:text-blue-700"
//         >
//           Polygonal Miniatures
//         </a> on 
//         <a 
//           href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=536937463a974239b3e772cabe0a738a" 
//           target="_blank" 
//           rel="nofollow noopener noreferrer"
//           className="font-bold text-blue-500 hover:text-blue-700"
//         >
//           Sketchfab
//         </a>
//       </p>
//     </div>
//   );
// };

// const AboutHero: React.FC<AboutHeroProps> = ({
//   title,
//   tagline,
//   introduction,
//   sliderImages,
//   bgColor = 'bg-white',
//   ctaText = 'Explore Our Story',
//   onCtaClick,
// }) => {
//   const [showFull, setShowFull] = useState(false);
//   const charLimit = 200;

//   const isLongText = introduction.length > charLimit;
//   const displayedText = showFull ? introduction : introduction.slice(0, charLimit) + (isLongText ? '...' : '');

//   const largeTitleClasses = "text-[1rem] md:text-[2rem] lg:text-[4rem] font-extrabold text-gray-200 opacity-90 uppercase";
//   const smallTitleClasses = "absolute top-0 left-0 text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 uppercase whitespace-nowrap";
  

//   return (
//     <section className={`${bgColor} py-12`}>
//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className="space-y-6">
//             <div className="relative w-fit">
//               {/* Background/Faded Large Text */}
//               <h2 className={largeTitleClasses}>
//                 {title}
//               </h2>

//               {/* Foreground/Prominent Smaller Text - positioned at the same starting point */}
//               <h2 className={smallTitleClasses}>
//                 {title}
//               </h2>
//             </div>
            
//             <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600">{tagline}</h2>

//             <p className="text-base md:text-lg text-gray-600">
//               {displayedText}
//               {isLongText && (
//                 <Link to="/about">
//                   <button
//                     className="ml-2 text-indigo-600 hover:underline text-sm font-medium"
//                   >
//                     {showFull ? 'See Less' : 'See More'}
//                   </button>
//                 </Link>
//               )}
//             </p>

//             <Link to="/about">
//               <button
//                 onClick={onCtaClick}
//                 className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
//               >
//                 {ctaText}
//               </button>
//             </Link>
//           </div>

//           <div className="w-full mt-6 md:mt-0">
//             <SketchfabEmbed />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(AboutHero);



import React, { useState, useRef } from "react";
import type { SliderImage } from "../../types/about";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Brandlogo3 from "../../assets/homeban55.jpg";
import Brandlogo4 from "../../assets/homeban3.jpg";

interface AboutHeroProps {
  title: string;
  tagline: string;
  introduction: string;
  sliderImages: SliderImage[];
  bgColor?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const AboutHero: React.FC<AboutHeroProps> = ({
  title,
  tagline,
  introduction,
  sliderImages,
  bgColor = "bg-white",
  ctaText = "Read More",
  onCtaClick,
}) => {
  const [showFull, setShowFull] = useState(false);
  const charLimit = 350;

  const isLongText = introduction.length > charLimit;
  const displayedText = showFull
    ? introduction
    : introduction.slice(0, charLimit) + (isLongText ? "..." : "");

  // 👇 Ref + InView hook
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 3, ease: "easeOut" } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 3, ease: "easeOut" } },
  };

  return (
    <section
      ref={ref}
      className={`${bgColor} py-12 lg:py-16 md:py-14 sm:py-12`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Text Side */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <div className="relative w-fit">
              {/* Background Large Text */}
              <h2 className="text-[1rem] md:text-[2rem] lg:text-[4rem] font-extrabold text-gray-200 opacity-90 uppercase">
                {title}
              </h2>
              {/* Foreground Small Text */}
              <h2 className="absolute top-1/2 left-30 md-left-20 -translate-x-1/2 -translate-y-1/2
                   text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 text-left
                   whitespace-nowrap uppercase">
                {/* {title} */}
              </h2>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-[#20409A]">
              {tagline}
            </h2>

            <p className="text-base md:text-lg text-gray-600">
              {displayedText}
              {isLongText && (
                <button
                  onClick={() => setShowFull(!showFull)}
                  className="ml-2 text-[#20409A] hover:underline text-sm font-medium"
                >
                  {showFull ? "See Less" : "See More"}
                </button>
              )}
            </p>

            <Link to="/about">
              <button
                onClick={onCtaClick}
                className="px-6 py-3 bg-[#20409A] text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                {ctaText}
              </button>
            </Link>
          </motion.div>

          {/* Right Image Side */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full mt-6 md:mt-0 relative"
          >
            {/* Main Background Image */}
            <img
              src={Brandlogo3}
              alt="Main"
              className="w-full h-96 object-cover shadow-xl rounded-lg brightness-100"
            />

            {/* Small Overlay Image */}
            <img
              src={Brandlogo4}
              alt="Overlay"
              className="
                absolute 
                -bottom-8 -right-4 w-40 h-28
                sm:-bottom-10 sm:-right-6 sm:w-48 sm:h-40
                md:-bottom-12 md:-right-8 md:w-56 md:h-48
                lg:-bottom-10 lg:-right-4 lg:w-52 lg:h-35
                xl:-bottom-16 xl:-right-8 xl:w-64 xl:h-35
                object-cover shadow-lg rounded-lg border-2 border-[#20409A] brightness-100
              "
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(AboutHero);
