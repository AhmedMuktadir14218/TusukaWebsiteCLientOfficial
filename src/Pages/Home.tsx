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

 
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
 
// Default data structure
const DEFAULT_LAB_DATA = {
  pageHeader: {
    images: [
      { id: 1, path: '/src/assets/laboratory/laboratory1.jpg', filename: 'laboratory1.jpg' },
      { id: 2, path: '/src/assets/laboratory/laboratory2.jpg', filename: 'laboratory2.jpg' },
      { id: 3, path: '/src/assets/laboratory/laboratory3.jpg', filename: 'laboratory3.jpg' },
      { id: 4, path: '/src/assets/laboratory/laboratory4.jpg', filename: 'laboratory4.jpg' },
      { id: 5, path: '/src/assets/laboratory/laboratory5.jpg', filename: 'laboratory5.jpg' }
    ],
    title: "Our Laboratory",
    description: "At Tusuka, we prioritize quality and innovation in our laboratory operations."
  },
  introSection: {
    image: { id: 6, path: '/src/assets/laboratory/laboratory6.jpg', filename: 'laboratory6.jpg' },
    title: "State-of-the-Art Testing Facility",
    paragraphs: [
      "Tusuka established its own in-house fabric and garments testing laboratory with state of the art technology. Approved by numerous international standards, our lab is fully equipped for testing all types of fabrics to ensure all garment compliance are met.",
      "Our goal is to provide total satisfaction to our customers, through quality services and maintaining complete security, confidentiality, and integrity of test results."
    ]
  },
  services: [
    { iconType: "FaMicroscope", title: "International Standards", description: "Testing according to AATCC and other international standards ensuring global compliance." },
    { iconType: "MdSecurity", title: "Quality Assurance", description: "Approved by world-renowned buyers including H&M, Varner Group, and other European customers." },
    { iconType: "FaVial", title: "Comprehensive Testing", description: "Complete testing of garments, fabrics and accessories according to international standards." }
  ],
  facilities: {
    SectionTitle: "Our Facilities",
    SectionDescription: "We are equipped with the latest technology and equipment to ensure accurate and reliable results.",
    colorFastness: {
      iconType: "GiChemicalDrop", 
      title: "Color Fastness Tests", 
      items: [
        "Color Fastness to Washing", 
        "Color Fastness to Water", 
        "Color Fastness to Rubbing",
        "Color Fastness to Perspiration", 
        "Color Fastness to Phenolic Yellowing",
        "Color fastness to household Laundering"
      ]
    },
    physical: {
      iconType: "MdPrecisionManufacturing", 
      title: "Physical Tests", 
      items: [
        "Appearance after wash", 
        "Dimensional stability to washing", 
        "Grams per square meter (GSM)",
        "Twisting", 
        "PH Value", 
        "Tear Strength"
      ]
    },
    strength: {
      iconType: "FaAtom", 
      title: "Strength Tests", 
      items: [
        "Tensile Strength", 
        "Seam slippage", 
        "Stretch Recovery", 
        "Nickel", 
        "Pull Test"
      ]
    }
  },
  certifications: [
    { iconType: "FaCertificate", title: "Internationally Certified", description: "Our laboratory meets global testing standards" },
    { iconType: "MdSecurity", title: "Secure Results", description: "Confidential and reliable testing process" },
    { iconType: "GiMicroscope", title: "Advanced Equipment", description: "State-of-the-art testing facilities" }
  ]
};



function Home() {
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL ;
  const { labData   } = useLabApi();
  const [finalLabData, setFinalLabData] =  useState(DEFAULT_LAB_DATA);
 const { heroData, metricsData, loading, error } = useAboutHero();
 useEffect(() => {
    if (labData) {
      setFinalLabData(labData);
    }
  }, [labData]);

  if (loading && !labData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-blue-600 text-xl">Loading laboratory data...</div>
      </div>
    );
  }

  if (error && !labData) {
    console.error("API Error, using default data:", error);
  }

  // Helper function to get full image path
  const getImagePath = (imageObj: { path: string }) => {
    // If the path is already a full URL, return it
    if (imageObj.path.startsWith('http')) {
      return imageObj.path;
    }
    // Otherwise, construct the path (adjust this based on your setup)
    return `${API_IMAGE_URL}/${imageObj.path}`;
  };



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

  return (
    <div >
      {/* <Navbar2></Navbar2> */}
      {/* <BannerHome></BannerHome> */}
      <div className="  flex flex-col">
        {/* <HeroBanner /> */}
        <HeroBanner2 />
        
        {/* <LogoMoving /> */}
      </div>
      {/* <OurStorySection></OurStorySection> */}

      <AboutHero
        bgColor="  py-12"
        title={heroData.title}
        tagline={heroData.tagline}
        introduction={heroData.introduction}
        sliderImages={heroData.sliderImages}
      />

      <MetricsCounter
        bgColor=" bg-white"
        metrics={metricsData as Metrics}
      />

      <CorePointComponent></CorePointComponent>
{/* <WorkWithUs></WorkWithUs> */}
{/* <AwardCertification></AwardCertification> */}
 

<LabIntroSection
bgColor="bg-white"
  title={finalLabData.introSection.title}
  paragraphs={finalLabData.introSection.paragraphs}
  image={getImagePath(finalLabData.introSection.image)}
/>


      
<HomeDirectorSlider></HomeDirectorSlider>
{/* <CompanyReport></CompanyReport> */}
 <LogoMoving mt="mt-48  "></LogoMoving>

<NewsAndMedia></NewsAndMedia>
    


 


{/* <MVCComponent></MVCComponent> */}
      {/* <ContactUs></ContactUs> */}
      {/* <CanvasCursor></CanvasCursor> */}

      

      {/* <div className="sketchfab-embed-wrapper w-full h-auto">
      <iframe
        title="Jeans Jacket #AgisoftClothesChallenge"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        webShare
        src="https://sketchfab.com/models/4348be24475c45dd9a5bdf6e62ba7ebc/embed"
        className="w-full h-[500px] md:h-[700px] lg:h-[800px] xl:h-[900px]" // Tailwind classes for responsive height
      ></iframe>
      <p className="font-sans text-sm font-normal m-1 text-gray-700">
        <a
          href="https://sketchfab.com/3d-models/jeans-jacket-agisoftclotheschallenge-4348be24475c45dd9a5bdf6e62ba7ebc?utm_medium=embed&utm_campaign=share-popup&utm_content=4348be24475c45dd9a5bdf6e62ba7ebc"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="font-bold text-blue-600 hover:text-blue-800"
        >
          Jeans Jacket #AgisoftClothesChallenge
        </a> by{' '}
        <a
          href="https://sketchfab.com/Sircher?utm_medium=embed&utm_campaign=share-popup&utm_content=4348be24475c45dd9a5bdf6e62ba7ebc"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="font-bold text-blue-600 hover:text-blue-800"
        >
          Sircher
        </a> on{' '}
        <a
          href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=4348be24475c45dd9a5bdf6e62ba7ebc"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="font-bold text-blue-600 hover:text-blue-800"
        >
          Sketchfab
        </a>
      </p>
    </div> */}
    </div>
  );
}

export default Home;
