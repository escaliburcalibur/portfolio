import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { DISCIPLINE_LABELS, type DISCIPLINES } from '@lib/seo';

export type Project = CollectionEntry<'projects'>;
export type Discipline = CollectionEntry<'disciplines'>;
export type Testimonial = CollectionEntry<'testimonials'>;
export type JournalPost = CollectionEntry<'journal'>;
type DisciplineId = (typeof DISCIPLINES)[number];

export function disciplineLabel(id: DisciplineId): string {
  return DISCIPLINE_LABELS[id];
}

export async function getProjects(): Promise<Project[]> {
  const items = await getCollection('projects');
  return items.sort(
    (a, b) => a.data.order - b.data.order || b.data.year - a.data.year,
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured);
}

export async function getProjectsByDiscipline(
  id: DisciplineId,
): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.disciplines.includes(id));
}

export async function getRelatedProjects(
  project: Project,
  limit = 3,
): Promise<Project[]> {
  const all = await getProjects();
  return all
    .filter(
      (p) =>
        p.id !== project.id &&
        p.data.disciplines.some((d) => project.data.disciplines.includes(d)),
    )
    .slice(0, limit);
}

export async function getJournal(): Promise<JournalPost[]> {
  const items = await getCollection('journal');
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getDisciplines(): Promise<Discipline[]> {
  const items = await getCollection('disciplines');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getDisciplineEntry(
  id: string,
): Promise<Discipline | undefined> {
  return getEntry('disciplines', id);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const items = await getCollection('testimonials');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getTestimonialsByDiscipline(
  id: DisciplineId,
): Promise<Testimonial[]> {
  return (await getTestimonials()).filter((t) =>
    t.data.disciplineTags.includes(id),
  );
}

export async function getSettings() {
  const entry = await getEntry('settings', 'site');
  if (!entry) throw new Error('Falta src/content/settings/site.json');
  return entry.data;
}
