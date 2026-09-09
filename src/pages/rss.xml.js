import rss from '@astrojs/rss';
import { getJournal } from '@lib/content';
import { SITE, canonical } from '@lib/seo';

export async function GET(context) {
  const entries = await getJournal();
  return rss({
    title: `${SITE.name} — Diario`,
    description:
      'Novedades del estudio: lanzamientos, charlas, premios y notas.',
    site: context.site ?? SITE.url,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.excerpt,
      pubDate: entry.data.date,
      link: canonical(`/diario/${entry.id}`),
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
