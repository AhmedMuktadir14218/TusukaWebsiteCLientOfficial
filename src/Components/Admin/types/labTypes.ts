// resources/js/types/labTypes.ts
export interface LabImage {
  id: number;
  path: string;
  filename: string;
  image_type: 'header' | 'intro';
  order?: number;
}

export interface HeaderSection {
  title: string;
  description: string;
  images: LabImage[];
}

export interface IntroSection {
  title: string;
  paragraphs: string[];
  image: LabImage | null;
}

export interface ServiceItem {
  iconType: string;
  title: string;
  description: string;
}

export interface FacilityTest {
  iconType: string;
  title: string;
  items: string[];
}

export interface FacilitiesSection {
  SectionTitle: string;
  SectionDescription: string;
  colorFastness: FacilityTest;
  physical: FacilityTest;
  strength: FacilityTest;
}

export interface CertificationItem {
  iconType: string;
  title: string;
  description: string;
}

export interface LabData {
  pageHeader: HeaderSection;
  introSection: IntroSection;
  services: ServiceItem[];
  facilities: FacilitiesSection;
  certifications: CertificationItem[];
}