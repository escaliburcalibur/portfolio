import { initSmoothScroll } from './smoothScroll';
import { initTextReveal } from './textReveal';
import { initTextFx, watchTextResize } from './textFx';
import { initScrollEffects } from './scrollEffects';

/**
 * Motion entry point — imported once from Base.astro. Every module guards
 * itself on prefers-reduced-motion. Reveal runs first (load-in), then the hover
 * effect wires onto the same shared split.
 */
async function start() {
  initSmoothScroll();
  initScrollEffects();
  await initTextReveal();
  initTextFx();
  watchTextResize();
}

// Split after fonts settle so line breaks and glyph widths are final.
if (document.fonts && document.fonts.status !== 'loaded') {
  document.fonts.ready.then(start, start);
} else {
  start();
}
