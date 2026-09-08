import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Eased scrolling via Lenis, driven by GSAP's ticker and kept in sync with
 * ScrollTrigger. Disabled entirely under prefers-reduced-motion.
 */
export function initSmoothScroll(): Lenis | null {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return null;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
