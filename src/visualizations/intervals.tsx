import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Interval merge — the bars arrive unsorted, reflow once sorted by start, then
 * overlapping runs collapse into merged ranges (animated via layout + presence).
 */
type Bar = { id: string; s: number; e: number };

const PHASES: { label: string; bars: Bar[] }[] = [
  {
    label: "unsorted intervals",
    bars: [
      { id: "a", s: 1, e: 3 },
      { id: "b", s: 6, e: 8 },
      { id: "c", s: 2, e: 4 },
      { id: "d", s: 7, e: 9 },
      { id: "e", s: 5, e: 6 },
    ],
  },
  {
    label: "sort by start",
    bars: [
      { id: "a", s: 1, e: 3 },
      { id: "c", s: 2, e: 4 },
      { id: "e", s: 5, e: 6 },
      { id: "b", s: 6, e: 8 },
      { id: "d", s: 7, e: 9 },
    ],
  },
  {
    label: "merge overlaps → [1,4], [5,9]",
    bars: [
      { id: "m1", s: 1, e: 4 },
      { id: "m2", s: 5, e: 9 },
    ],
  },
];
const AXIS = 10;
const ROW = 34;

export default function Intervals() {
  const pb = usePlayback(PHASES.length, 3200);
  const { label, bars } = PHASES[pb.step];
  const merged = pb.step === PHASES.length - 1;

  return (
    <div style={root}>
      <div style={{ position: "relative", width: "100%", height: ROW * 5 }}>
        <AnimatePresence>
          {bars.map((bar, idx) => (
            <motion.div
              key={bar.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, layout: { type: "spring", stiffness: 240, damping: 26 } }}
              style={{
                position: "absolute",
                top: idx * ROW,
                left: `${(bar.s / AXIS) * 100}%`,
                width: `${((bar.e - bar.s) / AXIS) * 100}%`,
                height: ROW - 10,
                borderRadius: 8,
                background: merged ? "var(--accent)" : "var(--accent-soft)",
                border: "1px solid var(--accent)",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--mono)",
                fontSize: 12,
                fontWeight: 600,
                color: merged ? "var(--surface)" : "var(--accent-ink)",
              }}
            >
              [{bar.s},{bar.e}]
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="viz-label">{label}</div>
      <PlaybackBar {...pb} />
    </div>
  );
}

const root: CSSProperties = {
  minHeight: 184,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 16,
};
