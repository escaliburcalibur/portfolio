import { initSmoothScroll } from './smoothScroll';
import { initTextFx, watchTextFxResize } from './textFx';

/**
 * Motion entry point — imported once from Base.astro. Everything inside is a
 * no-op under prefers-reduced-motion (each module guards itself).
 */
function start() {
  initSmoothScroll();
  initTextFx();
  watchTextFxResize();
}

// Split after fonts settle so line breaks and glyph widths are final.
if (document.fonts && document.fonts.status !== 'loaded') {
  document.fonts.ready.then(start, start);
} else {
  start();
}
