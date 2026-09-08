# Portfolio / design studio

Personal site for an independent design studio — branding, brand strategy,
motion, 3D, web design, UI/UX and creative development.

**Live:** _not deployed yet_ · will be a Cloudflare Pages URL, then a custom domain.

## Structure

Two-panel shell modelled on the architecture of portorocha.com (persistent left
sidebar = project index + clock + theme toggle; right content pane; image-swap
hero; "studio updates" grid; project pages as vertical slice streams). All code,
copy and assets are original — the reference informs the architecture, not the
source.

## Stack

| Area      | Choice                                                 |
| --------- | ------------------------------------------------------ |
| Framework | Astro 5 (static output, selective SSR/edge later)      |
| Styling   | Tailwind CSS v4 (CSS-first `@theme` tokens)            |
| Motion    | GSAP + Lenis + p5.js (behind `prefers-reduced-motion`) |
| Content   | Tina CMS (git-backed) — Phase 2                        |
| Leads     | Supabase + Resend + Cloudflare Turnstile — Phase 5     |
| Media     | Cloudflare R2                                          |
| Analytics | PostHog + Cloudflare Web Analytics                     |
| Hosting   | Cloudflare Pages + GitHub Actions                      |

Runs on free tiers; the only paid item is the domain.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview
npm run lint       # eslint + stylelint
npm run format     # prettier --write
npm run check      # astro type check
```

Requires Node ≥ 22 (see `.nvmrc`).

## Roadmap

Full plan in `~/.claude/plans/`. Phases: **0 scaffold** (done) → 1 shell →
2 CMS + content model → 3 animation → 4 SEO layer → 5 lead engine → 6 QA & launch.

## Deploy

CI (`.github/workflows/ci.yml`) runs format/lint/type-check/build/Lighthouse on
every push. To enable auto-deploy: add repo secrets `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID`, set repo variable `DEPLOY_ENABLED=true`, and (once the
domain exists) `SITE_URL`.

## AI assistance disclosure

Architecture, scaffold and boilerplate were produced with AI assistance (Claude
Code). All decisions, content and review are the author's.

## License

Proprietary — all rights reserved. See [LICENSE](LICENSE).
