import AboutHero from "../Components/about/AboutHero"
import MetricsCounter from "../Components/about/MetricsCounter"
// import OurStorySection from "../Components/about/OurStory"
import AwardCertification from "../Components/AwardCertification"
// import CanvasCursor from "../Components/CanvasCursor"
import ContactUs from "../Components/ContactUs"
import CorePointComponent from "../Components/CorePointComponent/CorePointComponent"
// import HeroBanner from "../Components/HeroBanner"
import HeroBanner2 from "../Components/HeroBanner2"
import LogoMoving from "../Components/LogoMoving"
import { useApiData } from "../hooks/useApiData"

 
function Home() {
 const { data, loading, error } = useApiData();
   if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center">No data available</div>;
 
  return (
     <div>
        {/* <Navbar2></Navbar2> */}
        {/* <BannerHome></BannerHome> */}
        <div className="h-screen flex flex-col">
          {/* <HeroBanner /> */}
          <HeroBanner2 />
          <LogoMoving />
        </div> 
         {/* <OurStorySection></OurStorySection> */}
         <AboutHero 
          title={data.hero.title}
          tagline={data.hero.tagline}
          introduction={data.hero.introduction}
          sliderImages={data.hero.sliderImages}
        />
        
        <MetricsCounter />
        <AwardCertification></AwardCertification>
       <CorePointComponent></CorePointComponent>
        
       


  
      <ContactUs></ContactUs>
      {/* <CanvasCursor></CanvasCursor> */}
 
      </div>
  )
}

export default Home