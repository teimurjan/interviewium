import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Sliding window — a fixed-size window glides across the array, one step at a
 * time, with the running window sum updating as it moves.
 */
const VALUES = [2, 1, 5, 1, 3, 2, 1];
const K = 3;
const CELL = 44;
const GAP = 8;
const STRIDE = CELL + GAP;
const STARTS = VALUES.length - K + 1;

export default function SlidingWindow() {
  const pb = usePlayback(STARTS, 2200);
  const start = pb.step;
  const sum = VALUES.slice(start, start + K).reduce((a, b) => a + b, 0);
  const rowWidth = VALUES.length * CELL + (VALUES.length - 1) * GAP;

  return (
    <div style={root}>
      <div style={{ position: "relative", width: rowWidth, height: CELL, margin: "0 auto" }}>
        {VALUES.map((v, i) => {
          const inWindow = i >= start && i < start + K;
          return (
            <div
              key={i}
              style={{
                ...cell,
                left: i * STRIDE,
                background: inWindow ? "var(--accent-soft)" : "var(--surface-2)",
                color: inWindow ? "var(--accent-ink)" : "var(--ink-2)",
                transition: "background .3s, color .3s",
              }}
            >
              {v}
            </div>
          );
        })}
        <motion.div
          aria-hidden
          animate={{ x: start * STRIDE }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          style={{
            position: "absolute",
            top: -5,
            left: 0,
            width: K * CELL + (K - 1) * GAP,
            height: CELL + 10,
            borderRadius: 13,
            border: "2px solid var(--accent)",
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="viz-label">
        window <span className="mono">[{start}, {start + K - 1}]</span> sum = <span className="viz-num">{sum}</span>
      </div>
      <PlaybackBar {...pb} />
    </div>
  );
}

const root: CSSProperties = {
  minHeight: 184,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 24,
};

const cell: CSSProperties = {
  position: "absolute",
  top: 0,
  width: CELL,
  height: CELL,
  display: "grid",
  placeItems: "center",
  borderRadius: 11,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 15,
  fontWeight: 600,
};
