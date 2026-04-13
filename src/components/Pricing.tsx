import { useRef, useEffect } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const PLANS = [
  {
    name: "Cleaning",
    price: "₹800",
    per: "per session",
    features: ["Full-mouth scaling", "Polishing", "Fluoride treatment", "Oral hygiene guidance"],
    highlight: false,
  },
  {
    name: "Root Canal",
    price: "₹4,500",
    per: "per tooth",
    features: ["Digital X-rays", "Rotary endodontics", "Bio-ceramic filling", "Crown consultation"],
    highlight: false,
  },
  {
    name: "Implant",
    price: "₹25,000",
    per: "per tooth incl. crown",
    features: ["3D bone scan", "Titanium implant", "Custom ceramic crown", "5-year warranty", "Free follow-ups"],
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Whitening",
    price: "₹6,000",
    per: "full arch · 60 min",
    features: ["Laser activation", "8 shades brighter", "Take-home kit", "1-year touch-up offer"],
    highlight: false,
  },
];

interface PricingProps { onBooking: () => void; }

export default function Pricing({ onBooking }: PricingProps) {
  const ref = useRef<HTMLElement>(null);

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
    <section
      id="pricing"
      ref={ref}
      className="section-reveal bg-[#0A0A0A] text-white px-6 md:px-12 py-20 md:py-28"
    >
      <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
        <span className="w-8 h-px bg-[#8F8F8F]" />
        Transparent Pricing
      </p>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9]">
          Starting<br />
          <span className="text-[#8F8F8F]">Packages</span>
        </h2>
        <p className="text-[13px] text-[#8F8F8F] max-w-xs leading-relaxed">
          All prices are starting rates. Final quote provided after examination. 0% EMI available on treatments above ₹10,000.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-white/6 rounded-2xl overflow-hidden">
        {PLANS.map((plan, i) => (
          <PricingCard key={i} plan={plan} index={i} onBooking={onBooking} />
        ))}
      </div>

      {/* Insurance logos row */}
      <div className="mt-10 pt-8 border-t border-white/8">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-4">Insurance & Payment Accepted</p>
        <div className="flex flex-wrap gap-3">
          {["Star Health", "Niva Bupa", "HDFC Ergo", "New India", "CGHS", "ECHS", "Visa", "Mastercard", "UPI", "EMI"].map((ins) => (
            <span
              key={ins}
              className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-[12px] font-semibold text-white/60"
            >
              {ins}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, index, onBooking }: { plan: (typeof PLANS)[0]; index: number; onBooking: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), index * 80);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`section-reveal flex flex-col p-7 md:p-8 transition-all duration-300 ${
        plan.highlight
          ? "bg-white text-black"
          : "bg-[#111] text-white hover:bg-[#161616]"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <span className="self-start bg-black text-white text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-4">
          {plan.badge}
        </span>
      )}

      {/* Name */}
      <p className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-5 ${plan.highlight ? "text-[#8F8F8F]" : "text-[#8F8F8F]"}`}>
        {plan.name}
      </p>

      {/* Price */}
      <p className={`text-[42px] md:text-[48px] font-black tracking-[-0.04em] leading-none mb-1 ${plan.highlight ? "text-black" : "text-white"}`}>
        {plan.price}
      </p>
      <p className={`text-[12px] mb-8 ${plan.highlight ? "text-[#8F8F8F]" : "text-[#8F8F8F]"}`}>{plan.per}</p>

      {/* Features */}
      <ul className="flex flex-col gap-2.5 flex-1 mb-8">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <Check
              size={13}
              className={`flex-shrink-0 ${plan.highlight ? "text-black" : "text-white/40"}`}
            />
            <span className={`text-[13px] ${plan.highlight ? "text-black/70" : "text-white/60"}`}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onBooking}
        className={`flex items-center justify-center gap-2 font-bold text-[13px] py-3 rounded-full transition-all duration-200 active:scale-95 ${
          plan.highlight
            ? "bg-black text-white hover:bg-black/85"
            : "bg-white/8 text-white border border-white/12 hover:bg-white/14"
        }`}
      >
        Book Now
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}
