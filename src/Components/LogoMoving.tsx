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

      <div className={`container mx-auto py-12  rounded-xl  flex relative ${mt} `}
      // style={{ backgroundImage: `url(${parallaxImage})` }}
          style={{
  // background: "rgb(173 208 244 / 52%)",
  // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  // backdropFilter: "blur(5px)",
  // WebkitBackdropFilter: "blur(5px)",
  // border: "1px solid rgba(185, 206, 227, 0.3)"
}}>
        <h1 className="font-bold pb-8 pl-8 md:text-3xl sm:text-2xl text-[#0B36AF] uppercase">Our Core Customers</h1>
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
          className="flex items-center"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={logo}
                alt={`Logo ${index}`}
                className="h-12 md:h-16 object-contain  "
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
