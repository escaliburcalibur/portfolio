// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: replace with the real domain once purchased (also update site.webmanifest / robots.txt).
const SITE = process.env.SITE_URL ?? 'https://portfolio.pages.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  build: { format: 'file' },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
