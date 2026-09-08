import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The Porto-Rocha scroll behaviour, on top of Lenis: gentle `data-speed`
 * parallax on media as it passes, and opacity/short-rise reveals on content
 * blocks as they enter the viewport. Restrained — no marquees, no pinning, no
 * horizontal sections. All off under prefers-reduced-motion.
 */
export function initScrollEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Parallax — element drifts at a fraction of scroll speed. `data-speed` < 1
  // is slower than the page, > 1 faster. Kept small so gaps stay invisible.
  gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed ?? '1');
    if (!speed || speed === 1) return;
    const range = () => (1 - speed) * window.innerHeight * 0.35;
    gsap.fromTo(
      el,
      { y: () => -range() },
      {
        y: () => range(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  // Reveal blocks as they enter.
  const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  gsap.set(reveals, { autoAlpha: 0, y: 18 });
  reveals.forEach((el) => {
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  ScrollTrigger.refresh();
}
