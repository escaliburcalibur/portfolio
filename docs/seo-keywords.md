# SEO — mapa de palabras clave por disciplina

Una página pilar por disciplina en `/servicios/<slug>`. Cada case study enlaza
hacia su(s) pilar(es) y lateralmente a 2–3 proyectos relacionados. Cada pilar
enlaza a sus mejores case studies y a `/proyectos?filtro=<slug>`.

| Cluster (pilar)             | URL pilar                   | Head terms                                                                | Long-tail / soporte                                                                             |
| --------------------------- | --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Branding / identidad visual | `/servicios/branding`       | estudio de branding · diseño de identidad visual · branding para empresas | cuánto cuesta una identidad de marca · rebranding startup · manual de marca · naming y logotipo |
| Estrategia de marca         | `/servicios/brand-strategy` | estrategia de marca · consultoría de marca · posicionamiento de marca     | arquitectura de marca · propuesta de valor · brand messaging · workshop de marca                |
| Motion design               | `/servicios/motion`         | motion design · estudio de animación · motion graphics                    | animación para lanzamiento de producto · brand in motion · animación de logo · explainer        |
| 3D / CGI                    | `/servicios/3d`             | diseño 3D · CGI para marcas · 3d design studio                            | render de producto 3D · 3D para redes sociales · dirección de arte 3D                           |
| Diseño web                  | `/servicios/web-design`     | diseño web · estudio de diseño web · diseño de páginas web premium        | diseño web para portfolios · landing page de producto · diseño web editorial                    |
| UI/UX                       | `/servicios/ui-ux`          | diseño UI UX · diseño de producto digital · diseño de interfaces          | auditoría UX · design system · prototipo Figma · diseño de app                                  |
| Desarrollo creativo         | `/servicios/creative-dev`   | creative developer · desarrollo web creativo · WebGL agency               | web con GSAP · experiencia interactiva · web con three.js · front-end de portfolio              |

## Modificadores de intención

Combinar en `<title>`, `<h2>` y copy: _estudio · agencia · freelance · para
startups · para {industria} · Madrid · España · remoto · portfolio · servicios ·
precios · contratar · opiniones_.

## SEO estructural

- Pre-render de toda página; una URL rastreable por proyecto, disciplina y post.
- `<title>` único con el head term; meta description 150–160 car.; `canonical`
  respetando `base`; OG + Twitter card; `lang="es"`.
- JSON-LD: `ProfessionalService` + `WebSite` (site-wide), `Person` (`/sobre-mi`),
  `BreadcrumbList` + `CreativeWork` (case study), `FAQPage` (`/servicios/*`).
- `@astrojs/sitemap` (excluye `/404`) · `robots.txt` con URL del sitemap · RSS en
  `/rss.xml`.
- Enlazado interno: case study → pilar(es) + relacionados; pilar → case studies +
  `/proyectos?filtro=`; footer → `/proyectos`, `/sobre-mi`, `/diario`.
- Imágenes (cuando haya reales): `astro:assets` responsive AVIF/WebP,
  `width`/`height` explícitos, `alt` con keyword de disciplina, `loading="lazy"`
  salvo el hero.

## Pendiente (cuando haya contenido real)

- Volumen/dificultad real por término y término primario elegido por página.
- Preguntas de FAQ por pilar para el `FAQPage` JSON-LD.
- Alta en Google Search Console + Bing Webmaster; Rich Results Test por tipo.
