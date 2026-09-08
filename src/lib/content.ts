import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import {
  DISCIPLINES,
  DISCIPLINE_LABELS,
  type Discipline,
} from '../content.config';

export { DISCIPLINES, DISCIPLINE_LABELS };
export type { Discipline };

export type Project = CollectionEntry<'projects'>;
export type JournalPost = CollectionEntry<'journal'>;
export type DisciplineEntry = CollectionEntry<'disciplines'>;
export type Testimonial = CollectionEntry<'testimonials'>;

/** Projects ordered by explicit `order`, then newest year first. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort(
    (a, b) => a.data.order - b.data.order || b.data.year - a.data.year,
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured);
}

export async function getProjectsByDiscipline(
  discipline: Discipline,
): Promise<Project[]> {
  return (await getProjects()).filter((p) =>
    p.data.disciplines.includes(discipline),
  );
}

/** Up to `limit` other projects sharing a discipline with `project`. */
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
  const all = await getCollection('journal');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getDisciplines(): Promise<DisciplineEntry[]> {
  const all = await getCollection('disciplines');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getDisciplineEntry(
  id: string,
): Promise<DisciplineEntry | undefined> {
  return getEntry('disciplines', id);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const all = await getCollection('testimonials');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getTestimonialsByDiscipline(
  discipline: Discipline,
): Promise<Testimonial[]> {
  return (await getTestimonials()).filter((t) =>
    t.data.disciplineTags.includes(discipline),
  );
}

export async function getSettings() {
  const entry = await getEntry('settings', 'site');
  return entry?.data;
}

export function disciplineLabel(d: Discipline): string {
  return DISCIPLINE_LABELS[d];
}
