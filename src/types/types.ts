export interface ExploreHeader {
  title: string;
  description: string;
  ctaText: string;
  image: string;
}

export interface PlantDetails {
  employees?: number;
  lines: number | Record<string, number>;
  capacity: string | Record<string, string>;
  space: string;
  machines?: number | string;
  machineDetails?: Record<string, string>;
  wetCapacity: string;
  dryCapacity: string;
  monthlyCapacity?: string;
  address: string;
  distanceFromAirport?: string;
  locationEmbed?: string;
}

export interface Plant {
  id: string;
  name: string;
  shortDescription: string;
  images: string[];
  details: PlantDetails;
}

export interface Unit {
  title: string;
  backgroundImage: string;
  description: string;
  plants: Plant[];
}

export interface PlantsData {
  exploreHeader: ExploreHeader;
  units: Unit[];
}