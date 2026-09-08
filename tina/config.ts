import { defineConfig } from 'tinacms';

/**
 * Tina edits the same files Astro reads (src/content/**). Keep this schema
 * aligned with src/content.config.ts. Cloud wiring (clientId / token / branch)
 * is added with the deploy step; `npm run cms` runs the admin locally.
 */

const branch =
  process.env.TINA_BRANCH ??
  process.env.GITHUB_BRANCH ??
  process.env.HEAD ??
  'main';

const DISCIPLINE_OPTIONS = [
  { value: 'branding', label: 'Branding' },
  { value: 'brand-strategy', label: 'Brand strategy' },
  { value: 'motion', label: 'Motion' },
  { value: '3d', label: '3D' },
  { value: 'web-design', label: 'Web design' },
  { value: 'ui-ux', label: 'UI/UX' },
  { value: 'creative-dev', label: 'Creative dev' },
];

const seoField = {
  type: 'object' as const,
  name: 'seo',
  label: 'SEO overrides',
  fields: [
    { type: 'string' as const, name: 'metaTitle', label: 'Meta title' },
    {
      type: 'string' as const,
      name: 'metaDescription',
      label: 'Meta description',
    },
    { type: 'image' as const, name: 'ogImage', label: 'OG image' },
  ],
};

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: {
    tina: { mediaRoot: 'uploads', publicFolder: 'public' },
  },
  schema: {
    collections: [
      {
        name: 'projects',
        label: 'Projects',
        path: 'src/content/projects',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          { type: 'number', name: 'year', label: 'Year', required: true },
          { type: 'string', name: 'client', label: 'Client', required: true },
          { type: 'string', name: 'roles', label: 'Roles', list: true },
          {
            type: 'string',
            name: 'disciplines',
            label: 'Disciplines',
            list: true,
            required: true,
            options: DISCIPLINE_OPTIONS,
          },
          {
            type: 'string',
            name: 'industries',
            label: 'Industries',
            list: true,
          },
          {
            type: 'string',
            name: 'railDescription',
            label: 'Rail description (one line)',
            required: true,
          },
          { type: 'image', name: 'cover', label: 'Cover' },
          { type: 'image', name: 'thumb', label: 'Thumbnail' },
          { type: 'boolean', name: 'featured', label: 'Featured' },
          { type: 'number', name: 'order', label: 'Order' },
          {
            type: 'object',
            name: 'slices',
            label: 'Slices',
            list: true,
            templates: [
              {
                name: 'media',
                label: 'Media',
                fields: [
                  { type: 'image', name: 'src', label: 'Image / video' },
                  { type: 'string', name: 'ratio', label: 'Aspect ratio' },
                  {
                    type: 'string',
                    name: 'orientation',
                    label: 'Orientation',
                    options: ['landscape', 'portrait'],
                  },
                  { type: 'boolean', name: 'split', label: 'Split pair' },
                  { type: 'string', name: 'caption', label: 'Caption' },
                ],
              },
              {
                name: 'gallery',
                label: 'Gallery',
                fields: [
                  { type: 'image', name: 'items', label: 'Images', list: true },
                  { type: 'number', name: 'count', label: 'Placeholder count' },
                  { type: 'string', name: 'ratio', label: 'Aspect ratio' },
                ],
              },
              {
                name: 'text',
                label: 'Text',
                fields: [
                  { type: 'string', name: 'heading', label: 'Heading' },
                  {
                    type: 'string',
                    name: 'body',
                    label: 'Body',
                    ui: { component: 'textarea' },
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'variant',
                    label: 'Variant',
                    options: ['default', 'two-col', 'featured'],
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'credits',
            label: 'Credits',
            list: true,
            fields: [
              { type: 'string', name: 'org', label: 'Organisation' },
              {
                type: 'object',
                name: 'lines',
                label: 'Lines',
                list: true,
                fields: [
                  { type: 'string', name: 'role', label: 'Role' },
                  { type: 'string', name: 'name', label: 'Name' },
                ],
              },
            ],
          },
          { type: 'string', name: 'fonts', label: 'Fonts', list: true },
          {
            type: 'string',
            name: 'imagesDownloadUrl',
            label: 'Download images URL',
          },
          seoField,
          {
            type: 'rich-text',
            name: 'body',
            label: 'Project information',
            isBody: true,
          },
        ],
      },
      {
        name: 'disciplines',
        label: 'Disciplines / services',
        path: 'src/content/disciplines',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Name',
            isTitle: true,
            required: true,
          },
          { type: 'number', name: 'order', label: 'Order' },
          { type: 'string', name: 'hero', label: 'Hero line', required: true },
          {
            type: 'string',
            name: 'pitch',
            label: 'Pitch',
            ui: { component: 'textarea' },
            required: true,
          },
          { type: 'string', name: 'keywords', label: 'Keywords', list: true },
          {
            type: 'object',
            name: 'faq',
            label: 'FAQ',
            list: true,
            fields: [
              { type: 'string', name: 'q', label: 'Question' },
              {
                type: 'string',
                name: 'a',
                label: 'Answer',
                ui: { component: 'textarea' },
              },
            ],
          },
          {
            type: 'image',
            name: 'heroImageSet',
            label: 'Hero image set',
            list: true,
          },
          {
            type: 'string',
            name: 'featuredProjects',
            label: 'Featured project slugs',
            list: true,
          },
          {
            type: 'string',
            name: 'testimonialFilterTag',
            label: 'Testimonial tag',
            options: DISCIPLINE_OPTIONS,
          },
          seoField,
        ],
      },
      {
        name: 'testimonials',
        label: 'Testimonials',
        path: 'src/content/testimonials',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'quote',
            label: 'Quote',
            isTitle: true,
            required: true,
            ui: { component: 'textarea' },
          },
          { type: 'string', name: 'author', label: 'Author', required: true },
          { type: 'string', name: 'role', label: 'Role', required: true },
          { type: 'string', name: 'company', label: 'Company', required: true },
          { type: 'string', name: 'industry', label: 'Industry' },
          {
            type: 'string',
            name: 'disciplineTags',
            label: 'Discipline tags',
            list: true,
            options: DISCIPLINE_OPTIONS,
          },
          { type: 'image', name: 'avatar', label: 'Avatar' },
          { type: 'string', name: 'videoUrl', label: 'Video URL' },
          { type: 'number', name: 'order', label: 'Order' },
        ],
      },
      {
        name: 'journal',
        label: 'Journal / studio updates',
        path: 'src/content/journal',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          { type: 'datetime', name: 'date', label: 'Date', required: true },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Excerpt',
            ui: { component: 'textarea' },
            required: true,
          },
          {
            type: 'string',
            name: 'type',
            label: 'Type',
            required: true,
            options: ['launch', 'news', 'talk', 'award'],
          },
          { type: 'string', name: 'project', label: 'Related project slug' },
          { type: 'image', name: 'media', label: 'Media' },
          seoField,
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'pages',
        label: 'Pages',
        path: 'src/content/pages',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: { component: 'textarea' },
            required: true,
          },
          seoField,
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'settings',
        label: 'Site settings',
        path: 'src/content/settings',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'string',
            name: 'wordmark',
            label: 'Wordmark',
            required: true,
          },
          { type: 'string', name: 'email', label: 'Email' },
          { type: 'string', name: 'location', label: 'Location' },
          { type: 'string', name: 'availability', label: 'Availability' },
          {
            type: 'object',
            name: 'socials',
            label: 'Socials',
            list: true,
            fields: [
              { type: 'string', name: 'label', label: 'Label' },
              { type: 'string', name: 'href', label: 'URL' },
            ],
          },
          { type: 'string', name: 'clients', label: 'Clients', list: true },
        ],
      },
    ],
  },
});
