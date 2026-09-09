/**
 * Punto de entrada de animación — importado una sola vez desde Base.astro.
 * Cada submódulo es no-op bajo prefers-reduced-motion / Save-Data.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, killScroll, refreshScroll } from './scroll';
import { initReveal } from './reveal';
import { initScramble, initScrambleDelegation } from './scramble';
import { revertSplit } from './split';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  // @ts-expect-error — Save-Data / connection no está en todos los lib.dom
  navigator.connection?.saveData === true;

let firstLoad = true;
let resizeBound = false;

function disarm() {
  document.documentElement.classList.remove('reveal-armed');
}

function setupPage() {
  if (reduceMotion()) {
    disarm();
    return;
  }
  killScroll();
  initScroll();
  initReveal(firstLoad);
  initScramble();
  initScrambleDelegation();
  refreshScroll();
  firstLoad = false;
}

function run() {
  if (!resizeBound) {
    resizeBound = true;
    let t: number;
    window.addEventListener('resize', () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        document
          .querySelectorAll<HTMLElement>('[data-fx], [data-reveal-text]')
          .forEach(revertSplit);
        if (!reduceMotion()) {
          initScramble();
          refreshScroll();
        }
      }, 200);
    });
  }

  if (document.fonts && document.fonts.status !== 'loaded') {
    document.fonts.ready.then(setupPage, setupPage);
  } else {
    setupPage();
  }
}

// Antes del crossfade: re-arma el estado oculto en el documento entrante y
// revierte los splits del panel de contenido saliente (los de la sidebar
// persisten por diseño).
document.addEventListener('astro:before-swap', (e) => {
  document
    .querySelectorAll<HTMLElement>('.shell__content [data-fx]')
    .forEach(revertSplit);
  if (reduceMotion()) return;
  (
    e as unknown as { newDocument: Document }
  ).newDocument.documentElement.classList.add('reveal-armed');
});

document.addEventListener('astro:page-load', run);
