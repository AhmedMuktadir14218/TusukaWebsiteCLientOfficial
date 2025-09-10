// // src/components/NewsCard.tsx
// import React from "react";
// import { motion } from "framer-motion";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// interface NewsCardProps {
//   image: string;
//   title: string;
//   description: string;
//   date: string;
// }


// const NewsCard: React.FC<NewsCardProps> = ({ image, title, description, date }) => {

// // helper function
// const hexToRgba = (hex: string, alpha = 1) => {
//   let clean = hex.replace("#", "");
//   if (clean.length === 3) {
//     clean = clean.split("").map((c) => c + c).join("");
//   }
//   const r = parseInt(clean.substring(0, 2), 16);
//   const g = parseInt(clean.substring(2, 4), 16);
//   const b = parseInt(clean.substring(4, 6), 16);
//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };


//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       viewport={{ once: true }}
//       className="relative w-full  overflow-hidden group pb-28"
//     >
//       {/* Image Full Size */}
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-78
//          object-cover transition-transform duration-500 group-hover:scale-105"
//       />

//       {/* Text Overlay (floating on image bottom) */}
//       <div className="absolute bottom-[-10px] left-0 right-0 p-5">
//         <div className="  shadow-lg p-5 "
//   style={{
//     backgroundColor: hexToRgba(getComputedStyle(document.documentElement).getPropertyValue('--color-cardBG'), 0.85),
//     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//     backdropFilter: "blur(5px)",
//     WebkitBackdropFilter: "blur(5px)",
//     border: "1px solid rgba(185, 206, 227, 0.3)",
//   }}   >
//           <h3 className="font-bold text-[var(--color-navFootText)] text-lg mb-2 leading-snug line-clamp-2">
//             {title}
//           </h3>
//           <p className="text-[var(--color-navFootText)] text-sm mb-3 line-clamp-3">
//             {description}
//           </p>

//           <div className="flex items-center text-[var(--color-navFootText)] text-xs font-medium">
//             <CalendarMonthIcon className="mr-1 text-sm" />
//             {date}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default NewsCard;




// src/components/NewsCard.tsx
// src/components/NewsCard.tsx
import React from "react";
import { motion } from "framer-motion";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface NewsCardProps {
  images: string[]; // multiple images
  title: string;
  description: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ images, title, description, date }) => {

  // helper function to convert hex → rgba
  const hexToRgba = (hex: string, alpha = 1) => {
    let clean = hex.replace("#", "");
    if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // get the last image
  const lastImage = images.length > 0 ? images[images.length - 1] : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full overflow-hidden group pb-28"
    >
      {/* Show only the last image */}
      {lastImage && (
        <img
          src={lastImage}
          alt={title}
          className="w-full h-78 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Text Overlay */}
      <div className="absolute bottom-[-10px] left-0 right-0 p-5">
        <div
          className="shadow-lg p-5"
          style={{
            backgroundColor: hexToRgba(getComputedStyle(document.documentElement).getPropertyValue('--color-cardBG'), 0.85),
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(185, 206, 227, 0.3)",
          }}
        >
          <h3 className="font-bold text-[var(--color-navFootText)] text-lg mb-2 leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="text-[var(--color-navFootText)] text-sm mb-3 line-clamp-3">
            {description}
          </p>

          <div className="flex items-center text-[var(--color-navFootText)] text-xs font-medium">
            <CalendarMonthIcon className="mr-1 text-sm" />
            {date}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
