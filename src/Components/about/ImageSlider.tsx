import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import type { SliderImage } from '../../types/about'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

interface ImageSliderProps {
  images: SliderImage[]
  interval?: number
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images, interval = 3000
}) => (
  <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: interval, disableOnInteraction: false }}
      loop
      effect="fade"
    >
      {images.map(img => (
        <SwiperSlide key={img.id} className="relative">
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)

export default ImageSlider
