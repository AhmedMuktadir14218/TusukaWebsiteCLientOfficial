import "./App.css";
import Navbar from "./Components/Outlet/Navbar";
import Footer from "./Components/Outlet/Footer";
import HeroBanner from "./Components/HeroBanner";
import LogoMoving from "./Components/LogoMoving";
// import ContactUs from './Components/ContactUs';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Contact_Us from "./Pages/Contact_Us";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import HeroBanner2 from "./Components/HeroBanner2";
import HeroBanner2 from "./Components/HeroBanner2";

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
          <Route path="/hrb2" element={<HeroBanner2></HeroBanner2>} />
          <Route path="/hrb2" element={<HeroBanner></HeroBanner>} />
        </Route>
        </Routes>
      </BrowserRouter>
     
    </>
  );
}

export default App;
