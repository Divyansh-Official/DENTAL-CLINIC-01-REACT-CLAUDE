import { useRef, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Malhotra",
    location: "Chandigarh",
    date: "3 months ago",
    service: "Dental Implants",
    rating: 5,
    text: "Dr. Sharma transformed my smile completely. The implant procedure was painless and the results are absolutely stunning. I feel so much more confident now — I can't stop smiling!",
    initials: "PM",
  },
  {
    name: "Rahul Verma",
    location: "Mohali",
    date: "1 month ago",
    service: "Root Canal",
    rating: 5,
    text: "The clinic is incredibly modern and the staff is genuinely warm. My root canal was completely comfortable — nothing like what I feared. Would highly recommend to anyone who is anxious about dentistry.",
    initials: "RV",
  },
  {
    name: "Anjali Singh",
    location: "Panchkula",
    date: "5 months ago",
    service: "Porcelain Veneers",
    rating: 5,
    text: "I had 8 veneers done for my wedding and the results exceeded every expectation. My smile looked flawless in every photograph. The attention to detail and personalised care were exceptional.",
    initials: "AS",
  },
  {
    name: "Vikram Bhatt",
    location: "Chandigarh",
    date: "2 weeks ago",
    service: "Clear Aligners",
    rating: 5,
    text: "After years of being self-conscious about my crooked teeth, 14 months of invisible aligners completely changed my life. The digital scanning technology was impressive and progress tracking was super transparent.",
    initials: "VB",
  },
  {
    name: "Meera Kapoor",
    location: "Zirakpur",
    date: "6 months ago",
    service: "Teeth Whitening",
    rating: 5,
    text: "Went in for laser whitening before a job interview — walked out with teeth 7 shades brighter in under an hour. The procedure was painless, the team was professional, and the results are still holding months later.",
    initials: "MK",
  },
  {
    name: "Aditya Nair",
    location: "Mohali",
    date: "8 months ago",
    service: "Full Smile Makeover",
    rating: 5,
    text: "Full smile makeover including veneers, gum contouring and whitening. Dr. Sharma spent hours discussing exactly what I wanted before starting. The final result looks 100% natural. Worth every rupee.",
    initials: "AN",
  },
];

export default function Testimonials() {
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
      id="testimonials"
      ref={ref}
      className="section-reveal bg-[#0A0A0A] text-white px-6 md:px-12 py-20 md:py-28"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
        <div>
          <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
            <span className="w-8 h-px bg-[#8F8F8F]" />
            Patient Reviews
          </p>
          <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9]">
            What Patients<br />
            <span className="text-[#8F8F8F]">Say About Us</span>
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[56px] font-black tracking-[-0.04em] leading-none">4.9</p>
          <div className="flex gap-1 justify-end my-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#FFD700" className="text-yellow-400" />
            ))}
          </div>
          <p className="text-[12px] text-[#8F8F8F]">Based on 340+ verified reviews</p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ t, index }: { t: (typeof TESTIMONIALS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), index * 90);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="section-reveal group relative bg-white/4 border border-white/8 rounded-2xl p-6 md:p-7 hover:bg-white/7 hover:border-white/14 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Quote icon */}
      <Quote size={20} className="text-white/15 mb-4 flex-shrink-0" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} size={12} fill="#FFD700" className="text-yellow-400" />
        ))}
      </div>

      {/* Text */}
      <p className="text-[14px] leading-[1.8] text-white/65 italic flex-1 mb-6">"{t.text}"</p>

      {/* Author row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0">
            {t.initials}
          </div>
          <div>
            <p className="text-[13px] font-bold text-white">{t.name}</p>
            <p className="text-[11px] text-[#8F8F8F]">{t.location} · {t.date}</p>
          </div>
        </div>
      </div>

      {/* Service tag */}
      <span className="mt-4 self-start bg-white/6 border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.1em] uppercase text-[#8F8F8F]">
        {t.service}
      </span>
    </div>
  );
}
