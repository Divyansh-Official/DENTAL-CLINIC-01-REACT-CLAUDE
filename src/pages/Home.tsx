import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsMarquee from "../components/StatsMarquee";
import Services from "../components/Services";
import DoctorProfile from "../components/DoctorProfile";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import BlogPreview from "../components/BlogPreview";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { EmergencyButton, WhatsAppButton } from "../components/EmergencyButton";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const open = () => setBookingOpen(true);

  return (
    <>
      <EmergencyButton />
      <WhatsAppButton />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <Navbar onBooking={open} />
      <main>
        <Hero onBooking={open} />
        <StatsMarquee />
        <Services onBooking={open} />
        <DoctorProfile />
        <Gallery />
        <Testimonials />
        <Pricing onBooking={open} />
        <FAQ onBooking={open} />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
