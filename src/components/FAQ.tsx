import { useRef, useEffect, useState } from "react";
import { Plus, X, ArrowUpRight, Loader2 } from "lucide-react";
import { useFAQ } from "../hooks/useFAQ";

interface FaqProps { onBooking: () => void; }

export default function FAQ({ onBooking }: FaqProps) {
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faqs, loading, error } = useFAQ();

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

  return (
    <section
      id="faq"
      ref={ref}
      className="section-reveal bg-white text-black px-6 md:px-12 py-20 md:py-28"
    >
      {/* Label */}
      <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
        <span className="w-8 h-px bg-[#8F8F8F]" />
        Common Questions
      </p>
      <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9] mb-14">
        Frequently Asked<br />Questions
      </h2>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">

        {/* Accordion */}
        <div className="flex flex-col divide-y divide-[#E0E0E0]">

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-3 py-16 text-[#8F8F8F]">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-[13px]">Loading questions...</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="text-[13px] text-[#8F8F8F] py-10 text-center">
              Could not load FAQs right now.
            </p>
          )}

          {/* FAQ items */}
          {!loading && !error && faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}

          {!loading && !error && faqs.length === 0 && (
            <p className="text-[13px] text-[#8F8F8F] py-10 text-center">
              No questions available yet.
            </p>
          )}
        </div>

        {/* Sticky CTA card — unchanged */}
        <div className="lg:sticky lg:top-24 bg-[#0A0A0A] text-white rounded-2xl p-8 md:p-10">
          <div className="w-14 h-14 bg-white/6 rounded-xl border border-white/10 flex items-center justify-center mb-6">
            <ArrowUpRight size={24} className="text-white/60" />
          </div>
          <h3 className="text-[26px] md:text-[30px] font-black tracking-[-0.03em] leading-tight mb-4">
            Still have<br />questions?
          </h3>
          <p className="text-[14px] leading-relaxed text-white/55 mb-8">
            Our friendly team is available 7 days a week. Book a free 15-minute consultation — no commitment, no pressure.
          </p>
          <button
            onClick={onBooking}
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold text-[14px] py-4 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200"
          >
            Book Free Consultation
            <ArrowUpRight size={16} />
          </button>
          <div className="flex flex-wrap gap-2 mt-6">
            {["Free Consult", "No Wait", "Same-Day", "EMI Available"].map((chip) => (
              <span
                key={chip}
                className="bg-white/6 border border-white/10 rounded-full px-3 py-1 text-[11px] font-semibold text-white/50"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="py-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className={`text-[15px] md:text-[16px] font-semibold transition-colors ${isOpen ? "text-black" : "text-black/80 group-hover:text-black"}`}>
          {faq.q}
        </span>
        <span className={`w-7 h-7 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-black border-black rotate-0" : "border-[#E0E0E0] group-hover:border-black/40"
        }`}>
          {isOpen
            ? <X size={13} className="text-white" />
            : <Plus size={13} className="text-black/60" />
          }
        </span>
      </button>
      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
        <p className="text-[14px] leading-[1.85] text-[#8F8F8F] pb-5 pr-10">
          {faq.a}
        </p>
      </div>
    </div>
  );
}





// import { useRef, useEffect, useState } from "react";
// import { Plus, X, ArrowUpRight } from "lucide-react";

// const FAQS = [
//   {
//     q: "Is dental treatment painful?",
//     a: "We use modern anaesthetics and sedation techniques to ensure you feel minimal to no discomfort. All procedures are performed only after complete numbing is confirmed. We also offer nitrous oxide sedation for anxious patients.",
//   },
//   {
//     q: "How much does a dental implant cost?",
//     a: "Implants start from ₹25,000 per tooth including the crown, and vary based on bone density and brand preference. We offer 0% EMI over 12 months and will provide a detailed written quote after a free consultation.",
//   },
//   {
//     q: "How long does teeth whitening last?",
//     a: "Professional laser whitening results typically last 18–24 months with proper maintenance. We provide a take-home maintenance kit and offer annual touch-up sessions at a discounted rate for existing patients.",
//   },
//   {
//     q: "Do you accept insurance?",
//     a: "Yes. We work with all major providers including Star Health, Niva Bupa, HDFC Ergo, New India Assurance, and government CGHS/ECHS schemes. Our billing team handles all insurance paperwork on your behalf.",
//   },
//   {
//     q: "How often should I visit the dentist?",
//     a: "We recommend a check-up and professional cleaning every 6 months for most patients. Those with gum disease, braces, or implants benefit from visits every 3–4 months. We send automated reminders when you're due.",
//   },
//   {
//     q: "What happens in a dental emergency?",
//     a: "We hold dedicated same-day emergency slots every morning. For after-hours emergencies, call our 24-hour hotline and a staff member will guide you. Severe pain, trauma, swelling, and broken teeth are treated as priority cases.",
//   },
//   {
//     q: "How long do veneers last?",
//     a: "Porcelain veneers last 10–20 years with proper care. Composite veneers last 5–8 years. We provide a 5-year warranty on all veneer work, covering any chips or debonding that occurs under normal use.",
//   },
//   {
//     q: "Is the clinic child-friendly?",
//     a: "Absolutely. We have a dedicated paediatric corner with a friendly, gentle approach tailored for children from age 2 onwards. Early visits help build positive associations with dental care for life.",
//   },
// ];

// interface FaqProps { onBooking: () => void; }

// export default function FAQ({ onBooking }: FaqProps) {
//   const ref = useRef<HTMLElement>(null);
//   const [openIndex, setOpenIndex] = useState<number | null>(0);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
//       { threshold: 0.08 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <section
//       id="faq"
//       ref={ref}
//       className="section-reveal bg-white text-black px-6 md:px-12 py-20 md:py-28"
//     >
//       {/* Label */}
//       <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
//         <span className="w-8 h-px bg-[#8F8F8F]" />
//         Common Questions
//       </p>
//       <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9] mb-14">
//         Frequently Asked<br />Questions
//       </h2>

//       {/* Two-column layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">

//         {/* Accordion */}
//         <div className="flex flex-col divide-y divide-[#E0E0E0]">
//           {FAQS.map((faq, i) => (
//             <FAQItem
//               key={i}
//               faq={faq}
//               isOpen={openIndex === i}
//               onToggle={() => setOpenIndex(openIndex === i ? null : i)}
//             />
//           ))}
//         </div>

//         {/* Sticky CTA card */}
//         <div className="lg:sticky lg:top-24 bg-[#0A0A0A] text-white rounded-2xl p-8 md:p-10">
//           <div className="w-14 h-14 bg-white/6 rounded-xl border border-white/10 flex items-center justify-center mb-6">
//             <ArrowUpRight size={24} className="text-white/60" />
//           </div>
//           <h3 className="text-[26px] md:text-[30px] font-black tracking-[-0.03em] leading-tight mb-4">
//             Still have<br />questions?
//           </h3>
//           <p className="text-[14px] leading-relaxed text-white/55 mb-8">
//             Our friendly team is available 7 days a week. Book a free 15-minute consultation — no commitment, no pressure.
//           </p>
//           <button
//             onClick={onBooking}
//             className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold text-[14px] py-4 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200"
//           >
//             Book Free Consultation
//             <ArrowUpRight size={16} />
//           </button>

//           {/* Trust chips */}
//           <div className="flex flex-wrap gap-2 mt-6">
//             {["Free Consult", "No Wait", "Same-Day", "EMI Available"].map((chip) => (
//               <span
//                 key={chip}
//                 className="bg-white/6 border border-white/10 rounded-full px-3 py-1 text-[11px] font-semibold text-white/50"
//               >
//                 {chip}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// interface FAQItemProps {
//   faq: { q: string; a: string };
//   isOpen: boolean;
//   onToggle: () => void;
// }

// function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
//   return (
//     <div className="py-1">
//       <button
//         onClick={onToggle}
//         className="w-full flex items-center justify-between gap-4 py-5 text-left group"
//       >
//         <span className={`text-[15px] md:text-[16px] font-semibold transition-colors ${isOpen ? "text-black" : "text-black/80 group-hover:text-black"}`}>
//           {faq.q}
//         </span>
//         <span className={`w-7 h-7 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
//           isOpen ? "bg-black border-black rotate-0" : "border-[#E0E0E0] group-hover:border-black/40"
//         }`}>
//           {isOpen
//             ? <X size={13} className="text-white" />
//             : <Plus size={13} className="text-black/60" />
//           }
//         </span>
//       </button>
//       <div className={`faq-answer ${isOpen ? "open" : ""}`}>
//         <p className="text-[14px] leading-[1.85] text-[#8F8F8F] pb-5 pr-10">
//           {faq.a}
//         </p>
//       </div>
//     </div>
//   );
// }
