import { useRef, useEffect } from "react";
import { ArrowUpRight, Tag, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlog, type BlogPost } from "../hooks/useBlog";


export default function BlogPreview() {
  const ref = useRef<HTMLElement>(null);
  const { posts, loading, error } = useBlog();

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

  const featured = posts[0];
  const rest     = posts.slice(1, 4);

  return (
    <section
      id="blog"
      ref={ref}
      className="section-reveal bg-white text-black px-6 md:px-12 py-20 md:py-28"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
            <span className="w-8 h-px bg-[#8F8F8F]" />
            Dental Tips & Insights
          </p>
          <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9]">
            From Our<br />
            <span className="text-[#8F8F8F]">Blog</span>
          </h2>
        </div>
        <Link
          to="/blog"
          className="flex items-center gap-2 text-[13px] font-bold text-black border border-black/20 hover:bg-black hover:text-white hover:border-black px-5 py-2.5 rounded-full transition-all duration-200 w-fit"
        >
          View All Articles
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-16 text-[#8F8F8F]">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-[13px] font-medium">Loading articles...</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="text-[13px] text-[#8F8F8F] text-center py-12">
          Could not load articles right now.
        </p>
      )}

      {/* Grid */}
      {!loading && !error && featured && (
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0.5">

          {/* Featured */}
          <Link
            to={`/blog/${featured.slug}`}
            className="group block bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors duration-300 p-8 md:p-10 flex flex-col justify-between min-h-[340px]"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">
                  <Tag size={10} />{featured.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#C0C0C0]" />
                {/* <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-[#8F8F8F]">
                  <Clock size={10} />{featured.readTime}
                </span> */}
              </div>
              <h3 className="text-[22px] md:text-[28px] font-black tracking-[-0.03em] leading-[1.15] text-black mb-4 group-hover:text-[#333] transition-colors">
                {featured.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#8F8F8F]">
                {featured.excerpt}
              </p>
            </div>
            <div className="flex items-center justify-between mt-8">
              <div>
                <p className="text-[12px] font-semibold text-black">{featured.author}</p>
                <p className="text-[11px] text-[#8F8F8F]">{featured.date}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight size={15} className="text-white" />
              </div>
            </div>
          </Link>

          {/* Small cards */}
          <div className="grid grid-rows-3 gap-0.5">
            {rest.map((post, i) => (
              <BlogSmallCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function BlogSmallCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), index * 80);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <Link
      ref={ref}
      to={`/blog/${post.slug}`}
      className="section-reveal group flex items-center justify-between gap-4 bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors duration-200 px-6 md:px-8 py-5"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">{post.category}</span>
          <span className="text-[9px] text-[#C0C0C0]">·</span>
          <span className="text-[9px] text-[#8F8F8F]">{post.readTime}</span>
        </div>
        <h4 className="text-[14px] font-bold tracking-[-0.01em] text-black leading-snug truncate">
          {post.title}
        </h4>
        <p className="text-[11px] text-[#8F8F8F] mt-1">{post.date}</p>
      </div>
      <div className="w-7 h-7 flex-shrink-0 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-200">
        <ArrowUpRight size={12} className="text-black/50 group-hover:text-white transition-colors" />
      </div>
    </Link>
  );
}





// import { useRef, useEffect } from "react";
// import { ArrowUpRight, Clock, Tag } from "lucide-react";
// import { Link } from "react-router-dom";
// import blogData from "../data/blog.json";

// export default function BlogPreview() {
//   const ref = useRef<HTMLElement>(null);

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

//   const featured = blogData[0];
//   const rest = blogData.slice(1, 4);

//   return (
//     <section
//       id="blog"
//       ref={ref}
//       className="section-reveal bg-white text-black px-6 md:px-12 py-20 md:py-28"
//     >
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
//         <div>
//           <p className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#8F8F8F] font-semibold mb-5">
//             <span className="w-8 h-px bg-[#8F8F8F]" />
//             Dental Tips & Insights
//           </p>
//           <h2 className="text-[clamp(36px,5vw,72px)] font-black tracking-[-0.04em] leading-[0.9]">
//             From Our<br />
//             <span className="text-[#8F8F8F]">Blog</span>
//           </h2>
//         </div>
//         <Link
//           to="/blog"
//           className="flex items-center gap-2 text-[13px] font-bold text-black border border-black/20 hover:bg-black hover:text-white hover:border-black px-5 py-2.5 rounded-full transition-all duration-200 w-fit"
//         >
//           View All Articles
//           <ArrowUpRight size={14} />
//         </Link>
//       </div>

//       {/* Grid: featured large + 3 small */}
//       <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0.5">

//         {/* Featured */}
//         <Link to={`/blog/${featured.slug}`} className="group block bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors duration-300 p-8 md:p-10 flex flex-col justify-between min-h-[340px]">
//           <div>
//             <div className="flex items-center gap-3 mb-6">
//               <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">
//                 <Tag size={10} />{featured.category}
//               </span>
//               <span className="w-1 h-1 rounded-full bg-[#C0C0C0]" />
//               <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-[#8F8F8F]">
//                 <Clock size={10} />{featured.readTime}
//               </span>
//             </div>
//             <h3 className="text-[22px] md:text-[28px] font-black tracking-[-0.03em] leading-[1.15] text-black mb-4 group-hover:text-[#333] transition-colors">
//               {featured.title}
//             </h3>
//             <p className="text-[14px] leading-relaxed text-[#8F8F8F]">
//               {featured.excerpt}
//             </p>
//           </div>
//           <div className="flex items-center justify-between mt-8">
//             <div>
//               <p className="text-[12px] font-semibold text-black">{featured.author}</p>
//               <p className="text-[11px] text-[#8F8F8F]">{featured.date}</p>
//             </div>
//             <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform">
//               <ArrowUpRight size={15} className="text-white" />
//             </div>
//           </div>
//         </Link>

//         {/* Small cards */}
//         <div className="grid grid-rows-3 gap-0.5">
//           {rest.map((post, i) => (
//             <BlogSmallCard key={post.id} post={post} index={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function BlogSmallCard({
//   post,
//   index,
// }: {
//   post: (typeof blogData)[0];
//   index: number;
// }) {
//   const ref = useRef<HTMLAnchorElement>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) setTimeout(() => el.classList.add("visible"), index * 80);
//       },
//       { threshold: 0.1 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [index]);

//   return (
//     <Link
//       ref={ref}
//       to={`/blog/${post.slug}`}
//       className="section-reveal group flex items-center justify-between gap-4 bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors duration-200 px-6 md:px-8 py-5"
//     >
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center gap-2 mb-1.5">
//           <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#8F8F8F]">{post.category}</span>
//           <span className="text-[9px] text-[#C0C0C0]">·</span>
//           <span className="text-[9px] text-[#8F8F8F]">{post.readTime}</span>
//         </div>
//         <h4 className="text-[14px] font-bold tracking-[-0.01em] text-black leading-snug truncate">
//           {post.title}
//         </h4>
//         <p className="text-[11px] text-[#8F8F8F] mt-1">{post.date}</p>
//       </div>
//       <div className="w-7 h-7 flex-shrink-0 rounded-full border border-black/15 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-200">
//         <ArrowUpRight size={12} className="text-black/50 group-hover:text-white transition-colors" />
//       </div>
//     </Link>
//   );
// }
