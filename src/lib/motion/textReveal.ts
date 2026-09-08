import { gsap } from 'gsap';
import { getSplit } from './textSplit';
import { FLASH_COLORS, pick } from './palette';

/**
 * Load-in reveal: text is uncovered character by character, left to right, one
 * line at a time. A solid colour block rides the leading edge as a cursor
 * (mix-blend-mode: difference, so the character reads through it in a
 * contrasting hue); the few characters just behind it are tinted and settle to
 * the resting colour. Block colour cycles through the accent set and it drops
 * away at the end of each line. Original implementation.
 */

const CHAR_STEP = 0.028; // seconds between characters
const LINE_STAGGER = 0.16; // seconds between lines
const TRAIL = 0.34; // colour-settle duration per character

function buildLine(
  tl: gsap.core.Timeline,
  line: HTMLElement,
  chars: HTMLElement[],
  at: number,
) {
  const width = line.getBoundingClientRect().width;
  const span = chars.length * CHAR_STEP;

  const block = document.createElement('span');
  block.className = 'reveal-block';
  line.appendChild(block);

  tl.set(chars, { autoAlpha: 0 }, at);
  tl.set(
    block,
    { autoAlpha: 1, x: 0, scaleX: 1, backgroundColor: pick(FLASH_COLORS) },
    at,
  );

  // Cursor sweeps the line at a steady pace.
  tl.to(block, { x: width, duration: span, ease: 'none' }, at);

  // Block changes colour every few characters as it travels.
  for (let t = 0.12; t < span; t += CHAR_STEP * 3) {
    tl.set(block, { backgroundColor: pick(FLASH_COLORS) }, at + t);
  }

  // Characters appear as the cursor passes, then their tint eases to rest.
  chars.forEach((char, i) => {
    const t = at + i * CHAR_STEP;
    tl.set(char, { autoAlpha: 1 }, t);
    tl.fromTo(
      char,
      { color: pick(FLASH_COLORS) },
      {
        color: 'currentColor',
        duration: TRAIL,
        ease: 'power1.out',
        clearProps: 'color',
      },
      t,
    );
  });

  // Cursor drops away at the end of the line.
  tl.to(
    block,
    { scaleX: 0, autoAlpha: 0, duration: 0.12, ease: 'power2.in' },
    at + span,
  );
  tl.call(() => block.remove(), undefined, at + span + 0.13);
}

export function initTextReveal(animate = true): Promise<void> {
  const targets = [
    ...document.querySelectorAll<HTMLElement>('[data-text-reveal]'),
  ];
  const disarm = () =>
    document.documentElement.classList.remove('reveal-armed');

  // No block-wipe on client-side navigation (Porto Rocha just crossfades) or
  // under reduced motion — just show the text.
  if (
    !animate ||
    !targets.length ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    gsap.set(targets, { autoAlpha: 1 });
    disarm();
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const master = gsap.timeline({
      onComplete: () => {
        disarm();
        resolve();
      },
    });

    targets.forEach((el, ti) => {
      const { lines, chars } = getSplit(el);
      gsap.set(el, { autoAlpha: 1 });
      lines.forEach((line, li) => {
        const lineChars = chars.filter((c) => line.contains(c));
        buildLine(master, line, lineChars, ti * 0.06 + li * LINE_STAGGER);
      });
    });

    // Safety: never leave text hidden if something stalls.
    gsap.delayedCall(4, () => {
      disarm();
      gsap.set(targets, { autoAlpha: 1 });
      resolve();
    });
  });
}
