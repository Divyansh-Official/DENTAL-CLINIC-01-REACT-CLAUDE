import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clinicData from "../data/clinic.json";

const NAV_LINKS = [
  { label: "Services",     href: "#services" },
  { label: "Doctor",       href: "#doctor" },
  { label: "Gallery",      href: "#gallery" },
  { label: "Reviews",      href: "#testimonials" },
  { label: "FAQ",          href: "#faq" },
  { label: "Contact",      href: "#contact" },
];

// ─── Fetch the first photo from Google Places Photos API ────────────────────
// Requires VITE_GOOGLE_MAPS_API_KEY in your .env
async function fetchClinicPhoto(placeId: string): Promise<string | null> {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!key) return null;

  try {
    // Step 1: Get photo reference from Place Details endpoint
    const detailsRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${key}`
    );
    const details = await detailsRes.json();
    const ref = details?.result?.photos?.[0]?.photo_reference;
    if (!ref) return null;

    // Step 2: Build the photo URL
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=120&photo_reference=${ref}&key=${key}`;
  } catch {
    return null;
  }
}

// ─── Split clinic name into primary and sub-brand ───────────────────────────
const [primaryName, ...rest] = clinicData.clinic_name.split(" and ");
const subName = rest.join(" and "); // "Implant Clinic"

interface NavbarProps {
  onBooking: () => void;
}

export default function Navbar({ onBooking }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [clinicPhoto, setClinicPhoto] = useState<string | null>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch clinic photo from Google Places
  useEffect(() => {
    fetchClinicPhoto(clinicData.google_place_id).then(setClinicPhoto);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-400 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/8 px-6 md:px-12 py-3"
            : "bg-transparent px-6 md:px-12 py-5"
        }`}
      >
        {/* ── Logo + Clinic Photo ────────────────────────────────────────── */}
        <a href="#" className="flex items-center gap-3 select-none">
          {/* Clinic photo thumbnail (shown only when fetched) */}
          {clinicPhoto ? (
            <img
              src={clinicPhoto}
              alt={clinicData.clinic_name}
              className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
            />
          ) : (
            /* Fallback: gradient initials badge */
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-600 text-white text-xs font-black shadow-md shrink-0">
              SDC
            </div>
          )}

          {/* Name */}
          <span className="text-[15px] font-black tracking-[-0.04em] text-white leading-tight">
            {primaryName}
            <span className="text-[#8F8F8F] font-semibold"> and {subName}</span>
          </span>
        </a>

        {/* ── Desktop nav links ─────────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                className="text-[13px] font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-[0.02em]"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ───────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${clinicData.contact.phone.replace(/\s/g, "")}`}
            className="text-[13px] font-semibold text-white/60 hover:text-white transition-colors"
          >
            {clinicData.contact.phone_display}
          </a>
          <button
            onClick={onBooking}
            className="bg-white text-black text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200"
          >
            Book Now
          </button>
        </div>

        {/* ── Hamburger ─────────────────────────────────────────────────── */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[99] bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Clinic photo in drawer */}
        <div className="flex flex-col items-center gap-2 mb-2">
          {clinicPhoto ? (
            <img
              src={clinicPhoto}
              alt={clinicData.clinic_name}
              className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
            />
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-600 text-white text-xl font-black">
              SDC
            </div>
          )}
          <p className="text-white/40 text-xs tracking-widest uppercase">
            {clinicData.location.city}
          </p>
        </div>

        {NAV_LINKS.map((l) => (
          <button
            key={l.label}
            onClick={() => scrollTo(l.href)}
            className="text-3xl font-800 tracking-[-0.03em] text-white/80 hover:text-white transition-colors"
          >
            {l.label}
          </button>
        ))}

        <button
          onClick={() => { setMobileOpen(false); onBooking(); }}
          className="mt-4 bg-white text-black font-bold px-10 py-4 rounded-full text-lg"
        >
          Book Appointment
        </button>

        <a
          href={`tel:${clinicData.contact.phone.replace(/\s/g, "")}`}
          className="text-white/50 text-sm"
        >
          {clinicData.contact.phone_display}
        </a>
      </div>
    </>
  );
}





// import { useEffect, useState } from "react";
// import { Menu, X,  } from "lucide-react";

// const NAV_LINKS = [
//   { label: "Services", href: "#services" },
//   { label: "Doctor", href: "#doctor" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Reviews", href: "#testimonials" },
//   { label: "FAQ", href: "#faq" },
//   { label: "Contact", href: "#contact" },
// ];

// interface NavbarProps {
//   onBooking: () => void;
// }

// export default function Navbar({ onBooking }: NavbarProps) {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const scrollTo = (href: string) => {
//     setMobileOpen(false);
//     const el = document.querySelector(href);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-400 ${
//           scrolled
//             ? "bg-black/90 backdrop-blur-xl border-b border-white/8 px-6 md:px-12 py-3"
//             : "bg-transparent px-6 md:px-12 py-5"
//         }`}
//       >
//         {/* Logo */}
//         <a href="#" className="text-lg font-black tracking-[-0.04em] text-white select-none">
//           Surya Dental Care and <span className="text-[#8F8F8F]">Implant Clinic</span>
//         </a>

//         {/* Desktop links */}
//         <ul className="hidden md:flex items-center gap-8 list-none">
//           {NAV_LINKS.map((l) => (
//             <li key={l.label}>
//               <button
//                 onClick={() => scrollTo(l.href)}
//                 className="text-[13px] font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-[0.02em]"
//               >
//                 {l.label}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Desktop CTA */}
//         {/* <div className="hidden md:flex items-center gap-3">
//           <a
//             href="tel:+919876543210"
//             className="flex items-center gap-2 text-[13px] font-semibold text-white/70 hover:text-white transition-colors"
//           >
//             <Phone size={14} />
//             +91 98765 43210
//           </a>

//           <button
//             onClick={onBooking}
//             className="bg-white text-black text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200"
//           >
//             Book Now
//           </button>
          
//         </div> */}

//         {/* Hamburger */}
//         <button
//           className="md:hidden text-white p-2"
//           onClick={() => setMobileOpen((p) => !p)}
//           aria-label="Toggle menu"
//         >
//           {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </nav>

//       {/* Mobile drawer */}
//       <div
//         className={`fixed inset-0 z-[99] bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
//           mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//       >
//         {NAV_LINKS.map((l) => (
//           <button
//             key={l.label}
//             onClick={() => scrollTo(l.href)}
//             className="text-3xl font-800 tracking-[-0.03em] text-white/80 hover:text-white transition-colors"
//           >
//             {l.label}
//           </button>
//         ))}

//         <button
//           onClick={() => { setMobileOpen(false); onBooking(); }}
//           className="mt-4 bg-white text-black font-bold px-10 py-4 rounded-full text-lg"
//         >
//           Book Appointment
//         </button>

//       </div>
//     </>
//   );
// }
