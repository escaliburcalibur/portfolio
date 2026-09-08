import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

/**
 * Per-line hover effect: on mouseenter, a pulse ripples out from the centre of
 * the line (delay ∝ distance from centre) with yoyo. Each character briefly
 * flashes a colour from the accent set; some swap to a random glyph, some
 * sprout a technical `△x = NNpx` annotation and a 1px coloured outline, then
 * everything snaps back. This is the one place the otherwise-monochrome site
 * uses colour, on purpose.
 */

const FLASH_COLORS = ['#85AF00', '#FFCC00', '#FB9CFD', '#A19BFF', '#FF4C00'];

const GLYPHS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>%&@!#$^*()-_+={}[]|\\:;"?/~`'.split(
    '',
  );

const rand = (n: number) => (Math.random() * n) | 0;
const pick = <T>(arr: T[]): T => arr[rand(arr.length)];

interface Instance {
  split: SplitText;
  cleanup: () => void;
}

const instances = new WeakMap<HTMLElement, Instance>();

function wire(el: HTMLElement) {
  if (instances.has(el)) return;

  const split = new SplitText(el, {
    type: 'lines,chars',
    linesClass: 'fx-line',
    charsClass: 'fx-char',
    aria: 'auto',
  });

  for (const char of split.chars as HTMLElement[]) {
    char.dataset.orig = char.textContent ?? '';
  }

  const teardowns: (() => void)[] = [];

  for (const line of split.lines as HTMLElement[]) {
    const chars = (split.chars as HTMLElement[]).filter((c) =>
      line.contains(c),
    );
    const mid = (chars.length - 1) / 2;

    const reset = (char: HTMLElement) => {
      char.textContent = char.dataset.orig ?? '';
      char.style.outline = '';
      char.style.color = '';
    };

    const onEnter = () => {
      chars.forEach((char, i) => {
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
    };

    line.addEventListener('mouseenter', onEnter);
    teardowns.push(() => line.removeEventListener('mouseenter', onEnter));
  }

  instances.set(el, {
    split,
    cleanup: () => {
      teardowns.forEach((t) => t());
      split.revert();
      instances.delete(el);
    },
  });
}

export function initTextFx(root: ParentNode = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root
    .querySelectorAll<HTMLElement>('[data-text-fx]')
    .forEach((el) => wire(el));
}

/** Re-split on viewport width changes (line breaks move). Debounced. */
export function watchTextFxResize() {
  let w = window.innerWidth;
  let t: number | undefined;
  window.addEventListener('resize', () => {
    if (window.innerWidth === w) return;
    w = window.innerWidth;
    window.clearTimeout(t);
    t = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-text-fx]').forEach((el) => {
        instances.get(el)?.cleanup();
        wire(el);
      });
    }, 200);
  });
}
