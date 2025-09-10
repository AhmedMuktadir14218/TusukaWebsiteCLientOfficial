// src/Pages/News/NewsDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { NewsItem } from "./NewsAndMedia";
import { NewsMediaViewModal } from "./Admin/NewsMediaViewModal";
 
const NewsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/news-media`);
        if (data.success) {
          const foundNews = data.data.find((item: NewsItem) => item.id === Number(id));
          setNews(foundNews || null);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id, API_BASE_URL]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!news) return <p className="text-center py-10">News not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <NewsMediaViewModal newsMedia={news} isOpen={true} onClose={() => {}} />
    </div>
  );
};

export default NewsDetails;
