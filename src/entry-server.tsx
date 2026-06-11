import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";
import { findRoute, findPattern, routes } from "./content";

export async function render(url: string) {
  const pathname = url.split("?")[0];

  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  // 404 for unknown routes/patterns (the SPA still renders a not-found view).
  const statusCode = is404(pathname) ? 404 : 200;
  return { html, statusCode };
}

function is404(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return false;
  const [routeSlug, , patternSlug] = parts;
  if (!findRoute(routeSlug)) return true;
  if (parts.length === 1) return false;
  if (parts.length === 3) return !findPattern(routeSlug, parts[1], patternSlug);
  return true;
}

export function getStaticPaths(): string[] {
  const paths = ["/"];

  for (const route of routes) {
    paths.push(`/${route.slug}`);

    for (const category of route.categories) {
      for (const pattern of category.patterns) {
        paths.push(`/${route.slug}/${category.slug}/${pattern.slug}`);
      }
    }
  }

  return paths;
}
