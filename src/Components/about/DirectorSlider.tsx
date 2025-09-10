import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

import DirectorCard from './DirectorCard';

export interface RawDirector {
  id: number;
  name: string;
  title: string;
  image: string; // e.g. "uploads/directors/xxx.jpg"
  address: { email: string; house: string };
  social_media: { linkedin?: string; twitter?: string; facebook?: string; github?: string };
  description: { section: string; content: string }[];
}

const DirectorSlider: React.FC = () => {
  const [directors, setDirectors] = useState<RawDirector[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8000/api/directors')
  //     .then(res => {
  //       console.log('API response.data.data:', res.data.data);
  //       setDirectors(res.data.data);
  //     })
  //     .catch(err => console.error('Error fetching directors:', err))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    // Ensure the API_BASE_URL is available
    if (!API_BASE_URL) {
      console.error('REACT_APP_API_BASE_URL is not defined in the environment variables.');
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/directors`) // Use the environment variable here
      .then(res => {
        // console.log('API response.data.data:', res.data.data);
        setDirectors(res.data.data);
      })
      .catch(err => console.error('Error fetching directors:', err))
      .finally(() => setLoading(false));
  }, [API_BASE_URL]); // Add API_BASE_URL to the dependency array


  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading directors…</p>
      </div>
    );
  }

  if (!directors.length) {
    return (
      <div className="py-12 flex items-center justify-center">
        <p className="text-lg text-gray-600">No directors found.</p>
      </div>
    );
  }

  return (
    <div className="py-12  min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 max-w-[2000px]">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[var(--color-titleText)] mb-12 drop-shadow-lg">
          Meet Our Leaders
        </h2>

        {/* 
          key={directors.length} forces Swiper to re-init when data arrives,
          preventing the “hang until click” issue 
        */}
        <Swiper
          key={directors.length}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          speed={700}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false, waitForTransition: true }}
          pagination={{ clickable: true }}
          navigation
          modules={[Autoplay,    Navigation, EffectCoverflow]}
          className="mySwiper w-full h-full pb-16"
          breakpoints={{
            0:    { slidesPerView: 1,   spaceBetween: 20, coverflowEffect:{ depth:0, modifier:1, slideShadows:false } },
            768:  { slidesPerView: 1.6, spaceBetween: 30 },
            1280: { slidesPerView: 1.8, spaceBetween: 40 },
          }}
        >
          {directors.map(d => (
            <SwiperSlide key={d.id} className="swiper-slide">
              {({ isActive }) => (
                <div
                  className={`flex justify-center transition-all duration-500 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? '0 20px 40px rgba(0,0,0,0.2)'
                      : '0 10px 20px rgba(0,0,0,0.1)',
                    borderRadius: '2rem',
                  }}
                >
                  <DirectorCard director={d} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DirectorSlider;


 