import { gsap } from 'gsap';
import { getSplit, revertSplit } from './textSplit';

/**
 * Text hover effect — faithful port of the CodePen the owner supplied
 * (Andrea Catanzaro, "bNgyqbp"), wired to our shared split and [data-text-fx]
 * scope. On mouseenter over a line, every character ripples out from the
 * centre (delay ∝ distance from centre): a colour flash from the accent set
 * with yoyo, a ~50% chance to swap to a random glyph, and a ~33% chance to
 * gain a `△x = NNpx` annotation and a 1px coloured border, all restored
 * on complete.
 */

const FLASH_COLORS = ['#85AF00', '#FFCC00', '#FB9CFD', '#A19BFF', '#FF4C00'];

const GLYPHS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>%&@!#$^*()-_+={}[]|\\:;"?/~`'.split(
    '',
  );

const wired = new WeakSet<HTMLElement>();

function wire(el: HTMLElement) {
  if (wired.has(el)) return;
  wired.add(el);

  const { split } = getSplit(el);
  const lines = split.lines as HTMLElement[];
  const chars = split.chars as HTMLElement[];

  lines.forEach((line) => {
    line.addEventListener('mouseenter', () => {
      const charsInLine = chars.filter((char) => line.contains(char));
      const totalChars = charsInLine.length;
      const middleIndex = (totalChars - 1) / 2;

      charsInLine.forEach((char, index) => {
        if (!char.dataset.orig) char.dataset.orig = char.textContent ?? '';

        const distanceFromCenter = Math.abs(index - middleIndex);

        gsap.fromTo(
          char,
          { color: '#fff' },
          {
            color: gsap.utils.random(FLASH_COLORS),
            ease: 'power3.out',
            duration: 0.3,
            delay: distanceFromCenter * 0.03,
            repeat: 1,
            yoyo: true,
            overwrite: 'auto',

            onStart: () => {
              const randomNum = gsap.utils.random(['0', '1']);
              const randomNumThree = gsap.utils.random(['0', '1', '2']);

              if (randomNum === '1') {
                char.textContent = gsap.utils.random(GLYPHS);
              }

              if (randomNumThree === '1') {
                const detail = document.createElement('span');
                detail.classList.add('detail-size');
                detail.textContent = `△x = ${char.clientWidth}px`;
                char.appendChild(detail);
              }

              if (randomNumThree === '1') {
                char.style.border = `1px solid ${gsap.utils.random(FLASH_COLORS)}`;
              }
            },

            onComplete: () => {
              char.textContent = char.dataset.orig ?? '';
              char.style.border = 'none';
            },
          },
        );
      });
    });
  });
}

export function initTextFx(root: ParentNode = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root
    .querySelectorAll<HTMLElement>('[data-text-fx]')
    .forEach((el) => wire(el));
}

/** Re-split every effect target on width changes (line breaks move). Debounced. */
export function watchTextResize(onResplit?: () => void) {
  let w = window.innerWidth;
  let t: number | undefined;
  window.addEventListener('resize', () => {
    if (window.innerWidth === w) return;
    w = window.innerWidth;
    window.clearTimeout(t);
    t = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>('[data-text-fx], [data-text-reveal]')
        .forEach((el) => {
          wired.delete(el);
          revertSplit(el);
        });
      onResplit?.();
      initTextFx();
    }, 200);
  });
}
