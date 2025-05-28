export interface SliderImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface CompanyValue {
  name: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
  linkedInUrl?: string;
}

export interface CommitmentArea {
  title: string;
  description: string;
}

export interface AboutPageData {
  hero: {
    title: string;
    tagline: string;
    introduction: string;
    sliderImages: SliderImage[];
  };
  ourStory: {
    title: string;
    foundingVision: string;
    growthMilestones: string;
    currentStance: string;
  };
  missionValues: {
    title: string;
    mission: string;
    vision: string;
    values: CompanyValue[];
  };
  team: {
    title: string;
    introduction: string;
    members: TeamMember[];
  };
  commitment: {
    title: string;
    areas: CommitmentArea[];
    conclusion: string;
  };
}