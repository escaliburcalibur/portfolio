import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content is the source of truth for the whole site. Tina (tina/config.ts)
 * edits the same files; keep the two schemas aligned. Media paths are optional
 * during the placeholder phase — components fall back to <Placeholder/>.
 */

export const DISCIPLINES = [
  'branding',
  'brand-strategy',
  'motion',
  '3d',
  'web-design',
  'ui-ux',
  'creative-dev',
] as const;
export type Discipline = (typeof DISCIPLINES)[number];

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  branding: 'Branding',
  'brand-strategy': 'Brand strategy',
  motion: 'Motion',
  '3d': '3D',
  'web-design': 'Web design',
  'ui-ux': 'UI/UX',
  'creative-dev': 'Creative dev',
};

const seo = z
  .object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: z.string().optional(),
  })
  .optional();

const slice = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('media'),
    src: z.string().optional(),
    ratio: z.string().default('1496 / 998'),
    orientation: z.enum(['landscape', 'portrait']).default('landscape'),
    split: z.boolean().default(false),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal('gallery'),
    items: z.array(z.string()).default([]),
    count: z.number().int().positive().default(3),
    ratio: z.string().default('3 / 2'),
  }),
  z.object({
    type: z.literal('text'),
    heading: z.string().optional(),
    body: z.string(),
    variant: z.enum(['default', 'two-col', 'featured']).default('default'),
  }),
]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number().int(),
    client: z.string(),
    roles: z.array(z.string()).default([]),
    disciplines: z.array(z.enum(DISCIPLINES)).min(1),
    industries: z.array(z.string()).default([]),
    railDescription: z.string(),
    cover: z.string().optional(),
    thumb: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    slices: z.array(slice).default([]),
    credits: z
      .array(
        z.object({
          org: z.string(),
          lines: z.array(z.object({ role: z.string(), name: z.string() })),
        }),
      )
      .default([]),
    fonts: z.array(z.string()).default([]),
    imagesDownloadUrl: z.string().optional(),
    seo,
  }),
});

const disciplines = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/disciplines' }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(0),
    hero: z.string(),
    pitch: z.string(),
    keywords: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    heroImageSet: z.array(z.string()).default([]),
    featuredProjects: z.array(z.string()).default([]),
    testimonialFilterTag: z.enum(DISCIPLINES).optional(),
    seo,
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string(),
    industry: z.string().optional(),
    disciplineTags: z.array(z.enum(DISCIPLINES)).default([]),
    avatar: z.string().optional(),
    videoUrl: z.string().optional(),
    order: z.number().default(0),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    type: z.enum(['launch', 'news', 'talk', 'award']),
    project: z.string().optional(),
    media: z.string().optional(),
    seo,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seo,
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/settings' }),
  schema: z.object({
    wordmark: z.string(),
    email: z.string().optional(),
    location: z.string().optional(),
    availability: z.string().optional(),
    socials: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .default([]),
    clients: z.array(z.string()).default([]),
  }),
});

export const collections = {
  projects,
  disciplines,
  testimonials,
  journal,
  pages,
  settings,
};
