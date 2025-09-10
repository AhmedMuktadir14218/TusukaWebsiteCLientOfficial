// src/Components/ExplorePlantComponent/PlantCard.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PlantDetailsModal from "../../Pages/ExplorePlants/PlantDetailsModal";

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

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const VITE_API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;
// helper function
const hexToRgba = (hex: string, alpha = 1) => {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

  useEffect(() => {
    const getFullImageUrl = (imagePath: string): string => {
      if (imagePath.startsWith("http")) return imagePath;
      return `${VITE_API_IMAGE_URL}/${imagePath.replace(/^\/+/, "")}`;
    };

    if (!API_BASE_URL || !VITE_API_IMAGE_URL) {
      setThumbnail(null);
      return;
    }

    fetch(`${API_BASE_URL}/api/explore-plants/plants/${plant.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load plant images");
        return res.json() as Promise<DetailedPlantResponse>;
      })
      .then((json) => {
        const urls = json.plant_images.map((pi) =>
          getFullImageUrl(pi.image_path)
        );
        setThumbnail(urls.length > 0 ? urls[0] : null);
      })
      .catch(() => setThumbnail(null));
  }, [plant.id, API_BASE_URL, VITE_API_IMAGE_URL]);

  return (
    <>
      {isModalOpen && (
        <PlantDetailsModal
          plant={{
            ...plant,
            images: thumbnail ? [thumbnail] : [],
            shortDescription: plant.short_description,
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        onClick={() => setIsModalOpen(true)}
        className="relative w-full overflow-hidden group pb-28   cursor-pointer"
      >
        {/* Full Image */}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={plant.name}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-80 flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}

        {/* Floating Text Box */}
        <div className="absolute bottom-[-10px] left-0 right-0 p-5">
          <div className="   shadow-lg p-5"
            style={{
    backgroundColor: hexToRgba(getComputedStyle(document.documentElement).getPropertyValue('--color-cardBG'), 0.85),
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(185, 206, 227, 0.3)",
  }} 
          
          >
            <h3 className="font-bold text-[var(--color-navFootText)] text-lg mb-2 leading-snug line-clamp-2">
              {plant.name}
            </h3>
            <p className="text-[var(--color-navFootText)] text-sm mb-3 line-clamp-3">
              {plant.short_description}
            </p>

            <button
              className="text-[var(--color-navFootText)] font-semibold text-sm hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              See Details →
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PlantCard;













// // src/Components/ExplorePlantComponent/PlantCard.tsx
// /* eslint-disable @typescript-eslint/no-explicit-any */
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

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
//   const VITE_API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

//   useEffect(() => {
//     // Helper function moved inside useEffect
//     // This function will be recreated on each render, but since it's only used within
//     // this specific useEffect and its dependencies (VITE_API_IMAGE_URL) are in the
//     // effect's dependency array, it's considered stable by ESLint for this context.
//     const getFullImageUrl = (imagePath: string): string => {
//       // If the imagePath already starts with 'http', it's likely an absolute URL
//       if (imagePath.startsWith('http')) {
//         return imagePath;
//       }
//       // Prepend the VITE_API_IMAGE_URL and ensure no double slashes
//       return `${VITE_API_IMAGE_URL}/${imagePath.replace(/^\/+/, '')}`;
//     };

//     // Ensure both base URLs are available
//     if (!API_BASE_URL) {
//       console.error('VITE_API_BASE_URL is not defined in the environment variables.');
//       setThumbnail(null);
//       return;
//     }
//     if (!VITE_API_IMAGE_URL) {
//       console.error('VITE_API_IMAGE_URL is not defined in the environment variables.');
//       setThumbnail(null);
//       return;
//     }

//     // fetch the detailed plant endpoint to get its images
//     fetch(`${API_BASE_URL}/api/explore-plants/plants/${plant.id}`)
//       .then(res => {
//         if (!res.ok) throw new Error('Could not load plant images');
//         return res.json() as Promise<DetailedPlantResponse>;
//       })
//       .then(json => {
//         // Build full URLs for all images using the `getFullImageUrl` helper
//         const urls = json.plant_images.map(pi => getFullImageUrl(pi.image_path));

//         // Take the last one (or first, if you prefer) for the thumbnail
//         if (urls.length > 0) {
//           setThumbnail(urls[urls.length - 1]);
//         } else {
//           setThumbnail(null); // No images found
//         }
//       })
//       .catch(err => {
//         console.error('Error loading thumbnail:', err);
//         setThumbnail(null);
//       });
//   }, [plant.id, API_BASE_URL, VITE_API_IMAGE_URL]); // Dependencies remain the same as the function `getFullImageUrl` is now internal to the effect
// // const PlantCard: React.FC<Props> = ({ plant }) => {
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [thumbnail, setThumbnail] = useState<string | null>(null);

// //   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
// //   const VITE_API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

// //   useEffect(() => {
// //     const getFullImageUrl = (imagePath: string): string => {
// //       // If the imagePath already starts with 'http', it's likely an absolute URL
// //       if (imagePath.startsWith('http')) {
// //         return imagePath;
// //       }
// //       // Prepend the VITE_API_IMAGE_URL and ensure no double slashes
// //       return `${VITE_API_IMAGE_URL}/${imagePath.replace(/^\/+/, '')}`;
// //     };

// //     // Ensure both base URLs are available
// //     if (!API_BASE_URL) {
// //       console.error('VITE_API_BASE_URL is not defined in the environment variables.');
// //       setThumbnail(null);
// //       return;
// //     }
// //     if (!VITE_API_IMAGE_URL) {
// //       console.error('VITE_API_IMAGE_URL is not defined in the environment variables.');
// //       setThumbnail(null);
// //       return;
// //     }

// //     // fetch the detailed plant endpoint to get its images
// //     fetch(`${API_BASE_URL}/api/explore-plants/plants/${plant.id}`)
// //       .then(res => {
// //         if (!res.ok) throw new Error('Could not load plant images');
// //         return res.json() as Promise<DetailedPlantResponse>;
// //       })
// //       .then(json => {
// //         // Build full URLs for all images using the `getFullImageUrl` helper
// //         const urls = json.plant_images.map(pi => getFullImageUrl(pi.image_path));

// //         // Take the FIRST one for the thumbnail
// //         if (urls.length > 0) {
// //           setThumbnail(urls[0]); // Changed from urls[urls.length - 1] to urls[0]
// //         } else {
// //           setThumbnail(null); // No images found
// //         }
// //       })
// //       .catch(err => {
// //         console.error('Error loading thumbnail:', err);
// //         setThumbnail(null);
// //       });
// //   }, [plant.id, API_BASE_URL, VITE_API_IMAGE_URL]);
//   return (
//     <>
//       {isModalOpen && (
//         <PlantDetailsModal
//           plant={{
//             ...plant,
//             // Pass the thumbnail URL and ensure proper camelCase for consistency
//             images: thumbnail ? [thumbnail] : [],
//             shortDescription: plant.short_description,
//           }}
//           onClose={() => setIsModalOpen(false)}
//         />
//       )}
//       <div
//         className="group relative flex flex-col h-full rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
//         onClick={() => setIsModalOpen(true)}
//       >
//         <div className="w-full aspect-[4/3] bg-gray-100">
//           {thumbnail ? (
//             <img
//               src={thumbnail} // `thumbnail` already holds the full URL
//               alt={plant.name}
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//               loading="lazy"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No image
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col justify-between flex-1 p-6 bg-white">
//           <div>
//             <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
//               {plant.name}
//             </h3>
//             <p className="text-gray-600 mb-3 line-clamp-2">
//               {plant.short_description}
//             </p>
//           </div>
//           {!isModalOpen && (
//             <button
//               className="text-[#363D44] font-semibold hover:underline text-left"
//               onClick={e => {
//                 e.stopPropagation(); // Prevent card's onClick from firing again
//                 setIsModalOpen(true);
//               }}
//             >
//               See Details
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlantCard;