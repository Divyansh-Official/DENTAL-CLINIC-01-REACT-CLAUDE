import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
// import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { EmergencyButton, WhatsAppButton } from "../components/EmergencyButton";

export default function ContactPage() {
  const [booking, setBooking] = useState(false);

  return (
    <>
      <EmergencyButton />
      <WhatsAppButton />
      <BookingModal isOpen={booking} onClose={() => setBooking(false)} />
      <Navbar onBooking={() => setBooking(true)} />

      <main className="pt-24 bg-[#0A0A0A] text-white min-h-screen">
        <div className="px-6 md:px-12 pt-10 pb-2">
          <Link to="/" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#8F8F8F] hover:text-white transition-colors">
            <ArrowLeft size={13} /> Back to Home
          </Link>
        </div>
        <Contact />
      </main>

      {/* <Footer /> */}
    </>
  );
}
