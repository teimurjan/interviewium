import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Generating every subset of {1,2,3} via depth-first backtracking. We walk the
 * source set left to right; at each element we decide include/exclude, descending
 * a decision tree. Reaching the end emits the chosen subset to results, then we
 * backtrack — undoing the last include to explore the other branch. Every
 * decision/emit/backtrack is one precomputed, deterministic step.
 */
const ELEMENTS = [1, 2, 3] as const;

type Frame = {
  kind: "include" | "exclude" | "leaf" | "backtrack";
  partial: number[];
  results: number[][];
  element: number | null;
};

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const partial: number[] = [];
  const results: number[][] = [];

  const walk = (i: number) => {
    if (i === ELEMENTS.length) {
      results.push([...partial]);
      frames.push({ kind: "leaf", partial: [...partial], results: results.map((r) => [...r]), element: null });
      return;
    }
    const el = ELEMENTS[i];

    // Decision: exclude el.
    frames.push({ kind: "exclude", partial: [...partial], results: results.map((r) => [...r]), element: el });
    walk(i + 1);

    // Decision: include el.
    partial.push(el);
    frames.push({ kind: "include", partial: [...partial], results: results.map((r) => [...r]), element: el });
    walk(i + 1);

    // Backtrack: undo include.
    partial.pop();
    frames.push({ kind: "backtrack", partial: [...partial], results: results.map((r) => [...r]), element: el });
  };

  walk(0);
  return frames;
})();

const fmt = (s: number[]) => `{${s.join(",")}}`;

export default function Backtracking() {
  const pb = usePlayback(FRAMES.length, 2200);
  const { kind, partial, results, element } = FRAMES[pb.step];
  const retracting = kind === "backtrack";

  return (
    <div style={root}>
      <div style={caption}>
        every subset of <span className="mono" style={{ color: "var(--ink-2)" }}>{fmt([...ELEMENTS])}</span>
      </div>

      <div style={sourceRow}>
        {ELEMENTS.map((n) => {
          const included = partial.includes(n);
          const deciding = element === n;
          return (
            <motion.span
              key={n}
              animate={{
                background: included ? "var(--accent-soft)" : "var(--surface-2)",
                borderColor: deciding ? "var(--accent)" : included ? "var(--accent-line)" : "var(--line)",
                color: included ? "var(--ink)" : "var(--ink-3)",
                scale: deciding ? 1.12 : 1,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={sourceChip}
            >
              {n}
            </motion.span>
          );
        })}
      </div>

      <div style={builderRow}>
        <span className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>
          current subset
        </span>
        <motion.div
          animate={{
            borderColor: retracting ? "var(--line)" : "var(--accent-line)",
            opacity: retracting ? 0.55 : 1,
          }}
          transition={{ duration: 0.25 }}
          style={builderBox}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {partial.length === 0 ? (
              <motion.span
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-3)" }}
              >
                {fmt([])} <span style={{ fontSize: 11 }}>empty</span>
              </motion.span>
            ) : (
              partial.map((n) => (
                <motion.span
                  key={n}
                  layout
                  initial={{ scale: 0.5, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.5, opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 340, damping: 24 }}
                  style={chip}
                >
                  {n}
                </motion.span>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div style={resultsRow}>
        <span className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>
          results
        </span>
        <div style={resultsWrap}>
          <AnimatePresence initial={false}>
            {results.map((r, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                style={resultChip}
              >
                {fmt(r)}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="viz-label">
        {kind === "include" && (
          <>
            include <span className="viz-num">{element}</span> →{" "}
            <span className="mono">{fmt(partial)}</span>
          </>
        )}
        {kind === "exclude" && (
          <>
            skip <span className="viz-num">{element}</span> →{" "}
            <span className="mono">{fmt(partial)}</span>
          </>
        )}
        {kind === "leaf" && (
          <>
            decided all → emit <span className="mono">{fmt(partial)}</span>
          </>
        )}
        {kind === "backtrack" && (
          <>
            backtrack — undo <span className="viz-num">{element}</span>
          </>
        )}
      </div>
      <PlaybackBar {...pb} />
    </div>
  );
}

const root: CSSProperties = {
  minHeight: 210,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
};

const caption: CSSProperties = {
  fontSize: 13,
  color: "var(--ink-3)",
};

const sourceRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  justifyContent: "center",
};

const sourceChip: CSSProperties = {
  minWidth: 30,
  height: 30,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 14,
  fontWeight: 600,
};

const builderRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  justifyContent: "center",
};

const builderBox: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  minWidth: 120,
  minHeight: 40,
  padding: "0 12px",
  borderRadius: 10,
  border: "1px solid var(--accent-line)",
  background: "var(--surface-2)",
  justifyContent: "center",
};

const resultsRow: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  justifyContent: "center",
  width: "100%",
};

const resultsWrap: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  maxWidth: 320,
  justifyContent: "center",
};

const chip: CSSProperties = {
  minWidth: 28,
  height: 28,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  border: "1px solid var(--accent-line)",
  background: "var(--accent-soft)",
  fontFamily: "var(--mono)",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--ink)",
};

const resultChip: CSSProperties = {
  height: 26,
  display: "grid",
  placeItems: "center",
  padding: "0 8px",
  borderRadius: 8,
  border: "1px solid var(--correct)",
  background: "var(--correct-soft)",
  fontFamily: "var(--mono)",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--ink)",
};
