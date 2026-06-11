import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Next-greater-element via a monotonic decreasing stack. The array is scanned
 * left→right; for each element we pop every stack entry smaller than it (their
 * answer is the current value), then push the current index. Each step is one
 * pop or one push so the mechanism is visible. Frames are precomputed.
 */
const ARR = [2, 1, 2, 4, 3];

type Frame = {
  cur: number; // index being processed
  stack: number[]; // indices, values strictly decreasing
  result: (number | null)[];
  popped: number | null; // index just resolved this step
  pushed: boolean;
};

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const stack: number[] = [];
  const result: (number | null)[] = ARR.map(() => null);
  for (let cur = 0; cur < ARR.length; cur++) {
    while (stack.length && ARR[stack[stack.length - 1]] < ARR[cur]) {
      const popped = stack.pop()!;
      result[popped] = ARR[cur];
      frames.push({ cur, stack: [...stack], result: [...result], popped, pushed: false });
    }
    stack.push(cur);
    frames.push({ cur, stack: [...stack], result: [...result], popped: null, pushed: true });
  }
  return frames;
})();

export default function MonotonicStack() {
  const pb = usePlayback(FRAMES.length, 2200);
  const { cur, stack, result, popped, pushed } = FRAMES[pb.step];

  return (
    <div style={root}>
      <div style={arrRow}>
        {ARR.map((v, i) => {
          const isCur = i === cur;
          return (
            <div
              key={i}
              style={{
                ...cell,
                background: isCur ? "var(--accent-soft)" : "var(--surface-2)",
                borderColor: isCur ? "var(--accent-line)" : "var(--line)",
                color: isCur ? "var(--accent-ink)" : "var(--ink-2)",
              }}
            >
              {v}
              {result[i] !== null && <span style={resTag}>{result[i]}</span>}
            </div>
          );
        })}
      </div>

      <div style={stackRow}>
        <span style={stackLabel} className="mono">
          stack
        </span>
        <AnimatePresence initial={false}>
          {stack.map((idx) => (
            <motion.span
              key={idx}
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
              style={chip}
            >
              {ARR[idx]}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="viz-label">
        {popped !== null ? (
          <>
            pop <span className="viz-num">{ARR[popped]}</span> → next greater is{" "}
            <span style={{ color: "var(--correct)" }} className="viz-num">
              {ARR[cur]}
            </span>
          </>
        ) : pushed ? (
          <>
            push <span className="viz-num">{ARR[cur]}</span>
          </>
        ) : null}
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
  gap: 22,
};

const arrRow: CSSProperties = { display: "flex", gap: 8 };

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
  transition: "background .3s, border-color .3s, color .3s",
};

const resTag: CSSProperties = {
  position: "absolute",
  bottom: -19,
  fontFamily: "var(--mono)",
  fontSize: 11,
  fontWeight: 600,
  color: "var(--correct)",
};

const stackRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  minHeight: 32,
};

const stackLabel: CSSProperties = { color: "var(--ink-3)", fontSize: 12 };

const chip: CSSProperties = {
  minWidth: 30,
  height: 30,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  border: "1px solid var(--accent-line)",
  background: "var(--accent-soft)",
  fontFamily: "var(--mono)",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--accent-ink)",
};
