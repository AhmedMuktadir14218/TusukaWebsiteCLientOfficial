import React from 'react';
import type { ExploreHeader as ExploreHeaderProps } from '../../types/types';

interface Props {
  header: ExploreHeaderProps;
}

const ExploreHeader: React.FC<Props> = ({ header }) => {

    console.log("ExploreHeader Props:", header);
  return (
    <div className="relative h-[60vh] w-full">
      <img 
        src={header.image} 
        alt={header.title}
        className="absolute inset-0 w-full h-full object-cover brightness-30"
        loading="eager"
      />
      <div className="absolute inset-0 bg-opacity-50" />
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {header.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {header.description}
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg font-semibold transition-colors duration-300">
            {header.ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreHeader;