import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import clinic from "../data/clinic.json";

// Services (first 6)
const SERVICES = clinic.services.slice(0, 6);

// Clinic links (static navigation)
const CLINIC_LINKS = [
  { label: "Our Doctor", href: "#doctor" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
];

// Contact items (same pattern as contact.tsx)
const CONTACT_ITEMS = [
  {
    Icon: Phone,
    value: clinic.contact.phone_display,
    href: `tel:${clinic.contact.phone}`,
  },
  {
    Icon: Mail,
    value: clinic.contact.email,
    href: `mailto:${clinic.contact.email}`,
  },
  {
    Icon: MapPin,
    value: clinic.location.address,
    href: clinic.location.mapLink,
  },
];

// Social (safe rendering)
const SOCIAL_LINKS = [
  clinic.contact.facebook && {
    label: "Facebook",
    href: clinic.contact.facebook,
  },
  clinic.contact.instagram && {
    label: "Instagram",
    href: clinic.contact.instagram,
  },
  clinic.contact.whatsapp && {
    label: "WhatsApp",
    href: `https://wa.me/${clinic.contact.whatsapp.replace(/\D/g, "")}`,
  },
].filter(Boolean) as { label: string; href: string }[];

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-[#E0E0E0]">
      
      {/* Top */}
      <div className="px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-10 border-b border-[#E0E0E0]">
        
        {/* Brand */}
        <div>
          <p className="text-[24px] font-black tracking-[-0.04em] mb-3">
            {clinic.clinic_name}
          </p>

          <p className="text-[14px] text-[#8F8F8F] max-w-[320px] mb-4">
            {clinic.tagline}
          </p>

          <p className="text-[13px] text-[#8F8F8F] max-w-[320px] mb-6">
            {clinic.motto}
          </p>

          {/* Contact */}
          <div className="flex flex-col gap-2.5 text-[13px]">
            {CONTACT_ITEMS.map(({ Icon, value, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-[#8F8F8F] hover:text-black transition-colors"
              >
                <Icon size={13} className="mt-0.5 flex-shrink-0" />
                <span>{value}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5">
            Services
          </p>
          <ul className="flex flex-col gap-3">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a
                  href="#services"
                  className="text-[13px] text-[#8F8F8F] hover:text-black transition-colors"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Clinic */}
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5">
            Clinic
          </p>
          <ul className="flex flex-col gap-3">
            {CLINIC_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-[13px] text-[#8F8F8F] hover:text-black transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Contact */}
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-5">
            Quick Contact
          </p>

          <a
            href={clinic.location.directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-black hover:text-[#8F8F8F] transition-colors"
          >
            Get Directions <ArrowUpRight size={14} />
          </a>

          <div className="mt-4 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-[11px] border border-[#E0E0E0] rounded-full text-[#8F8F8F] hover:bg-black hover:text-white transition"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between gap-3">
        <p className="text-[12px] text-[#8F8F8F]">
          © {new Date().getFullYear()} {clinic.clinic_name} · {clinic.location.city}, {clinic.location.state}
        </p>

        <p className="text-[12px] text-[#8F8F8F]">
          Est. {clinic.established}
        </p>
      </div>
    </footer>
  );
}





// import { Phone, Mail, MapPin } from "lucide-react";

// const LINKS = {
//   Services: ["Teeth Cleaning", "Root Canal", "Implants", "Whitening", "Braces", "Veneers"],
//   Clinic:   ["Our Doctor", "Gallery", "Reviews", "FAQ", "Pricing", "Blog"],
//   Contact:  ["+91 98765 43210", "hello@whitedental.in", "Sector 17, Chandigarh"],
// };

// export default function Footer() {
//   return (
//     <footer className="bg-white text-black border-t border-[#E0E0E0]">
//       {/* Top grid */}
//       <div className="px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-10 border-b border-[#E0E0E0]">

//         {/* Brand */}
//         <div>
//           <p className="text-[24px] font-black tracking-[-0.04em] mb-3">
//             Surya Dental Care and <span className="text-[#8F8F8F]">Implant Clinic </span>
//           </p>
//           <p className="text-[14px] leading-relaxed text-[#8F8F8F] max-w-[260px] mb-6">
//             Premium dental care in the heart of Chandigarh. Because your smile deserves the very best.
//           </p>
//           <div className="flex flex-col gap-2.5 text-[13px]">
//             <a href="tel:+919876543210" className="flex items-center gap-2 text-[#8F8F8F] hover:text-black transition-colors">
//               <Phone size={13} /> +91 98140 82355
//             </a>
//             <a href="mailto:hello@whitedental.in" className="flex items-center gap-2 text-[#8F8F8F] hover:text-black transition-colors">
//               <Mail size={13} /> suryadental411@gmail.com
//             </a>
//             <span className="flex items-center gap-2 text-[#8F8F8F]">
//               <MapPin size={13} /> Plot no. 411-A, Phase - 2, Industrial And Business Park, Chandigarh, India, Chandigarh
//             </span>
//           </div>
//         </div>

//         {/* Links */}
//         {Object.entries(LINKS).map(([title, items]) => (
//           <div key={title}>
//             <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-5">{title}</p>
//             <ul className="flex flex-col gap-3">
//               {items.map((item) => (
//                 <li key={item}>
//                   <a
//                     href="#"
//                     className="text-[13px] text-[#8F8F8F] hover:text-black transition-colors"
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Bottom bar */}
//       <div className="px-6 md:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//         <p className="text-[12px] text-[#8F8F8F]">© 2025 WhiteDental · All rights reserved · Chandigarh, India</p>
//         <div className="flex items-center gap-3">
//           {["LinkedIn", "Facebook", "Instagram", "Google"].map((s) => (
//             <a
//               key={s}
//               href="#"
//               className="w-8 h-8 border border-[#E0E0E0] rounded-full flex items-center justify-center text-[10px] font-bold text-[#8F8F8F] hover:bg-black hover:text-white hover:border-black transition-all duration-200"
//               aria-label={s}
//             >
//               {s[0]}
//             </a>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }
