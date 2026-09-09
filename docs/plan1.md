# Plan 1 — Desarrollo del portafolio (workflow de IA en dos fases)

Registro de la **fase de planificación** antes de escribir código, según la
metodología web-atelier-udit ("nunca te saltes la fase de plan").

## Prompt / intención del usuario (verbatim, resumido)

> Quiero un portafolio web para enseñar todos mis trabajos, idéntico al del
> estudio Porto Rocha (portorocha.com): copiar layout, grid, padding, espaciado,
> tipografías, animaciones de scroll, gradientes, colores y tamaños. Primero leer
> las webs del curso web-atelier-udit para construir la web "como un
> profesional", y luego dejar la **plantilla** lista para meter contenido. Tener
> en cuenta el **SEO**. Que **todos los textos** tengan la animación de un CodePen
> concreto (efecto scramble: cambio de glifos, borde, anotación `△x = NNpx`, 5
> colores de destello). Conectar con el repositorio `portfolio` de mi GitHub.

## Decisiones (respuestas del usuario, 2026-09-09)

1. **Empezar de cero** — se conserva el repo `escaliburcalibur/portfolio` y su
   historial; se descarta el código del build anterior (Astro, Fase 3 de 6).
2. **Animación fiel a Porto Rocha** — tipografía pequeña como el sitio real; el
   scramble va en titulares, enlaces, labels de nav y wordmark; los párrafos
   largos reciben un "block-wipe" suave; todo se desactiva bajo
   `prefers-reduced-motion`.
3. **Idioma: español** (`lang="es"`, sin i18n/hreflang).
4. **Despliegue: GitHub Pages** (sin serverless → contacto vía Formspree; el
   "motor de leads" con SSR/edge del plan anterior queda fuera de alcance).

## Plan completo

El plan detallado (contexto, stack, sistema de diseño con tokens fieles a Porto
Rocha, arquitectura, modelo de contenido, animación en 3 tiers, SEO, despliegue,
5 milestones y verificación) está en:

`~/.claude/plans/quiero-hacer-un-portafolio-transient-leaf.md`

Resumen de milestones:

1. **Cimientos** — scaffold Astro 5 + Tailwind v4, tokens, layouts semánticos,
   404, workflows de CI y deploy, primer despliegue, README + LICENSE (MIT).
2. **Layout + secciones** — shell de dos paneles, sidebar completa, HeroSwap,
   feed, footer; content collections + contenido de relleno; todas las rutas.
3. **Animación** — `src/lib/motion/` completo: split compartido, scramble del
   CodePen, block-wipe, parallax + reveals con ScrollTrigger, crossfade de página.
4. **Identidad visual + SEO** — `<head>` completo + JSON-LD, sitemap/robots/RSS,
   títulos y descripciones mapeados a keywords en español, enlazado interno,
   imágenes responsive, favicons/OG, gradientes `@property`.
5. **QA + lanzamiento** — a11y, cross-browser, Core Web Vitals, anchos
   320–1920, Lighthouse, validación W3C, tag `v1.0.0` + GitHub Release.

## Notas de implementación

- **M1 (hecho):** scaffold, tokens `theme.css`, `Base`/`Meta`/`Shell`, sidebar
  mínima, `index` + `404`, workflows, favicon/robots/manifest, README, LICENSE,
  este documento.
