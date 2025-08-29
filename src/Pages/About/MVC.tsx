import { useLocation } from "react-router-dom";
import MVC_Component from "../../Components/about/MVC_Component"
import image from '../../assets/NewsAndMedia/4.jpg'; 

 
function MVC() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'mission'; // default to mission if no tab param
  
  return (
    <div>
            {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] font-sans antialiased bg-gray-50">
{/* Hero Section with Parallax */}
<div
  className="relative h-[300px] md:h-[400px] bg-fixed bg-center bg-cover flex items-center justify-center font-sans antialiased"
  style={{ backgroundImage: `url(${image})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
        Our Focus
      </h1>
      <p className="text-base md:text-lg text-white max-w-2xl mx-auto">
        Driving excellence through clear mission, focused vision, and strong commitment
      </p>
    </div>
  </div>
</div>

      </div>

      <MVC_Component initialTab={activeTab}/>
    </div>
  )
}


export default MVC