// import React from 'react';
// import ImageSlider from './ImageSlider';
// import type { SliderImage } from '../../types/about';
 
// interface AboutHeroProps {
//   title: string;
//   tagline: string;
//   introduction: string;
//   sliderImages: SliderImage[];
// }

// const AboutHero: React.FC<AboutHeroProps> = ({ 
//   title, 
//   tagline, 
//   introduction, 
//   sliderImages 
// }) => {
//   return (
//     <div className="relative">
//       {/* Full-width Image Slider */}
//       <div className="">
//         <ImageSlider images={sliderImages} />
//       </div>
      
//       {/* Text Content Overlay - positioned below the slider */}
//       <div className="bg-white py-12 px-4 md:px-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center space-y-6">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h1>
//             <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600">{tagline}</h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">{introduction}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutHero;


import React from 'react';
import ImageSlider from './ImageSlider';
import type { SliderImage } from '../../types/about';
 
interface AboutHeroProps {
  title: string;
  tagline: string;
  introduction: string;
  sliderImages: SliderImage[];
}

const AboutHero: React.FC<AboutHeroProps> = ({ title, tagline, introduction, sliderImages }) => {
  return (
 <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-3xl md:text-5xl font-bold text-gray-900">{title}</h1>
        <h2 className="text-2xl sm:text-xl md:text-3xl font-semibold text-indigo-600">{tagline}</h2>
        <p className="text-lg sm:text-base text-gray-600">{introduction}</p>
        <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          Explore Our Story
        </button>
      </div>
      <div className="w-full mt-6 md:mt-0">
        <ImageSlider images={sliderImages} />
      </div>
    </div>
  </div>
  {/* <MetricsCounter></MetricsCounter> */}
</section>
  );
};

export default AboutHero;