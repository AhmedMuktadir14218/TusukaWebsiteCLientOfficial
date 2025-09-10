// src/components/NewsTicker.tsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NewsMediaViewModal } from "./Admin/NewsMediaViewModal";
import type { NewsItem } from "./NewsAndMedia";

const NewsTicker: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/news-media`);
        if (data.success) {
          setNewsItems(data.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [API_BASE_URL]);

  // Animation effect
  useEffect(() => {
    if (!tickerRef.current || isPaused) return;

    const ticker = tickerRef.current;
    let animationFrameId: number;
    let position = 0;
    const speed = 1; // Adjust speed as needed

    const animate = () => {
      position -= speed;
      const firstSetWidth = ticker.scrollWidth / 2;
      if (Math.abs(position) >= firstSetWidth) position = 0;
      ticker.style.transform = `translateX(${position}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, newsItems]);

  const handleMouseEnter = (index: number) => {
    setIsPaused(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setHoveredIndex(null);
  };

  const openModal = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  if (!newsItems || newsItems.length === 0) return null;

  return (
    <>
      <div
        className="w-full bg-[var(--color-navFootBG)] text-[var(--color-navFootText)] py-4 overflow-hidden"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5.7px)",
          WebkitBackdropFilter: "blur(5.7px)",
        }}
      >
        <div ref={tickerRef} className="flex whitespace-nowrap">
          {/* Duplicate headlines for seamless scrolling */}
          {[...newsItems, ...newsItems].map((news, i) => (
            <span
              key={i}
              className={`mx-8 font-medium inline-block cursor-pointer transition-all duration-300 ${
                hoveredIndex === i ? "text-lg md:text-xl" : "text-sm md:text-base"
              }`}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => openModal(news)}
            >
              {news.title}
            </span>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedNews && (
        <NewsMediaViewModal
          newsMedia={selectedNews}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default NewsTicker;
