import AboutHero from "../Components/about/AboutHero"
import MetricsCounter, { type Metrics } from "../Components/about/MetricsCounter"
// import OurStorySection from "../Components/about/OurStory"
import AwardCertification from "../Components/AwardCertification"
// import CanvasCursor from "../Components/CanvasCursor"
import ContactUs from "../Components/ContactUs"
import CorePointComponent from "../Components/CorePointComponent/CorePointComponent"
// import HeroBanner from "../Components/HeroBanner"
import HeroBanner2 from "../Components/HeroBanner2"
import LogoMoving from "../Components/LogoMoving"
import { useAboutHero } from "../hooks/useAbouthero" 

 
function Home() {
//  const { data, loading, error } = useApiData();
 const { heroData, metricsData, loading, error } = useAboutHero()

   if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!heroData) return <div className="min-h-screen flex items-center justify-center">No data available</div>;
 
  return (
     <div>
        {/* <Navbar2></Navbar2> */}
        {/* <BannerHome></BannerHome> */}
        <div className="  flex flex-col">
          {/* <HeroBanner /> */}
          <HeroBanner2 />
          <LogoMoving />
        </div> 
         {/* <OurStorySection></OurStorySection> */}
       
<AboutHero
          bgColor="bg-gradient-to-r from-blue-50 to-indigo-50  py-12"
          title={heroData.title}
          tagline={heroData.tagline}
          introduction={heroData.introduction}
          sliderImages={heroData.sliderImages}
        />

        <MetricsCounter
          bgColor="bg-gradient-to-r from-blue-50 to-indigo-50 bg-white"
          metrics={metricsData as Metrics}
        />

        <AwardCertification></AwardCertification>
       <CorePointComponent></CorePointComponent>
        
       


  
      <ContactUs></ContactUs>
      {/* <CanvasCursor></CanvasCursor> */}
 
      </div>
  )
}

export default Home