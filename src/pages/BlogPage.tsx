import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Clock, Tag, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { EmergencyButton, WhatsAppButton } from "../components/EmergencyButton";
import { useBlog } from "../hooks/useBlog";

const CATEGORIES = ["All", "Oral Hygiene", "Cosmetic", "Restorative", "Orthodontics", "Nutrition", "Patient Care"];

export default function BlogPage() {
  const [booking, setBooking] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { posts, loading } = useBlog();

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <EmergencyButton />
      <WhatsAppButton />
      <BookingModal isOpen={booking} onClose={() => setBooking(false)} />
      <Navbar onBooking={() => setBooking(true)} />

      <main className="pt-24 bg-white text-black min-h-screen">
        {/* Header */}
        <div className="px-6 md:px-12 py-14 border-b border-[#E0E0E0]">
          <Link to="/" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#8F8F8F] hover:text-black transition-colors mb-8">
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-[clamp(42px,7vw,96px)] font-black tracking-[-0.04em] leading-[0.9]">
                Dental Tips &<br /><span className="text-[#8F8F8F]">Insights</span>
              </h1>
            </div>
            <p className="text-[14px] text-[#8F8F8F] max-w-xs leading-relaxed">
              Expert guidance from Dr. Arjun Sharma — practical advice you can use at home.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="px-6 md:px-12 py-6 border-b border-[#E0E0E0] overflow-x-auto">
          <div className="flex gap-2 w-max md:w-auto md:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-black text-white"
                    : "bg-[#F5F5F5] text-[#8F8F8F] hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        <div className="px-6 md:px-12 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-[#E0E0E0]">
            {filtered.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex flex-col bg-white hover:bg-[#F5F5F5] transition-colors duration-200 p-7 md:p-8"
              >
                {/* Meta */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase text-[#8F8F8F]">
                    <Tag size={10} /> {post.category}
                  </span>
                  <span className="text-[#C0C0C0] text-[10px]">·</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-[#8F8F8F]">
                    <Clock size={10} /> {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-[18px] md:text-[20px] font-black tracking-[-0.02em] leading-[1.2] text-black flex-1 mb-4">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-[13px] leading-relaxed text-[#8F8F8F] mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-black">{post.author}</p>
                    <p className="text-[11px] text-[#8F8F8F]">{post.date}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-200">
                    <ArrowUpRight size={13} className="text-black/50 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-3 py-20 text-[#8F8F8F]">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-[13px]">Loading articles...</span>
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="py-20 text-center text-[#8F8F8F]">
              <p className="text-[16px] font-semibold">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}





// import { useState } from "react";
// import { ArrowLeft, ArrowUpRight, Clock, Tag } from "lucide-react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import BookingModal from "../components/BookingModal";
// import { EmergencyButton, WhatsAppButton } from "../components/EmergencyButton";
// import blogData from "../data/blog.json";

// const CATEGORIES = ["All", "Oral Hygiene", "Cosmetic", "Restorative", "Orthodontics", "Nutrition", "Patient Care"];

// export default function BlogPage() {
//   const [booking, setBooking] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filtered =
//     activeCategory === "All"
//       ? blogData
//       : blogData.filter((p) => p.category === activeCategory);

//   return (
//     <>
//       <EmergencyButton />
//       <WhatsAppButton />
//       <BookingModal isOpen={booking} onClose={() => setBooking(false)} />
//       <Navbar onBooking={() => setBooking(true)} />

//       <main className="pt-24 bg-white text-black min-h-screen">
//         {/* Header */}
//         <div className="px-6 md:px-12 py-14 border-b border-[#E0E0E0]">
//           <Link to="/" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#8F8F8F] hover:text-black transition-colors mb-8">
//             <ArrowLeft size={13} /> Back to Home
//           </Link>
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//             <div>
//               <h1 className="text-[clamp(42px,7vw,96px)] font-black tracking-[-0.04em] leading-[0.9]">
//                 Dental Tips &<br /><span className="text-[#8F8F8F]">Insights</span>
//               </h1>
//             </div>
//             <p className="text-[14px] text-[#8F8F8F] max-w-xs leading-relaxed">
//               Expert guidance from Dr. Arjun Sharma — practical advice you can use at home.
//             </p>
//           </div>
//         </div>

//         {/* Category filter */}
//         <div className="px-6 md:px-12 py-6 border-b border-[#E0E0E0] overflow-x-auto">
//           <div className="flex gap-2 w-max md:w-auto md:flex-wrap">
//             {CATEGORIES.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-200 whitespace-nowrap ${
//                   activeCategory === cat
//                     ? "bg-black text-white"
//                     : "bg-[#F5F5F5] text-[#8F8F8F] hover:text-black"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Articles grid */}
//         <div className="px-6 md:px-12 py-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-[#E0E0E0]">
//             {filtered.map((post) => (
//               <Link
//                 key={post.id}
//                 to={`/blog/${post.slug}`}
//                 className="group flex flex-col bg-white hover:bg-[#F5F5F5] transition-colors duration-200 p-7 md:p-8"
//               >
//                 {/* Meta */}
//                 <div className="flex items-center gap-2.5 mb-5">
//                   <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase text-[#8F8F8F]">
//                     <Tag size={10} /> {post.category}
//                   </span>
//                   <span className="text-[#C0C0C0] text-[10px]">·</span>
//                   <span className="flex items-center gap-1.5 text-[10px] text-[#8F8F8F]">
//                     <Clock size={10} /> {post.readTime}
//                   </span>
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-[18px] md:text-[20px] font-black tracking-[-0.02em] leading-[1.2] text-black flex-1 mb-4">
//                   {post.title}
//                 </h2>

//                 {/* Excerpt */}
//                 <p className="text-[13px] leading-relaxed text-[#8F8F8F] mb-6 line-clamp-3">
//                   {post.excerpt}
//                 </p>

//                 {/* Footer */}
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-[12px] font-semibold text-black">{post.author}</p>
//                     <p className="text-[11px] text-[#8F8F8F]">{post.date}</p>
//                   </div>
//                   <div className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-200">
//                     <ArrowUpRight size={13} className="text-black/50 group-hover:text-white transition-colors" />
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {filtered.length === 0 && (
//             <div className="py-20 text-center text-[#8F8F8F]">
//               <p className="text-[16px] font-semibold">No articles in this category yet.</p>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }
