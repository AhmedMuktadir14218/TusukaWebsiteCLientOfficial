// types.ts
export interface PrimaryStat {
  id: number;
  about_company_id: number;
  label: string;
  value: string;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface SecondaryStat {
  id: number;
  about_company_id: number;
  label: string;
  value: string;
  icon: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Dataset {
  id: number;
  production_capacity_id: number;
  label: string;
  data: number;
  background_color: string;
  border_color: string;
  border_width: number;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Metric {
  id: number;
  production_capacity_id: number;
  label: string;
  value: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface PlantDetail {
  id: number;
  plant_id: number;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface Plant {
  id: number;
  unit_id: number;
  name: string;
  image_path: string | null;
  details: PlantDetail[];
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: number;
  about_company_id: number;
  title: string;
  plants: Plant[];
  created_at: string;
  updated_at: string;
}

export interface BankingPartner {
  id: number;
  about_company_id: number;
  name: string;
  image_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface SisterConcern {
  id: number;
  about_company_id: number;
  name: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

// types.ts
// (Previous types remain the same, adding ProductionCapacity type)

export interface ProductionCapacity {
  id: number;
  about_company_id: number;
  title: string;
  datasets: Dataset[];
  metrics: Metric[];
  created_at: string;
  updated_at: string;
}

// Main data interface
export interface AboutCompanyData {
  id: number;
  main_title: string;
  highlighted_title: string;
  primary_stats: PrimaryStat[];
  secondary_stats: SecondaryStat[];
  production_capacity: ProductionCapacity;
  units: Unit[];
  banking_partners: BankingPartner[];
  sister_concerns: SisterConcern[];
  created_at: string;
  updated_at: string;
}