import { useRef, useEffect } from "react";

const STATS = [
  { num: "8,000+", label: "Happy Patients" },
  { num: "14+",    label: "Years Experience" },
  { num: "98%",    label: "Success Rate" },
  { num: "12+",    label: "Treatments" },
  { num: "3,000+", label: "Implants Placed" },
  { num: "4.9★",   label: "Google Rating" },
];

const MARQUEE_ITEMS = [
  "Teeth Cleaning", "Root Canal", "Implants", "Braces",
  "Whitening", "Veneers", "Emergency Care", "Pediatric",
  "Crowns", "Bridges", "Dentures", "Oral Surgery",
];

export default function StatsMarquee() {
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
    <>
      {/* Stats row */}
      <div ref={ref} className="section-reveal bg-white text-black border-b border-[#E0E0E0]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="relative flex flex-col px-8 py-10 border-r border-b lg:border-b-0 border-[#E0E0E0] last:border-r-0 group overflow-hidden"
            >
              {/* Hover fill */}
              <div className="absolute inset-0 bg-black scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500" />
              <span className="relative z-10 text-[clamp(32px,4vw,52px)] font-black tracking-[-0.04em] text-black group-hover:text-white transition-colors duration-300">
                {s.num}
              </span>
              <span className="relative z-10 text-[12px] font-medium text-[#8F8F8F] group-hover:text-white/60 transition-colors mt-1 tracking-[0.02em]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-black border-y border-white/8 py-3.5 overflow-hidden">
        <div className="marquee-inner flex gap-0 w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-8 text-[11px] font-bold tracking-[0.25em] uppercase text-[#8F8F8F] border-r border-white/10"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
