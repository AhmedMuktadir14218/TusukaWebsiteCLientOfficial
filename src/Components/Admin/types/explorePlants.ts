export interface ExploreHeader {
  id?: number;
  title: string;
  description: string;
  ctaText: string;
  image: string;
}
export interface PlantFormData {
  unit_id: number;
  plant_id: string;
  name: string;
  short_description: string;
  images: string[];
  details: PlantDetails;
}

export interface Plant extends PlantFormData {
  id: number;
  created_at?: string;
  updated_at?: string;
}


export interface PlantDetails {
  employees: number;
  lines: number;
  capacity: string;
  space: string;
  address: string;
  distanceFromAirport?: string;
  locationEmbed: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For additional dynamic fields
}

export interface Plant {
  id: number;
  unit_id: number;
  plant_id: string;
  name: string;
  short_description: string;
  images: string[];
  details: PlantDetails;
  order?: number;
  created_at?: string;
  updated_at?: string;
}


export interface Unit {
  id: number;
  title: string;
  background_image: string;
  description: string;
  order?: number;
  plants: Plant[];
  created_at?: string;
  updated_at?: string;
}

export interface ExplorePlantsData {
  exploreHeader: ExploreHeader;
  units: Unit[];
}