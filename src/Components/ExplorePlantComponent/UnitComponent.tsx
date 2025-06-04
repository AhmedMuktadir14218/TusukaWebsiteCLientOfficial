import React from 'react';
import type { Unit } from '../../types/types';
import PlantCard from './PlantCard';

interface Props {
  unit: Unit;
}

const UnitComponent: React.FC<Props> = ({ unit }) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {unit.plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitComponent;