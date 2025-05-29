import OurStorySection from "../Components/about/OurStory"
import AwardCertification from "../Components/AwardCertification"
// import CanvasCursor from "../Components/CanvasCursor"
import ContactUs from "../Components/ContactUs"
import CorePointComponent from "../Components/CorePointComponent"
// import HeroBanner from "../Components/HeroBanner"
import HeroBanner2 from "../Components/HeroBanner2"
import LogoMoving from "../Components/LogoMoving"

 
function Home() {
  return (
     <div>
        {/* <Navbar2></Navbar2> */}
        {/* <BannerHome></BannerHome> */}
        <div className="h-screen flex flex-col">
          {/* <HeroBanner /> */}
          <HeroBanner2 />
          <LogoMoving />
        </div> 
         <OurStorySection></OurStorySection>
        <AwardCertification></AwardCertification>
       <CorePointComponent></CorePointComponent>
        
       


  
      <ContactUs></ContactUs>
      {/* <CanvasCursor></CanvasCursor> */}
 
      </div>
  )
}

export default Home