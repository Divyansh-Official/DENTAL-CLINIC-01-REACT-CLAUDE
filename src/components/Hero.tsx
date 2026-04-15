import { useEffect, useRef } from "react";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";

interface HeroProps {
  onBooking: () => void;
}

export default function Hero({ onBooking }: HeroProps) {
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      linesRef.current.forEach((el, i) => {
        if (!el) return;
        const span = el.querySelector("span");
        setTimeout(() => { if (span) span.classList.add("revealed"); }, i * 160);
      });
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  const setRef = (el: HTMLDivElement | null, i: number) => {
    if (el) linesRef.current[i] = el;
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0A0A0A]"
      style={{ paddingTop: "var(--nav-h, 0px)" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1a1a1a]" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }}
      />

      {/* Hero image — right half, grayscale, fades into dark background */}
      <div className="absolute right-0 top-0 bottom-0 w-[58%] md:w-[52%] pointer-events-none select-none">
  <img
    src="../images/hero.png"
    alt="Smiling patient at WhiteDental clinic"
    className="w-full h-full object-cover object-[55%_20%] md:object-[70%_80%]"
  />
</div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pt-28 pb-12">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8F8F8F] w-fit mb-10"
          style={{ animation: "fadeSlideUp 0.6s 2.8s ease both" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          Premium Dental Care · Est. 2010
        </div>

        {/* H1 — line-by-line reveal */}
        <h1 className="font-black text-white leading-[0.9] tracking-[-0.04em] text-[clamp(52px,9vw,120px)] mb-8 max-w-4xl">
          {["Because your", "smile", "deserves", "the Best"].map((line, i) => (
            <div key={i} className="hero-line" ref={(el) => setRef(el as HTMLDivElement, i)}>
              <span className={i === 2 ? "text-[#8F8F8F]" : ""}>{line}</span>
            </div>
          ))}
        </h1>

         {/* <div>
            <h1
              className="font-black text-white leading-[0.88] tracking-[-0.04em] text-[clamp(56px,11vw,130px)]"
              style={{ animation: "fadeSlideUp 0.5s 2.7s ease both" }}
            >
              {["Because your smile", "deserves", "the Best"].map((line, i) => (
                <div key={i} className="hero-line" ref={(el) => setRef(el as HTMLDivElement, i)}>
                  <span className={i === 2 ? "text-[#8F8F8F]" : "text-white"}>{line}</span>
                </div>
              ))}
            </h1>
          </div> */}

        {/* Description */}
        <p
          className="text-[15px] leading-relaxed text-white/50 max-w-sm mb-10"
          style={{ animation: "fadeSlideUp 0.6s 3.1s ease both" }}
        >
          A modern, digital, and innovative dental clinic focused on providing safe and effective treatments using the latest technology.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ animation: "fadeSlideUp 0.6s 3.3s ease both" }}
        >
          <button
            onClick={onBooking}
            className="flex items-center gap-3 bg-white text-black font-bold text-[14px] px-8 py-4 rounded-full hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-300"
          >
            Book Appointment
            <span className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
              <ArrowUpRight size={14} className="text-white" />
            </span>
          </button>
          {/* <button
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 text-[13px] font-semibold text-white/50 hover:text-white transition-colors"
          >
            Explore Services
            <ArrowRight size={15} />
          </button> */}
        </div>
      </div>

      {/* Bottom info bar */}
      <div
  className="
    relative z-10 px-6 md:px-2 pb-10
    flex flex-col sm:flex-row gap-6 sm:gap-16

    lg:absolute lg:right-[550px] lg:bottom-14
    lg:flex lg:flex-row lg:items-center lg:gap-12 lg:text-right
  "
  style={{ animation: "fadeSlideUp 0.6s 3.5s ease both" }}
>
        <div>
          <div className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8F8F8F] font-semibold mb-1">
            <Clock size={10} />
            Working Hours
          </div>
          <div className="text-[14px] font-semibold text-white">Mon – Sat · 9:00 AM – 8:00 PM</div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8F8F8F] font-semibold mb-1">
            <MapPin size={10} />
            Location
          </div>
          <div className="text-[14px] font-semibold text-white">SCO 145-146, Sector 17, Chandigarh</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-8 bottom-10 hidden lg:flex flex-col items-center gap-2 z-10">
        <div className="w-px h-16 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full bg-white" style={{ animation: "scrollLine 1.8s  ease infinite", height: "40%" }} />
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 rotate-90 mt-4">Scroll</span>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}





