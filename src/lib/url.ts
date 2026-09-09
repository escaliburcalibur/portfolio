/**
 * Prefija una ruta interna con el `base` de Astro (p. ej. `/portfolio`).
 * `<ClientRouter>` resuelve rutas de navegación, pero NO los `href` que
 * escribimos como strings — para esos, siempre `withBase()`.
 *
 *   withBase('/proyectos')  → '/portfolio/proyectos'
 *   withBase('/')           → '/portfolio'
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // sin barra final

export function withBase(path: string): string {
  if (
    /^(https?:)?\/\//.test(path) ||
    path.startsWith('mailto:') ||
    path.startsWith('#')
  ) {
    return path;
  }
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}` || '/';
}
