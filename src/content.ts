/**
 * Content layer — the folder tree under /content drives the whole site.
 *
 *   content/<route>/<category>/<pattern>.md   →  route → category → pattern
 *   content/<route>/_meta.yml                  →  optional route label / order
 *   content/<route>/<category>/_meta.yml       →  optional category label / blurb / tint / order
 *
 * Drop a new .md file in and it appears; drop a new top-level folder in and a
 * new header route appears. No registration anywhere.
 */
import yaml from "js-yaml";

/** Browser-safe frontmatter split (gray-matter pulls in Node's Buffer). */
function parseFrontmatter(raw: string): { data: Meta; content: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, content: raw };
  return { data: (yaml.load(match[1]) as Meta) ?? {}, content: match[2] };
}

export interface Pattern {
  slug: string;
  title: string;
  emoji: string;
  scene: string; // the "Picture this" mnemonic
  summary: string; // short card subtitle
  triggers: string[];
  order: number;
  viz?: string; // optional visualization key → src/visualizations/<viz>.tsx
  body: string; // markdown body
  routeSlug: string;
  categorySlug: string;
}

export interface Category {
  slug: string;
  label: string;
  blurb: string;
  tint: string; // css var, e.g. var(--c-scan)
  ink: string; // css var, e.g. var(--c-scan-ink)
  order: number;
  patterns: Pattern[];
}

export interface Route {
  slug: string;
  label: string;
  tagline: string; // hero headline
  intro: string; // hero supporting line
  order: number;
  categories: Category[];
}

const TINTS = [
  { key: "scan", tint: "var(--c-scan)", ink: "var(--c-scan-ink)" },
  { key: "order", tint: "var(--c-order)", ink: "var(--c-order-ink)" },
  { key: "trees", tint: "var(--c-trees)", ink: "var(--c-trees-ink)" },
  { key: "graphs", tint: "var(--c-graphs)", ink: "var(--c-graphs-ink)" },
  { key: "dp", tint: "var(--c-dp)", ink: "var(--c-dp-ink)" },
];

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const asStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : v == null ? [] : [String(v)];

type Meta = Record<string, unknown>;

// Eager glob — resolved at build time, refreshed by HMR in dev.
const mdFiles = import.meta.glob("/content/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const metaFiles = import.meta.glob("/content/**/_meta.{yml,yaml}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function buildTree(): Route[] {
  const routeMeta = new Map<string, Meta>();
  const catMeta = new Map<string, Meta>(); // key: `${route}/${category}`

  for (const [path, raw] of Object.entries(metaFiles)) {
    const parts = path.replace("/content/", "").replace(/\/_meta\.ya?ml$/, "").split("/");
    const data = (yaml.load(raw) as Meta) ?? {};
    if (parts.length === 1) routeMeta.set(parts[0], data);
    else if (parts.length === 2) catMeta.set(parts.join("/"), data);
  }

  const routes = new Map<string, Route>();
  const catIndex = new Map<string, number>(); // per-route running category index for tint fallback

  for (const [path, raw] of Object.entries(mdFiles)) {
    const parts = path.replace("/content/", "").split("/");
    if (parts.length !== 3) continue; // only route/category/pattern.md
    const [routeSlug, categorySlug, file] = parts;
    const patternSlug = file.replace(/\.md$/, "");

    const route = ensureRoute(routes, routeSlug, routeMeta.get(routeSlug));
    const category = ensureCategory(route, categorySlug, catMeta.get(`${routeSlug}/${categorySlug}`), catIndex);

    const { data, content } = parseFrontmatter(raw);
    category.patterns.push({
      slug: patternSlug,
      title: String(data.title ?? titleCase(patternSlug)),
      emoji: String(data.emoji ?? "📄"),
      scene: String(data.scene ?? ""),
      summary: String(data.summary ?? ""),
      triggers: asStringArray(data.triggers),
      order: Number(data.order ?? Number.POSITIVE_INFINITY),
      viz: typeof data.viz === "string" ? data.viz : undefined,
      body: content.trim(),
      routeSlug,
      categorySlug,
    });
  }

  const sortByOrderThenLabel = <T extends { order: number; label?: string; title?: string }>(a: T, b: T) =>
    a.order - b.order || (a.label ?? a.title ?? "").localeCompare(b.label ?? b.title ?? "");

  const list = [...routes.values()];
  for (const route of list) {
    route.categories.sort(sortByOrderThenLabel);
    for (const cat of route.categories) cat.patterns.sort(sortByOrderThenLabel);
  }
  list.sort(sortByOrderThenLabel);
  return list;
}

function ensureRoute(routes: Map<string, Route>, slug: string, meta?: Meta): Route {
  let route = routes.get(slug);
  if (!route) {
    const label = String(meta?.label ?? titleCase(slug));
    route = {
      slug,
      label,
      tagline: String(meta?.tagline ?? "See the pattern before you solve it."),
      intro: String(
        meta?.intro ??
          "Each pattern is anchored to a vivid mnemonic. Study the scene, learn the signals, and recall the shape on command."
      ),
      order: Number(meta?.order ?? Number.POSITIVE_INFINITY),
      categories: [],
    };
    routes.set(slug, route);
  }
  return route;
}

function ensureCategory(route: Route, slug: string, meta: Meta | undefined, catIndex: Map<string, number>): Category {
  let category = route.categories.find((c) => c.slug === slug);
  if (!category) {
    const idxKey = route.slug;
    const idx = catIndex.get(idxKey) ?? 0;
    catIndex.set(idxKey, idx + 1);
    const tintByName = TINTS.find((t) => t.key === meta?.tint);
    const tint = tintByName ?? TINTS[idx % TINTS.length];
    category = {
      slug,
      label: String(meta?.label ?? titleCase(slug)),
      blurb: String(meta?.blurb ?? ""),
      tint: tint.tint,
      ink: tint.ink,
      order: Number(meta?.order ?? idx),
      patterns: [],
    };
    route.categories.push(category);
  }
  return category;
}

export const routes: Route[] = buildTree();

export const findRoute = (slug: string): Route | undefined => routes.find((r) => r.slug === slug);

export function findCategory(routeSlug: string, categorySlug: string): Category | undefined {
  return findRoute(routeSlug)?.categories.find((c) => c.slug === categorySlug);
}

export function findPattern(routeSlug: string, categorySlug: string, patternSlug: string): Pattern | undefined {
  return findCategory(routeSlug, categorySlug)?.patterns.find((p) => p.slug === patternSlug);
}
