// src/components/NewsCard.tsx
import React from "react";
import { motion } from "framer-motion";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface NewsCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, title, description, date }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full  overflow-hidden group pb-28"
    >
      {/* Image Full Size */}
      <img
        src={image}
        alt={title}
        className="w-full h-78
         object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Text Overlay (floating on image bottom) */}
      <div className="absolute bottom-[-10px] left-0 right-0 p-5">
        <div className="bg-white/95 backdrop-blur-md  shadow-lg p-5 ">
          <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {description}
          </p>

          <div className="flex items-center text-[#0B36AF] text-xs font-medium">
            <CalendarMonthIcon className="mr-1 text-sm" />
            {date}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
