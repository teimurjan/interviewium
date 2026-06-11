import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * 1D DP (climbing stairs / Fibonacci): each cell dp[i] fills left to right from
 * its two predecessors, dp[i] = dp[i-1] + dp[i-2].
 */
const DP = [1, 1, 2, 3, 5, 8, 13];
const FIRST = 2; // dp[0], dp[1] are seeded
const CELL = 46;
const GAP = 10;
const STRIDE = CELL + GAP;
const STEPS = DP.length - FIRST;

export default function Dp1d() {
  const pb = usePlayback(STEPS, 2100);
  const i = FIRST + pb.step;
  const rowWidth = DP.length * CELL + (DP.length - 1) * GAP;

  return (
    <div style={root}>
      <div style={{ position: "relative", width: rowWidth, height: CELL, margin: "0 auto" }}>
        {DP.map((v, idx) => {
          const isCurrent = idx === i;
          const isSource = idx === i - 1 || idx === i - 2;
          const shown = idx <= i;
          const bg = isCurrent ? "var(--accent-soft)" : isSource ? "var(--correct-soft)" : "var(--surface-2)";
          const border = isCurrent ? "var(--accent)" : isSource ? "var(--correct)" : "var(--line)";
          return (
            <motion.div
              key={idx}
              layout
              initial={false}
              animate={{ opacity: shown ? 1 : 0.2, scale: isCurrent ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              style={{
                ...cell,
                left: idx * STRIDE,
                background: bg,
                borderColor: border,
                color: shown ? "var(--ink)" : "var(--ink-3)",
              }}
            >
              {v}
            </motion.div>
          );
        })}
      </div>

      <div className="viz-label">
        <span className="mono">dp[{i}]</span> = dp[{i - 1}] + dp[{i - 2}] = {DP[i - 1]} + {DP[i - 2]} ={" "}
        <span className="viz-num">{DP[i]}</span>
      </div>
      <PlaybackBar {...pb} />
    </div>
  );
}

const root: CSSProperties = {
  minHeight: 190,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 18,
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
  transition: "background .3s, border-color .3s, color .3s",
};
