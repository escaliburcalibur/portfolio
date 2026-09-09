/**
 * Genera los assets rasterizados a partir del favicon SVG:
 *   public/favicon-32.png       (32×32)
 *   public/apple-touch-icon.png (180×180)
 *   public/og/default.png       (1200×630)
 *
 * Uso: node scripts/gen-assets.mjs
 */
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const pub = path.join(root, 'public');

const mark = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#000000"/>
  <text x="16" y="22" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
        font-size="16" font-weight="600" fill="#e2e6e3">DB</text>
</svg>`;

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000000"/>
  <text x="80" y="330" font-family="Inter, system-ui, sans-serif" font-size="96"
        font-weight="600" fill="#e2e6e3">David Bayón</text>
  <text x="82" y="392" font-family="Inter, system-ui, sans-serif" font-size="30"
        fill="#8a8f8b">Estudio de diseño — branding, motion, 3D, web, UI/UX</text>
  <rect x="80" y="250" width="64" height="4" fill="#007aff"/>
</svg>`;

await mkdir(path.join(pub, 'og'), { recursive: true });

await sharp(Buffer.from(mark))
  .resize(32, 32)
  .png()
  .toFile(path.join(pub, 'favicon-32.png'));
await sharp(Buffer.from(mark))
  .resize(180, 180)
  .png()
  .toFile(path.join(pub, 'apple-touch-icon.png'));
await sharp(Buffer.from(og))
  .png()
  .toFile(path.join(pub, 'og', 'default.png'));

console.warn('assets generados en public/');
