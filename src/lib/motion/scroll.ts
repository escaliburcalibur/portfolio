/**
 * Scroll a lo Porto Rocha: restringido. Parallax suave en media decorativa
 * (nunca en texto), reveal fade/rise una sola vez al entrar en viewport.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScroll(): void {
  // Parallax en [data-speed] — desplazamiento máximo ~20% del viewport.
  document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed ?? '1');
    const range = () => (1 - speed) * window.innerHeight * 0.2;
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

  // Reveal una vez en [data-reveal].
  const reveals = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (!reveals.length) return;
  gsap.set(reveals, { autoAlpha: 0, y: 18 });
  reveals.forEach((el) => {
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: 'power1.inOut',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

export function killScroll(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

export function refreshScroll(): void {
  ScrollTrigger.refresh();
}
