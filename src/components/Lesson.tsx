import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { copyText } from "../clipboard";
import type { Category, Pattern, Route } from "../content";
import { Trigger } from "./atoms";
import { Markdown } from "./Markdown";
import { PracticeCard } from "./PracticeCard";
import { Visualization } from "./Visualization";

export function Lesson({ route, category, pattern }: { route: Route; category: Category; pattern: Pattern }) {
  const navigate = useNavigate();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  // Flatten all patterns in the route for prev/next walking.
  const flat = route.categories.flatMap((c) => c.patterns);
  const index = flat.findIndex((p) => p.slug === pattern.slug && p.categorySlug === pattern.categorySlug);
  const go = (dir: number) => {
    const next = flat[(index + dir + flat.length) % flat.length];
    if (next) navigate(`/${route.slug}/${next.categorySlug}/${next.slug}`);
  };
  const copyPage = async () => {
    try {
      await copyText(toMarkdown(route, category, pattern));
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1400);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 1400);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Escape") navigate(`/${route.slug}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pattern.slug, pattern.categorySlug]);

  return (
    <div style={{ animation: "riseIn .3s ease both" }}>
      {/* sub navigation */}
      <div
        style={{
          position: "sticky",
          top: 61,
          zIndex: 20,
          background: "color-mix(in srgb, var(--paper) 88%, transparent)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--readw)",
            margin: "0 auto",
            padding: "11px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to={`/${route.slug}`} style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-2)" }}>
            ← All patterns
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={copyPage}
              style={{
                height: 34,
                padding: "0 12px",
                borderRadius: 999,
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: copyState === "copied" ? "var(--correct)" : copyState === "failed" ? "var(--wrong)" : "var(--ink-2)",
                boxShadow: "var(--shadow-sm)",
                fontSize: 13,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {copyState === "copied" ? "Copied" : copyState === "failed" ? "Failed" : "Copy page"}
            </button>
            <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginRight: 4, whiteSpace: "nowrap" }}>
              {index + 1} / {flat.length}
            </span>
            <NavBtn onClick={() => go(-1)} label="Previous (←)">
              ←
            </NavBtn>
            <NavBtn onClick={() => go(1)} label="Next (→)">
              →
            </NavBtn>
          </div>
        </div>
      </div>

      <article
        style={{
          maxWidth: "var(--readw)",
          margin: "0 auto",
          padding: "34px 28px 90px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* hero */}
        <header>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: category.ink,
                background: category.tint,
                padding: "4px 11px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
              {category.label}
            </span>
          </div>
          <h1 className="serif" style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.015em" }}>
            {pattern.title}
          </h1>

          {/* mnemonic scene — the memory device */}
          {pattern.scene && (
            <div
              style={{
                display: "flex",
                gap: 22,
                alignItems: "center",
                marginTop: 26,
                padding: "26px 28px",
                borderRadius: "var(--radius)",
                background: category.tint,
                border: "1px solid color-mix(in srgb, " + category.ink + " 16%, transparent)",
              }}
            >
              <span style={{ fontSize: 60, lineHeight: 1, flexShrink: 0 }}>{pattern.emoji}</span>
              <div>
                <div className="eyebrow" style={{ color: category.ink, opacity: 0.75, marginBottom: 7 }}>
                  Picture this
                </div>
                <p className="serif" style={{ fontSize: 22, lineHeight: 1.4, color: "var(--ink)", fontStyle: "italic" }}>
                  {pattern.scene}
                </p>
              </div>
            </div>
          )}
        </header>

        {/* signal words */}
        {pattern.triggers.length > 0 && (
          <section>
            <div className="eyebrow" style={{ marginBottom: 5 }}>
              When you see it
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 16 }}>Signal words</h3>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 16 }}>
              If the prompt uses any of these, this pattern should come to mind first.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
              {pattern.triggers.map((t) => (
                <Trigger key={t} word={t} />
              ))}
            </div>
          </section>
        )}

        {/* practice with an AI trainer */}
        <PracticeCard route={route} category={category} pattern={pattern} />

        {/* optional inline visualization */}
        {pattern.viz && <Visualization slug={pattern.viz} />}

        {/* lesson body */}
        <Markdown source={pattern.body} />
      </article>
    </div>
  );
}

function toMarkdown(route: Route, category: Category, pattern: Pattern): string {
  const parts = [
    `# ${pattern.title}`,
    `Track: ${route.label}`,
    `Category: ${category.label}`,
  ];

  if (pattern.summary) parts.push(`Summary: ${pattern.summary}`);
  if (pattern.scene) parts.push(`Picture this: ${pattern.scene}`);
  if (pattern.triggers.length) parts.push(`Signals: ${pattern.triggers.join(", ")}`);

  parts.push(pattern.body);
  return parts.join("\n\n");
}

function NavBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: 999,
        border: "1px solid var(--line)",
        background: "var(--surface)",
        color: "var(--ink)",
        boxShadow: "var(--shadow-sm)",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}
