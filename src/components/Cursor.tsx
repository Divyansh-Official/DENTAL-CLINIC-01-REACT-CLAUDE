import { useEffect, useRef } from "react";

export default function Cursor() {
  // ── Skip on touch / mobile devices ──────────────────────────
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHover = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    const onEnter = () => { isHover.current = true; };
    const onLeave = () => { isHover.current = false; };

    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2.5 h-2.5 rounded-full bg-white pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full border border-white/50 pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </>
  );
}





// import { useEffect, useRef } from "react";

// export default function Cursor() {
//   const dotRef = useRef<HTMLDivElement>(null);
//   const ringRef = useRef<HTMLDivElement>(null);
//   const posRef = useRef({ x: 0, y: 0 });
//   const ringPos = useRef({ x: 0, y: 0 });
//   const isHover = useRef(false);
//   const rafId = useRef<number>(0);

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       posRef.current = { x: e.clientX, y: e.clientY };
//       if (dotRef.current) {
//         dotRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
//       }
//     };

//     const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
//     const loop = () => {
//       ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.12);
//       ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.12);
//       if (ringRef.current) {
//         ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
//       }
//       rafId.current = requestAnimationFrame(loop);
//     };
//     rafId.current = requestAnimationFrame(loop);

//     const onEnter = () => { isHover.current = true; };
//     const onLeave = () => { isHover.current = false; };

//     document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
//       el.addEventListener("mouseenter", onEnter);
//       el.addEventListener("mouseleave", onLeave);
//     });

//     window.addEventListener("mousemove", onMove);
//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       cancelAnimationFrame(rafId.current);
//     };
//   }, []);

//   return (
//     <>
//       <div
//         ref={dotRef}
//         className="fixed top-0 left-0 z-[9999] w-2.5 h-2.5 rounded-full bg-white pointer-events-none mix-blend-difference"
//         style={{ willChange: "transform" }}
//       />
//       <div
//         ref={ringRef}
//         className="fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full border border-white/50 pointer-events-none mix-blend-difference"
//         style={{ willChange: "transform" }}
//       />
//     </>
//   );
// }
