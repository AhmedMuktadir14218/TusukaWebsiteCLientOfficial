import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Pages/Home";
import Contact_Us from "./Pages/Contact_Us";
import HeroBanner from "./Components/HeroBanner";
import HeroBanner2 from "./Components/HeroBanner2";
import ACertificationsPage from "./Pages/ACertificationsPage";
import JoinWithUse from "./Pages/JoinWithUse";
import AboutPage from "./Pages/About/AboutPage";
import CompanyProfile from "./Pages/About/CompanyProfile";
import Quality from "./Pages/About/Quality";
import MVC from "./Pages/About/MVC";
import LaboratoryClient from "./Pages/About/Laboratory";
import ExplorePlants from "./Pages/ExplorePlants/ExplorePlants";
import EventsMedia from "./Pages/EventsMedia/EventsMedia";

import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import AdminLogin from "./Pages/Admin/Login/Login";

import SmoothFollower from "./Components/SmoothFollower";
import Layout from "./Components/Layout"; // This is your public layout
import AdminPrivateRoute from "./Routes/AdminPrivateRoute"; // Your private route guard
import AdminLayout from "./Routes/AdminLayout";
import AdminExplorePlants from "./Pages/Admin/AdminExplorePlants/ExplorePlants";
import AdminJobs from "./Pages/Admin/AdminJobs/AdminJobs";
import AdminAbout from "./Pages/Admin/AdminAbout/AdminAbout";
import Laboratory from "./Pages/Admin/Laboratory/Laboratory";
import DirectorsInfo from "./Pages/Admin/DirectorsInfo/Directorsinfo";

 
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact-us" element={<Contact_Us />} />
            <Route path="joinwithus/contact-us" element={<Contact_Us />} />
            <Route path="hrb2" element={<HeroBanner2 />} />
            <Route path="hrb1" element={<HeroBanner />} />
            <Route path="acp" element={<ACertificationsPage />} />
            <Route path="joinwithus" element={<JoinWithUse />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="companyprofile" element={<CompanyProfile />} />
            <Route path="quality" element={<Quality />} />
            <Route path="mvc" element={<MVC />} />
            <Route path="laboratory" element={<LaboratoryClient />} />
            <Route path="eventsmedia" element={<EventsMedia />} />
            <Route path="plants" element={<ExplorePlants />} />
          </Route>

          {/* Admin Login (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Private Routes */}
          {/* The AdminPrivateRoute component will handle authentication check */}
          <Route path="/admin" element={<AdminPrivateRoute />}>
            {/* If authenticated, the AdminLayout will render the Sidebar and the specific admin page */}
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} /> {/* This will be /admin */}
              {/* Add other admin routes here */}
              {/* These paths will be relative to /admin */}
              <Route path="/admin/explore-plants" element={<AdminExplorePlants></AdminExplorePlants>} /> {/* Example: /admin/explore-plants */}
              <Route path="/admin/laboratory" element={<Laboratory></Laboratory>} /> {/* Example: /admin/laboratory */}
              {/* You might want to create Admin-specific versions of these pages or reuse */}
              {/* For instance, an AdminProducts page instead of just ExplorePlants directly */}
              {/* <Route path="products" element={<AdminProducts />} /> */}
              {/* <Route path="users" element={<AdminUsers />} /> */}
              <Route path="/admin/directorsInfo" element={<DirectorsInfo />} />
              <Route path="/admin/about" element={<AdminAbout></AdminAbout>} />
              <Route path="/admin/jobs" element={<AdminJobs></AdminJobs>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <SmoothFollower />
    </>
  );
}

export default App;