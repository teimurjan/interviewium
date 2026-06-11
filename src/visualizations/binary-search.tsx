import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Binary search — lo/hi bracket the search space and mid probes the middle.
 * Each step discards the half that can't contain the target (it dims out),
 * halving the range until mid lands on the answer.
 */
const VALUES = [1, 3, 5, 7, 9, 11, 13, 15];
const TARGET = 13;
const CELL = 44;
const GAP = 8;
const STRIDE = CELL + GAP;

type Frame = { lo: number; hi: number; mid: number; found: boolean };

const PATH: Frame[] = (() => {
  const frames: Frame[] = [];
  let lo = 0;
  let hi = VALUES.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const found = VALUES[mid] === TARGET;
    frames.push({ lo, hi, mid, found });
    if (found) break;
    if (VALUES[mid] < TARGET) lo = mid + 1;
    else hi = mid - 1;
  }
  return frames;
})();

export default function BinarySearch() {
  const pb = usePlayback(PATH.length, 2400);
  const { lo, hi, mid, found } = PATH[pb.step];
  const rowWidth = VALUES.length * CELL + (VALUES.length - 1) * GAP;
  const accent = found ? "var(--correct)" : "var(--accent)";

  return (
    <div style={root}>
      <div style={{ position: "relative", width: rowWidth, height: CELL, margin: "0 auto" }}>
        {VALUES.map((v, idx) => {
          const discarded = idx < lo || idx > hi;
          const isMid = idx === mid;
          return (
            <motion.div
              key={idx}
              animate={{ opacity: discarded ? 0.28 : 1 }}
              transition={{ duration: 0.35 }}
              style={{
                ...cell,
                left: idx * STRIDE,
                background: isMid ? (found ? "var(--correct-soft)" : "var(--accent-soft)") : "var(--surface-2)",
                borderColor: isMid ? accent : "var(--line)",
                color: isMid ? "var(--ink)" : "var(--ink-2)",
              }}
            >
              {v}
            </motion.div>
          );
        })}
      </div>

      <div style={{ position: "relative", width: rowWidth, height: 38, margin: "0 auto" }}>
        <Marker label="lo" index={lo} color="var(--ink-2)" y={0} />
        <Marker label="hi" index={hi} color="var(--ink-2)" y={0} />
        <Marker label="mid" index={mid} color={accent} y={18} />
      </div>

      <div className="viz-label">
        a[mid] = <span className="viz-num">{VALUES[mid]}</span>{" "}
        {found ? "= target ✓" : VALUES[mid] < TARGET ? "< 13 → lo = mid + 1" : "> 13 → hi = mid − 1"}
      </div>

      <PlaybackBar {...pb} />
    </div>
  );
}

function Marker({ label, index, color, y }: { label: string; index: number; color: string; y: number }) {
  return (
    <motion.div
      animate={{ x: index * STRIDE }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      style={{
        position: "absolute",
        top: y,
        left: 0,
        width: CELL,
        textAlign: "center",
        fontFamily: "var(--mono)",
        fontSize: 12,
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
  gap: 16,
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
