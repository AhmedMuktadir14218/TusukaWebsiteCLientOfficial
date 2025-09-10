import MVCComponent from "../Components/about/MVC_Component";
import AboutHero from "../Components/about/AboutHero";
import MetricsCounter, {
  type Metrics,
} from "../Components/about/MetricsCounter";
// import OurStorySection from "../Components/about/OurStory"
import AwardCertification from "../Components/AwardCertification";
// import CanvasCursor from "../Components/CanvasCursor"
// import ContactUs from "../Components/ContactUs";
import CorePointComponent from "../Components/CorePointComponent/CorePointComponent";
// import HeroBanner from "../Components/HeroBanner"
import HeroBanner2 from "../Components/HeroBanner2";
// import LogoMoving from "../Components/LogoMoving";
import { useAboutHero } from "../hooks/useAbouthero";
import LabIntroSection from "../Components/about/LabIntroSection";
import useLabApi from '../hooks/useLabApi';
import { useEffect, useState } from "react";
import WorkWithUs from "./WorkWithUs/WorkWithUs";
import LogoMoving from "../Components/LogoMoving";
import bgImage from "../assets/bg.png";
import HomeDirectorSlider from "../Components/HomeDirectorSlider";
import NewsAndMedia from "../Components/NewsAndMedia";
import CompanyReport from "../Components/about/CompanyReport";
import NewsTicker from "../Components/NewsTicker";
import { getThemeColors } from "../ColorApi/colorApi";
import { useTheme } from "../Context/ThemeContext";
 
function Home() {
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL ;
  const { labData   } = useLabApi();
 
 const { heroData, metricsData, loading, error } = useAboutHero();

const { theme } = useTheme();
 

 
  if (loading && !labData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F0F1DF]">
        <div className="text-[#363D44] text-xl">Loading laboratory data...</div>
      </div>
    );
  }

  if (error && !labData) {
    console.error("API Error, using default data:", error);
  }

 


  //  const { data, loading, error } = useApiData();
 

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  if (!heroData)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No data available
      </div>
    );

// const bgColor = theme?.webBg ? theme.webBg : undefined; // fallback to CSS default if undefined
// const textColor = theme?.webText ? theme.webText : undefined;

return (
  <div
    style={{
      // backgroundColor: bgColor, // uses API if available
      // color: textColor,         // uses API if available
    }}
    className="min-h-screen  bg-[var(--color-webBg)]"
  >
    <div className="flex flex-col">
      <HeroBanner2 />
    </div>
    <AboutHero
      bgColor="py-12"
      title={heroData.title}
      tagline={heroData.tagline}
      introduction={heroData.introduction}
      sliderImages={heroData.sliderImages}
    />
    <MetricsCounter bgColor="bg-white" metrics={metricsData as Metrics} />
    <LabIntroSection 
    />
    <CorePointComponent />
    <HomeDirectorSlider />
    <LogoMoving mt="mt-48" />
    <NewsAndMedia />
  </div>
);

}

export default Home;
