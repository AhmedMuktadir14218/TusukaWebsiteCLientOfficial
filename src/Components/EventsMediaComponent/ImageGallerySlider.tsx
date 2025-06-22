// src/Components/EventsMediaComponent/ImageGallerySlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const galleryImages = [
  {
    id: 1,
    image: "path/to/gallery1.jpg",
    caption: "Manufacturing Excellence"
  },
  {
    id: 2,
    image: "path/to/gallery2.jpg",
    caption: "Quality Control"
  },
  {
    id: 3,
    image: "path/to/gallery3.jpg",
    caption: "Innovation Hub"
  },
  {
    id: 4,
    image: "path/to/gallery4.jpg",
    caption: "Global Operations"
  },
  {
    id: 5,
    image: "path/to/gallery5.jpg",
    caption: "Sustainable Practices"
  },
  {
    id: 6,
    image: "path/to/gallery6.jpg",
    caption: "Team Excellence"
  }
];

function ImageGallerySlider() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Image Gallery</h2>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            }
          }}
          className="w-full"
        >
          {galleryImages.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative group">
                <img 
                  src={item.image} 
                  alt={item.caption}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-center">{item.caption}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ImageGallerySlider;