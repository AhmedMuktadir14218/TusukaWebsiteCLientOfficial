import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import logo1 from '../assets/Brandlogo7.png'; // Replace with your actual logo file names
import logo2 from '../assets/Brandlogo1.png';
import logo3 from '../assets/Brandlogo2.png';
import logo4 from '../assets/Brandlogo3.png';
import logo5 from '../assets/Brandlogo4.png';
import logo6 from '../assets/Brandlogo7.png';
import logo7 from '../assets/Brandlogo1.png';
import logo8 from '../assets/Brandlogo2.png';
import logo9 from '../assets/Brandlogo3.png';


const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  // Add all your logo imports here
];

const LogoMoving: React.FC = () => {
  return (
    <section className="w-full bg-white py-6 shadow-inner">
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0} // no padding between slides
          slidesPerView={2} // show 2 logos on very small screens
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000} // smooth speed
          className="flex items-center"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={logo}
                alt={`Logo ${index}`}
                className="h-12 md:h-16 object-contain drop-shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LogoMoving;
