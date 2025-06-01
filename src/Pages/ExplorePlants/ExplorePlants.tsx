import React from 'react';
import { useExplorePlants } from '../../hooks/useExplorePlantsHooks';
import ExploreHeader from '../../Components/ExplorePlantComponent/ExploreHeader';
import UnitComponent from '../../Components/ExplorePlantComponent/UnitComponent';

const ExplorePlants: React.FC = () => {
  const data = useExplorePlants();

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <ExploreHeader header={data.exploreHeader} />
      {data.units.map(unit => (
        <UnitComponent key={unit.title} unit={unit} />
      ))}
    </div>
  );
};

export default ExplorePlants;