/**
 * Efecto scramble en hover — port fiel del CodePen de Andrea Catanzaro (pen
 * "bNgyqbp"). Al entrar el ratón en una línea, cada carácter hace un pulso
 * desde el centro: destello de color, ~50% cambia de glifo, ~33% recibe una
 * anotación `△x = NNpx`, ~33% un borde de 1px. Todo se restaura al terminar.
 *
 * Alcance: elementos con [data-fx]. Solo punteros finos con hover.
 */
import gsap from 'gsap';
import { getSplit } from './split';
import { FLASH, rand, randChar } from './palette';

const wired = new WeakSet<HTMLElement>();
let io: IntersectionObserver | null = null;

const canHover = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function animateLine(line: HTMLElement, chars: HTMLElement[]) {
  const inLine = chars.filter((c) => line.contains(c));
  const total = inLine.length;
  const middle = (total - 1) / 2;

  inLine.forEach((char, index) => {
    if (!char.dataset.orig) char.dataset.orig = char.textContent ?? '';
    const distance = Math.abs(index - middle);

    gsap.fromTo(
      char,
      { color: '#fff' },
      {
        color: rand(FLASH),
        ease: 'power3.out',
        duration: 0.3,
        delay: distance * 0.03,
        repeat: 1,
        yoyo: true,
        overwrite: 'auto',
        onStart: () => {
          if (Math.random() < 0.5) char.textContent = randChar();
          if (Math.random() < 0.33) {
            const detail = document.createElement('span');
            detail.className = 'detail-size';
            detail.textContent = `△x = ${char.clientWidth}px`;
            char.appendChild(detail);
          }
          if (Math.random() < 0.33) {
            char.style.border = `1px solid ${rand(FLASH)}`;
          }
        },
        onComplete: () => restore(char),
        onInterrupt: () => restore(char),
      },
    );
  });
}

function restore(char: HTMLElement) {
  if (char.dataset.orig !== undefined) char.textContent = char.dataset.orig;
  char.style.border = 'none';
  char.querySelector('.detail-size')?.remove();
}

function wire(el: HTMLElement) {
  if (wired.has(el) || !el.isConnected) return;
  wired.add(el);
  const split = getSplit(el);
  const chars = (split.chars as HTMLElement[]) ?? [];
  const lines = (split.lines as HTMLElement[]) ?? [];
  lines.forEach((line) => {
    line.addEventListener('mouseenter', () => animateLine(line, chars));
  });
}

export function initScramble(): void {
  if (!canHover()) return;
  const targets = [
    ...document.querySelectorAll<HTMLElement>('.shell__content [data-fx]'),
  ];

  // Titulares / textos de bloque: se parten al acercarse al viewport.
  io?.disconnect();
  io = new IntersectionObserver(
    (entries, obs) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          wire(e.target as HTMLElement);
          obs.unobserve(e.target);
        }
      }
    },
    { rootMargin: '200px' },
  );
  targets.forEach((t) => io!.observe(t));
}

// Botones y labels de nav (viven en la sidebar persistente): se parten al
// primer hover, vía un listener delegado que se instala una sola vez.
let delegated = false;
export function initScrambleDelegation(): void {
  if (delegated || !canHover()) return;
  delegated = true;
  document.addEventListener('pointerover', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const el = t.closest<HTMLElement>('[data-fx]');
    if (el && !wired.has(el)) wire(el);
  });
}
