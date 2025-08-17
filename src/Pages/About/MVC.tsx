import { useLocation } from "react-router-dom";
import MVC_Component from "../../Components/about/MVC_Component"

 
function MVC() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'mission'; // default to mission if no tab param
  
  return (
    <div>
      <MVC_Component initialTab={activeTab}/>
    </div>
  )
}


export default MVC