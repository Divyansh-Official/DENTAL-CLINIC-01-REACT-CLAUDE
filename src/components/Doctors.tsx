import { useRef, useEffect, useState } from "react";
import {
  Award, GraduationCap, BookOpen, Star,
  ArrowUpRight, ChevronDown, ChevronUp,
} from "lucide-react";
import doctors from "../data/multipleDoctors.json";

// ─── helpers ─────────────────────────────────────────────────────────────────

const CERT_ICON: Record<string, React.ElementType> = {
  fellowship: Star,
  degree:     GraduationCap,
  training:   Award,
  membership: BookOpen,
};

// ─── sub-components ───────────────────────────────────────────────────────────

function CertBadge({ name, year, type }: { name: string; year: string; type: string }) {
  const Icon = CERT_ICON[type] ?? BookOpen;
  return (
    <div className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-xl px-4 py-3 hover:bg-white/7 transition-colors">
      <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-white/60" />
      </div>
      <div>
        <p className="text-[13px] font-bold text-white leading-tight">{name}</p>
        <p className="text-[10px] text-[#8F8F8F] capitalize mt-0.5">{type} · {year}</p>
      </div>
    </div>
  );
}

function SpecCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 hover:bg-white/7 transition-colors">
      <p className="text-[13px] font-bold text-white mb-0.5">{title}</p>
      <p className="text-[11px] text-[#8F8F8F]">{desc}</p>
    </div>
  );
}

function AchievementStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center px-3 py-3 bg-white/4 border border-white/8 rounded-xl flex-1">
      <span className="text-[22px] font-black tracking-[-0.03em] text-white">{value}</span>
      <span className="text-[10px] text-[#8F8F8F] font-semibold tracking-[0.08em] uppercase mt-0.5 leading-tight">{label}</span>
    </div>
  );
}

// ─── individual doctor card ────────────────────────────────────────────────────

function DoctorCard({
  doctor,
  onBook,
}: {
  doctor: (typeof doctors)[number];
  onBook: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:border-white/14 transition-colors duration-300">

      {/* Photo */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/5">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-full h-full object-cover object-top  transition-all duration-500"
          loading="lazy"
        />
        {/* Experience badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-[10px] font-black tracking-[0.08em] uppercase text-white">
          {doctor.experience}+ yrs
        </div>
      </div>

      {/* Identity */}
      <div className="px-5 pt-5 pb-4 border-b border-white/8">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-1">{doctor.role}</p>
        <h3 className="text-[22px] font-black tracking-[-0.03em] text-white leading-tight mb-1">
          {doctor.name}
        </h3>
        <p className="text-[12px] text-[#8F8F8F] font-medium">{doctor.title}</p>
      </div>

      {/* Achievements */}
      <div className="px-5 py-4 border-b border-white/8">
        <div className="flex gap-2">
          {doctor.achievements.map((a, i) => (
            <AchievementStat key={i} value={a.value} label={a.label} />
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="px-5 py-4 border-b border-white/8">
        <p className="text-[13px] leading-[1.8] text-white/60">{doctor.bio}</p>
      </div>

      {/* Specializations */}
      <div className="px-5 py-4 border-b border-white/8">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">Specializations</p>
        <div className="grid grid-cols-2 gap-2">
          {doctor.specializations.map((s, i) => (
            <SpecCard key={i} title={s.title} desc={s.desc} />
          ))}
        </div>
      </div>

      {/* Certifications — collapsible */}
      <div className="px-5 py-4">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center justify-between w-full text-left mb-3 group"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] group-hover:text-white transition-colors">
            Certifications &amp; Memberships
          </p>
          {expanded
            ? <ChevronUp size={13} className="text-[#8F8F8F]" />
            : <ChevronDown size={13} className="text-[#8F8F8F]" />}
        </button>

        {expanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn">
            {doctor.certifications.map((c, i) => (
              <CertBadge key={i} name={c.name} year={c.year} type={c.type} />
            ))}
          </div>
        )}
      </div>

      {/* Book CTA */}
      <div className="px-5 pb-5 mt-auto">
        <button
          onClick={onBook}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,255,255,0.12)] active:scale-95 transition-all duration-200"
        >
          Book with {doctor.name.split(" ").slice(0, 2).join(" ")}
          <ArrowUpRight size={14} />
        </button>
      </div>
    </article>
  );
}

// ─── main exported component ──────────────────────────────────────────────────

export default function Doctors({ onBooking }: { onBooking: () => void }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="doctors"
      ref={ref}
      className="section-reveal bg-[#0A0A0A] text-white px-6 md:px-12 py-16 md:py-24"
    >
      {/* Section header */}
      <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
        <span className="w-8 h-px bg-[#8F8F8F]" />
        Our Team
      </p>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9]">
          Meet the<br />
          <span className="text-[#8F8F8F]">Doctors</span>
        </h2>
        <p className="text-[14px] text-white/50 max-w-xs leading-relaxed md:text-right">
          A team of specialists dedicated to every aspect of your dental health — from prevention to full rehabilitation.
        </p>
      </div>

      {/* Doctor cards — 1 col → 2 col → 3 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} onBook={onBooking} />
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease both; }
      `}</style>
    </section>
  );
}