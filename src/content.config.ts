import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { DISCIPLINES } from '@lib/seo';

const discipline = z.enum(DISCIPLINES);

const seo = z
  .object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: z.string().optional(),
  })
  .optional();

/** Un bloque de imagen/vídeo a ancho completo dentro de un case study. */
const mediaSlice = z.object({
  type: z.literal('media'),
  src: z.string().optional(),
  alt: z.string().default(''),
  ratio: z.string().default('1496 / 998'),
  orientation: z.enum(['landscape', 'portrait']).default('landscape'),
  /** Empareja dos portrait lado a lado. */
  split: z.boolean().default(false),
  /** Ancla la media a un lado en pantallas anchas. */
  align: z.enum(['full', 'left', 'right']).default('full'),
  caption: z.string().optional(),
});

const gallerySlice = z.object({
  type: z.literal('gallery'),
  items: z
    .array(
      z.object({ src: z.string().optional(), alt: z.string().default('') }),
    )
    .default([]),
  ratio: z.string().default('3 / 2'),
});

const textSlice = z.object({
  type: z.literal('text'),
  heading: z.string().optional(),
  body: z.string(),
  variant: z.enum(['default', 'two-col', 'featured']).default('default'),
});

const statSlice = z.object({
  type: z.literal('stat'),
  value: z.string(),
  caption: z.string(),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    client: z.string(),
    roles: z.array(z.string()).default([]),
    disciplines: z.array(discipline).min(1),
    industries: z.array(z.string()).default([]),
    railDescription: z.string(),
    cover: z.string().optional(),
    thumb: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    slices: z
      .array(
        z.discriminatedUnion('type', [
          mediaSlice,
          gallerySlice,
          textSlice,
          statSlice,
        ]),
      )
      .default([]),
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
  loader: glob({ base: './src/content/disciplines', pattern: '**/*.json' }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(99),
    hero: z.string(),
    pitch: z.string(),
    keywords: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    featuredProjects: z.array(reference('projects')).default([]),
    seo,
  }),
});

const testimonials = defineCollection({
  loader: glob({ base: './src/content/testimonials', pattern: '**/*.json' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string(),
    industry: z.string().optional(),
    disciplineTags: z.array(discipline).default([]),
    avatar: z.string().optional(),
    order: z.number().default(99),
  }),
});

const journal = defineCollection({
  loader: glob({ base: './src/content/journal', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    type: z.enum(['launch', 'news', 'talk', 'award']),
    project: reference('projects').optional(),
    media: z.string().optional(),
    link: z.string().optional(),
    seo,
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seo,
  }),
});

const settings = defineCollection({
  loader: glob({ base: './src/content/settings', pattern: '**/*.json' }),
  schema: z.object({
    wordmark: z.string(),
    email: z.string(),
    location: z.string(),
    availability: z.string(),
    formspreeId: z.string().optional(),
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
