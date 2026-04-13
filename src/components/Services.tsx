import { useRef, useEffect } from "react";
import { ArrowUpRight, Sparkles, Shield, Microscope, Smile, Settings2, Zap, AlertTriangle, Stethoscope } from "lucide-react";

const SERVICES = [
  { id: "cleaning",      num: "01", icon: Sparkles,     title: "Teeth Cleaning",    desc: "Professional prophylaxis to remove plaque, tartar and surface stains. Includes polishing and fluoride treatment for lasting protection." },
  { id: "fillings",      num: "02", icon: Shield,        title: "Fillings",          desc: "Tooth-coloured composite and ceramic restorations that match your natural enamel. Durable, aesthetic and mercury-free." },
  { id: "rootcanal",     num: "03", icon: Microscope,    title: "Root Canal",        desc: "Precision endodontic therapy using rotary files and apex locators. Painless, single-session treatment in most cases." },
  { id: "braces",        num: "04", icon: Smile,         title: "Braces & Aligners", desc: "Traditional metal, ceramic, and fully invisible aligner systems for adults and teens. Customised to your bite and lifestyle." },
  { id: "implants",      num: "05", icon: Settings2,     title: "Implants",          desc: "Titanium implants that look, feel and function exactly like natural teeth. Lifetime warranty on implant bodies." },
  { id: "whitening",     num: "06", icon: Zap,           title: "Whitening",         desc: "Advanced laser and professional-grade bleaching — up to 8 shades brighter in a single 60-minute session." },
  { id: "emergency",     num: "07", icon: AlertTriangle, title: "Emergency Care",    desc: "Same-day emergency slots available every day. Call our 24-hour hotline for immediate guidance and triage." },
  { id: "consultation",  num: "08", icon: Stethoscope,   title: "Consultation",      desc: "Comprehensive oral health assessment with digital X-rays and a personalised treatment plan — completely free." },
];

interface ServicesProps { onBooking: () => void; }

export default function Services({ onBooking }: ServicesProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="bg-white text-black">
      {/* Header */}
      <div ref={ref} className="section-reveal px-6 md:px-12 pt-20 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-end border-b border-[#E0E0E0]">
        <div>
          <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
            <span className="w-8 h-px bg-[#8F8F8F]" />
            What We Offer
          </p>
          <h2 className="text-[clamp(42px,6vw,80px)] font-black tracking-[-0.04em] leading-[0.9]">
            Our<br />Services
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-[15px] leading-relaxed text-[#8F8F8F] max-w-md">
            From routine cleanings to full-mouth reconstructions — comprehensive dental care tailored to every stage of your life.
          </p>
          <button
            onClick={onBooking}
            className="flex items-center gap-3 w-fit bg-black text-white font-bold text-[13px] px-7 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.25)] active:scale-95 transition-all duration-200"
          >
            Book Appointment
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <ArrowUpRight size={12} className="text-black" />
            </span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#E0E0E0]">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <ServiceCard key={s.id} {...s} Icon={Icon} index={i} onBooking={onBooking} />
          );
        })}
      </div>
    </section>
  );
}

interface CardProps {
  num: string;
  Icon: React.ElementType;
  title: string;
  desc: string;
  index: number;
  onBooking: () => void;
}

function ServiceCard({ num, Icon, title, desc, index, onBooking }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), index * 80);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onClick={onBooking}
      className="section-reveal group relative flex flex-col p-8 md:p-10 border-r border-b border-[#E0E0E0] last:border-r-0 hover:bg-black transition-colors duration-400 overflow-hidden"
      style={{ cursor: "none" }}
    >
      {/* Number */}
      <span className="text-[12px] font-bold text-black/10 group-hover:text-white/10 transition-colors mb-10 font-mono">
        {num}
      </span>

      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 group-hover:bg-white/10 transition-colors mb-6">
        <Icon size={20} className="text-black group-hover:text-white transition-colors" />
      </div>

      {/* Text */}
      <h3 className="text-[18px] font-bold tracking-[-0.02em] text-black group-hover:text-white transition-colors mb-3">
        {title}
      </h3>
      <p className="text-[13px] leading-relaxed text-[#8F8F8F] group-hover:text-white/60 transition-colors flex-1">
        {desc}
      </p>

      {/* Arrow */}
      <div className="mt-8 w-8 h-8 rounded-full border border-black/20 group-hover:border-white/30 group-hover:bg-white flex items-center justify-center transition-all duration-300">
        <ArrowUpRight size={14} className="service-arrow-icon text-black/60 group-hover:text-black transition-colors" />
      </div>
    </div>
  );
}
