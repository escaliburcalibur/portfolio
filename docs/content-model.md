# Content model

Status: skeleton (schema authored in Phase 2 as `tina/config.ts`). Kept
CMS-agnostic so a later move from Tina to Payload is a re-map, not a redesign.

## Collections

### Project

`title`, `slug`, `year`, `client`, `roles[]`, `disciplines[]` (→ Discipline),
`industries[]`, `cover`, `thumb`, `railDescription` (1 line), `slices[]`
(media | gallery | text), `projectInformation` (rich text), `credits[]`
(group: org + role/name lines), `fonts[]`, `imagesDownloadUrl`, `featured`,
`order`, SEO overrides (`metaTitle`, `metaDescription`, `ogImage`).

### Discipline (= service / niche)

`name`, `slug`, `hero`, `pitch`, `keywords[]`, `faq[]`, `heroImageSet[]`,
`featuredProjects[]`, `testimonialFilterTag`.

### Testimonial

`quote`, `author`, `role`, `company`, `industry`, `disciplineTags[]`, `avatar`,
`videoUrl`.

### JournalPost ("studio update")

`title`, `slug`, `date`, `excerpt`, `body`, `media` (image | map),
`linkedProject?`, `type` (launch | news | talk | award).

### Page

Standalone pages (`about`, `privacy`, `legal`) as block lists.

### SiteSettings

Wordmark, clock city, socials, email, accent colour, legal copy, SEO defaults,
search-console verification.

## Lead (Supabase, not the CMS)

`id`, `created_at`, `email`, `name`, `message`, `segment`, `entry_path`,
`referrer`, `utm_*`, `pages_viewed[]`, `geo_country`, `status`, `synced_to`.
