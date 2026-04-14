import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  // ── Skip entirely on touch / mobile devices ──────────────────
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const mouse    = useRef({ x: -100, y: -100 });
  const ring     = useRef({ x: -100, y: -100 });
  const raf      = useRef<number>(0);
  const [clicked,  setClicked]  = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    // ── Mouse move ────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // ── Click flash ───────────────────────────────────────────
    const onDown = () => setClicked(true);
    const onUp   = () => setClicked(false);

    // ── Hover detection on interactive elements ───────────────
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("mouseover",  onOver);
    window.addEventListener("mouseout",   onOut);

    // ── Smooth ring animation loop ────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mouseout",   onOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* ── Dot — snaps instantly to mouse ── */}
      <div
        ref={dotRef}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          width:           clicked ? "6px" : "8px",
          height:          clicked ? "6px" : "8px",
          background:      hovering ? "transparent" : "#fff",
          border:          hovering ? "1.5px solid #fff" : "none",
          borderRadius:    "50%",
          pointerEvents:   "none",
          zIndex:          99999,
          willChange:      "transform",
          transition:      "width 0.15s, height 0.15s, background 0.2s, border 0.2s",
          mixBlendMode:    "difference",
        }}
      />

      {/* ── Ring — lags behind with lerp ── */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         hovering ? "44px" : clicked ? "28px" : "36px",
          height:        hovering ? "44px" : clicked ? "28px" : "36px",
          border:        "1.5px solid rgba(255,255,255,0.55)",
          borderRadius:  "50%",
          pointerEvents: "none",
          zIndex:        99998,
          willChange:    "transform",
          transition:    "width 0.25s cubic-bezier(.25,.46,.45,.94), height 0.25s cubic-bezier(.25,.46,.45,.94), border-color 0.2s",
          mixBlendMode:  "difference",
        }}
      />
    </>
  );
}





// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Cursor from "./components/Cursor";
// import SplashScreen from "./components/SplashScreen";
// import Home from "./pages/Home";
// import ServicesPage from "./pages/ServicesPage";
// import DoctorPage from "./pages/DoctorPage";
// import BlogPage from "./pages/BlogPage";
// import ContactPage from "./pages/ContactPage";

// export default function App() {
//   return (
//     <BrowserRouter>
//       {/* Global overlays — shown on every page */}
//       <Cursor />
//       <SplashScreen />

//       <Routes>
//           <Route path="/"          element={<Home />} />
//           <Route path="/services"  element={<ServicesPage />} />
//           <Route path="/doctor"    element={<DoctorPage />} />
//           <Route path="/blog"      element={<BlogPage />} />
//           <Route path="/blog/:slug" element={<BlogPage />} />
//           <Route path="/contact"   element={<ContactPage />} />

//         {/* 404 fallback */}
//         <Route path="*" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
