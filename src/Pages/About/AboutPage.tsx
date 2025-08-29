import React, { useState } from 'react'; 
import SidebarMenu from '../../Components/SidebarMenu';
import AboutHero from '../../Components/about/AboutHero';
import OurStory from '../../Components/about/OurStory';
// import MissionValues from '../../Components/about/MissionValues';
// import MeetTheTeam from '../../Components/about/MeetTheTeam';
import OurCommitment from '../../Components/about/OurCommitment';
import MetricsCounter, { type Metrics } from '../../Components/about/MetricsCounter';
import CompanyReport from '../../Components/about/CompanyReport';
import QualityComponent from '../../Components/about/QualityComponent';
import MVC_Component from '../../Components/about/MVC_Component';
// import DirectorCard from '../../Components/about/DirectorCard';
import DirectorSlider from '../../Components/about/DirectorSlider';
import Laboratory from './Laboratory';
import { useAboutHero } from '../../hooks/useAbouthero';
import type { SliderImage } from '../../types/about';
import LogoMoving from '../../Components/LogoMoving';
import MVC from './MVC';
import AboutHeroBanner from '../../Components/about/AboutHeroBanner';

const AboutPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { heroData, metricsData, loading, error } = useAboutHero();

  const toggleSidebar = () => setIsSidebarOpen(open => !open);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error)   return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!heroData || !metricsData) return <div className="min-h-screen flex items-center justify-center">No data available</div>;

  // prefix upload paths with your API host
// prefix upload paths with your API host
const apiBase = import.meta.env.VITE_API_BASE_URL; // http://localhost/TusukaWebServerV6

const imagesWithFullUrl: SliderImage[] = heroData.sliderImages.map(img => {
  let finalSrc = img.src;

  // If not starting with http, build full URL
  if (!img.src.startsWith('http')) {
    finalSrc = `${apiBase}/${img.src}`;
  } else {
    // If full URL but missing 'public/' in path, insert it
    if (img.src.includes('/uploads/') && !img.src.includes('/public/uploads/')) {
      finalSrc = img.src.replace('/uploads/', '/public/uploads/');
    }
  }

  return { ...img, src: finalSrc };
});

// console.log(imagesWithFullUrl)


  return (
    <div className="min-h-screen bg-white ">
 

      <main>
        <AboutHeroBanner />
        <AboutHero
          bgColor=" py-12 "
          title={heroData.title}
          tagline={heroData.tagline}
          introduction={heroData.introduction}
          sliderImages={imagesWithFullUrl}
        />

        <MetricsCounter
          bgColor="bg-white"
          metrics={metricsData as Metrics}
        />

        <OurStory />
<LogoMoving />
        <DirectorSlider />

        <CompanyReport />

        <QualityComponent />

        {/* <MVC_Component />
         */}
<MVC></MVC>
        <OurCommitment
          title={heroData.title /* or data.commitment from another endpoint */}
          areas={[]}            /* pass actual data when available */
          conclusion=""
        />

        {/* <Laboratory /> */}
      </main>
    </div>
  );
};

export default AboutPage;
