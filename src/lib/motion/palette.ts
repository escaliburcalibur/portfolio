/**
 * The one sanctioned set of colours on an otherwise-monochrome site. Used by
 * the text hover pulse and the load-in reveal block/trail.
 */
export const FLASH_COLORS = [
  '#85AF00',
  '#FFCC00',
  '#FB9CFD',
  '#A19BFF',
  '#FF4C00',
];

export const rand = (n: number) => (Math.random() * n) | 0;
export const pick = <T>(arr: T[]): T => arr[rand(arr.length)];
