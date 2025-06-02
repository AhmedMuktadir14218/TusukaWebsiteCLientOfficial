import React, { useState } from 'react';
import PlantDetailsModal from '../../Pages/ExplorePlants/PlantDetailsModal';
 
interface Plant {
  id: string;
  name: string;
  images: string[];
  shortDescription: string;
  address: string;
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
      <div className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={plant.images[0]}
            alt={plant.name}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="p-6 bg-white">
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">
            {plant.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {plant.shortDescription}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
      
    {isModalOpen && (
  <PlantDetailsModal 
    plant={plant} 
    onClose={() => setIsModalOpen(false)} 
  />
)}
    </>
  );
};

export default PlantCard;

// import React from 'react';
// import type { Plant } from '../../types/types';
// import { useNavigate } from 'react-router-dom';

// interface Props {
//   plant: Plant;
// }

// const PlantCard: React.FC<Props> = ({ plant }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
//       <div className="aspect-w-16 aspect-h-9 overflow-hidden">
//         <img
//           src={plant.images[0]}
//           alt={plant.name}
//           className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
//           loading="lazy"
//         />
//       </div>
//       <div className="p-6 bg-white">
//         <h3 className="text-2xl font-semibold mb-3 text-gray-800">
//           {plant.name}
//         </h3>
//         <p className="text-gray-600 mb-4 line-clamp-2">
//           {plant.shortDescription}
//         </p>
//         <button
//           onClick={() => navigate(`/plants/${plant.id}`)}
//           className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlantCard;



