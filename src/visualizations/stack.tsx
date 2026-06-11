import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * LIFO stack — a vertical pile of plates driven by a scripted sequence of
 * push/pop operations. Push slides a plate onto the top; pop lifts the top
 * plate off (AnimatePresence exit). The stack contents are reconstructed
 * deterministically per step.
 */
type Op = { kind: "push" | "pop"; value: string };

const OPS: Op[] = [
  { kind: "push", value: "A" },
  { kind: "push", value: "B" },
  { kind: "push", value: "C" },
  { kind: "pop", value: "C" },
  { kind: "push", value: "D" },
  { kind: "pop", value: "D" },
  { kind: "pop", value: "B" },
];

type Item = { id: number; value: string };
type Frame = { stack: Item[]; op: Op };

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const stack: Item[] = [];
  let nextId = 0;
  for (const op of OPS) {
    if (op.kind === "push") stack.push({ id: nextId++, value: op.value });
    else stack.pop();
    frames.push({ stack: [...stack], op });
  }
  return frames;
})();

export default function Stack() {
  const pb = usePlayback(FRAMES.length, 2200);
  const { stack, op } = FRAMES[pb.step];

  return (
    <div style={root}>
      <div style={pile}>
        <AnimatePresence initial={false}>
          {[...stack].reverse().map((item, revIdx) => {
            const isTop = revIdx === 0;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.7, y: -24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: -24 }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
                style={{
                  ...plate,
                  background: isTop ? "var(--accent-soft)" : "var(--surface-2)",
                  borderColor: isTop ? "var(--accent-line)" : "var(--line)",
                  color: isTop ? "var(--accent-ink)" : "var(--ink-2)",
                }}
              >
                {item.value}
                {isTop && <span style={topTag}>top</span>}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {stack.length === 0 && <span style={emptyTag}>empty</span>}
      </div>

      <div className="viz-label">
        {op.kind === "push" ? (
          <>
            <span className="mono">push {op.value}</span>
          </>
        ) : (
          <>
            <span className="mono">pop</span> → <span className="viz-num">{op.value}</span>
          </>
        )}
      </div>
      <PlaybackBar {...pb} />
    </div>
  );
}

const root: CSSProperties = {
  minHeight: 220,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 18,
};

const pile: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  justifyContent: "flex-end",
  minHeight: 150,
};

const plate: CSSProperties = {
  position: "relative",
  width: 120,
  height: 34,
  display: "grid",
  placeItems: "center",
  borderRadius: 10,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 15,
  fontWeight: 600,
};

const topTag: CSSProperties = {
  position: "absolute",
  right: -42,
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
