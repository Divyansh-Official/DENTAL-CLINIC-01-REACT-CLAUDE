import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Doctor", href: "#doctor" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onBooking: () => void;
}

export default function Navbar({ onBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        {/* Logo */}
        <a href="#" className="text-lg font-black tracking-[-0.04em] text-white select-none">
          White<span className="text-[#8F8F8F]">Dental</span>
        </a>

        {/* Desktop links */}
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

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-[13px] font-semibold text-white/70 hover:text-white transition-colors"
          >
            <Phone size={14} />
            +91 98765 43210
          </a>

          <button
            onClick={onBooking}
            className="bg-white text-black text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200"
          >
            Book Now
          </button>
          
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[99] bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
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

      </div>
    </>
  );
}
