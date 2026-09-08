/**
 * Placeholder project index — the sidebar rail, the hero-swap set and the
 * /all grid all read from here until Tina content lands in Phase 2.
 * Shape mirrors docs/content-model.md so the swap is a data move, not a rewrite.
 */
export type Discipline =
  | 'branding'
  | 'brand-strategy'
  | 'motion'
  | '3d'
  | 'web-design'
  | 'ui-ux'
  | 'creative-dev';

export interface ProjectSummary {
  slug: string;
  title: string;
  /** One line, shown under the title in the rail. */
  railDescription: string;
  year: number;
  client: string;
  disciplines: Discipline[];
  featured: boolean;
}

export const projects: ProjectSummary[] = [
  {
    slug: 'project-01',
    title: 'Project One',
    railDescription: 'Identity & art direction',
    year: 2026,
    client: 'Placeholder Co.',
    disciplines: ['branding'],
    featured: true,
  },
  {
    slug: 'project-02',
    title: 'Project Two',
    railDescription: 'Brand in motion',
    year: 2025,
    client: 'Placeholder Co.',
    disciplines: ['motion', 'branding'],
    featured: true,
  },
  {
    slug: 'project-03',
    title: 'Project Three',
    railDescription: 'Website & creative development',
    year: 2025,
    client: 'Placeholder Co.',
    disciplines: ['web-design', 'creative-dev'],
    featured: true,
  },
  {
    slug: 'project-04',
    title: 'Project Four',
    railDescription: '3D & CGI direction',
    year: 2024,
    client: 'Placeholder Co.',
    disciplines: ['3d'],
    featured: true,
  },
  {
    slug: 'project-05',
    title: 'Project Five',
    railDescription: 'Product design & design system',
    year: 2024,
    client: 'Placeholder Co.',
    disciplines: ['ui-ux'],
    featured: true,
  },
  {
    slug: 'project-06',
    title: 'Project Six',
    railDescription: 'Positioning & brand strategy',
    year: 2023,
    client: 'Placeholder Co.',
    disciplines: ['brand-strategy', 'branding'],
    featured: false,
  },
];
