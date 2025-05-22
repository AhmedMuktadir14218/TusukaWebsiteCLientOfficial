import './App.css'
import Navbar from './Components/Outlet/Navbar';
import Footer from './Components/Outlet/Footer';
import HeroBanner from './Components/HeroBanner';
import LogoMoving from './Components/LogoMoving';
// import ContactUs from './Components/ContactUs';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Contact_Us from './Pages/Contact_Us';
import Layout from './Components/Layout';

function App() {

  return (
  <>
<BrowserRouter>
      <Navbar />
      <Routes>
        {/* Define routes for each component */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/explore-plants" element={<ExplorePlants />} />
        <Route path="/core-points" element={<CorePoints />} />
        <Route path="/join-with-us" element={<JoinWithUs />} /> */}
        <Route path="/" element={<Layout />} />
        <Route path="/contact-us" element={<Contact_Us />} />
      </Routes>
    </BrowserRouter>
  <div>

{/* <Navbar2></Navbar2> */}
{/* <BannerHome></BannerHome> */}
 {/* <div className="h-screen flex flex-col">
      <HeroBanner />
      <LogoMoving />
    </div>
<div>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam voluptate neque nesciunt at pariatur alias libero magni sint nam perferendis ducimus quisquam, mollitia asperiores dolorum, quidem tempora? Facere vel, labore omnis tempore sapiente officiis voluptate, fugit voluptates repellendus vitae aspernatur, dignissimos obcaecati itaque accusamus optio incidunt corporis minus! Labore iure natus id, cumque nobis praesentium! Ab laborum aspernatur in eius sapiente sit similique natus consectetur magni quos. Dolorum explicabo corrupti a? Sapiente perferendis nesciunt distinctio, natus impedit repellat! Dolore reiciendis nobis cupiditate optio, dolorum dolorem beatae necessitatibus, dicta cumque minima consequatur alias! Aliquid, veritatis eius? Vel placeat aut quis, nisi eligendi hic praesentium dignissimos consequatur? Necessitatibus fugiat veritatis quam enim aliquid fugit ipsam in eum minus quasi, quae modi perspiciatis.
</div>
<div>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam voluptate neque nesciunt at pariatur alias libero magni sint nam perferendis ducimus quisquam, mollitia asperiores dolorum, quidem tempora? Facere vel, labore omnis tempore sapiente officiis voluptate, fugit voluptates repellendus vitae aspernatur, dignissimos obcaecati itaque accusamus optio incidunt corporis minus! Labore iure natus id, cumque nobis praesentium! Ab laborum aspernatur in eius sapiente sit similique natus consectetur magni quos. Dolorum explicabo corrupti a? Sapiente perferendis nesciunt distinctio, natus impedit repellat! Dolore reiciendis nobis cupiditate optio, dolorum dolorem beatae necessitatibus, dicta cumque minima consequatur alias! Aliquid, veritatis eius? Vel placeat aut quis, nisi eligendi hic praesentium dignissimos consequatur? Necessitatibus fugiat veritatis quam enim aliquid fugit ipsam in eum minus quasi, quae modi perspiciatis.
</div>
<div>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam voluptate neque nesciunt at pariatur alias libero magni sint nam perferendis ducimus quisquam, mollitia asperiores dolorum, quidem tempora? Facere vel, labore omnis tempore sapiente officiis voluptate, fugit voluptates repellendus vitae aspernatur, dignissimos obcaecati itaque accusamus optio incidunt corporis minus! Labore iure natus id, cumque nobis praesentium! Ab laborum aspernatur in eius sapiente sit similique natus consectetur magni quos. Dolorum explicabo corrupti a? Sapiente perferendis nesciunt distinctio, natus impedit repellat! Dolore reiciendis nobis cupiditate optio, dolorum dolorem beatae necessitatibus, dicta cumque minima consequatur alias! Aliquid, veritatis eius? Vel placeat aut quis, nisi eligendi hic praesentium dignissimos consequatur? Necessitatibus fugiat veritatis quam enim aliquid fugit ipsam in eum minus quasi, quae modi perspiciatis.
</div>
<div>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam voluptate neque nesciunt at pariatur alias libero magni sint nam perferendis ducimus quisquam, mollitia asperiores dolorum, quidem tempora? Facere vel, labore omnis tempore sapiente officiis voluptate, fugit voluptates repellendus vitae aspernatur, dignissimos obcaecati itaque accusamus optio incidunt corporis minus! Labore iure natus id, cumque nobis praesentium! Ab laborum aspernatur in eius sapiente sit similique natus consectetur magni quos. Dolorum explicabo corrupti a? Sapiente perferendis nesciunt distinctio, natus impedit repellat! Dolore reiciendis nobis cupiditate optio, dolorum dolorem beatae necessitatibus, dicta cumque minima consequatur alias! Aliquid, veritatis eius? Vel placeat aut quis, nisi eligendi hic praesentium dignissimos consequatur? Necessitatibus fugiat veritatis quam enim aliquid fugit ipsam in eum minus quasi, quae modi perspiciatis.
</div>
<div>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam voluptate neque nesciunt at pariatur alias libero magni sint nam perferendis ducimus quisquam, mollitia asperiores dolorum, quidem tempora? Facere vel, labore omnis tempore sapiente officiis voluptate, fugit voluptates repellendus vitae aspernatur, dignissimos obcaecati itaque accusamus optio incidunt corporis minus! Labore iure natus id, cumque nobis praesentium! Ab laborum aspernatur in eius sapiente sit similique natus consectetur magni quos. Dolorum explicabo corrupti a? Sapiente perferendis nesciunt distinctio, natus impedit repellat! Dolore reiciendis nobis cupiditate optio, dolorum dolorem beatae necessitatibus, dicta cumque minima consequatur alias! Aliquid, veritatis eius? Vel placeat aut quis, nisi eligendi hic praesentium dignissimos consequatur? Necessitatibus fugiat veritatis quam enim aliquid fugit ipsam in eum minus quasi, quae modi perspiciatis.
</div>

{/* <ContactUs></ContactUs> */}
<Footer></Footer>
  </div> */}
  </>
  )
}

export default App
