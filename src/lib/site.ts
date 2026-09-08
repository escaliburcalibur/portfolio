/**
 * Site-level identity / chrome config. Real socials + legal copy land here
 * (or in SiteSettings from the CMS) in Phase 2.
 */
export const site = {
  wordmark: 'David Bayón',
  /** Short label for the "about" card in the sidebar. */
  aboutLabel: 'About',
  aboutHref: '/about',
  /** Sidebar clock — deferred by the owner; keep off for now. */
  showClock: false,
  clockCity: 'Madrid',
  socials: [] as { label: string; href: string }[],
  email: '',
} as const;
