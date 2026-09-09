/**
 * Paleta de destello y glifos para la animación de texto (adaptado del
 * CodePen de Andrea Catanzaro). Estos colores SOLO aparecen aquí, de forma
 * transitoria; el resto del sitio es monocromo + un acento.
 */
export const FLASH = [
  '#85AF00',
  '#FFCC00',
  '#FB9CFD',
  '#A19BFF',
  '#FF4C00',
] as const;

export const GLYPHS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>%&@!#$^*()-_+={}[]|\\:;"?/~`';

export function rand<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function randChar(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}
