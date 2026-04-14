import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import imagesData from "../data/images.json";

type Category = "all" | "cosmetic" | "restorative" | "orthodontic";

const TABS: { label: string; value: Category }[] = [
  { label: "All Work", value: "all" },
  { label: "Cosmetic", value: "cosmetic" },
  { label: "Restorative", value: "restorative" },
  { label: "Orthodontic", value: "orthodontic" },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<Category>("all");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = activeTab === "all"
    ? imagesData
    : imagesData.filter((img) => img.category === activeTab);

  return (
    <section id="gallery" ref={ref} className="section-reveal bg-white text-black px-6 md:px-12 py-20 md:py-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
        <div>
          <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
            <span className="w-8 h-px bg-[#8F8F8F]" />
            Patient Results
          </p>
          <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9]">
            Before &amp;<br />After Gallery
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#F5F5F5] rounded-full p-1 w-fit self-start md:self-end">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveTab(t.value)}
              className={`px-4 md:px-6 py-2 rounded-full text-[12px] font-bold transition-all duration-300 ${
                activeTab === t.value
                  ? "bg-black text-white shadow"
                  : "text-[#8F8F8F] hover:text-black"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
        {filtered.map((img, i) => (
          <GalleryItem key={img.id} img={img} index={i} span={i === 0 && activeTab === "all"} />
        ))}
      </div>
    </section>
  );
}

interface GItem {
  id: number;
  title: string;
  caption: string;
  alt: string;
  category: string;
  tag: string;
  src: string;
}

function GalleryItem({ img, index, span }: { img: GItem; index: number; span: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), index * 60);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`section-reveal group relative overflow-hidden bg-[#F5F5F5] ${
        span ? "col-span-2 row-span-1" : ""
      }`}
      style={{ aspectRatio: span ? "2/1.0" : "1/1" }}
    >
      {/* Image or placeholder */}
      {img.src ? (
        <img
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover"
          // style={{ filter: "grayscale(100%) contrast(1.05)" }}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#e8e8e8] to-[#f0f0f0]">
          <ImageOff size={28} className="text-[#C0C0C0]" />
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#C0C0C0]">{img.title}</p>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/65 transition-all duration-500 flex flex-col items-start justify-end p-5 md:p-6">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mb-1">{img.category}</p>
          <p className="text-[16px] md:text-[18px] font-bold text-white leading-tight">{img.title}</p>
          <p className="text-[12px] text-white/60 mt-1">{img.caption}</p>
        </div>
        <ArrowUpRight
          size={18}
          className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        />
      </div>

      {/* BA tag */}
      <div className="absolute top-3 left-3 bg-black/70 text-white text-[9px] font-black tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
        {img.tag}
      </div>
    </div>
  );
}





// import { useRef, useEffect, useState } from "react";
// import { ArrowUpRight, ImageOff } from "lucide-react";
// import imagesData from "../data/images.json";

// type Category = "all" | "cosmetic" | "restorative" | "orthodontic";

// const TABS: { label: string; value: Category }[] = [
//   { label: "All Work", value: "all" },
//   { label: "Cosmetic", value: "cosmetic" },
//   { label: "Restorative", value: "restorative" },
//   { label: "Orthodontic", value: "orthodontic" },
// ];

// export default function Gallery() {
//   const ref = useRef<HTMLElement>(null);
//   const [activeTab, setActiveTab] = useState<Category>("all");

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
//       { threshold: 0.1 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   const filtered = activeTab === "all"
//     ? imagesData
//     : imagesData.filter((img) => img.category === activeTab);

//   return (
//     <section id="gallery" ref={ref} className="section-reveal bg-white text-black px-6 md:px-12 py-20 md:py-28">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
//         <div>
//           <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
//             <span className="w-8 h-px bg-[#8F8F8F]" />
//             Patient Results
//           </p>
//           <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9]">
//             Before &amp;<br />After Gallery
//           </h2>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-1 bg-[#F5F5F5] rounded-full p-1 w-fit self-start md:self-end">
//           {TABS.map((t) => (
//             <button
//               key={t.value}
//               onClick={() => setActiveTab(t.value)}
//               className={`px-4 md:px-6 py-2 rounded-full text-[12px] font-bold transition-all duration-300 ${
//                 activeTab === t.value
//                   ? "bg-black text-white shadow"
//                   : "text-[#8F8F8F] hover:text-black"
//               }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
//         {filtered.map((img, i) => (
//           <GalleryItem key={img.id} img={img} index={i} span={i === 0 && activeTab === "all"} />
//         ))}
//       </div>
//     </section>
//   );
// }

// interface GItem {
//   id: number;
//   title: string;
//   caption: string;
//   alt: string;
//   category: string;
//   tag: string;
// }

// function GalleryItem({ img, index, span }: { img: GItem; index: number; span: boolean }) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), index * 60);
//       },
//       { threshold: 0.1 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [index]);

//   return (
//     <div
//       ref={ref}
//       className={`section-reveal group relative overflow-hidden bg-[#F5F5F5] ${
//         span ? "col-span-2 row-span-1" : ""
//       }`}
//       style={{ aspectRatio: span ? "2/1.0" : "1/1" }}
//     >
//       {/* Placeholder */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#e8e8e8] to-[#f0f0f0]">
//         <ImageOff size={28} className="text-[#C0C0C0]" />
//         <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#C0C0C0]">{img.title}</p>
//       </div>

//       {/* Hover overlay */}
//       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/65 transition-all duration-500 flex flex-col items-start justify-end p-5 md:p-6">
//         <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
//           <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mb-1">{img.category}</p>
//           <p className="text-[16px] md:text-[18px] font-bold text-white leading-tight">{img.title}</p>
//           <p className="text-[12px] text-white/60 mt-1">{img.caption}</p>
//         </div>
//         <ArrowUpRight
//           size={18}
//           className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400"
//         />
//       </div>

//       {/* BA tag */}
//       <div className="absolute top-3 left-3 bg-black/70 text-white text-[9px] font-black tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm">
//         {img.tag}
//       </div>
//     </div>
//   );
// }
