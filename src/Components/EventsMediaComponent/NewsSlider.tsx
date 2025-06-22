// src/Components/EventsMediaComponent/NewsSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const newsData = [
  {
    id: 1,
    image: "path/to/news-image1.jpg",
    title: "Tusuka Launches New Sustainable Collection",
    date: "March 15, 2024"
  },
  {
    id: 2,
    image: "path/to/news-image2.jpg",
    title: "Innovation in Textile Manufacturing",
    date: "March 10, 2024"
  },
  {
    id: 3,
    image: "path/to/news-image3.jpg",
    title: "Expanding Global Reach: New Partnership Announced",
    date: "March 5, 2024"
  }
];

function NewsSlider() {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Latest News</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-full"
        >
          {newsData.map((news) => (
            <SwiperSlide key={news.id}>
              <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden">
                <div className="w-1/3">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="w-2/3 p-6">
                  <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                  <p className="text-gray-600">{news.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default NewsSlider;