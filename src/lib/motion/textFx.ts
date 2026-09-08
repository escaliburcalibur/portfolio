import { gsap } from 'gsap';
import { getSplit, revertSplit } from './textSplit';
import { FLASH_COLORS, rand, pick } from './palette';

/**
 * Per-line hover effect: on mouseenter, a pulse ripples out from the centre of
 * the line (delay ∝ distance from centre) with yoyo. Each character briefly
 * flashes a colour from the accent set; some swap to a random glyph, some
 * sprout a technical `△x = NNpx` annotation and a 1px coloured outline, then
 * everything snaps back. This is one of two places the otherwise-monochrome
 * site uses colour, on purpose.
 */

const GLYPHS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>%&@!#$^*()-_+={}[]|\\:;"?/~`'.split(
    '',
  );

const wired = new WeakSet<HTMLElement>();

function wire(el: HTMLElement) {
  if (wired.has(el)) return;
  wired.add(el);

  const { lines, chars } = getSplit(el);

  for (const line of lines) {
    const lineChars = chars.filter((c) => line.contains(c));
    const mid = (lineChars.length - 1) / 2;

    const reset = (char: HTMLElement) => {
      char.textContent = char.dataset.orig ?? '';
      char.style.outline = '';
      char.style.color = '';
    };

    line.addEventListener('mouseenter', () => {
      lineChars.forEach((char, i) => {
        gsap.killTweensOf(char);
        reset(char);

        gsap.to(char, {
          color: pick(FLASH_COLORS),
          duration: 0.3,
          ease: 'power3.out',
          delay: Math.abs(i - mid) * 0.03,
          repeat: 1,
          yoyo: true,
          overwrite: 'auto',
          onStart: () => {
            if (Math.random() < 0.4) {
              char.textContent = GLYPHS[rand(GLYPHS.length)];
            }
            if (Math.random() < 0.26) {
              const detail = document.createElement('span');
              detail.className = 'fx-detail';
              detail.textContent = `△x = ${Math.round(
                char.getBoundingClientRect().width,
              )}px`;
              char.appendChild(detail);
            }
            if (Math.random() < 0.26) {
              char.style.outline = `1px solid ${pick(FLASH_COLORS)}`;
            }
          },
          onComplete: () => reset(char),
          onInterrupt: () => reset(char),
        });
      });
    });
  }
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
