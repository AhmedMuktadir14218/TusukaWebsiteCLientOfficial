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
  // (we no longer expect plant.images here)
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

  useEffect(() => {
    // fetch the detailed plant endpoint to get its images
    fetch(`http://localhost:8000/api/explore-plants/plants/${plant.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Could not load plant images');
        return res.json() as Promise<DetailedPlantResponse>;
      })
      .then(json => {
        // build full URLs
        const urls = json.plant_images.map(pi => `http://localhost:8000/${pi.image_path}`);
        // take the last one (or first, if you prefer)
        if (urls.length > 0) {
          setThumbnail(urls[urls.length - 1]);
        }
      })
      .catch(err => {
        console.error('Error loading thumbnail:', err);
        setThumbnail(null);
      });
  }, [plant.id]);

  return (
    <>
      {isModalOpen && (
        <PlantDetailsModal
          plant={{
            ...plant,
            images: thumbnail ? [thumbnail] : [],        // pass at least one image so modal shows it
            shortDescription: plant.short_description,    // if you have migrated to camelCase
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
              src={thumbnail}
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
                e.stopPropagation();
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


// src/Components/ExplorePlantComponent/PlantCard.tsx
// src/Components/ExplorePlantComponent/PlantCard.tsx
// import React, { useState, useEffect } from 'react';
// import PlantDetailsModal from '../../Pages/ExplorePlants/PlantDetailsModal';

// interface PlantDetails {
//   [key: string]: any;
// }

// interface Plant {
//   id: string;
//   name: string;
//   short_description: string;
//   details: PlantDetails;
// }

// interface Props {
//   plant: Plant;
// }

// interface DetailedPlantResponse {
//   id: number;
//   plant_images: Array<{ image_path: string }>;
// }

// const PlantCard: React.FC<Props> = ({ plant }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [thumbnail, setThumbnail] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`http://localhost:8000/api/explore-plants/plants/${plant.id}`)
//       .then(res => {
//         if (!res.ok) throw new Error('Could not load plant images');
//         return res.json() as Promise<DetailedPlantResponse>;
//       })
//       .then(json => {
//         const urls = json.plant_images.map(pi => `http://localhost:8000/${pi.image_path}`);
//         if (urls.length > 0) {
//           setThumbnail(urls[urls.length - 1]);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error loading thumbnail:', err);
//         setThumbnail(null);
//         setLoading(false);
//       });
//   }, [plant.id]);

//   // Function to truncate description for card display
//   const truncateDescription = (text: string, maxLength: number = 100) => {
//     if (!text) return 'No description available';
//     if (text.length <= maxLength) return text;
//     return `${text.substring(0, maxLength)}...`;
//   };

//   return (
//     <>
//       {isModalOpen && (
//         <PlantDetailsModal
//           plant={{
//             ...plant,
//             images: thumbnail ? [thumbnail] : [],
//             shortDescription: plant.short_description,
//           }}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
      
//       <div
//         className="group relative flex flex-col h-full rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white hover:shadow-md"
//         onClick={() => setIsModalOpen(true)}
//       >
//         {/* Image Section */}
//         <div className="w-full aspect-[4/3] bg-gray-100 relative">
//           {loading ? (
//             <div className="w-full h-full flex items-center justify-center">
//               <div className="animate-pulse bg-gray-200 w-full h-full"></div>
//             </div>
//           ) : thumbnail ? (
//             <img
//               src={thumbnail}
//               alt={plant.name}
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//               loading="lazy"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
//               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </div>
//           )}
//         </div>

//         {/* Content Section */}
//         <div className="flex flex-col flex-1 p-5">
//           {/* Plant Name */}
//           <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">
//             {plant.name}
//           </h3>
          
//           {/* Description - Focused section */}
//           <div className="mb-3 flex-1">
//             <p className="text-gray-600 text-sm line-clamp-3">
//               {truncateDescription(plant.short_description, 150)}
//             </p>
//           </div>
          
//           {/* Simple "Learn More" button */}
//           <button
//             className="text-[#040270] font-medium hover:underline text-sm text-left mt-auto pt-2"
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsModalOpen(true);
//             }}
//           >
//             Learn more →
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlantCard;