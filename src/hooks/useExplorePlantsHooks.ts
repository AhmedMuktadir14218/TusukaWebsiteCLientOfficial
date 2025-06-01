import { useState, useEffect } from 'react';
import type { PlantsData } from '../types/types';

export const useExplorePlants = (): PlantsData | null => {
  const [data, setData] = useState<PlantsData | null>(null);

  useEffect(() => {
    fetch('/public/PlantsData.json')
      .then((response) => response.json())
      .then(setData)
      .catch((error) => console.error('Error fetching plant data:', error));
  }, []);

  return data;
};