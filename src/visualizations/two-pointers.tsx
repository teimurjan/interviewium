import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Two pointers — L starts at the left, R at the right, and they converge on a
 * sorted array. Each step moves whichever pointer the sum-vs-target comparison
 * dictates, until the pair is found.
 */
const VALUES = [1, 2, 4, 6, 8, 9, 11];
const TARGET = 14;
const CELL = 44;
const GAP = 8;
const STRIDE = CELL + GAP;

type Frame = { i: number; j: number; sum: number; found: boolean };

const PATH: Frame[] = (() => {
  const frames: Frame[] = [];
  let i = 0;
  let j = VALUES.length - 1;
  while (i < j) {
    const sum = VALUES[i] + VALUES[j];
    const found = sum === TARGET;
    frames.push({ i, j, sum, found });
    if (found) break;
    if (sum < TARGET) i++;
    else j--;
  }
  return frames;
})();

export default function TwoPointers() {
  const pb = usePlayback(PATH.length, 2400);
  const { i, j, sum, found } = PATH[pb.step];
  const rowWidth = VALUES.length * CELL + (VALUES.length - 1) * GAP;
  const accent = found ? "var(--correct)" : "var(--accent)";
  const tint = found ? "var(--correct-soft)" : "var(--accent-soft)";

  return (
    <div style={root}>
      <div style={{ position: "relative", width: rowWidth, height: CELL, margin: "0 auto" }}>
        {VALUES.map((v, idx) => {
          const active = idx === i || idx === j;
          return (
            <div
              key={idx}
              style={{
                ...cell,
                left: idx * STRIDE,
                background: active ? tint : "var(--surface-2)",
                borderColor: active ? accent : "var(--line)",
                color: active ? "var(--ink)" : "var(--ink-2)",
                transition: "background .3s, border-color .3s, color .3s",
              }}
            >
              {v}
            </div>
          );
        })}
      </div>

      <div style={{ position: "relative", width: rowWidth, height: 22, margin: "0 auto" }}>
        <Pointer label="L" index={i} color={accent} />
        <Pointer label="R" index={j} color={accent} />
      </div>

      <div className="viz-label">
        a[{i}] + a[{j}] = <span className="viz-num">{sum}</span>{" "}
        {found ? "= target ✓" : sum < TARGET ? "< 14 → L→" : "> 14 → ←R"}
      </div>
      <PlaybackBar {...pb} />
    </div>
  );
}

function Pointer({ label, index, color }: { label: string; index: number; color: string }) {
  return (
    <motion.div
      animate={{ x: index * STRIDE }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: CELL,
        textAlign: "center",
        fontFamily: "var(--mono)",
        fontSize: 13,
        fontWeight: 700,
        color,
      }}
    >
      ▲ {label}
    </motion.div>
  );
}

const root: CSSProperties = {
  minHeight: 184,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 14,
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
