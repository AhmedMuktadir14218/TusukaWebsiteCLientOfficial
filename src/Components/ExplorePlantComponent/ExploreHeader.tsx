import React from 'react';
import type { ExploreHeader as ExploreHeaderProps } from '../../types/types';

interface Props {
  header: ExploreHeaderProps;
}

// Get the base image URL from your environment variables
const VITE_API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

const ExploreHeader: React.FC<Props> = ({ header }) => {
  console.log("ExploreHeader Props:", header);

  // Construct the full image URL
  const fullImageUrl = header.image ? `${VITE_API_IMAGE_URL}/${header.image}` : '';

  return (
    <div className="relative h-[60vh] w-full">
      <img
        src={fullImageUrl} // Use the constructed full URL here
        alt={header.title}
        className="absolute inset-0 w-full h-full object-cover brightness-30"
        loading="eager"
      />
      <div className="absolute inset-0 bg-opacity-50" /> {/* This div is missing a background color, it currently does nothing. */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {header.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {header.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreHeader;