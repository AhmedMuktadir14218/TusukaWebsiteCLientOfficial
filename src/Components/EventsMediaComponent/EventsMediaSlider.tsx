import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// Image assets
const galleryImages = [
  {
    id: 1,
    image: "/assets/Tusuka Fashions Ltd/Tusuka Fashions Ltd 01.jpg",
    title: "Manufacturing Excellence"
  },
  {
    id: 2,
    image: "/assets/Tusuka Fashions Ltd/Tusuka Fashions Ltd 03.jpg",
    title: "Quality Control"
  },
  {
    id: 3,
    image: "/assets/Tusuka Fashions Ltd/Tusuka Fashions Ltd 03.jpg",
    title: "Innovation Hub"
  },
  {
    id: 4,
    image: "/assets/Tusuka Fashions Ltd/Tusuka Fashions Ltd 04.jpg",
    title: "Global Operations"
  },
  {
    id: 5,
    image: "/assets/Tusuka Fashions Ltd/Tusuka Fashions Ltd 05.jpg",
    title: "Sustainable Practices"
  }
];

const newsData = [
  {
    id: 1,
    image: "/assets/Tusuka Fashions Ltd/Tusuka Fashions Ltd 01.jpg",
    title: "Tusuka Launches New Collection",
    date: "March 15, 2024"
  },
  {
    id: 2,
    image: "/assets/Tusuka Fashions Ltd/Tusuka Fashions Ltd 02.jpg",
    title: "Innovation in Manufacturing",
    date: "March 10, 2024"
  },
  {
    id: 3,
    image: "/assets/Tusuka Fashions Ltd/Tusuka Fashions Ltd 03.jpg",
    title: "Global Partnership Announced",
    date: "March 5, 2024"
  },
  {
    id: 4,
    image: "/assets/Tusuka Fashions Ltd/Tusuka Fashions Ltd 04.jpg",
    title: "Sustainability Initiative",
    date: "March 1, 2024"
  }
];

function EventsMediaSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Image Slider + Thumbnails */}
        <div className="lg:w-[75%] w-full">
          {/* Main Slider */}
          <Swiper
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-[300px] sm:h-[400px] lg:h-[500px] rounded overflow-hidden"
          >
            {galleryImages.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white px-4 py-2 text-sm sm:text-base">
                    {item.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <div className="mt-4">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Navigation, Thumbs]}
              className="h-[80px]"
            >
              {galleryImages.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="h-full cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Side: News Slider */}
        <div className="lg:w-[25%] w-full bg-gray-50 rounded shadow overflow-hidden">
          <h2 className="text-lg sm:text-xl font-bold p-4 bg-[#040270] text-white">Latest News</h2>
          <Swiper
            direction="vertical"
            spaceBetween={0}
            slidesPerView={3}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay]}
            className="h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            {newsData.map((news) => (
              <SwiperSlide key={news.id}>
                <div className="p-3 border-b border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{news.title}</h3>
                      <p className="text-xs text-gray-600">{news.date}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default EventsMediaSlider;
