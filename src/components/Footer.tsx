import { Phone, Mail, MapPin } from "lucide-react";

const LINKS = {
  Services: ["Teeth Cleaning", "Root Canal", "Implants", "Whitening", "Braces", "Veneers"],
  Clinic:   ["Our Doctor", "Gallery", "Reviews", "FAQ", "Pricing", "Blog"],
  Contact:  ["+91 98765 43210", "hello@whitedental.in", "Sector 17, Chandigarh"],
};

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-[#E0E0E0]">
      {/* Top grid */}
      <div className="px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-10 border-b border-[#E0E0E0]">

        {/* Brand */}
        <div>
          <p className="text-[24px] font-black tracking-[-0.04em] mb-3">
            Surya Dental Care and <span className="text-[#8F8F8F]">Implant Clinic </span>
          </p>
          <p className="text-[14px] leading-relaxed text-[#8F8F8F] max-w-[260px] mb-6">
            Premium dental care in the heart of Chandigarh. Because your smile deserves the very best.
          </p>
          <div className="flex flex-col gap-2.5 text-[13px]">
            <a href="tel:+919876543210" className="flex items-center gap-2 text-[#8F8F8F] hover:text-black transition-colors">
              <Phone size={13} /> +91 98140 82355
            </a>
            <a href="mailto:hello@whitedental.in" className="flex items-center gap-2 text-[#8F8F8F] hover:text-black transition-colors">
              <Mail size={13} /> suryadental411@gmail.com
            </a>
            <span className="flex items-center gap-2 text-[#8F8F8F]">
              <MapPin size={13} /> Plot no. 411-A, Phase - 2, Industrial And Business Park, Chandigarh, India, Chandigarh
            </span>
          </div>
        </div>

        {/* Links */}
        {Object.entries(LINKS).map(([title, items]) => (
          <div key={title}>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black mb-5">{title}</p>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[13px] text-[#8F8F8F] hover:text-black transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[12px] text-[#8F8F8F]">© 2025 WhiteDental · All rights reserved · Chandigarh, India</p>
        <div className="flex items-center gap-3">
          {["LinkedIn", "Facebook", "Instagram", "Google"].map((s) => (
            <a
              key={s}
              href="#"
              className="w-8 h-8 border border-[#E0E0E0] rounded-full flex items-center justify-center text-[10px] font-bold text-[#8F8F8F] hover:bg-black hover:text-white hover:border-black transition-all duration-200"
              aria-label={s}
            >
              {s[0]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