// import { useEffect, useRef } from "react";
// import { ArrowUpRight, ArrowRight, Clock, MapPin } from "lucide-react";

// interface HeroProps {
//   onBooking: () => void;
// }

// export default function Hero({ onBooking }: HeroProps) {
//   const linesRef = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       linesRef.current.forEach((el, i) => {
//         if (!el) return;
//         const span = el.querySelector("span");
//         setTimeout(() => { if (span) span.classList.add("revealed"); }, i * 160);
//       });
//     }, 2600);
//     return () => clearTimeout(timer);
//   }, []);

//   const setRef = (el: HTMLDivElement | null, i: number) => {
//     if (el) linesRef.current[i] = el;
//   };

//   return (
//     <section
//       id="hero"
//       className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0A0A0A]"
//       style={{ paddingTop: "var(--nav-h, 0px)" }}
//     >
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#1a1a1a]" />

//       {/* Decorative grid lines */}
//       <div className="absolute inset-0 opacity-[0.03]"
//         style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }}
//       />

//       {/* Right side large number decoration */}
//       <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-12 select-none pointer-events-none">
//         <div className="text-[clamp(200px,22vw,320px)] font-black text-white/[0.03] leading-none tracking-tighter">
//           WD 
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pt-28 pb-12">
//         {/* Badge */}
//         <div
//           className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8F8F8F] w-fit mb-10"
//           style={{ animation: "fadeSlideUp 0.6s 2.8s ease both" }}
//         >
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
//           Premium Dental Care · Est. 2010
//         </div>

//         {/* H1 — line-by-line reveal */}
//         <h1 className="font-black text-white leading-[0.9] tracking-[-0.04em] text-[clamp(52px,9vw,120px)] mb-8 max-w-4xl">
//           {["Because", "your smile", "deserves", "the Best"].map((line, i) => (
//             <div key={i} className="hero-line" ref={(el) => setRef(el as HTMLDivElement, i)}>
//               <span className={i === 3 ? "text-[#8F8F8F]" : ""}>{line}</span>
//             </div>
//           ))}
//         </h1>

//         {/* Description */}
//         <p
//           className="text-[15px] leading-relaxed text-white/50 max-w-sm mb-10"
//           style={{ animation: "fadeSlideUp 0.6s 3.1s ease both" }}
//         >
//           A modern, digital, and innovative dental clinic focused on providing safe and effective treatments using the latest technology.
//         </p>

//         {/* CTAs */}
//         <div
//           className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
//           style={{ animation: "fadeSlideUp 0.6s 3.3s ease both" }}
//         >
//           <button
//             onClick={onBooking}
//             className="flex items-center gap-3 bg-white text-black font-bold text-[14px] px-8 py-4 rounded-full hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-300"
//           >
//             Book Appointment
//             <span className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
//               <ArrowUpRight size={14} className="text-white" />
//             </span>
//           </button>
//           <button
//             onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
//             className="flex items-center gap-2 text-[13px] font-semibold text-white/50 hover:text-white transition-colors"
//           >
//             Explore Services
//             <ArrowRight size={15} />
//           </button>
//         </div>
//       </div>

//       {/* Bottom info bar */}
//       <div
//         className="relative z-10 px-6 md:px-12 pb-10 flex flex-col sm:flex-row gap-6 sm:gap-16"
//         style={{ animation: "fadeSlideUp 0.6s 3.5s ease both" }}
//       >
//         <div>
//           <div className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8F8F8F] font-semibold mb-1">
//             <Clock size={10} />
//             Working Hours
//           </div>
//           <div className="text-[14px] font-semibold text-white">Mon – Sat · 9:00 AM – 8:00 PM</div>
//         </div>
//         <div>
//           <div className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8F8F8F] font-semibold mb-1">
//             <MapPin size={10} />
//             Location
//           </div>
//           <div className="text-[14px] font-semibold text-white">SCO 145-146, Sector 17, Chandigarh</div>
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <div className="absolute right-8 bottom-10 hidden lg:flex flex-col items-center gap-2 z-10">
//         <div className="w-px h-16 m-1 bg-white/20 relative overflow-hidden">
//           <div className="absolute top-0 w-full bg-white" style={{ animation: "scrollLine 1.8s ease infinite", height: "40%" }} />
//         </div>
//         <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 rotate-90 mt-2">Scroll</span>
//       </div>

//       <style>{`
//         @keyframes scrollLine {
//           0% { transform: translateY(-100%); }
//           100% { transform: translateY(300%); }
//         }
//       `}</style>
//     </section>
//   );
// }
