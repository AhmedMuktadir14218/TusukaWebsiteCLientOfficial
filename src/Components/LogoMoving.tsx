import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import logo1 from '../assets/OldBrandLogo/client-1.png';
import logo2 from '../assets/OldBrandLogo/client-2.png';
import logo3 from '../assets/OldBrandLogo/client-3.png';
import logo4 from '../assets/OldBrandLogo/client-4.png';
import logo5 from '../assets/OldBrandLogo/client-5.png';
import logo6 from '../assets/OldBrandLogo/client-6.png';
import logo7 from '../assets/OldBrandLogo/client-7.png';
import logo8 from '../assets/OldBrandLogo/client-8.png';
import logo9 from '../assets/OldBrandLogo/client-9.png';

import  parallaxImage from '../assets/bg2.png';
 


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
type LogoMovingProps = {
  // other props
  mt?: string; // Add the 'mt' prop
};
const LogoMoving: React.FC<LogoMovingProps> = ({ mt }) => {
  return (

    
 <div className=" w-full overflow-visible "
  >
 
    <section className="w-full "
    >

      <div className={`      relative ${mt}  `}
      // style={{ backgroundImage: `url(${parallaxImage})` }}

>
        <h1 className="  font-bold py-16 md:text-5xl sm:text-3xl text-[var(--color-titleText)] text-center uppercase">Our Core Customers</h1>
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
          speed={2000} // smooth speed
          className="flex items-center bg-[var(--color-navFootBG)]  "
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center py-12">
              <img
                src={logo}
                alt={`Logo ${index}`}
                className="h-24 md:h-18 object-contain  "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
     </div>
  );
};

export default LogoMoving;
