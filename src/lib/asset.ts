/**
 * Prefixes a public/ asset path with Vite's resolved base ('/' in dev,
 * '/engagement/' in the GitHub Pages build). A plain `src="/sky.png"`
 * string in JSX is never touched by Vite's base rewriting — that only
 * applies to statically analyzable imports and tags inside index.html —
 * so on a non-root deploy the browser requests the wrong origin-root path
 * and 404s. Every public/ reference in a component must go through this.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${encodeURI(path.replace(/^\//, ''))}`
}
