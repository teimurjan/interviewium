import type { CSSProperties, ReactNode } from "react";

/** Emoji in a soft tinted tile. Ported from the prototype's Tile. */
export function Tile({
  emoji,
  tint,
  size = 52,
  radius = 14,
  fontSize,
}: {
  emoji: string;
  tint?: string;
  size?: number;
  radius?: number;
  fontSize?: number;
}) {
  return (
    <span
      style={{
        display: "grid",
        placeItems: "center",
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: radius,
        background: tint || "var(--surface-2)",
        fontSize: fontSize || size * 0.5,
        lineHeight: 1,
      }}
    >
      {emoji}
    </span>
  );
}

/** A monospace signal-word chip. */
export function Trigger({ word }: { word: string }) {
  return (
    <span
      className="mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 11px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        background: "var(--accent-soft)",
        color: "var(--accent-ink)",
        border: "1px solid var(--accent-line)",
      }}
    >
      {word}
    </span>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-sm)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
