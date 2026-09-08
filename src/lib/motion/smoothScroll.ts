import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * Eased scrolling via Lenis, driven by GSAP's ticker and kept in sync with
 * ScrollTrigger. One instance for the app lifetime. Disabled under
 * prefers-reduced-motion.
 */
export function initSmoothScroll(): Lenis | null {
  if (lenis) return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return null;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/** Recompute scroll length after a client-side navigation swaps the content. */
export function refreshSmoothScroll() {
  lenis?.resize();
  lenis?.scrollTo(0, { immediate: true });
  ScrollTrigger.refresh();
}
