import { useState } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import {
  Sparkles, Shield, Microscope, Smile,
  Settings2, Zap, AlertTriangle, Stethoscope,
  Clock, CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { EmergencyButton, WhatsAppButton } from "../components/EmergencyButton";

const SERVICES_DETAIL = [
  {
    id: "cleaning",
    Icon: Sparkles,
    title: "Teeth Cleaning",
    tagline: "The foundation of a healthy smile",
    duration: "45–60 minutes",
    price: "From ₹800",
    benefits: ["Removes plaque & tartar buildup", "Prevents gum disease", "Freshens breath", "Early cavity detection"],
    process: ["Ultrasonic scaling to remove deposits", "Hand scaling for precision cleanup", "Polishing with prophylaxis paste", "Fluoride treatment & review"],
    aftercare: "Avoid eating or drinking for 30 minutes post fluoride treatment. Mild sensitivity for 24–48 hours is normal.",
  },
  {
    id: "fillings",
    Icon: Shield,
    title: "Tooth Fillings",
    tagline: "Invisible restoration, natural feel",
    duration: "30–60 minutes",
    price: "From ₹1,200",
    benefits: ["Tooth-coloured composite material", "Mercury-free restorations", "Preserves natural tooth structure", "Same-day completion"],
    process: ["Local anaesthesia applied", "Decay removed with precision drill", "Composite resin placed in layers", "Curing with UV light, shape refined"],
    aftercare: "Avoid hard or sticky foods for 24 hours. Filling may feel slightly high — this self-adjusts or can be polished at the next visit.",
  },
  {
    id: "rootcanal",
    Icon: Microscope,
    title: "Root Canal",
    tagline: "Save your tooth, end the pain",
    duration: "60–90 minutes per session",
    price: "From ₹4,500",
    benefits: ["Eliminates severe tooth pain", "Saves the natural tooth", "Prevents spread of infection", "Single-session in most cases"],
    process: ["Digital X-ray for assessment", "Deep anaesthesia — completely painless", "Pulp removed using rotary files", "Root canals cleaned, shaped & sealed with bio-ceramic"],
    aftercare: "Mild soreness for 2–3 days. Avoid chewing on that side until crown is placed. Crown recommended within 2 weeks.",
  },
  {
    id: "braces",
    Icon: Smile,
    title: "Braces & Aligners",
    tagline: "Straight teeth, confident smile",
    duration: "12–24 months",
    price: "From ₹35,000",
    benefits: ["Metal, ceramic & invisible options", "Improves bite & facial profile", "Custom-fit to your teeth", "Teen & adult-friendly"],
    process: ["3D digital scan (no moulds)", "Treatment plan shown on screen before start", "Brackets bonded or aligners delivered", "Monthly adjustments / new aligner trays every 2 weeks"],
    aftercare: "Wear retainer as directed after treatment. Clean aligners daily with mild soap. Avoid sticky foods with brackets.",
  },
  {
    id: "implants",
    Icon: Settings2,
    title: "Dental Implants",
    tagline: "Permanent teeth that feel real",
    duration: "3–6 months total",
    price: "From ₹25,000",
    benefits: ["Titanium implant lasts a lifetime", "Preserves jawbone density", "No damage to adjacent teeth", "Functions like natural teeth"],
    process: ["3D CBCT scan for bone assessment", "Implant placed under local anaesthesia", "4–6 weeks osseointegration period", "Custom ceramic crown attached"],
    aftercare: "Soft diet for 2 weeks post-surgery. Take prescribed antibiotics. Normal brushing around implant from day 1.",
  },
  {
    id: "whitening",
    Icon: Zap,
    title: "Teeth Whitening",
    tagline: "8 shades brighter in one hour",
    duration: "60 minutes",
    price: "From ₹6,000",
    benefits: ["Laser-activated professional bleaching", "Up to 8 shades improvement", "Safe for enamel", "Immediate visible results"],
    process: ["Teeth cleaned & gums protected", "Whitening gel applied to teeth", "Laser activates gel in 3 x 15 min cycles", "Take-home maintenance kit provided"],
    aftercare: "Avoid staining foods (tea, coffee, red wine) for 48 hours. Use sensitivity toothpaste if needed.",
  },
  {
    id: "emergency",
    Icon: AlertTriangle,
    title: "Emergency Care",
    tagline: "Same-day relief when it matters",
    duration: "Immediate",
    price: "From ₹500 consult",
    benefits: ["Same-day emergency appointments", "24-hour phone guidance", "Toothache, trauma & swelling treated", "Weekend availability"],
    process: ["Call or WhatsApp us immediately", "Triage over the phone if after-hours", "Same-day slot confirmed", "Pain relief & diagnosis on arrival"],
    aftercare: "Follow the specific aftercare for whichever treatment was performed. Emergency consult fee applied toward treatment cost.",
  },
  {
    id: "consultation",
    Icon: Stethoscope,
    title: "Free Consultation",
    tagline: "Know your options, no pressure",
    duration: "30 minutes",
    price: "Free",
    benefits: ["Full oral examination", "Digital X-rays included", "Personalised treatment plan", "Cost & timeline transparency"],
    process: ["Medical & dental history review", "Clinical examination of all teeth & gums", "Digital X-rays if required", "Treatment plan with costs presented"],
    aftercare: "No aftercare required. We'll email your treatment plan within 24 hours.",
  },
];

export default function ServicesPage() {
  const [booking, setBooking] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const active = SERVICES_DETAIL.find((s) => s.id === activeService);

  return (
    <>
      <EmergencyButton />
      <WhatsAppButton />
      <BookingModal isOpen={booking} onClose={() => setBooking(false)} />
      <Navbar onBooking={() => setBooking(true)} />

      <main className="pt-24 bg-white text-black min-h-screen">
        {/* Hero */}
        <div className="px-6 md:px-12 py-16 border-b border-[#E0E0E0]">
          <Link to="/" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#8F8F8F] hover:text-black transition-colors mb-8">
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <h1 className="text-[clamp(42px,7vw,96px)] font-black tracking-[-0.04em] leading-[0.9] mb-5">
            Our<br /><span className="text-[#8F8F8F]">Services</span>
          </h1>
          <p className="text-[15px] text-[#8F8F8F] max-w-lg leading-relaxed">
            Comprehensive dental care under one roof — from routine cleanings to full-mouth reconstructions.
          </p>
        </div>

        {/* Services list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-[#E0E0E0]">
          {SERVICES_DETAIL.map((s) => {
            const Icon = s.Icon;
            const isOpen = activeService === s.id;
            return (
              <div key={s.id} className="bg-white">
                {/* Trigger row */}
                <button
                  onClick={() => setActiveService(isOpen ? null : s.id)}
                  className="w-full flex items-center justify-between gap-4 px-8 py-6 group text-left hover:bg-[#F5F5F5] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${isOpen ? "bg-black" : "bg-[#F5F5F5] group-hover:bg-[#EBEBEB]"}`}>
                      <Icon size={18} className={isOpen ? "text-white" : "text-black/60"} />
                    </div>
                    <div className="text-left">
                      <p className="text-[15px] font-bold text-black">{s.title}</p>
                      <p className="text-[12px] text-[#8F8F8F]">{s.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[12px] font-semibold text-[#8F8F8F] hidden sm:block">{s.price}</span>
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-black border-black rotate-45" : "border-[#E0E0E0]"}`}>
                      <ArrowUpRight size={13} className={isOpen ? "text-white" : "text-black/50"} />
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && active && (
                  <div className="px-8 pb-8 bg-[#F9F9F9] border-t border-[#E0E0E0]">
                    <div className="flex gap-4 py-5 border-b border-[#E0E0E0] mb-6">
                      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#8F8F8F]">
                        <Clock size={12} /> {active.duration}
                      </div>
                      <span className="text-[#E0E0E0]">|</span>
                      <div className="text-[12px] font-bold text-black">{active.price}</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Benefits */}
                      <div>
                        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">Benefits</p>
                        <ul className="flex flex-col gap-2">
                          {active.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-black/70">
                              <CheckCircle2 size={13} className="text-black/30 flex-shrink-0 mt-0.5" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Process */}
                      <div>
                        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">Procedure</p>
                        <ol className="flex flex-col gap-2">
                          {active.process.map((p, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[13px] text-black/70">
                              <span className="w-4 h-4 rounded-full bg-black text-white text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                              {p}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Aftercare */}
                      <div>
                        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">Aftercare</p>
                        <p className="text-[13px] text-black/70 leading-relaxed">{active.aftercare}</p>
                        <button
                          onClick={() => setBooking(true)}
                          className="mt-5 flex items-center gap-2 bg-black text-white text-[12px] font-bold px-5 py-2.5 rounded-full hover:bg-black/85 transition-colors"
                        >
                          Book Now <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
}
