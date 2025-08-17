import type { ReactNode } from "react";

export interface ExploreHeader {
  id: number; // Add this line
  cta_text: ReactNode;
  title: string;
  description: string;
  ctaText: string;
  image: string;
}

export interface PlantDetails {
  employees?: number;
  lines?: number | Record<string, number>;  // Added ?
  capacity?: string | Record<string, string>; // Added ?
  space?: string; // Added ?
  machines?: number | string;
  machineDetails?: Record<string, string>;
  wetCapacity?: string; // Added ?
  dryCapacity?: string; // Added ?
  monthlyCapacity?: string;
  address?: string;
  distanceFromAirport?: string;
  locationEmbed?: string;
}
export interface Plant {
  id: string;
  name: string;
  short_description: string;  // Keep snake_case to match API
  images: string[];
  details: PlantDetails;
}
// export interface Plant {
//   id: string;
//   name: string;
//   short_description: string;
//   images: string[];
//   details: PlantDetails;
// }

export interface Unit {
  id: number; // Add this line
  title: string;
  backgroundImage: string; // Keep this if it's required
  description: string;
  order: number; // Add this line
  plants: Plant[];
}

export interface PlantsData {
  exploreHeader: ExploreHeader;
  units: Unit[];
}