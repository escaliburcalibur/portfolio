import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

/**
 * One SplitText per element, shared by the reveal and the hover effect so they
 * never double-split the same DOM. Cached; re-created on demand after a resize.
 */

export interface Split {
  split: SplitText;
  lines: HTMLElement[];
  chars: HTMLElement[];
}

const cache = new WeakMap<HTMLElement, Split>();

export function getSplit(el: HTMLElement): Split {
  const existing = cache.get(el);
  if (existing) return existing;

  const split = new SplitText(el, {
    type: 'lines,chars',
    linesClass: 'fx-line',
    charsClass: 'fx-char',
    aria: 'auto',
  });
  const chars = split.chars as HTMLElement[];
  for (const c of chars) c.dataset.orig = c.textContent ?? '';

  const entry: Split = { split, lines: split.lines as HTMLElement[], chars };
  cache.set(el, entry);
  return entry;
}

export function revertSplit(el: HTMLElement) {
  cache.get(el)?.split.revert();
  cache.delete(el);
}
