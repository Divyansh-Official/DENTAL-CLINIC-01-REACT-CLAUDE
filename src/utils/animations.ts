/**
 * Attaches an IntersectionObserver to an element.
 * When visible, adds `visible` class (triggers .section-reveal CSS).
 * Returns a cleanup function.
 */
export function observeReveal(
  el: Element | null,
  delay = 0,
  threshold = 0.1
): () => void {
  if (!el) return () => {};

  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add("visible"), delay);
        obs.disconnect();
      }
    },
    { threshold }
  );

  obs.observe(el);
  return () => obs.disconnect();
}

/**
 * Stagger-reveals a NodeList of elements with incremental delays.
 */
export function staggerReveal(
  els: NodeListOf<Element> | Element[],
  baseDelay = 0,
  step = 80
): () => void {
  const cleanups: (() => void)[] = [];
  Array.from(els).forEach((el, i) => {
    cleanups.push(observeReveal(el, baseDelay + i * step));
  });
  return () => cleanups.forEach((fn) => fn());
}

/**
 * Easing functions for manual JS animations.
 */
export const ease = {
  outExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  outQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  inOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

/**
 * Linearly interpolates between a and b by factor t.
 */
export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;
