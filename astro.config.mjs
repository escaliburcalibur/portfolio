import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site: https://escaliburcalibur.github.io/portfolio
// When a custom domain is added: set SITE_URL to it and BASE to '/'.
const SITE = process.env.SITE_URL ?? 'https://escaliburcalibur.github.io';
const BASE = process.env.SITE_BASE ?? '/portfolio';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
