import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cursor from "./components/Cursor";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
// import DoctorPage from "./pages/DoctorPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
// import DoctorProfile from "./components/DoctorProfile";
import DoctorPage from "./pages/DoctorPage";
// import DoctorPage from "./pages/DoctorPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* Global overlays — shown on every page */}
      <Cursor />
      <SplashScreen />

      <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/services"  element={<ServicesPage />} />
          <Route path="/doctor"    element={<DoctorPage />} />
          <Route path="/blog"      element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/contact"   element={<ContactPage />} />

        {/* 404 fallback */}
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
