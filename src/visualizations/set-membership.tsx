import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Set membership / first-duplicate detection — tokens flow in one at a time; a
 * new token joins the set, a repeat one flags the first duplicate.
 */
const STREAM = ["3", "7", "1", "7", "9"];

type Frame = {
  members: string[];
  token: string;
  duplicate: boolean;
};

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const seen = new Set<string>();
  for (const token of STREAM) {
    const duplicate = seen.has(token);
    if (!duplicate) seen.add(token);
    frames.push({ members: [...seen], token, duplicate });
    if (duplicate) break;
  }
  return frames;
})();

export default function SetMembership() {
  const pb = usePlayback(FRAMES.length, 2000);
  const frame = FRAMES[pb.step];

  return (
    <div style={root}>
      <div style={streamRow}>
        {STREAM.map((token, i) => (
          <div
            key={i}
            style={{
              ...slot,
              background: i === pb.step ? "var(--accent-soft)" : "var(--surface-2)",
              color: i === pb.step ? "var(--accent-ink)" : "var(--ink-3)",
              borderColor: i === pb.step ? "var(--accent-line)" : "var(--line)",
            }}
          >
            {token}
          </div>
        ))}
      </div>

      <div style={setRow}>
        <span style={setLabel}>set</span>
        <AnimatePresence>
          {frame.members.map((token) => {
            const flag = frame.duplicate && token === frame.token;
            return (
              <motion.div
                key={token}
                layout
                initial={{ opacity: 0, scale: 0.6 }}
                animate={
                  flag
                    ? { opacity: 1, scale: [1, 1.18, 1] }
                    : { opacity: 1, scale: 1 }
                }
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                style={{
                  ...chip,
                  background: flag ? "var(--warn-soft)" : "var(--correct-soft)",
                  borderColor: flag ? "var(--warn)" : "var(--correct)",
                  color: "var(--ink)",
                }}
              >
                {token}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="viz-label">
        {frame.duplicate ? (
          <>
            <span className="mono">{frame.token}</span> already in set →{" "}
            <span className="viz-num" style={{ color: "var(--warn)" }}>
              duplicate
            </span>
          </>
        ) : (
          <>
            add <span className="mono">{frame.token}</span>
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
  alignItems: "center",
  gap: 18,
};

const streamRow: CSSProperties = { display: "flex", gap: 6 };

const slot: CSSProperties = {
  width: 32,
  height: 32,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 14,
  fontWeight: 600,
  transition: "background .3s, color .3s, border-color .3s",
};

const setRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  minHeight: 40,
};

const setLabel: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 13,
  color: "var(--ink-3)",
  marginRight: 4,
};

const chip: CSSProperties = {
  minWidth: 32,
  height: 32,
  padding: "0 10px",
  display: "grid",
  placeItems: "center",
  borderRadius: 16,
  border: "1px solid var(--correct)",
  fontFamily: "var(--mono)",
  fontSize: 14,
  fontWeight: 600,
};
