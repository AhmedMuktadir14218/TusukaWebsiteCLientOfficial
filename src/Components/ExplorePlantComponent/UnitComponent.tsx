import React from 'react';
import type { Unit } from '../../types/types'; 
import PlantCard from './PlantCard'; 
interface Props {
  unit: Unit;
  initialTab: string; 
}

const UnitComponent: React.FC<Props> = ({ unit }) => {
  const numPlants = unit.plants.length;

  let plantContainerLayoutClasses = "";
 
  const cardFlexItemWrapperClasses = "w-full max-w-sm";

  if (numPlants === 1) {
    plantContainerLayoutClasses = "flex justify-center";
  } else if (numPlants === 2) {
    plantContainerLayoutClasses = "flex justify-center flex-wrap";
    
  } else { 
    plantContainerLayoutClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  }
  const plantContainerClasses = `${plantContainerLayoutClasses} gap-8`;

  return (
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#363D44] mb-4">
            {unit.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {unit.description}
          </p>
        </div>
        <div className={plantContainerClasses}>
          {unit.plants.map((plant) => (
          
            (numPlants === 1 || numPlants === 2) ? (
              <div key={plant.id} className={cardFlexItemWrapperClasses}>
                <PlantCard plant={plant} />
              </div>
            ) : (
              <PlantCard key={plant.id} plant={plant} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitComponent;