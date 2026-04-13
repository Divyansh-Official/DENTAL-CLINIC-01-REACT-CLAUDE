import { useState, useEffect } from "react";

export interface ScrollState {
  scrollY: number;
  scrollDirection: "up" | "down" | null;
  isAtTop: boolean;
  scrollProgress: number; // 0–1
}

export function useScroll(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    isAtTop: true,
    scrollProgress: 0,
  });

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setState({
        scrollY: y,
        scrollDirection: y > lastY ? "down" : "up",
        isAtTop: y < 10,
        scrollProgress: maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0,
      });

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
