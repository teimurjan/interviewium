import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Selection sort — a sorted prefix grows from the left. Each pass scans the
 * unsorted suffix for its minimum, then swaps that minimum into the prefix
 * boundary. Bars carry a stable id so the `layout` prop slides them on swap.
 */
type Bar = { id: number; value: number };

const START: Bar[] = [5, 2, 8, 1, 6, 3].map((value, id) => ({ id, value }));
const MAX = Math.max(...START.map((b) => b.value));
const BAR_W = 40;
const GAP = 10;
const MAX_H = 120;

type Frame = {
  bars: Bar[];
  boundary: number; // first unsorted index
  scan: number; // candidate currently being compared
  min: number; // running-min index
  minValue: number;
  done: boolean;
};

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const bars = START.map((b) => ({ ...b }));
  for (let boundary = 0; boundary < bars.length - 1; boundary++) {
    let min = boundary;
    for (let scan = boundary + 1; scan < bars.length; scan++) {
      if (bars[scan].value < bars[min].value) min = scan;
      frames.push({
        bars: bars.map((b) => ({ ...b })),
        boundary,
        scan,
        min,
        minValue: bars[min].value,
        done: false,
      });
    }
    [bars[boundary], bars[min]] = [bars[min], bars[boundary]];
    frames.push({
      bars: bars.map((b) => ({ ...b })),
      boundary,
      scan: boundary,
      min: boundary,
      minValue: bars[boundary].value,
      done: false,
    });
  }
  frames.push({
    bars: bars.map((b) => ({ ...b })),
    boundary: bars.length,
    scan: -1,
    min: -1,
    minValue: 0,
    done: true,
  });
  return frames;
})();

export default function Sorting() {
  const pb = usePlayback(FRAMES.length, 1600);
  const frame = FRAMES[pb.step];
  const rowWidth = START.length * BAR_W + (START.length - 1) * GAP;

  return (
    <div style={root}>
      <div style={{ display: "flex", gap: GAP, height: MAX_H, alignItems: "flex-end", margin: "0 auto", width: rowWidth }}>
        {frame.bars.map((bar, idx) => {
          const sorted = frame.done || idx < frame.boundary;
          const isMin = idx === frame.min;
          const isScan = idx === frame.scan && !sorted;
          const color = sorted
            ? "var(--correct)"
            : isMin || isScan
              ? "var(--accent)"
              : "var(--line-2)";
          const fill = sorted
            ? "var(--correct-soft)"
            : isMin || isScan
              ? "var(--accent-soft)"
              : "var(--surface-2)";
          return (
            <motion.div
              key={bar.id}
              layout
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{
                ...barStyle,
                height: (bar.value / MAX) * MAX_H,
                background: fill,
                borderColor: color,
                color: sorted || isMin || isScan ? "var(--ink)" : "var(--ink-2)",
              }}
            >
              {bar.value}
            </motion.div>
          );
        })}
      </div>

      <div className="viz-label">
        {frame.done ? (
          <>sorted ✓</>
        ) : (
          <>
            min of unsorted = <span className="viz-num">{frame.minValue}</span> → place at index{" "}
            <span className="viz-num">{frame.boundary}</span>
          </>
        )}
      </div>

      <PlaybackBar {...pb} />
    </div>
  );
}

const root: CSSProperties = {
  minHeight: 200,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 18,
};

const barStyle: CSSProperties = {
  width: BAR_W,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: 6,
  borderRadius: 9,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 13,
  fontWeight: 600,
  boxSizing: "border-box",
};
