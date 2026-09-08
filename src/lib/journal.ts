/**
 * Placeholder "studio updates" feed. Replaced by the Tina `journal`
 * collection in Phase 2. Newest first.
 */
export interface JournalEntry {
  slug: string;
  /** ISO date. */
  date: string;
  title: string;
  excerpt: string;
  type: 'launch' | 'news' | 'talk' | 'award';
  /** Optional related project slug. */
  project?: string;
}

export const journal: JournalEntry[] = [
  {
    slug: 'update-01',
    date: '2026-09-01',
    title: 'New work, soon',
    excerpt:
      'Placeholder entry. The feed mixes project launches and studio news, most recent first — like the reference architecture.',
    type: 'news',
  },
  {
    slug: 'update-02',
    date: '2026-07-14',
    title: 'Project Two is live',
    excerpt:
      'Placeholder entry for a project launch. Cards can carry an image, and sometimes a small map with a location pin.',
    type: 'launch',
    project: 'project-02',
  },
  {
    slug: 'update-03',
    date: '2026-05-30',
    title: 'A talk on brand systems',
    excerpt:
      'Placeholder entry for a talk or event. Copy stays short; the display size never goes hero-scale.',
    type: 'talk',
  },
  {
    slug: 'update-04',
    date: '2026-03-08',
    title: 'Recognition for Project Four',
    excerpt:
      'Placeholder entry for an award or feature. Real content and imagery arrive in a later phase.',
    type: 'award',
    project: 'project-04',
  },
];
