import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Award, GraduationCap, Microscope, Users, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { EmergencyButton, WhatsAppButton } from "../components/EmergencyButton";
import doctorData from "../data/doctor.json";
import certData from "../data/certifications.json";

const TIMELINE = [
  { year: "2010", title: "BDS — AIIMS Delhi", desc: "Graduated with distinction, Gold Medal in Oral Surgery." },
  { year: "2012", title: "MDS Prosthodontics — PGI Chandigarh", desc: "Post-graduation specialising in implants and full-mouth rehabilitation." },
  { year: "2014", title: "FICOI Fellowship — USA", desc: "Fellow of the International Congress of Oral Implantologists." },
  { year: "2016", title: "Advanced Training — Univ. of Pennsylvania", desc: "Visiting scholar in digital smile design and CAD/CAM prosthetics." },
  { year: "2018", title: "Founded WhiteDental", desc: "Established the clinic to bring world-class dentistry to Chandigarh." },
  { year: "2023", title: "3,000+ Implants Milestone", desc: "Recognised by ITI India for outstanding clinical outcomes." },
];

const SPEC_ICONS = [Award, GraduationCap, Microscope, Users];

export default function DoctorPage() {
  const [booking, setBooking] = useState(false);

  return (
    <>
      <EmergencyButton />
      <WhatsAppButton />
      <BookingModal isOpen={booking} onClose={() => setBooking(false)} />
      <Navbar onBooking={() => setBooking(true)} />

      <main className="pt-24 bg-[#0A0A0A] text-white min-h-screen">
        {/* Top nav */}
        <div className="px-6 md:px-12 pt-10 pb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#8F8F8F] hover:text-white transition-colors">
            <ArrowLeft size={13} /> Back to Home
          </Link>
        </div>

        {/* Hero */}
        <div className="px-6 md:px-12 py-12 border-b border-white/8">
          <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
            <span className="w-8 h-px bg-[#8F8F8F]" />
            Your Doctor
          </p>
          <h1 className="text-[clamp(40px,6vw,88px)] font-black tracking-[-0.04em] leading-[0.9] mb-5">
            {doctorData.name}
          </h1>
          <p className="text-[15px] text-[#8F8F8F] font-medium tracking-[0.05em]">{doctorData.title}</p>
        </div>

        {/* Bio + Specializations */}
        <div className="px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 border-b border-white/8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-4">About</p>
            <p className="text-[16px] leading-[1.85] text-white/65">{doctorData.bio}</p>
            <button
              onClick={() => setBooking(true)}
              className="mt-8 flex items-center gap-2 bg-white text-black font-bold text-[13px] px-7 py-3.5 rounded-full hover:bg-white/90 active:scale-95 transition-all"
            >
              Book With Dr. Sharma <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {doctorData.specializations.map((spec, i) => {
              const Icon = SPEC_ICONS[i] || Award;
              return (
                <div key={i} className="bg-white/4 border border-white/8 rounded-xl p-5 hover:bg-white/7 transition-colors">
                  <Icon size={20} className="text-white/40 mb-3" />
                  <p className="text-[14px] font-bold text-white mb-1">{spec.title}</p>
                  <p className="text-[12px] text-[#8F8F8F]">{spec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Career Timeline */}
        <div className="px-6 md:px-12 py-16 border-b border-white/8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-10">Career Timeline</p>
          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="absolute left-[56px] top-3 bottom-3 w-px bg-white/8 hidden md:block" />

            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-6 md:gap-10 items-start py-6 border-b border-white/6 last:border-0">
                <div className="w-14 flex-shrink-0 text-right">
                  <span className="text-[11px] font-black tracking-[0.08em] text-[#8F8F8F]">{item.year}</span>
                </div>
                <div className="relative">
                  <div className="hidden md:block absolute -left-[38px] top-1 w-3 h-3 rounded-full bg-white/15 border border-white/25 z-10" />
                  <p className="text-[15px] font-bold text-white mb-1">{item.title}</p>
                  <p className="text-[13px] text-[#8F8F8F] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="px-6 md:px-12 py-16 border-b border-white/8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-8">
            Certifications & Memberships
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certData.map((c) => (
              <div key={c.name} className="flex items-center gap-4 bg-white/4 border border-white/8 rounded-xl px-5 py-4 hover:bg-white/7 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
                  {c.type === "fellowship" ? <Star size={14} className="text-white/60" /> :
                   c.type === "degree" ? <GraduationCap size={14} className="text-white/60" /> :
                   <BookOpen size={14} className="text-white/60" />}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">{c.name}</p>
                  <p className="text-[11px] text-[#8F8F8F] capitalize">{c.type} · {c.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
