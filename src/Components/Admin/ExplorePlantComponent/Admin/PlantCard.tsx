import React, { useState } from 'react'; 
import PlantDetailsModal from './PlantDetailsModal';
import type { Plant  } from '../../types/explorePlants';

interface Props {
  plant: Plant;
}

const PlantCard: React.FC<Props> = ({ plant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PlantDetailsModal
        plant={plant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <div
        className="group relative flex flex-col h-full rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="w-full aspect-[4/3] bg-gray-100">
          <img
            src={plant.images[0]}
            alt={plant.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
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
          <button
            className="text-[#040270] font-semibold hover:underline text-left"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            See Details
          </button>
        </div>
      </div>
    </>
  );
};

export default PlantCard;
