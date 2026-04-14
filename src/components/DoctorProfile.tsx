import { useRef, useEffect } from "react";
import { Award, GraduationCap, Microscope, Users } from "lucide-react";
import doctorData from "../data/doctor.json";
import certData from "../data/certifications.json";

const SPEC_ICONS = [Award, GraduationCap, Microscope, Users];

export default function DoctorProfile() {
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
    <section id="doctor" ref={ref} className="section-reveal bg-[#0A0A0A] text-white px-6 md:px-12 py-20 md:py-28">
      {/* Label */}
      <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
        <span className="w-8 h-px bg-[#8F8F8F]" />
        Meet Your Doctor
      </p>
      <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9] mb-16">
        Expert Care,{" "}
        <span className="text-[#8F8F8F]">Personal Touch</span>
      </h2>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* LEFT — Doctor card */}
        <div className="relative">
          {/* Card frame */}
          <div className="relative bg-[#111] border border-white/8 rounded-2xl overflow-hidden aspect-[4/5] flex items-end">
            {/* Placeholder visual */}

            {/* <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Users size={56} className="text-white/20" />
              </div>
              <p className="text-[13px] font-semibold text-white/30 tracking-widest uppercase">Doctor Photo</p>
              <p className="text-[11px] text-white/20">{doctorData.name}</p>
            </div> */}

            <div className="absolute inset-0">
              {doctorData.photo ? (
                <img src={doctorData.photo} alt={doctorData.name}
                 className="w-full h-full object-cover object-top"
                 // style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.85)" }}
                 // 
                 />
                ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Users size={56} className="text-white/20" />
                  </div>
                  <p className="text-[13px] font-semibold text-white/30 tracking-widest uppercase">Doctor Photo</p>
                  </div>
                )} </div>

            {/* Bottom badge */}
            <div className="relative z-10 m-6 bg-white/8 backdrop-blur-xl border border-white/12 rounded-xl px-5 py-4 w-full">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[42px] font-black tracking-[-0.04em] leading-none">{doctorData.experience}+</p>
                  <p className="text-[12px] text-[#8F8F8F] mt-0.5 tracking-[0.05em]">Years of Excellence</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-white">{doctorData.name}</p>
                  <p className="text-[11px] text-[#8F8F8F] mt-0.5">BDS · MDS Prostho</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating achievement card */}
          <div className="absolute -right-4 top-8 bg-white text-black rounded-xl px-4 py-3 shadow-2xl hidden lg:block">
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#8F8F8F]">Implants Placed</p>
            <p className="text-[28px] font-black tracking-[-0.03em] leading-none">3,000+</p>
          </div>
        </div>

        {/* RIGHT — Info */}
        <div className="flex flex-col justify-center">
          <h3 className="text-[clamp(28px,3.5vw,48px)] font-black tracking-[-0.03em] leading-[1.05] mb-2">
            {doctorData.name}
          </h3>
          <p className="text-[13px] text-[#8F8F8F] font-medium tracking-[0.06em] mb-8">
            {doctorData.title}
          </p>
          <p className="text-[15px] leading-[1.8] text-white/60 mb-10">
            {doctorData.bio}
          </p>

          {/* Specialisations grid */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {doctorData.specializations.map((spec, i) => {
              const Icon = SPEC_ICONS[i] || Award;
              return (
                <div
                  key={i}
                  className="bg-white/4 border border-white/8 rounded-xl p-4 hover:bg-white/8 hover:border-white/14 transition-all duration-200"
                >
                  <Icon size={18} className="text-white/50 mb-2.5" />
                  <p className="text-[13px] font-bold text-white">{spec.title}</p>
                  <p className="text-[11px] text-[#8F8F8F] mt-0.5">{spec.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Certifications */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">
              Certifications & Memberships
            </p>
            <div className="flex flex-wrap gap-2">
              {certData.map((c) => (
                <span
                  key={c.name}
                  className="bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-[12px] font-medium text-white/70"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
