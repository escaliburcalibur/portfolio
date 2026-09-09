/**
 * Un único SplitText compartido por elemento, cacheado en un WeakMap para que
 * el reveal y el hover nunca partan el mismo nodo dos veces.
 */
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

type SplitType = 'lines,chars' | 'lines';

interface Cached {
  split: SplitText;
  type: SplitType;
}

const cache = new WeakMap<HTMLElement, Cached>();

/** Debajo de 640px partimos solo en líneas para recortar el número de nodos. */
function wantType(): SplitType {
  return window.matchMedia('(max-width: 40rem)').matches
    ? 'lines'
    : 'lines,chars';
}

export function getSplit(
  el: HTMLElement,
  type: SplitType = wantType(),
): SplitText {
  const hit = cache.get(el);
  if (hit && hit.type === type) return hit.split;
  if (hit) hit.split.revert();

  // GSAP 3.13+ ya expone las piezas a lectores de pantalla por defecto
  // (aria: 'auto'), así que no hace falta pasarlo.
  const split = new SplitText(el, {
    type,
    linesClass: 'fx-line',
    charsClass: 'fx-char',
  });
  cache.set(el, { split, type });
  return split;
}

export function revertSplit(el: HTMLElement): void {
  const hit = cache.get(el);
  if (hit) {
    hit.split.revert();
    cache.delete(el);
  }
}
