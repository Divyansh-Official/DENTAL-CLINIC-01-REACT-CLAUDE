import { useRef, useEffect, useState } from "react";
import { Award, GraduationCap, Microscope, Users, X, Star, BookOpen, ArrowUpRight } from "lucide-react";
import doctorsData from "../data/multipleDoctors.json";

// ── Types ─────────────────────────────────────────────────────
interface Cert         { name: string; year: string; type: string; }
interface Spec         { title: string; desc: string; }
interface Achievement  { value: string; label: string; }
interface Doctor {
  id: string; name: string; photo: string; title: string; role: string;
  experience: number; bio: string;
  specializations: Spec[]; certifications: Cert[]; achievements: Achievement[];
}

const doctors = doctorsData as Doctor[];
const SPEC_ICONS = [Award, GraduationCap, Microscope, Users];

function certIcon(type: string) {
  if (type === "fellowship") return Star;
  if (type === "degree")     return GraduationCap;
  return BookOpen;
}

// ── Section ───────────────────────────────────────────────────
export default function DoctorProfile() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Doctor | null>(null);

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

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  const featured = doctors[0];
  const team     = doctors.slice(1);

  return (
    <>
      <section
        id="doctor"
        ref={ref}
        className="section-reveal bg-[#0A0A0A] text-white px-6 md:px-12 py-20 md:py-28"
      >
        {/* Label */}
        <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
          <span className="w-8 h-px bg-[#8F8F8F]" />
          Meet Our Team
        </p>
        <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9] mb-16">
          Expert Care,{" "}
          <span className="text-[#8F8F8F]">Personal Touch</span>
        </h2>

        {/* ── Featured doctor ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">

          {/* Photo card */}
          <div className="relative">
            <div className="relative bg-[#111] border border-white/8 rounded-2xl overflow-hidden aspect-[4/5] flex items-end">
              <div className="absolute inset-0">
                {featured.photo ? (
                  <img
                    src={featured.photo}
                    alt={featured.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users size={56} className="text-white/20" />
                  </div>
                )}
              </div>
              {/* Bottom badge */}
              <div className="relative z-10 m-5 bg-black/60 backdrop-blur-xl border border-white/12 rounded-xl px-5 py-4 w-[calc(100%-2.5rem)]">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[38px] font-black tracking-[-0.04em] leading-none">{featured.experience}+</p>
                    <p className="text-[12px] text-[#8F8F8F] mt-0.5">Years of Excellence</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-white">{featured.name}</p>
                    <p className="text-[11px] text-[#8F8F8F] mt-0.5">{featured.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating achievement */}
            <div className="absolute -right-4 top-8 bg-white text-black rounded-xl px-4 py-3 shadow-2xl hidden lg:block">
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#8F8F8F]">
                {featured.achievements[0].label}
              </p>
              <p className="text-[28px] font-black tracking-[-0.03em] leading-none">
                {featured.achievements[0].value}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-[clamp(28px,3.5vw,48px)] font-black tracking-[-0.03em] leading-[1.05] mb-1">
              {featured.name}
            </h3>
            <p className="text-[13px] text-[#8F8F8F] font-medium tracking-[0.06em] mb-2">{featured.title}</p>
            <p className="text-[12px] font-bold text-white/40 uppercase tracking-[0.15em] mb-8">{featured.role}</p>
            <p className="text-[15px] leading-[1.8] text-white/60 mb-10">{featured.bio}</p>

            {/* Specialisations */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {featured.specializations.map((spec, i) => {
                const Icon = SPEC_ICONS[i] || Award;
                return (
                  <div key={i} className="bg-white/4 border border-white/8 rounded-xl p-4 hover:bg-white/8 hover:border-white/14 transition-all duration-200">
                    <Icon size={18} className="text-white/50 mb-2.5" />
                    <p className="text-[13px] font-bold text-white">{spec.title}</p>
                    <p className="text-[11px] text-[#8F8F8F] mt-0.5">{spec.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Certs */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">
                Certifications & Memberships
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.certifications.map((c) => (
                  <span key={c.name} className="bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-[12px] font-medium text-white/70">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            {/* View full profile */}
            <button
              onClick={() => setActive(featured)}
              className="mt-8 flex items-center gap-2 w-fit text-[13px] font-bold text-white border border-white/15 hover:border-white/40 hover:bg-white/5 px-5 py-2.5 rounded-full transition-all duration-200"
            >
              Full Profile & Achievements <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* ── Team divider ── */}
        {team.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-white/8" />
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8F8F8F]">
                Our Specialists
              </p>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* ── Team grid ──
                Desktop: 3-col grid
                Mobile: single horizontal scroll row with snapping
            */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map((doc, i) => (
                <TeamCard key={doc.id} doc={doc} index={i} onOpen={() => setActive(doc)} />
              ))}
            </div>

            {/* Mobile: one-row horizontal scroll */}
           <div className="grid grid-cols-2 gap-4 sm:hidden p-2">
            {team.map((doc, i) => (
              <div key={doc.id} className="w-full">
                <TeamCard doc={doc} index={i} onOpen={() => setActive(doc)} />
              </div>
              ))}
              </div>
          </>
        )}
      </section>

      {/* ── Doctor detail modal ── */}
      <DoctorModal doctor={active} onClose={() => setActive(null)} />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}

// ── Team card ─────────────────────────────────────────────────
function TeamCard({ doc, index, onOpen }: { doc: Doctor; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), index * 100); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onClick={onOpen}
      className="section-reveal group relative bg-[#111] border border-white/8 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Photo */}
      <div className="aspect-[4/3] overflow-hidden">
        {doc.photo ? (
          <img
            src={doc.photo}
            alt={doc.name}
            className="w-full h-full object-cover object-top transition-all duration-500 scale-100 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/4">
            <Users size={40} className="text-white/20" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
<p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F] mb-1 line-clamp-2">
  {doc.role}
</p>        <h3 className="text-[16px] font-black tracking-[-0.02em] text-white mb-1">{doc.name}</h3>
        <p className="text-[11px] text-[#8F8F8F]">{doc.title}</p>

        {/* Mini achievements */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-white/6">
          {doc.achievements.slice(0, 2).map((a) => (
            <div key={a.label}>
              <p className="text-[14px] font-black text-white">{a.value}</p>
              <p className="text-[10px] text-[#8F8F8F]">{a.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <ArrowUpRight size={14} className="text-black" />
      </div>
    </div>
  );
}

// ── Full doctor modal ─────────────────────────────────────────
function DoctorModal({ doctor, onClose }: { doctor: Doctor | null; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Animate in
  useEffect(() => {
    if (!doctor || !panelRef.current) return;
    const el = panelRef.current;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, [doctor]);

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-end md:items-center justify-center p-0 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
        style={{ animation: "fadeIn 0.3s ease" }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full md:max-w-2xl bg-[#111] border border-white/10 rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
        style={{ maxHeight: "92vh" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/8 border border-white/12 flex items-center justify-center hover:bg-white/15 transition-colors"
        >
          <X size={16} className="text-white" />
        </button>

        <div className="overflow-y-auto" style={{ maxHeight: "92vh" }}>

          {/* ── Hero: full-width photo with overlay ── */}
          <div className="relative w-full h-64 sm:h-72 overflow-hidden rounded-t-3xl md:rounded-t-3xl flex-shrink-0">
            {doctor.photo ? (
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-white/4 flex items-center justify-center">
                <Users size={48} className="text-white/20" />
              </div>
            )}
            {/* Gradient overlay — fades photo into panel bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#111]" />

            {/* Role badge top-left */}
            <div className="absolute top-4 left-4">
              <span className="bg-black/50 backdrop-blur-md border border-white/15 text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 px-3 py-1.5 rounded-full">
                {doctor.role}
              </span>
            </div>

            {/* Name + title overlaid at bottom of photo */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
              <h2 className="text-[24px] sm:text-[30px] font-black tracking-[-0.03em] leading-tight text-white drop-shadow-lg">
                {doctor.name}
              </h2>
              <p className="text-[12px] text-white/60 mt-0.5 drop-shadow">{doctor.title}</p>
            </div>
          </div>

          {/* Achievement chips — sit just below the photo */}
          <div className="flex flex-wrap gap-3 px-6 pt-5 pb-1">
            {doctor.achievements.map((a) => (
              <div key={a.label} className="bg-white/6 border border-white/10 rounded-2xl px-4 py-2.5 flex-1 min-w-[80px] text-center">
                <p className="text-[20px] font-black tracking-[-0.02em] text-white leading-none">{a.value}</p>
                <p className="text-[10px] text-[#8F8F8F] mt-1">{a.label}</p>
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="px-6 pb-8 pt-5 flex flex-col gap-7 border-t border-white/6 mt-5">

            {/* Bio */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">About</p>
              <p className="text-[14px] leading-[1.85] text-white/65">{doctor.bio}</p>
            </div>

            {/* Specializations */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">Specializations</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {doctor.specializations.map((spec, i) => {
                  const Icon = SPEC_ICONS[i] || Award;
                  return (
                    <div key={i} className="bg-white/4 border border-white/8 rounded-2xl p-4">
                      <Icon size={16} className="text-white/40 mb-2" />
                      <p className="text-[12px] font-bold text-white">{spec.title}</p>
                      <p className="text-[10px] text-[#8F8F8F] mt-0.5">{spec.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">
                Certifications & Memberships
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {doctor.certifications.map((c) => {
                  const Icon = certIcon(c.type);
                  return (
                    <div key={c.name} className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-2xl px-4 py-3">
                      <div className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-white/50" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-white leading-tight">{c.name}</p>
                        <p className="text-[10px] text-[#8F8F8F] capitalize">{c.type} · {c.year}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>
    </div>
  );
}




// import { useRef, useEffect } from "react";
// import { Award, GraduationCap, Microscope, Users } from "lucide-react";
// import doctorData from "../data/doctor.json";
// import certData from "../data/certifications.json";

// const SPEC_ICONS = [Award, GraduationCap, Microscope, Users];

// export default function DoctorProfile() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
//       { threshold: 0.1 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <section id="doctor" ref={ref} className="section-reveal bg-[#0A0A0A] text-white px-6 md:px-12 py-20 md:py-28">
//       {/* Label */}
//       <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
//         <span className="w-8 h-px bg-[#8F8F8F]" />
//         Meet Your Doctor
//       </p>
//       <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9] mb-16">
//         Expert Care,{" "}
//         <span className="text-[#8F8F8F]">Personal Touch</span>
//       </h2>

//       {/* Two-column layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

//         {/* LEFT — Doctor card */}
//         <div className="relative">
//           {/* Card frame */}
//           <div className="relative bg-[#111] border border-white/8 rounded-2xl overflow-hidden aspect-[4/5] flex items-end">
//             {/* Placeholder visual */}

//             {/* <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
//               <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
//                 <Users size={56} className="text-white/20" />
//               </div>
//               <p className="text-[13px] font-semibold text-white/30 tracking-widest uppercase">Doctor Photo</p>
//               <p className="text-[11px] text-white/20">{doctorData.name}</p>
//             </div> */}

//             <div className="absolute inset-0">
//               {doctorData.photo ? (
//                 <img src={doctorData.photo} alt={doctorData.name}
//                  className="w-full h-full object-cover object-top"
//                  // style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.85)" }}
//                  // 
//                  />
//                 ) : (
//                 <div className="w-full h-full flex flex-col items-center justify-center gap-4">
//                   <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
//                   <Users size={56} className="text-white/20" />
//                   </div>
//                   <p className="text-[13px] font-semibold text-white/30 tracking-widest uppercase">Doctor Photo</p>
//                   </div>
//                 )} </div>

//             {/* Bottom badge */}
//             <div className="relative z-10 m-6 bg-white/8 backdrop-blur-xl border border-white/12 rounded-xl px-5 py-4 w-full">
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-[42px] font-black tracking-[-0.04em] leading-none">{doctorData.experience}+</p>
//                   <p className="text-[12px] text-[#8F8F8F] mt-0.5 tracking-[0.05em]">Years of Excellence</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-[13px] font-bold text-white">{doctorData.name}</p>
//                   <p className="text-[11px] text-[#8F8F8F] mt-0.5">BDS · MDS Prostho</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Floating achievement card */}
//           <div className="absolute -right-4 top-8 bg-white text-black rounded-xl px-4 py-3 shadow-2xl hidden lg:block">
//             <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#8F8F8F]">Implants Placed</p>
//             <p className="text-[28px] font-black tracking-[-0.03em] leading-none">3,000+</p>
//           </div>
//         </div>

//         {/* RIGHT — Info */}
//         <div className="flex flex-col justify-center">
//           <h3 className="text-[clamp(28px,3.5vw,48px)] font-black tracking-[-0.03em] leading-[1.05] mb-2">
//             {doctorData.name}
//           </h3>
//           <p className="text-[13px] text-[#8F8F8F] font-medium tracking-[0.06em] mb-8">
//             {doctorData.title}
//           </p>
//           <p className="text-[15px] leading-[1.8] text-white/60 mb-10">
//             {doctorData.bio}
//           </p>

//           {/* Specialisations grid */}
//           <div className="grid grid-cols-2 gap-3 mb-10">
//             {doctorData.specializations.map((spec, i) => {
//               const Icon = SPEC_ICONS[i] || Award;
//               return (
//                 <div
//                   key={i}
//                   className="bg-white/4 border border-white/8 rounded-xl p-4 hover:bg-white/8 hover:border-white/14 transition-all duration-200"
//                 >
//                   <Icon size={18} className="text-white/50 mb-2.5" />
//                   <p className="text-[13px] font-bold text-white">{spec.title}</p>
//                   <p className="text-[11px] text-[#8F8F8F] mt-0.5">{spec.desc}</p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Certifications */}
//           <div>
//             <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">
//               Certifications & Memberships
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {certData.map((c) => (
//                 <span
//                   key={c.name}
//                   className="bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 text-[12px] font-medium text-white/70"
//                 >
//                   {c.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
