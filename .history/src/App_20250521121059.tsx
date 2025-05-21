import './App.css'
import Navbar from './Components/Outlet/Navbar';
import Navbar2 from './Components/Outlet/Navbar2';
import BannerHome from './Components/BannerHome';
import Footer from './Components/Outlet/Footer';
import HeroBanner from './Components/HeroBanner';

function App() {

  return (
  <>
  <div>
{/* <Navbar></Navbar> */}
<Navbar2></Navbar2>
<HeroBanner></HeroBanner>
<BannerHome></BannerHome>
<Footer></Footer>
  </div>
  </>
  )
}

export default App
