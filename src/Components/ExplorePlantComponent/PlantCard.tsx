import React, { useState } from 'react';
import PlantDetailsModal from '../../Pages/ExplorePlants/PlantDetailsModal';
interface PlantDetails {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Plant {
  id: string;
  name: string;
  images: string[];
  shortDescription: string;
  address: string;
  details: PlantDetails;
  location?: {
    lat: number;
    lng: number;
  };
  capacity?: string;
  employees?: string;
  established?: string;
  production?: string;
  specialization?: string;
}

interface Props {
  plant: Plant;
}

const PlantCard: React.FC<Props> = ({ plant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <PlantDetailsModal
          plant={plant}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div
        className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="overflow-hidden w-full" style={{ height: 200 }}>
          <img
            src={plant.images[0]}
            alt={plant.name}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            style={{ height: '200px', width: '100%' }}
          />
        </div>
        <div className="p-6 bg-white">
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            {plant.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {plant.shortDescription.length > 50
              ? plant.shortDescription.slice(0, 50) + '...'
              : plant.shortDescription}
            <span
              className="text-blue-600 hover:underline text-sm ml-2 cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              See more
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PlantCard;
