import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Frequency counting with a hash map — a stream of keys flows in one at a time,
 * each step incrementing its drawer's tally (or creating a new drawer).
 */
const STREAM = ["a", "b", "a", "c", "b", "a", "c", "a"];

type Frame = {
  counts: { key: string; n: number }[];
  active: string;
  value: number;
  fresh: boolean;
};

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const map = new Map<string, number>();
  for (const key of STREAM) {
    const fresh = !map.has(key);
    const value = (map.get(key) ?? 0) + 1;
    map.set(key, value);
    frames.push({
      counts: [...map].map(([k, n]) => ({ key: k, n })),
      active: key,
      value,
      fresh,
    });
  }
  return frames;
})();

export default function HashMap() {
  const pb = usePlayback(FRAMES.length, 2000);
  const frame = FRAMES[pb.step];

  return (
    <div style={root}>
      <div style={streamRow}>
        {STREAM.map((key, i) => (
          <div
            key={i}
            style={{
              ...token,
              background: i === pb.step ? "var(--accent-soft)" : "var(--surface-2)",
              color: i === pb.step ? "var(--accent-ink)" : "var(--ink-3)",
              borderColor: i === pb.step ? "var(--accent-line)" : "var(--line)",
            }}
          >
            {key}
          </div>
        ))}
      </div>

      <div style={drawers}>
        <AnimatePresence>
          {frame.counts.map(({ key, n }) => {
            const isActive = key === frame.active;
            return (
              <motion.div
                key={key}
                layout
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                style={{
                  ...drawer,
                  background: isActive ? "var(--accent-soft)" : "var(--surface-2)",
                  borderColor: isActive ? "var(--accent-line)" : "var(--line)",
                }}
              >
                <span style={drawerKey}>{key}</span>
                <motion.span
                  key={n}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  style={{
                    ...drawerCount,
                    color: isActive ? "var(--accent-ink)" : "var(--ink)",
                  }}
                >
                  {n}
                </motion.span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="viz-label">
        <span className="mono">
          count['{frame.active}']++
        </span>{" "}
        → <span className="viz-num">{frame.value}</span>
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
  alignItems: "center",
  gap: 18,
};

const streamRow: CSSProperties = { display: "flex", gap: 6 };

const token: CSSProperties = {
  width: 30,
  height: 30,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 13,
  fontWeight: 600,
  transition: "background .3s, color .3s, border-color .3s",
};

const drawers: CSSProperties = { display: "flex", gap: 12 };

const drawer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  padding: "10px 16px",
  borderRadius: 12,
  border: "1px solid var(--line)",
  transition: "background .3s, border-color .3s",
};

const drawerKey: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 13,
  color: "var(--ink-2)",
};

const drawerCount: CSSProperties = {
  display: "block",
  fontFamily: "var(--mono)",
  fontSize: 22,
  fontWeight: 700,
  lineHeight: 1,
};
