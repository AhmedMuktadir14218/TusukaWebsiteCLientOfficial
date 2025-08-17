// src/Components/ExplorePlantComponent/PlantCard.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import PlantDetailsModal from '../../Pages/ExplorePlants/PlantDetailsModal';

interface PlantDetails {
  [key: string]: any;
}

interface Plant {
  id: string;
  name: string;
  short_description: string;
  details: PlantDetails;
}

interface Props {
  plant: Plant;
}

interface DetailedPlantResponse {
  id: number;
  plant_images: Array<{ image_path: string }>;
}

const PlantCard: React.FC<Props> = ({ plant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const VITE_API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

  useEffect(() => {
    // Helper function moved inside useEffect
    // This function will be recreated on each render, but since it's only used within
    // this specific useEffect and its dependencies (VITE_API_IMAGE_URL) are in the
    // effect's dependency array, it's considered stable by ESLint for this context.
    const getFullImageUrl = (imagePath: string): string => {
      // If the imagePath already starts with 'http', it's likely an absolute URL
      if (imagePath.startsWith('http')) {
        return imagePath;
      }
      // Prepend the VITE_API_IMAGE_URL and ensure no double slashes
      return `${VITE_API_IMAGE_URL}/${imagePath.replace(/^\/+/, '')}`;
    };

    // Ensure both base URLs are available
    if (!API_BASE_URL) {
      console.error('VITE_API_BASE_URL is not defined in the environment variables.');
      setThumbnail(null);
      return;
    }
    if (!VITE_API_IMAGE_URL) {
      console.error('VITE_API_IMAGE_URL is not defined in the environment variables.');
      setThumbnail(null);
      return;
    }

    // fetch the detailed plant endpoint to get its images
    fetch(`${API_BASE_URL}/api/explore-plants/plants/${plant.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Could not load plant images');
        return res.json() as Promise<DetailedPlantResponse>;
      })
      .then(json => {
        // Build full URLs for all images using the `getFullImageUrl` helper
        const urls = json.plant_images.map(pi => getFullImageUrl(pi.image_path));

        // Take the last one (or first, if you prefer) for the thumbnail
        if (urls.length > 0) {
          setThumbnail(urls[urls.length - 1]);
        } else {
          setThumbnail(null); // No images found
        }
      })
      .catch(err => {
        console.error('Error loading thumbnail:', err);
        setThumbnail(null);
      });
  }, [plant.id, API_BASE_URL, VITE_API_IMAGE_URL]); // Dependencies remain the same as the function `getFullImageUrl` is now internal to the effect

  return (
    <>
      {isModalOpen && (
        <PlantDetailsModal
          plant={{
            ...plant,
            // Pass the thumbnail URL and ensure proper camelCase for consistency
            images: thumbnail ? [thumbnail] : [],
            shortDescription: plant.short_description,
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div
        className="group relative flex flex-col h-full rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="w-full aspect-[4/3] bg-gray-100">
          {thumbnail ? (
            <img
              src={thumbnail} // `thumbnail` already holds the full URL
              alt={plant.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between flex-1 p-6 bg-white">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
              {plant.name}
            </h3>
            <p className="text-gray-600 mb-3 line-clamp-2">
              {plant.short_description}
            </p>
          </div>
          {!isModalOpen && (
            <button
              className="text-[#040270] font-semibold hover:underline text-left"
              onClick={e => {
                e.stopPropagation(); // Prevent card's onClick from firing again
                setIsModalOpen(true);
              }}
            >
              See Details
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PlantCard;