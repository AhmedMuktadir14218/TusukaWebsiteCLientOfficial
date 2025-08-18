import React from 'react';
import { useExplorePlants } from '../../hooks/useExplorePlantsHooks';
import ExploreHeader from '../../Components/ExplorePlantComponent/ExploreHeader';
import UnitComponent from '../../Components/ExplorePlantComponent/UnitComponent';
import { useLocation } from 'react-router-dom';

const ExplorePlants: React.FC = () => {
  
  const data = useExplorePlants();
  // console.log(data)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'Manufactured'; // default to Manufactured if no tab param

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <ExploreHeader header={data.exploreHeader} />
      {data.units.map(unit => (
        <UnitComponent initialTab={activeTab} key={unit.title} unit={unit} />
      ))}
    </div>
  );
};

export default ExplorePlants;