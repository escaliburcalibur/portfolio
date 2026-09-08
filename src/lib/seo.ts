/**
 * SEO helpers — one place to assemble <head> metadata and JSON-LD.
 * Kept framework-agnostic (plain data in, plain objects out) so it can be
 * unit-tested and reused from endpoints (dynamic OG, sitemap extras).
 */

export interface SiteMeta {
  /** Absolute site origin, e.g. https://studio.com (no trailing slash). */
  origin: string;
  name: string;
  /** Default social share image, site-relative or absolute. */
  defaultOgImage: string;
  locale: string;
  twitter?: string;
}

export const SITE: SiteMeta = {
  origin: (import.meta.env.SITE ?? 'https://portfolio.pages.dev').replace(
    /\/$/,
    '',
  ),
  name: 'Studio', // TODO: brand name
  defaultOgImage: '/og/default.png',
  locale: 'en',
  twitter: undefined,
};

export interface PageSeo {
  title: string;
  description: string;
  /** Path beginning with "/". */
  path: string;
  ogImage?: string;
  /** e.g. "website" | "article" | "profile" */
  type?: string;
  /** Set true on pages that should not be indexed. */
  noindex?: boolean;
}

export function canonical(path: string): string {
  return `${SITE.origin}${path === '/' ? '' : path}`;
}

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE.origin}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/** Organization / ProfessionalService node — emitted site-wide. */
export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.origin,
    image: absoluteUrl(SITE.defaultOgImage),
    knowsAbout: [
      'Branding',
      'Brand strategy',
      'Motion design',
      '3D design',
      'Web design',
      'UI/UX design',
      'Creative development',
    ],
    sameAs: [] as string[], // TODO: social profiles
  };
}
