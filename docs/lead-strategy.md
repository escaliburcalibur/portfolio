# Lead capture & adaptive content

Status: skeleton (implemented in Phase 5).

## Segmentation inputs

- `utm_source` / `utm_medium` / `utm_campaign` / `utm_term` / `utm_content`
- `document.referrer` (Dribbble, Behance, Instagram, LinkedIn, Google, Awwwards)
- Entry path (landing on `/services/motion` → profile = motion)
- Search landing pages (from Search Console)
- Explicit selector ("What brings you here?" → one of the 7 disciplines)
- Geo (edge), returning-visitor cookie

## Profile

`src/lib/segment.ts` resolves the above to one profile:
`branding | brand-strategy | motion | 3d | web-design | ui-ux | creative-dev | generalist`.
Stored in a first-party cookie and read at SSR/edge so the served HTML is already
personalised (indexable, no flash).

## Adaptive surfaces

| Surface               | Adaptation                                         |
| --------------------- | -------------------------------------------------- |
| HeroSwap (home)       | image set + order biased to the profile discipline |
| ProjectRail (sidebar) | reordered — matching discipline first              |
| Updates feed          | matching-discipline launches/news first            |
| `/all`                | filter preselected to the discipline               |
| Testimonials          | filtered to matching `disciplineTags`              |
| CTA / microcopy       | discipline-specific wording                        |

## Honesty guardrail

Only ever show real, owned projects. "Specialising" = leading with the most
relevant proof and ordering the shelf — never fabricating scope. Service pages
focus the message without denying the studio is multidisciplinary.

## Capture flow

LeadForm (progressive) → `POST /api/lead` → validate + Turnstile → Supabase
`leads` (dedupe by email) → Resend (owner notification + segmented
autoresponder) → optional CRM push (Notion / Airtable / HubSpot).

## Measurement

PostHog funnels per segment, per-service conversion, A/B of featured order and
CTA copy via feature flags.
