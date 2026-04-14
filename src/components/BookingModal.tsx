import { useState, useEffect } from "react";
import {
  X, ArrowUpRight, ArrowLeft,
  Sparkles, Shield, Microscope, Smile, Settings2, Zap, AlertTriangle, Stethoscope, Check, Loader2,
} from "lucide-react";

// ── Paste your deployed Apps Script URL here ──────────────────
// After deploying: Copy > Web App URL > paste below
// const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;


const SERVICES_LIST = [
  { id: "cleaning",     label: "Teeth Cleaning",    Icon: Sparkles },
  { id: "fillings",     label: "Fillings",          Icon: Shield },
  { id: "rootcanal",    label: "Root Canal",        Icon: Microscope },
  { id: "braces",       label: "Braces & Aligners", Icon: Smile },
  { id: "implants",     label: "Implants",          Icon: Settings2 },
  { id: "whitening",    label: "Whitening",         Icon: Zap },
  { id: "emergency",    label: "Emergency",         Icon: AlertTriangle },
  { id: "consultation", label: "Free Consult",      Icon: Stethoscope },
];

interface BookingModalProps { isOpen: boolean; onClose: () => void; }

function buildDates() {
  const days   = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const today  = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      label:   d.toISOString().split("T")[0],          // ISO "2025-04-14" — stored in sheet
      display: `${d.getDate()} ${months[d.getMonth()]}`, // "14 Apr" — shown to user
      short:   String(d.getDate()),
      day:     days[d.getDay()],
    };
  });
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep]               = useState(1);
  const [service, setService]         = useState("");
  const [date, setDate]               = useState("");
  const [dateDisplay, setDD]          = useState("");
  const [time, setTime]               = useState("");
  const [slots, setSlots]             = useState<string[]>([]);
  const [slotsLoading, setSL]         = useState(false);
  const [form, setForm]               = useState({ name:"", phone:"", email:"", notes:"" });
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);
  const dates = buildDates();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Fetch available slots from Google Sheet via Apps Script
  useEffect(() => {
    if (!date) return;
    setSL(true); setSlots([]); setTime("");

    fetch(`${SCRIPT_URL}?action=slots&date=${date}`)
      .then(r => r.json())
      .then(data => setSlots(data.available || []))
      .catch(() => setSlots([]))
      .finally(() => setSL(false));
  }, [date]);

  const reset = () => {
    setStep(1); setService(""); setDate(""); setDD(""); setTime("");
    setSlots([]); setForm({ name:"", phone:"", email:"", notes:"" });
    setSubmitting(false); setError(""); setSuccess(false);
  };
  const handleClose = () => { onClose(); setTimeout(reset, 400); };

  // POST booking to Google Sheet via Apps Script
  const handleSubmit = async () => {
    if (!form.name || !form.phone) return;
    setSubmitting(true); setError("");

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        // Apps Script requires text/plain for POST (not application/json) due to CORS
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          patientName:  form.name,
          patientPhone: form.phone,
          patientEmail: form.email,
          service,
          date,
          time,
          notes: form.notes,
        }),
      });

      const data = await res.json();
      if (!data.success) { setError(data.error || "Booking failed. Please try again."); return; }
      setSuccess(true);

    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-black/80 modal-overlay" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/8">
          <div>
            <h2 className="text-[22px] font-black tracking-[-0.03em] text-white">Book Appointment</h2>
            <p className="text-[12px] text-[#8F8F8F] mt-0.5">3 quick steps · under 2 minutes</p>
          </div>
          <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/6 border border-white/10 flex items-center justify-center hover:bg-white/12 transition-colors">
            <X size={15} className="text-white" />
          </button>
        </div>

        {/* Progress */}
        {!success && (
          <div className="flex gap-1 px-7 pt-5">
            {[1,2,3].map(s => (
              <div key={s} className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${s <= step ? "bg-white" : "bg-white/15"}`} />
            ))}
          </div>
        )}

        <div className="px-7 py-6 max-h-[70vh] overflow-y-auto">

          {/* SUCCESS */}
          {success ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="pop-in w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                <Check size={28} className="text-white" />
              </div>
              <h3 className="text-[24px] font-black tracking-[-0.03em] text-white">Appointment Booked!</h3>
              <p className="text-[14px] text-[#8F8F8F] leading-relaxed max-w-xs">
                Confirmation sent to your email. We'll see you at the clinic!
              </p>
              <div className="bg-white/5 border border-white/8 rounded-xl px-5 py-4 w-full text-left">
                <p className="text-[11px] text-[#8F8F8F] font-bold tracking-widest uppercase mb-2">Your Booking</p>
                <p className="text-[14px] font-semibold text-white">{service}</p>
                <p className="text-[13px] text-[#8F8F8F]">{dateDisplay} · {time}</p>
                <p className="text-[13px] text-[#8F8F8F]">{form.name} · {form.phone}</p>
              </div>
              <button onClick={handleClose} className="w-full bg-white text-black font-bold py-3.5 rounded-full hover:bg-white/90 transition-colors">
                Done
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1 — Service */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <p className="text-[13px] font-semibold text-white">Select a Service</p>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES_LIST.map(({ id, label, Icon }) => (
                      <button key={id} onClick={() => setService(label)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                          service === label
                            ? "bg-white text-black border-white"
                            : "bg-white/4 border-white/8 text-white/70 hover:bg-white/8 hover:border-white/15"
                        }`}>
                        <Icon size={16} className={service === label ? "text-black" : "text-white/50"} />
                        <span className="text-[12px] font-semibold">{label}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => service && setStep(2)} disabled={!service}
                    className="flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full disabled:opacity-40 hover:bg-white/90 transition-all active:scale-95">
                    Choose Date & Time <ArrowUpRight size={14} />
                  </button>
                </div>
              )}

              {/* STEP 2 — Date & Time */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <p className="text-[13px] font-semibold text-white">Select a Date</p>
                  <div className="grid grid-cols-7 gap-1">
                    {dates.map(d => (
                      <button key={d.label} onClick={() => { setDate(d.label); setDD(d.display); }}
                        className={`flex flex-col items-center py-2.5 px-0.5 rounded-lg border text-center transition-all duration-150 ${
                          date === d.label
                            ? "bg-white text-black border-white"
                            : "bg-white/4 border-white/8 text-white/60 hover:bg-white/8"
                        }`}>
                        <span className="text-[9px] font-bold tracking-wide">{d.day}</span>
                        <span className="text-[14px] font-black">{d.short}</span>
                      </button>
                    ))}
                  </div>

                  <p className="text-[13px] font-semibold text-white mt-1">Select a Time</p>

                  {!date && (
                    <p className="text-[12px] text-[#8F8F8F] text-center py-4">Select a date to see available slots</p>
                  )}
                  {date && slotsLoading && (
                    <div className="flex items-center justify-center gap-2 py-4 text-[#8F8F8F]">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-[12px]">Checking availability...</span>
                    </div>
                  )}
                  {date && !slotsLoading && slots.length === 0 && (
                    <p className="text-[12px] text-[#8F8F8F] text-center py-4 bg-white/4 rounded-xl border border-white/8">
                      No slots available on this date. Please choose another day.
                    </p>
                  )}
                  {date && !slotsLoading && slots.length > 0 && (
                    <div className="grid grid-cols-5 gap-1.5">
                      {slots.map(t => (
                        <button key={t} onClick={() => setTime(t)}
                          className={`py-2.5 rounded-lg border text-[11px] font-bold transition-all ${
                            time === t
                              ? "bg-white text-black border-white"
                              : "bg-white/4 border-white/8 text-white/60 hover:bg-white/8"
                          }`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex items-center gap-1.5 border border-white/15 text-white/70 font-semibold text-[13px] px-5 py-3.5 rounded-full hover:border-white/30 transition-colors">
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button onClick={() => date && time && setStep(3)} disabled={!date || !time}
                      className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full disabled:opacity-40 hover:bg-white/90 transition-all active:scale-95">
                      Enter Details <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 — Personal details */}
              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <p className="text-[13px] font-semibold text-white">Your Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <MI label="Full Name *" placeholder="Your name" value={form.name} onChange={v => setForm(p => ({...p, name: v}))} />
                    <MI label="Phone *" placeholder="+91 XXXXX" value={form.phone} onChange={v => setForm(p => ({...p, phone: v}))} type="tel" />
                  </div>
                  <MI label="Email" placeholder="your@email.com" value={form.email} onChange={v => setForm(p => ({...p, email: v}))} type="email" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">Notes</label>
                    <textarea rows={3} placeholder="Any specific concerns?" value={form.notes}
                      onChange={e => setForm(p => ({...p, notes: e.target.value}))}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors resize-none"
                      style={{ fontFamily: "Poppins, sans-serif" }} />
                  </div>

                  {/* Summary */}
                  <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-[12px] text-[#8F8F8F]">
                    <span className="font-bold text-white">{service}</span> · {dateDisplay} · {time}
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-[13px] text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex items-center gap-1.5 border border-white/15 text-white/70 font-semibold text-[13px] px-5 py-3.5 rounded-full hover:border-white/30 transition-colors">
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button onClick={handleSubmit} disabled={!form.name || !form.phone || submitting}
                      className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full disabled:opacity-40 hover:bg-white/90 transition-all active:scale-95">
                      {submitting ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                      {submitting ? "Booking..." : "Confirm Booking"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MI({ label, placeholder, value, onChange, type = "text" }:
  { label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
        style={{ fontFamily: "Poppins, sans-serif" }} />
    </div>
  );
}





// import { useState, useEffect } from "react";
// import {
//   X, ArrowUpRight, ArrowLeft,
//   Sparkles, Shield, Microscope, Smile, Settings2, Zap, AlertTriangle, Stethoscope, Check, Loader2,
// } from "lucide-react";

// const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

// const SERVICES_LIST = [
//   { id: "cleaning",     label: "Teeth Cleaning",    Icon: Sparkles },
//   { id: "fillings",     label: "Fillings",          Icon: Shield },
//   { id: "rootcanal",    label: "Root Canal",        Icon: Microscope },
//   { id: "braces",       label: "Braces & Aligners", Icon: Smile },
//   { id: "implants",     label: "Implants",          Icon: Settings2 },
//   { id: "whitening",    label: "Whitening",         Icon: Zap },
//   { id: "emergency",    label: "Emergency",         Icon: AlertTriangle },
//   { id: "consultation", label: "Free Consult",      Icon: Stethoscope },
// ];

// interface BookingModalProps { isOpen: boolean; onClose: () => void; }

// function buildDates() {
//   const days   = ["Su","Mo","Tu","We","Th","Fr","Sa"];
//   const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//   const today  = new Date();
//   return Array.from({ length: 14 }, (_, i) => {
//     const d = new Date(today);
//     d.setDate(today.getDate() + i);
//     return {
//       label:   d.toISOString().split("T")[0],
//       display: `${d.getDate()} ${months[d.getMonth()]}`,
//       short:   String(d.getDate()),
//       day:     days[d.getDay()],
//     };
//   });
// }

// export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
//   const [step, setStep]           = useState(1);
//   const [service, setService]     = useState("");
//   const [date, setDate]           = useState("");
//   const [dateDisplay, setDD]      = useState("");
//   const [time, setTime]           = useState("");
//   const [slots, setSlots]         = useState<string[]>([]);
//   const [slotsLoading, setSL]     = useState(false);
//   const [form, setForm]           = useState({ name:"", phone:"", email:"", notes:"" });
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError]         = useState("");
//   const [success, setSuccess]     = useState(false);
//   const dates = buildDates();

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   useEffect(() => {
//     if (!date) return;
//     setSL(true); setSlots([]); setTime("");
//     fetch(`${API}/api/appointments/slots/${date}`)
//       .then(r => r.json()).then(d => setSlots(d.available || []))
//       .catch(() => setSlots([])).finally(() => setSL(false));
//   }, [date]);

//   const reset = () => { setStep(1); setService(""); setDate(""); setDD(""); setTime(""); setSlots([]); setForm({name:"",phone:"",email:"",notes:""}); setSubmitting(false); setError(""); setSuccess(false); };
//   const handleClose = () => { onClose(); setTimeout(reset, 400); };

//   const handleSubmit = async () => {
//     if (!form.name || !form.phone) return;
//     setSubmitting(true); setError("");
//     try {
//       const res = await fetch(`${API}/api/appointments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ patientName: form.name, patientPhone: form.phone, patientEmail: form.email, service, date, time, notes: form.notes }),
//       });
//       const data = await res.json();
//       if (!res.ok) { setError(data.error || "Booking failed."); return; }
//       setSuccess(true);
//     } catch { setError("Network error. Please try again."); }
//     finally { setSubmitting(false); }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6">
//       <div className="absolute inset-0 bg-black/80 modal-overlay" onClick={handleClose} />
//       <div className="relative z-10 w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
//         <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/8">
//           <div>
//             <h2 className="text-[22px] font-black tracking-[-0.03em] text-white">Book Appointment</h2>
//             <p className="text-[12px] text-[#8F8F8F] mt-0.5">3 quick steps · under 2 minutes</p>
//           </div>
//           <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/6 border border-white/10 flex items-center justify-center hover:bg-white/12 transition-colors">
//             <X size={15} className="text-white" />
//           </button>
//         </div>
//         {!success && (
//           <div className="flex gap-1 px-7 pt-5">
//             {[1,2,3].map(s => <div key={s} className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${s <= step ? "bg-white" : "bg-white/15"}`} />)}
//           </div>
//         )}
//         <div className="px-7 py-6 max-h-[70vh] overflow-y-auto">
//           {success ? (
//             <div className="flex flex-col items-center text-center py-6 gap-4">
//               <div className="pop-in w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center"><Check size={28} className="text-white" /></div>
//               <h3 className="text-[24px] font-black tracking-[-0.03em] text-white">Appointment Booked!</h3>
//               <p className="text-[14px] text-[#8F8F8F] leading-relaxed max-w-xs">Confirmation sent to your email. The doctor will contact you within 30 minutes.</p>
//               <div className="bg-white/5 border border-white/8 rounded-xl px-5 py-4 w-full text-left">
//                 <p className="text-[11px] text-[#8F8F8F] font-bold tracking-widest uppercase mb-2">Your Booking</p>
//                 <p className="text-[14px] font-semibold text-white">{service}</p>
//                 <p className="text-[13px] text-[#8F8F8F]">{dateDisplay} · {time}</p>
//                 <p className="text-[13px] text-[#8F8F8F]">{form.name} · {form.phone}</p>
//               </div>
//               <button onClick={handleClose} className="w-full bg-white text-black font-bold py-3.5 rounded-full hover:bg-white/90 transition-colors">Done</button>
//             </div>
//           ) : (
//             <>
//               {step === 1 && (
//                 <div className="flex flex-col gap-5">
//                   <p className="text-[13px] font-semibold text-white">Select a Service</p>
//                   <div className="grid grid-cols-2 gap-2">
//                     {SERVICES_LIST.map(({ id, label, Icon }) => (
//                       <button key={id} onClick={() => setService(label)}
//                         className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${service === label ? "bg-white text-black border-white" : "bg-white/4 border-white/8 text-white/70 hover:bg-white/8 hover:border-white/15"}`}>
//                         <Icon size={16} className={service === label ? "text-black" : "text-white/50"} />
//                         <span className="text-[12px] font-semibold">{label}</span>
//                       </button>
//                     ))}
//                   </div>
//                   <button onClick={() => service && setStep(2)} disabled={!service}
//                     className="flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full disabled:opacity-40 hover:bg-white/90 transition-all active:scale-95">
//                     Choose Date & Time <ArrowUpRight size={14} />
//                   </button>
//                 </div>
//               )}
//               {step === 2 && (
//                 <div className="flex flex-col gap-5">
//                   <p className="text-[13px] font-semibold text-white">Select a Date</p>
//                   <div className="grid grid-cols-7 gap-1">
//                     {dates.map(d => (
//                       <button key={d.label} onClick={() => { setDate(d.label); setDD(d.display); }}
//                         className={`flex flex-col items-center py-2.5 px-0.5 rounded-lg border text-center transition-all duration-150 ${date === d.label ? "bg-white text-black border-white" : "bg-white/4 border-white/8 text-white/60 hover:bg-white/8"}`}>
//                         <span className="text-[9px] font-bold tracking-wide">{d.day}</span>
//                         <span className="text-[14px] font-black">{d.short}</span>
//                       </button>
//                     ))}
//                   </div>
//                   <p className="text-[13px] font-semibold text-white mt-1">Select a Time</p>
//                   {!date && <p className="text-[12px] text-[#8F8F8F] text-center py-4">Select a date first</p>}
//                   {date && slotsLoading && <div className="flex items-center justify-center gap-2 py-4 text-[#8F8F8F]"><Loader2 size={16} className="animate-spin" /><span className="text-[12px]">Checking availability...</span></div>}
//                   {date && !slotsLoading && slots.length === 0 && <p className="text-[12px] text-[#8F8F8F] text-center py-4 bg-white/4 rounded-xl border border-white/8">No slots available on this date.</p>}
//                   {date && !slotsLoading && slots.length > 0 && (
//                     <div className="grid grid-cols-5 gap-1.5">
//                       {slots.map(t => (
//                         <button key={t} onClick={() => setTime(t)}
//                           className={`py-2.5 rounded-lg border text-[11px] font-bold transition-all ${time === t ? "bg-white text-black border-white" : "bg-white/4 border-white/8 text-white/60 hover:bg-white/8"}`}>
//                           {t}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                   <div className="flex gap-3">
//                     <button onClick={() => setStep(1)} className="flex items-center gap-1.5 border border-white/15 text-white/70 font-semibold text-[13px] px-5 py-3.5 rounded-full hover:border-white/30 transition-colors"><ArrowLeft size={14} /> Back</button>
//                     <button onClick={() => date && time && setStep(3)} disabled={!date || !time}
//                       className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full disabled:opacity-40 hover:bg-white/90 transition-all active:scale-95">
//                       Enter Details <ArrowUpRight size={14} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {step === 3 && (
//                 <div className="flex flex-col gap-4">
//                   <p className="text-[13px] font-semibold text-white">Your Details</p>
//                   <div className="grid grid-cols-2 gap-3">
//                     <MI label="Full Name *" placeholder="Your name" value={form.name} onChange={v => setForm(p => ({...p, name: v}))} />
//                     <MI label="Phone *" placeholder="+91 XXXXX" value={form.phone} onChange={v => setForm(p => ({...p, phone: v}))} type="tel" />
//                   </div>
//                   <MI label="Email" placeholder="your@email.com" value={form.email} onChange={v => setForm(p => ({...p, email: v}))} type="email" />
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">Notes</label>
//                     <textarea rows={3} placeholder="Any specific concerns?" value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))}
//                       className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors resize-none"
//                       style={{ fontFamily: "Poppins, sans-serif" }} />
//                   </div>
//                   <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-[12px] text-[#8F8F8F]">
//                     <span className="font-bold text-white">{service}</span> · {dateDisplay} · {time}
//                   </div>
//                   {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-[13px] text-red-400">{error}</div>}
//                   <div className="flex gap-3">
//                     <button onClick={() => setStep(2)} className="flex items-center gap-1.5 border border-white/15 text-white/70 font-semibold text-[13px] px-5 py-3.5 rounded-full hover:border-white/30 transition-colors"><ArrowLeft size={14} /> Back</button>
//                     <button onClick={handleSubmit} disabled={!form.name || !form.phone || submitting}
//                       className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full disabled:opacity-40 hover:bg-white/90 transition-all active:scale-95">
//                       {submitting ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
//                       {submitting ? "Booking..." : "Confirm Booking"}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MI({ label, placeholder, value, onChange, type = "text" }:
//   { label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">{label}</label>
//       <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
//         className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
//         style={{ fontFamily: "Poppins, sans-serif" }} />
//     </div>
//   );
// }





// import { useState, useEffect } from "react";
// import {
//   X, ArrowUpRight, ArrowLeft,
//   Sparkles, Shield, Microscope, Smile, Settings2, Zap, AlertTriangle, Stethoscope, Check,
// } from "lucide-react";

// const SERVICES_LIST = [
//   { id: "cleaning",      label: "Teeth Cleaning",    Icon: Sparkles },
//   { id: "fillings",      label: "Fillings",          Icon: Shield },
//   { id: "rootcanal",     label: "Root Canal",        Icon: Microscope },
//   { id: "braces",        label: "Braces & Aligners", Icon: Smile },
//   { id: "implants",      label: "Implants",          Icon: Settings2 },
//   { id: "whitening",     label: "Whitening",         Icon: Zap },
//   { id: "emergency",     label: "Emergency",         Icon: AlertTriangle },
//   { id: "consultation",  label: "Free Consult",      Icon: Stethoscope },
// ];

// const TIME_SLOTS = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"];

// interface BookingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// function buildDates(): { label: string; short: string; day: string; disabled: boolean }[] {
//   const result = [];
//   const days = ["Su","Mo","Tu","We","Th","Fr","Sa"];
//   const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//   const today = new Date();
//   for (let i = 0; i < 14; i++) {
//     const d = new Date(today);
//     d.setDate(today.getDate() + i);
//     result.push({
//       label: `${d.getDate()} ${months[d.getMonth()]}`,
//       short: String(d.getDate()),
//       day: days[d.getDay()],
//       disabled: false,
//     });
//   }
//   return result;
// }

// export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
//   const [step, setStep] = useState(1);
//   const [service, setService] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
//   const [success, setSuccess] = useState(false);
//   const dates = buildDates();

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   const reset = () => { setStep(1); setService(""); setDate(""); setTime(""); setForm({ name:"",phone:"",email:"",notes:"" }); setSuccess(false); };
//   const handleClose = () => { onClose(); setTimeout(reset, 400); };

//   const handleSubmit = () => {
//     if (!form.name || !form.phone) return;
//     setSuccess(true);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/80 modal-overlay"
//         onClick={handleClose}
//       />

//       {/* Modal box */}
//       <div className="relative z-10 w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden">

//         {/* Top bar */}
//         <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/8">
//           <div>
//             <h2 className="text-[22px] font-black tracking-[-0.03em] text-white">Book Appointment</h2>
//             <p className="text-[12px] text-[#8F8F8F] mt-0.5">3 quick steps · under 2 minutes</p>
//           </div>
//           <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/6 border border-white/10 flex items-center justify-center hover:bg-white/12 transition-colors">
//             <X size={15} className="text-white" />
//           </button>
//         </div>

//         {/* Progress bar */}
//         {!success && (
//           <div className="flex gap-1 px-7 pt-5">
//             {[1, 2, 3].map((s) => (
//               <div
//                 key={s}
//                 className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${s <= step ? "bg-white" : "bg-white/15"}`}
//               />
//             ))}
//           </div>
//         )}

//         <div className="px-7 py-6 max-h-[70vh] overflow-y-auto">

//           {/* SUCCESS */}
//           {success ? (
//             <div className="flex flex-col items-center text-center py-6 gap-4">
//               <div className="pop-in w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
//                 <Check size={28} className="text-white" />
//               </div>
//               <h3 className="text-[24px] font-black tracking-[-0.03em] text-white">Appointment Booked!</h3>
//               <p className="text-[14px] text-[#8F8F8F] leading-relaxed max-w-xs">
//                 We'll confirm your appointment via SMS and WhatsApp within 30 minutes. See you soon!
//               </p>
//               <div className="bg-white/5 border border-white/8 rounded-xl px-5 py-4 w-full text-left">
//                 <p className="text-[11px] text-[#8F8F8F] font-bold tracking-widest uppercase mb-2">Your Booking Summary</p>
//                 <p className="text-[14px] font-semibold text-white">{service}</p>
//                 <p className="text-[13px] text-[#8F8F8F]">{date} · {time}</p>
//                 <p className="text-[13px] text-[#8F8F8F]">{form.name} · {form.phone}</p>
//               </div>
//               <button
//                 onClick={handleClose}
//                 className="w-full bg-white text-black font-bold py-3.5 rounded-full mt-2 hover:bg-white/90 transition-colors"
//               >
//                 Done
//               </button>
//             </div>
//           ) : (
//             <>
//               {/* STEP 1 */}
//               {step === 1 && (
//                 <div className="flex flex-col gap-5">
//                   <p className="text-[13px] font-semibold text-white">Select a Service</p>
//                   <div className="grid grid-cols-2 gap-2">
//                     {SERVICES_LIST.map(({ id, label, Icon }) => (
//                       <button
//                         key={id}
//                         onClick={() => setService(label)}
//                         className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
//                           service === label
//                             ? "bg-white text-black border-white"
//                             : "bg-white/4 border-white/8 text-white/70 hover:bg-white/8 hover:border-white/15"
//                         }`}
//                       >
//                         <Icon size={16} className={service === label ? "text-black" : "text-white/50"} />
//                         <span className="text-[12px] font-semibold">{label}</span>
//                       </button>
//                     ))}
//                   </div>
//                   <button
//                     onClick={() => service && setStep(2)}
//                     disabled={!service}
//                     className="flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full disabled:opacity-40 hover:bg-white/90 transition-all active:scale-95"
//                   >
//                     Choose Date & Time <ArrowUpRight size={14} />
//                   </button>
//                 </div>
//               )}

//               {/* STEP 2 */}
//               {step === 2 && (
//                 <div className="flex flex-col gap-5">
//                   <p className="text-[13px] font-semibold text-white">Select a Date</p>
//                   <div className="grid grid-cols-7 gap-1">
//                     {dates.map((d, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setDate(d.label)}
//                         className={`flex flex-col items-center py-2.5 px-0.5 rounded-lg border text-center transition-all duration-150 ${
//                           date === d.label
//                             ? "bg-white text-black border-white"
//                             : "bg-white/4 border-white/8 text-white/60 hover:bg-white/8"
//                         }`}
//                       >
//                         <span className="text-[9px] font-bold tracking-wide">{d.day}</span>
//                         <span className="text-[14px] font-black">{d.short}</span>
//                       </button>
//                     ))}
//                   </div>

//                   <p className="text-[13px] font-semibold text-white mt-1">Select a Time</p>
//                   <div className="grid grid-cols-5 gap-1.5">
//                     {TIME_SLOTS.map((t) => (
//                       <button
//                         key={t}
//                         onClick={() => setTime(t)}
//                         className={`py-2.5 rounded-lg border text-[11px] font-bold transition-all ${
//                           time === t
//                             ? "bg-white text-black border-white"
//                             : "bg-white/4 border-white/8 text-white/60 hover:bg-white/8"
//                         }`}
//                       >
//                         {t}
//                       </button>
//                     ))}
//                   </div>

//                   <div className="flex gap-3">
//                     <button onClick={() => setStep(1)} className="flex items-center gap-1.5 border border-white/15 text-white/70 font-semibold text-[13px] px-5 py-3.5 rounded-full hover:border-white/30 transition-colors">
//                       <ArrowLeft size={14} /> Back
//                     </button>
//                     <button
//                       onClick={() => date && time && setStep(3)}
//                       disabled={!date || !time}
//                       className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full disabled:opacity-40 hover:bg-white/90 transition-all active:scale-95"
//                     >
//                       Enter Details <ArrowUpRight size={14} />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* STEP 3 */}
//               {step === 3 && (
//                 <div className="flex flex-col gap-4">
//                   <p className="text-[13px] font-semibold text-white">Your Details</p>
//                   <div className="grid grid-cols-2 gap-3">
//                     <ModalInput
//                       label="Full Name *"
//                       placeholder="Your name"
//                       value={form.name}
//                       onChange={(v) => setForm((p) => ({ ...p, name: v }))}
//                     />
//                     <ModalInput
//                       label="Phone *"
//                       placeholder="+91 XXXXX"
//                       value={form.phone}
//                       onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
//                       type="tel"
//                     />
//                   </div>
//                   <ModalInput
//                     label="Email"
//                     placeholder="your@email.com"
//                     value={form.email}
//                     onChange={(v) => setForm((p) => ({ ...p, email: v }))}
//                     type="email"
//                   />
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">Notes</label>
//                     <textarea
//                       rows={3}
//                       placeholder="Any specific concerns?"
//                       value={form.notes}
//                       onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
//                       className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors resize-none"
//                       style={{ fontFamily: "Poppins, sans-serif" }}
//                     />
//                   </div>

//                   {/* Summary */}
//                   <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-[12px] text-[#8F8F8F]">
//                     <span className="font-bold text-white">{service}</span> · {date} · {time}
//                   </div>

//                   <div className="flex gap-3">
//                     <button onClick={() => setStep(2)} className="flex items-center gap-1.5 border border-white/15 text-white/70 font-semibold text-[13px] px-5 py-3.5 rounded-full hover:border-white/30 transition-colors">
//                       <ArrowLeft size={14} /> Back
//                     </button>
//                     <button
//                       onClick={handleSubmit}
//                       disabled={!form.name || !form.phone}
//                       className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold text-[13px] py-3.5 rounded-full disabled:opacity-40 hover:bg-white/90 transition-all active:scale-95"
//                     >
//                       Confirm Booking <Check size={15} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ModalInput({
//   label, placeholder, value, onChange, type = "text",
// }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">{label}</label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[13px] text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
//         style={{ fontFamily: "Poppins, sans-serif" }}
//       />
//     </div>
//   );
// }
