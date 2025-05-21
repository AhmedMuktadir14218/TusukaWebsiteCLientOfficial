import './App.css'
import Navbar from './Components/Outlet/Navbar';
import Footer from './Components/Outlet/Footer';
import HeroBanner from './Components/HeroBanner';
import LogoMoving from './Components/LogoMoving';

function App() {

  return (
  <>
  <div>
<Navbar></Navbar>
{/* <Navbar2></Navbar2> */}
{/* <BannerHome></BannerHome> */}
 <div className="h-screen flex flex-col">
      <HeroBanner />
      <LogoMoving />
    </div>

<Footer></Footer>
  </div>
  </>
  )
}

export default App
