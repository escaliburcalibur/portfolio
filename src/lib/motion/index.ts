/**
 * Punto de entrada de animación — importado una sola vez desde Base.astro.
 *
 * Milestone 1: solo desarma el estado `reveal-armed` para que el contenido
 * sea visible, y respeta `prefers-reduced-motion`. El scramble del CodePen,
 * el block-wipe y el parallax con ScrollTrigger se añaden en Milestone 3.
 */

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  // @ts-expect-error — Save-Data no está tipado en todos los lib.dom
  navigator.connection?.saveData === true;

function disarm() {
  document.documentElement.classList.remove('reveal-armed');
}

function setupPage() {
  if (reduceMotion()) {
    disarm();
    return;
  }
  // TODO(M3): initScroll(), initReveal(firstLoad), initScramble()
  disarm();
}

// Re-oculta los targets en el documento entrante para que no parpadeen
// durante el crossfade de View Transitions.
document.addEventListener('astro:before-swap', (e) => {
  if (reduceMotion()) return;
  (
    e as unknown as { newDocument: Document }
  ).newDocument.documentElement.classList.add('reveal-armed');
});

document.addEventListener('astro:page-load', () => {
  if (document.fonts && document.fonts.status !== 'loaded') {
    document.fonts.ready.then(setupPage, setupPage);
  } else {
    setupPage();
  }
});
