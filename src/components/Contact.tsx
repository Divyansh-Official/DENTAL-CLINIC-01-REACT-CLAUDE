import { useRef, useEffect, useState } from "react";
import { Phone, MapPin, Mail, MessageCircle, Clock, ArrowUpRight } from "lucide-react";

const CONTACT_ITEMS = [
  { Icon: Phone,         label: "Phone",     value: "+91 98765 43210",        sub: "Mon–Sat, 9 AM – 8 PM" },
  { Icon: MapPin,        label: "Location",  value: "SCO 145-146, Sector 17-C", sub: "Chandigarh – 160017" },
  { Icon: Mail,          label: "Email",     value: "hello@whitedental.in",   sub: "Reply within 2 hours" },
  { Icon: MessageCircle, label: "WhatsApp",  value: "+91 98765 43210",        sub: "Share reports & quick queries" },
];

const HOURS = [
  { day: "Mon – Fri",  time: "9:00 AM – 8:00 PM" },
  { day: "Saturday",   time: "9:00 AM – 6:00 PM" },
  { day: "Sunday",     time: "10:00 AM – 2:00 PM" },
  { day: "Emergency",  time: "24 / 7 Hotline" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-reveal bg-[#0A0A0A] text-white px-6 md:px-12 py-20 md:py-28"
    >
      <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
        <span className="w-8 h-px bg-[#8F8F8F]" />
        Get In Touch
      </p>
      <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9] mb-14">
        Find Us &amp;<br />
        <span className="text-[#8F8F8F]">Contact Us</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* LEFT */}
        <div>
          {/* Contact items */}
          <div className="flex flex-col gap-6 mb-10">
            {CONTACT_ITEMS.map(({ Icon, label, value, sub }, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 flex-shrink-0 bg-white/5 border border-white/8 rounded-xl flex items-center justify-center">
                  <Icon size={17} className="text-white/60" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-0.5">{label}</p>
                  <p className="text-[15px] font-semibold text-white">{value}</p>
                  <p className="text-[12px] text-[#8F8F8F] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Hours grid */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F] mb-3">
              <Clock size={11} />
              Clinic Hours
            </div>
            <div className="grid grid-cols-2 gap-2">
              {HOURS.map(({ day, time }, i) => (
                <div key={i} className="bg-white/4 border border-white/8 rounded-xl px-4 py-3.5">
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#8F8F8F] mb-1">{day}</p>
                  <p className="text-[13px] font-semibold text-white">{time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Map embed */}
          <div className="mt-8 rounded-xl overflow-hidden border border-white/8" style={{ height: 220 }}>
            <iframe
              title="Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.03!2d76.7886!3d30.7408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fedb3bc6ecb4f%3A0x20cbb39a272c3d4e!2sSector%2017%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              // style={{ border: 0, filter: "grayscale(100%) invert(0.88) contrast(0.9)" }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* RIGHT — Contact form */}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Full Name" placeholder="Your name" required />
              <FormField label="Phone" placeholder="+91 XXXXX XXXXX" required type="tel" />
            </div>
            <FormField label="Email" placeholder="your@email.com" type="email" />
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F]">
                Service Interest
              </label>
              <select
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[13px] text-white/80 outline-none focus:border-white/30 transition-colors appearance-none"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <option value="" className="bg-[#111]">Select a service...</option>
                {["Teeth Cleaning","Fillings","Root Canal","Braces","Implants","Whitening","Emergency","General Consultation"].map((s) => (
                  <option key={s} value={s} className="bg-[#111]">{s}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F]">Message</label>
              <textarea
                rows={5}
                placeholder="Describe your concern or question..."
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors resize-none"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>

            {submitted ? (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-4">
                <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight size={13} className="text-white" />
                </span>
                <p className="text-[14px] font-semibold text-emerald-400">Message sent! We'll reply within 2 hours.</p>
              </div>
            ) : (
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-white text-black font-bold text-[14px] py-4 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200 mt-2"
              >
                Send Message
                <ArrowUpRight size={16} />
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, placeholder, type = "text", required,
}: { label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8F8F8F]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
        style={{ fontFamily: "Poppins, sans-serif" }}
      />
    </div>
  );
}
