// import { useState, useEffect } from 'react';
// import type { PlantsData } from '../types/types';

// export const useExplorePlants = (): PlantsData | null => {
//   const [data, setData] = useState<PlantsData | null>(null);

//   useEffect(() => {
//     // fetch('/public/PlantsData.json')
//     fetch('http://localhost:8000/api/explore-plants')
//       .then((response) => response.json())
//       .then(setData)
//       .catch((error) => console.error('Error fetching plant data:', error));
//   }, []);

//   return data;
// };

// src/hooks/useExplorePlants.ts
// src/hooks/useExplorePlantsHooks.ts
import { useState, useEffect } from 'react';
import type { PlantsData } from '../types/types';

interface RawPlantsData {
  exploreHeader: {
    id: number;
    title: string;
    description: string;
    cta_text: string;
    image: string;
    created_at: string;
    updated_at: string;
  };
  units: Array<{
    id: number;
    title: string;
    description: string;
    order: number;
    plants: Array<{
      id: number;
      plant_id: string;
      name: string;
      short_description: string;
      details: Record<string, any>;
    }>;
  }>;
}

const toCamel = (s: string) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

const transform = (raw: RawPlantsData): PlantsData => ({
  exploreHeader: {
    id: raw.exploreHeader.id,
    title: raw.exploreHeader.title,
    description: raw.exploreHeader.description,
    ctaText: raw.exploreHeader.cta_text,
    image: raw.exploreHeader.image,
  },
  units: raw.units.map(u => ({
    id: u.id,
    title: u.title,
    description: u.description,
    order: u.order,
    plants: u.plants.map(p => ({
      id: p.id.toString(),
      plantId: p.plant_id,
      name: p.name,
      shortDescription: p.short_description,
      details: Object.fromEntries(
        Object.entries(p.details).map(([k,v]) => [toCamel(k), v])
      ),
      // images will be fetched in the modal
      images: [] as string[],
    }))
  }))
});

export const useExplorePlants = (): PlantsData | null => {
  const [data, setData] = useState<PlantsData | null>(null);
 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  useEffect(() => {
    // fetch('http://localhost:8000/api/explore-plants')
    fetch(`${API_BASE_URL}/api/explore-plants`)
      .then(res => res.json())
      .then((raw: RawPlantsData) => setData(transform(raw)))
      .catch(err => console.error('Error fetching plant data:', err));
  }, []);

  return data;
};
