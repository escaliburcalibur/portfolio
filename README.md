# Portafolio — David Bayón

**En vivo:** _pendiente de primer despliegue_ → será `https://escaliburcalibur.github.io/portfolio`

Plantilla de portafolio para estudio de diseño. Estructura y lenguaje visual
fieles a [portorocha.com](https://www.portorocha.com) (shell de dos paneles,
barra lateral = índice de proyectos, hero de imágenes con crossfade, case
studies como stream vertical de slices, transiciones de página tipo crossfade),
con **código, textos, tipografías e imágenes 100 % originales**.

Pensada para rellenar de contenido: los proyectos, disciplinas, testimonios y
novedades viven como Markdown/JSON en `src/content/`.

## Stack

| Área      | Elección                                                          |
| --------- | ----------------------------------------------------------------- |
| Framework | Astro 5 (salida estática)                                         |
| Estilos   | Tailwind CSS v4 (tokens `@theme` en CSS)                          |
| Animación | GSAP 3.13+ (ScrollTrigger, SplitText) + View Transitions de Astro |
| Contenido | Astro Content Collections (Markdown / JSON)                       |
| Contacto  | Formspree (sin backend)                                           |
| Hosting   | GitHub Pages vía GitHub Actions                                   |

Requiere Node ≥ 22 (ver `.nvmrc`).

## Desarrollo

```bash
nvm use            # Node 22
npm install
npm run dev        # http://localhost:4321/portfolio
npm run build      # → dist/
npm run preview
npm run check      # astro check (TypeScript)
npm run lint       # eslint + stylelint
npm run format     # prettier --write
```

## Personalización

| Qué                                                             | Dónde                                                 |
| --------------------------------------------------------------- | ----------------------------------------------------- |
| Proyectos / disciplinas / testimonios / diario                  | `src/content/**` (Markdown + JSON)                    |
| Identidad, email, redes, clientes                               | `src/content/settings/site.json`                      |
| Tokens de diseño (color, espaciado, tipografía, radios, motion) | `src/styles/theme.css`                                |
| Lista de disciplinas                                            | `src/lib/seo.ts` (`DISCIPLINES`, `DISCIPLINE_LABELS`) |
| Efecto de animación de texto                                    | `src/lib/motion/`                                     |
| Dominio / base de URL                                           | `astro.config.mjs` (`SITE_URL`, `SITE_BASE`)          |

### Dominio propio

Al comprar un dominio: pon `SITE_URL=https://tu-dominio` y `SITE_BASE=/` como
variables del repositorio, añade `public/CNAME` con el dominio, y listo.

## Despliegue

`.github/workflows/deploy.yml` construye y publica a GitHub Pages, pero está en
**modo manual** (`workflow_dispatch`): no publica nada en los push. Para publicar:

1. Una vez: **Settings → Pages → Source → GitHub Actions**.
2. Cada vez: **Actions → "Deploy to GitHub Pages" → Run workflow**.

Para pasar a despliegue continuo, cambia el `on:` del workflow a
`push: { branches: [main] }`.

## Créditos

- **Porto Rocha** — referencia de arquitectura e interacción (no de código ni contenido).
- **Andrea Catanzaro** — efecto de scramble de texto, adaptado del CodePen `bNgyqbp`.
- **web-atelier-udit** (Rubén Vega Balbás, UDIT) — checklist de buenas prácticas.

## Asistencia de IA

La arquitectura, el scaffold y el boilerplate se produjeron con asistencia de IA
(Claude Code). Las decisiones, el contenido y la revisión son del autor.
El plan de desarrollo está en `docs/plan1.md`.

## Licencia

Código bajo [MIT](LICENSE). El contenido escrito, las imágenes y el nombre/
wordmark "David Bayón" son © David Bayón Mateo y no entran en la licencia MIT.
