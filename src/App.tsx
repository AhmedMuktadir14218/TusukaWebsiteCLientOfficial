import "./App.css";
import Navbar from "./Components/Outlet/Navbar";
// import Footer from "./Components/Outlet/Footer";
import HeroBanner from "./Components/HeroBanner";
// import LogoMoving from "./Components/LogoMoving";
// import ContactUs from './Components/ContactUs';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Contact_Us from "./Pages/Contact_Us";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import HeroBanner2 from "./Components/HeroBanner2";
import ACertificationsPage from "./Pages/ACertificationsPage";
import JoinWithUse from "./Pages/JoinWithUse";
// import CanvasCursor from "./Components/CanvasCursor";
import SmoothFollower from "./Components/SmoothFollower";
import AboutPage from "./Pages/About/AboutPage";

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
        <Route path="/" element={<Layout />}>
              
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact_Us />} />
          <Route path="/joinwithus/contact-us" element={<Contact_Us />} />
          <Route path="/hrb2" element={<HeroBanner2></HeroBanner2>} />
          <Route path="/hrb1" element={<HeroBanner></HeroBanner>} />
          <Route path="/acp" element={<ACertificationsPage></ACertificationsPage>} />
          <Route path="/joinwithus" element={<JoinWithUse></JoinWithUse>} />
          <Route path="/about" element={<AboutPage></AboutPage>} />
        </Route>
        </Routes>
      </BrowserRouter>
     {/* <CanvasCursor></CanvasCursor> */}
     <SmoothFollower></SmoothFollower>
    </>
  );
}

export default App;
