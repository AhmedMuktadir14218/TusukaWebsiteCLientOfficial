import PageHeaderComponent from "../PageHeaderComponent"
import imageBanner from "../../assets/homeban55.jpg"
function EventsMediaHeader() {
  return (
<div>
<PageHeaderComponent  
        images={[imageBanner]}
        title="Events & Media"
        description="At Tusuka, we prioritize quality and innovation in our laboratory operations."
/>
</div>    
  )
}

export default EventsMediaHeader