import { useState } from "react";
import { Link } from "react-router-dom";
import type { Category, Pattern, Route } from "../content";
import { Tile } from "./atoms";

export function Library({ route }: { route: Route }) {
  const total = route.categories.reduce((n, c) => n + c.patterns.length, 0);

  return (
    <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "34px 28px 90px", animation: "riseIn .45s ease both" }}>
      <header style={{ maxWidth: 760, display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
        <span className="eyebrow">{route.label}</span>
        <h1 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.01em", marginTop: 8 }}>
          {route.tagline}
        </h1>
        <p style={{ fontSize: 15.5, color: "var(--ink-2)", lineHeight: 1.55, marginTop: 9, maxWidth: 560 }}>
          {route.intro}
        </p>
        </div>
        <p className="mono" style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 0, whiteSpace: "nowrap" }}>
          {total} patterns · {route.categories.length} categories
        </p>
      </header>

      {route.categories.map((category) => (
        <CategorySection key={category.slug} routeSlug={route.slug} category={category} />
      ))}
    </div>
  );
}

function CategorySection({ routeSlug, category }: { routeSlug: string; category: Category }) {
  return (
    <section style={{ marginTop: 44 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 18 }}>
        <span style={{ width: 10, height: 10, borderRadius: 3, background: category.ink, flexShrink: 0 }} />
        <h2 style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{category.label}</h2>
        {category.blurb && (
          <span style={{ fontSize: 13.5, color: "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flexShrink: 1 }}>
            {category.blurb}
          </span>
        )}
        <span style={{ flex: 1, height: 1, background: "var(--line)", minWidth: 16 }} />
        <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)", flexShrink: 0 }}>
          {category.patterns.length} patterns
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))", gap: 14 }}>
        {category.patterns.map((p) => (
          <PatternCard key={p.slug} routeSlug={routeSlug} pattern={p} tint={category.tint} />
        ))}
      </div>
    </section>
  );
}

function PatternCard({ routeSlug, pattern, tint }: { routeSlug: string; pattern: Pattern; tint: string }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={`/${routeSlug}/${pattern.categorySlug}/${pattern.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: 18,
        borderRadius: "var(--radius)",
        border: "1px solid " + (hover ? "var(--accent-line)" : "var(--line)"),
        background: "var(--surface)",
        boxShadow: hover ? "var(--shadow)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "all .17s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
        <Tile emoji={pattern.emoji} tint={tint} size={46} radius={12} fontSize={23} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{pattern.title}</div>
          {pattern.summary && (
            <div className="serif" style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.35, marginTop: 3, fontStyle: "italic" }}>
              {pattern.summary}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
