import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 2400);
    const t2 = setTimeout(() => setGone(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9000] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className="splash-logo text-4xl md:text-5xl font-black tracking-[-0.04em] text-white">
        White<span className="text-[#8F8F8F]">Dental</span>
      </h1>
      <p className="splash-sub text-[11px] tracking-[0.4em] uppercase text-[#8F8F8F] mt-3">
        Premium Care · Chandigarh
      </p>
      <div className="splash-line-anim h-px bg-white mt-8" style={{ width: 0 }} />
    </div>
  );
}
