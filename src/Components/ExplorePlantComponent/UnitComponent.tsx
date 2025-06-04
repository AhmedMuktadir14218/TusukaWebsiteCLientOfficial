import React from 'react';
import type { Unit } from '../../types/types'; // Assuming this path is correct
import PlantCard from './PlantCard'; // Assuming this path is correct

interface Props {
  unit: Unit;
}

const UnitComponent: React.FC<Props> = ({ unit }) => {
  const numPlants = unit.plants.length;

  let plantContainerLayoutClasses = "";
  // Define a common width constraint for cards when in the special flex layout (1 or 2 items).
  // This aims to make them visually consistent with their size in the 3-column grid.
  // Tailwind's `max-w-sm` is 24rem (384px), which is a good approximation for a card
  // that would fit in a 3-column layout within a `max-w-7xl` container with gaps.
  const cardFlexItemWrapperClasses = "w-full max-w-sm";

  if (numPlants === 1) {
    plantContainerLayoutClasses = "flex justify-center";
    // The single card will be wrapped, and the wrapper will use cardFlexItemWrapperClasses.
  } else if (numPlants === 2) {
    plantContainerLayoutClasses = "flex justify-center flex-wrap";
    // Each of the two cards will be wrapped, and the wrapper will use cardFlexItemWrapperClasses.
  } else { // For 0 or 3+ plants
    plantContainerLayoutClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    // No individual wrapper needed here, as the grid columns define the width for each PlantCard.
  }

  // Common gap for both flex and grid layouts
  const plantContainerClasses = `${plantContainerLayoutClasses} gap-8`;

  return (
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#05038f] mb-4">
            {unit.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {unit.description}
          </p>
        </div>
        <div className={plantContainerClasses}>
          {unit.plants.map((plant) => (
            // Conditionally wrap PlantCard to control its width in flex layouts
            (numPlants === 1 || numPlants === 2) ? (
              <div key={plant.id} className={cardFlexItemWrapperClasses}>
                <PlantCard plant={plant} />
              </div>
            ) : (
              // In grid layout, PlantCard fills the grid cell directly
              <PlantCard key={plant.id} plant={plant} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitComponent;