import { useRef, useEffect, RefObject } from "react";

/**
 * Returns a ref to attach to an element.
 * Moves the element vertically at `speed` fraction of scroll offset
 * relative to the element's position in the viewport.
 * speed = 0.1 → subtle; 0.4 → strong
 */
export function useParallax<T extends HTMLElement>(
  speed = 0.15
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;

    const update = () => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      el.style.transform = `translateY(${offset.toFixed(2)}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}
