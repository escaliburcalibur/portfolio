import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initTextReveal } from './textReveal';
import { initTextFx, watchTextResize } from './textFx';
import { initScrollEffects } from './scrollEffects';

gsap.registerPlugin(ScrollTrigger);

/**
 * Motion entry point. Runs on every `astro:page-load` so it survives the
 * View Transitions crossfade. Native scroll (no smoothing) — scroll effects and
 * text effects are rebuilt per page. Every module is a no-op under
 * prefers-reduced-motion.
 */

let booted = false;
let firstLoad = true;

async function setupPage() {
  // Drop ScrollTriggers from the page we just left.
  for (const t of ScrollTrigger.getAll()) t.kill();

  initScrollEffects();
  await initTextReveal(firstLoad); // block-wipe only on the first (hard) load
  initTextFx();
  ScrollTrigger.refresh();
  firstLoad = false;
}

function run() {
  if (!booted) {
    booted = true;
    watchTextResize();
  }

  if (document.fonts && document.fonts.status !== 'loaded') {
    document.fonts.ready.then(setupPage, setupPage);
  } else {
    setupPage();
  }
}

// Re-hide reveal targets on the incoming document so nothing flashes mid-swap.
document.addEventListener('astro:before-swap', (e) => {
  (e as { newDocument: Document }).newDocument.documentElement.classList.add(
    'reveal-armed',
  );
});

document.addEventListener('astro:page-load', run);
