import { Phone, MessageCircle } from "lucide-react";

export function EmergencyButton() {
  return (
    <a
      href="tel:+919876543210"
      className="emergency-pulse fixed bottom-6 right-6 z-[200] flex items-center gap-2.5 bg-red-500 text-white font-bold text-[12px] tracking-[0.05em] px-5 py-3 rounded-full shadow-lg hover:bg-red-400 active:scale-95 transition-colors duration-200"
      aria-label="Emergency dental call"
    >
      <Phone size={14} className="flex-shrink-0" />
      <span>Emergency? Call Now</span>
    </a>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[72px] right-6 z-[200] w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} className="text-white" />
    </a>
  );
}
