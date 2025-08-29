import React from "react";
import bannerImage1 from "../../assets/About/1.jpg";
import bannerImage2 from "../../assets/About/2.jpg";
import bannerImage3 from "../../assets/About/3.png";
import bannerImage4 from "../../assets/About/4.jpg";
import bannerImage5 from "../../assets/About/5.jpg";
import bannerImage6 from "../../assets/About/6.jpg";
import bannerImage7 from "../../assets/About/7.jpg";
import bannerImage8 from "../../assets/About/8.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function AboutHeroBanner() {
  const images = [
    bannerImage1,
    bannerImage2,
    bannerImage3,
    bannerImage4,
    bannerImage5,
    bannerImage6,
    bannerImage7,
    bannerImage8,
  ];

  return (
    <div className="w-full   ">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className=""
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-[250px] md:h-[450px] lg:h-[600px] object-cover  "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AboutHeroBanner;
