import React, { useState } from 'react';
import { useApiData } from '../../hooks/useApiData';
import SidebarMenu from '../../Components/SidebarMenu';
import AboutHero from '../../Components/about/AboutHero';
import OurStory from '../../Components/about/OurStory';
import MissionValues from '../../Components/about/MissionValues';
import MeetTheTeam from '../../Components/about/MeetTheTeam';
import OurCommitment from '../../Components/about/OurCommitment';
import MetricsCounter from '../../Components/about/MetricsCounter';
const AboutPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, loading, error } = useApiData();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center">No data available</div>;

  return (
    <div className="min-h-screen bg-white">
      <SidebarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">About Us</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main>
        <AboutHero 
          title={data.hero.title}
          tagline={data.hero.tagline}
          introduction={data.hero.introduction}
          sliderImages={data.hero.sliderImages}
        />
        
        <MetricsCounter />
        
        <OurStory 
        //   title={data.ourStory.title}
        //   foundingVision={data.ourStory.foundingVision}
        //   growthMilestones={data.ourStory.growthMilestones}
        //   currentStance={data.ourStory.currentStance}
        />
 
        
        <MissionValues 
          title={data.missionValues.title}
          mission={data.missionValues.mission}
          vision={data.missionValues.vision}
          values={data.missionValues.values}
        />
        
        <MeetTheTeam 
          title={data.team.title}
          introduction={data.team.introduction}
          members={data.team.members}
        />
        
        <OurCommitment 
          title={data.commitment.title}
          areas={data.commitment.areas}
          conclusion={data.commitment.conclusion}
        />
      </main>
    </div>
  );
};

export default AboutPage;