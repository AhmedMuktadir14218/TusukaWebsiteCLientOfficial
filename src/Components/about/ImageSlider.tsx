import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { SliderImage } from "../../types/about";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface ImageSliderProps {
  images: SliderImage[];
  interval?: number;
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = React.memo(
  ({ images, interval = 5000, className = "h-fit" }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.currentTarget;
      if (!target.src.includes("/public/uploads/")) {
        target.src = target.src.replace("/uploads/", "/public/uploads/");
      }
      target.onerror = null; // Prevent infinite loop if fallback also fails
      target.alt = "Failed to load image";
    };

    if (!images?.length) {
      return (
        <div
          className={`relative w-full ${className} bg-gray-200 rounded-lg flex items-center justify-center`}
        >
          <span className="text-gray-500">No images available</span>
        </div>
      );
    }

    return (
      <div
        className={`relative w-full ${className} overflow-hidden rounded-lg shadow-lg`}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: interval,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          effect="fade"
          fadeEffect={{ crossFade: true }}
           // Keep lazy loading enabled for performance
        >
          {images.map((img) => (
            <SwiperSlide
              key={img.id}
              className="relative h-80 flex items-center justify-center"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-fit w-full object-contain"
                loading="lazy" // Keep native lazy loading attribute for extra browser optimization
                onError={handleImageError}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>
    );
  },
);

ImageSlider.displayName = "ImageSlider";

export default ImageSlider;