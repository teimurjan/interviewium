import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * FIFO queue — a horizontal lane where enqueue appends at the right (back) and
 * dequeue removes from the left (front). Items reflow via layout animation;
 * enter/exit are handled by AnimatePresence. Contents are reconstructed
 * deterministically per scripted op.
 */
type Op = { kind: "enqueue"; value: number } | { kind: "dequeue"; value: number };

const OPS: Op[] = [
  { kind: "enqueue", value: 2 },
  { kind: "enqueue", value: 5 },
  { kind: "enqueue", value: 7 },
  { kind: "dequeue", value: 2 },
  { kind: "enqueue", value: 9 },
  { kind: "dequeue", value: 5 },
  { kind: "dequeue", value: 7 },
];

type Item = { id: number; value: number };
type Frame = { queue: Item[]; op: Op };

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const queue: Item[] = [];
  let nextId = 0;
  for (const op of OPS) {
    if (op.kind === "enqueue") queue.push({ id: nextId++, value: op.value });
    else queue.shift();
    frames.push({ queue: [...queue], op });
  }
  return frames;
})();

export default function Queue() {
  const pb = usePlayback(FRAMES.length, 2200);
  const { queue, op } = FRAMES[pb.step];

  return (
    <div style={root}>
      <div style={lane}>
        <AnimatePresence initial={false}>
          {queue.map((item, idx) => {
            const isFront = idx === 0;
            const isBack = idx === queue.length - 1;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.7, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: -24 }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
                style={{
                  ...cell,
                  background: isFront || isBack ? "var(--accent-soft)" : "var(--surface-2)",
                  borderColor: isFront || isBack ? "var(--accent-line)" : "var(--line)",
                  color: isFront || isBack ? "var(--accent-ink)" : "var(--ink-2)",
                }}
              >
                {item.value}
                {isFront && <span style={tagBelow}>front</span>}
                {isBack && !isFront && <span style={tagBelow}>back</span>}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {queue.length === 0 && <span style={emptyTag}>empty</span>}
      </div>

      <div className="viz-label">
        {op.kind === "enqueue" ? (
          <span className="mono">enqueue {op.value}</span>
        ) : (
          <>
            <span className="mono">dequeue</span> → <span className="viz-num">{op.value}</span> (front)
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
  gap: 28,
};

const lane: CSSProperties = {
  display: "flex",
  gap: 8,
  minHeight: 44,
  alignItems: "center",
  padding: "0 4px",
};

const cell: CSSProperties = {
  position: "relative",
  width: 44,
  height: 44,
  display: "grid",
  placeItems: "center",
  borderRadius: 11,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 15,
  fontWeight: 600,
};

const tagBelow: CSSProperties = {
  position: "absolute",
  bottom: -20,
  fontFamily: "var(--mono)",
  fontSize: 11,
  fontWeight: 600,
  color: "var(--accent)",
};

const emptyTag: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 13,
  color: "var(--ink-3)",
};
