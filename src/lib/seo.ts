/**
 * Helpers de SEO: metadatos por página + JSON-LD.
 * Funciones puras → objetos; los layouts los serializan.
 */

const ORIGIN = (
  import.meta.env.SITE ?? 'https://escaliburcalibur.github.io'
).replace(/\/$/, '');
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const SITE = {
  origin: ORIGIN,
  base: BASE,
  /** URL raíz pública, con base incluida. */
  url: `${ORIGIN}${BASE}` || ORIGIN,
  name: 'David Bayón',
  title: 'David Bayón — Estudio de diseño',
  description:
    'Estudio de diseño de David Bayón: branding, estrategia de marca, motion, 3D, ' +
    'diseño web, UI/UX y desarrollo creativo. Portafolio de proyectos y servicios.',
  locale: 'es_ES',
  lang: 'es',
  defaultOgImage: '/og/default.png',
  twitter: undefined as string | undefined,
} as const;

export interface PageSeo {
  title: string;
  description: string;
  /** Ruta absoluta desde la raíz del sitio, SIN base. P. ej. '/proyectos'. */
  path: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  /** Bloques JSON-LD extra para esta página. */
  jsonLd?: Record<string, unknown>[];
}

/** URL canónica absoluta (con base). */
export function canonical(path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return `${SITE.url}${clean.startsWith('/') || clean === '' ? clean : `/${clean}`}`;
}

/** Convierte una ruta relativa de asset en URL absoluta (con base). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

export const DISCIPLINES = [
  'branding',
  'brand-strategy',
  'motion',
  '3d',
  'web-design',
  'ui-ux',
  'creative-dev',
] as const;

export const DISCIPLINE_LABELS: Record<(typeof DISCIPLINES)[number], string> = {
  branding: 'Branding',
  'brand-strategy': 'Estrategia de marca',
  motion: 'Motion',
  '3d': '3D',
  'web-design': 'Diseño web',
  'ui-ux': 'UI/UX',
  'creative-dev': 'Desarrollo creativo',
};

/** Nodo Organization / ProfessionalService, emitido en todo el sitio. */
export function organizationLd(
  socials: string[] = [],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}#studio`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    knowsAbout: DISCIPLINES.map((d) => DISCIPLINE_LABELS[d]),
    sameAs: socials,
  };
}

export function personLd(socials: string[] = []): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}#david`,
    name: 'David Bayón',
    jobTitle: 'Diseñador',
    url: `${SITE.url}/sobre-mi`,
    knowsAbout: DISCIPLINES.map((d) => DISCIPLINE_LABELS[d]),
    sameAs: socials,
  };
}

export function websiteLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.title,
    inLanguage: SITE.lang,
  };
}

export function breadcrumbLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

/** Aviso en build si una meta description se sale del rango recomendado. */
export function checkDescription(desc: string, where: string): string {
  const n = desc.length;
  if (n < 70 || n > 160) {
    console.warn(
      `[seo] description de ${where} mide ${n} car. (recomendado 70–160)`,
    );
  }
  return desc;
}
