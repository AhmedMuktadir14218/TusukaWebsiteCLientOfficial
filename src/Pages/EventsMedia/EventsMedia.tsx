import EventsMediaHeader from "../../Components/EventsMediaComponent/EventsMediaHeader"
import EventsMediaSlider from "../../Components/EventsMediaComponent/EventsMediaSlider"
// import ImageGallerySlider from "../../Components/EventsMediaComponent/ImageGallerySlider"
// import NewsSlider from "../../Components/EventsMediaComponent/NewsSlider"

 
function EventsMedia() {
  return (
    // <div className="min-h-screen">
    //   <EventsMediaHeader />
    //   <div className="py-12">
    //     <ImageGallerySlider />
    //     <NewsSlider />
    //   </div>
    // </div>

     <div className="min-h-screen">
      <EventsMediaHeader />
      <EventsMediaSlider />
    </div>
  )
}

export default EventsMedia