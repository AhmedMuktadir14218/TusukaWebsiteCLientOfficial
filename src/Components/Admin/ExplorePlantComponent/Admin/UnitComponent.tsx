import { Plant, PlantFormData, Unit } from "@/types/explorePlants";
import { useState } from "react";
import PlantCard from "./PlantCard";
 
import PlantFormModal from "./PlantFormModal";
import useExplorePlants from "@/hooks/useExplorePlants";
 import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface UnitComponentProps {
  unit: Unit;
}

const UnitComponent: React.FC<UnitComponentProps> = ({ unit }) => {
  const [isPlantFormOpen, setIsPlantFormOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [plantToDelete, setPlantToDelete] = useState<Plant | null>(null);
  const { createPlant, updatePlant, deletePlant, isAuthenticated } = useExplorePlants();

  const handleCreatePlant = () => {
    setEditingPlant(null);
    setIsPlantFormOpen(true);
  };

  const handleEditPlant = (plant: Plant) => {
    setEditingPlant(plant);
    setIsPlantFormOpen(true);
  };

  const handleSubmitPlant = async (data: PlantFormData) => {
    if (editingPlant) {
      await updatePlant(editingPlant.id, data);
    } else {
      await createPlant({ ...data, unit_id: unit.id });
    }
  };

  const handleDeletePlant = async () => {
    if (plantToDelete) {
      await deletePlant(plantToDelete.id);
      setPlantToDelete(null);
    }
  };

  return (
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-[#05038f] mb-4">
            {unit.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {unit.description}
          </p>
          
          {isAuthenticated && (
            <div className="absolute top-0 right-0">
              <button
                onClick={handleCreatePlant}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" />
                Add Plant
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {unit.plants.map(plant => (
            <div key={plant.id} className="relative group">
              <PlantCard plant={plant} />
              
              {isAuthenticated && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  <button
                    onClick={() => handleEditPlant(plant)}
                    className="p-2 bg-white rounded-full shadow-md text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setPlantToDelete(plant)}
                    className="p-2 bg-white rounded-full shadow-md text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <PlantFormModal
        isOpen={isPlantFormOpen}
        onClose={() => setIsPlantFormOpen(false)}
        onSubmit={handleSubmitPlant}
        units={[unit]}
        plant={editingPlant}
      />

      {plantToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Delete Plant</h3>
            <p className="mb-6">Are you sure you want to delete {plantToDelete.name}?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setPlantToDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlant}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitComponent;

// components/ExplorePlants/UnitSection.tsx
// import React from 'react'; 
// import { PlantCard } from './PlantCard';
// import { Plant, Unit } from '@/types/explorePlants';

 
// interface UnitSectionProps {
//     unit: Unit;
//     onEditPlant: (plant: Plant) => void;
//     token?: string | null;
// }

// export const UnitComponent: React.FC<UnitSectionProps> = ({ unit, onEditPlant, token }) => (
//     <div className="mb-12">
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">{unit.title}</h2>
//                 {token && (
//                     <button
//                         onClick={() => {/* Add edit unit functionality */}}
//                         className="text-blue-600 hover:text-blue-800"
//                     >
//                         Edit Unit
//                     </button>
//                 )}
//             </div>
//             <p className="text-gray-600">{unit.description}</p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {unit.plants.map(plant => (
//                 <PlantCard
//                     key={plant.id}
//                     plant={plant}
//                     onEdit={() => onEditPlant(plant)}
//                     // canEdit={!!token}
//                 />
//             ))}
//         </div>
//     </div>
// );