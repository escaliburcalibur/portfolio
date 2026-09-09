/**
 * "Block-wipe" de carga para [data-reveal-text]: un bloque-cursor barre cada
 * línea; los caracteres pasan de un tinte de destello a currentColor.
 * Solo en la primera carga dura; la navegación cliente solo hace crossfade.
 */
import gsap from 'gsap';
import { getSplit } from './split';
import { FLASH, rand } from './palette';

const CHAR_STEP = 0.028;
const LINE_STAGGER = 0.16;
const TRAIL = 0.34;

function disarm() {
  document.documentElement.classList.remove('reveal-armed');
}

export function initReveal(animate: boolean): void {
  const targets = [
    ...document.querySelectorAll<HTMLElement>('[data-reveal-text]'),
  ];

  if (!animate || !targets.length) {
    if (targets.length) gsap.set(targets, { autoAlpha: 1 });
    disarm();
    return;
  }

  const master = gsap.timeline({ onComplete: disarm });
  // Failsafe: revela todo pase lo que pase.
  gsap.delayedCall(4, disarm);

  targets.forEach((el, ti) => {
    const split = getSplit(el);
    const lines = (split.lines as HTMLElement[]) ?? [];
    const chars = (split.chars as HTMLElement[]) ?? [];
    gsap.set(el, { autoAlpha: 1 });

    lines.forEach((line, li) => {
      const at = ti * 0.08 + li * LINE_STAGGER;
      const lineChars = chars.filter((c) => line.contains(c));
      const width = line.offsetWidth;

      const block = document.createElement('span');
      block.className = 'reveal-block';
      line.appendChild(block);

      const span = Math.max(0.3, width / 900);
      master.fromTo(
        block,
        { x: 0, scaleX: 1, autoAlpha: 1 },
        { x: width, duration: span, ease: 'none' },
        at,
      );
      for (let t = 0.1; t < span; t += CHAR_STEP * 3) {
        master.set(block, { backgroundColor: rand(FLASH) }, at + t);
      }
      lineChars.forEach((char, i) => {
        const ct = at + i * CHAR_STEP;
        master.set(char, { autoAlpha: 1 }, ct);
        master.fromTo(
          char,
          { color: rand(FLASH) },
          {
            color: 'currentColor',
            duration: TRAIL,
            ease: 'power1.out',
            clearProps: 'color',
          },
          ct,
        );
      });
      master.to(
        block,
        { scaleX: 0, autoAlpha: 0, duration: 0.12, ease: 'power2.in' },
        at + span,
      );
    });

    if (!lines.length) gsap.set(el, { autoAlpha: 1 });
  });
}
