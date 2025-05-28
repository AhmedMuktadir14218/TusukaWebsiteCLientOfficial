// import React, { useState, useEffect } from 'react';
// import type { SliderImage } from '../../types/about';

// interface ImageSliderProps {
//   images: SliderImage[];
//   interval?: number;
// }

// const ImageSlider: React.FC<ImageSliderProps> = ({ images, interval = 5000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, interval);

//     return () => clearInterval(timer);
//   }, [images.length, interval]);

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const goToPrevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   const goToNextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   return (
//     <div className="relative pt-16 w-full h-[60vh] overflow-hidden rounded-lg shadow-lg"> {/* Changed height here */}
//       {images.map((image, index) => (
//         <div
//           key={image.id}
//           className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
//         >
//           <img
//             src={image.src}
//             alt={image.alt}
//             className="w-full h-full object-cover"
//           />
//           {/* {image.caption && (
//             <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
//               <p className="text-center">{image.caption}</p>
//             </div>
//           )} */}
//         </div>
//       ))}

//       <button
//         onClick={goToPrevSlide}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       <button
//         onClick={goToNextSlide}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;
import React, { useState, useEffect } from 'react';
import type { SliderImage } from '../../types/about';

interface ImageSliderProps {
  images: SliderImage[];
  interval?: number;
  fullWidth?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ 
  images, 
  interval = 5000,
  fullWidth = false 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

return (
  <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
    {images.map((image, index) => (
      <div
        key={image.id}
        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
        {/* {image.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <p className="text-center">{image.caption}</p>
          </div>
        )} */}
      </div>
    ))}

    <button
      onClick={goToPrevSlide}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      onClick={goToNextSlide}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
        />
      ))}
    </div>
  </div>
);
};

export default ImageSlider;