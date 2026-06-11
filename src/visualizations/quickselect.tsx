import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Quickselect — find the kth smallest. Each step partitions the active window
 * around a pivot (last element); the pivot lands at its final sorted index.
 * Comparing that index to k tells us which side holds the answer; the other
 * side dims away. The window shrinks until the pivot index equals k.
 */
const VALUES = [7, 2, 9, 4, 1, 6, 3];
const K = 3; // 0-based: the 4th smallest
const CELL = 44;
const GAP = 8;
const STRIDE = CELL + GAP;

type Frame = {
  arr: number[];
  lo: number;
  hi: number;
  pivotIndex: number; // pivot's slot before partition (hi)
  pivotValue: number;
  pivotFinalPos: number; // resting index after partition
  goLeft: boolean;
  answerFound: boolean;
};

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const arr = [...VALUES];
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const pivotValue = arr[hi];
    const pivotIndex = hi;
    let store = lo;
    for (let i = lo; i < hi; i++) {
      if (arr[i] < pivotValue) {
        [arr[store], arr[i]] = [arr[i], arr[store]];
        store++;
      }
    }
    [arr[store], arr[hi]] = [arr[hi], arr[store]];
    const pivotFinalPos = store;
    const answerFound = pivotFinalPos === K;
    const goLeft = K < pivotFinalPos;
    frames.push({
      arr: [...arr],
      lo,
      hi,
      pivotIndex,
      pivotValue,
      pivotFinalPos,
      goLeft,
      answerFound,
    });
    if (answerFound) break;
    if (goLeft) hi = pivotFinalPos - 1;
    else lo = pivotFinalPos + 1;
  }
  if (frames.length === 0 || !frames[frames.length - 1].answerFound) {
    frames.push({
      arr: [...arr],
      lo,
      hi,
      pivotIndex: lo,
      pivotValue: arr[lo],
      pivotFinalPos: lo,
      goLeft: false,
      answerFound: true,
    });
  }
  return frames;
})();

const ANSWER = (() => {
  const sorted = [...VALUES].sort((a, b) => a - b);
  return sorted[K];
})();

export default function Quickselect() {
  const pb = usePlayback(FRAMES.length, 2400);
  const frame = FRAMES[pb.step];
  const rowWidth = VALUES.length * CELL + (VALUES.length - 1) * GAP;

  return (
    <div style={root}>
      <div style={{ position: "relative", width: rowWidth, height: CELL, margin: "0 auto" }}>
        {frame.arr.map((v, idx) => {
          const inWindow = idx >= frame.lo && idx <= frame.hi;
          const isPivot = idx === frame.pivotFinalPos;
          const isAnswer = frame.answerFound && idx === K;
          const tint = isAnswer
            ? "var(--correct-soft)"
            : isPivot
              ? "var(--warn-soft)"
              : inWindow
                ? "var(--accent-soft)"
                : "var(--surface-2)";
          const border = isAnswer
            ? "var(--correct)"
            : isPivot
              ? "var(--warn)"
              : inWindow
                ? "var(--accent-line)"
                : "var(--line)";
          return (
            <motion.div
              key={idx}
              animate={{ opacity: inWindow || isAnswer ? 1 : 0.28 }}
              transition={{ duration: 0.35 }}
              style={{
                ...cell,
                left: idx * STRIDE,
                background: tint,
                borderColor: border,
                color: inWindow || isAnswer ? "var(--ink)" : "var(--ink-2)",
              }}
            >
              {v}
            </motion.div>
          );
        })}
      </div>

      <div style={{ position: "relative", width: rowWidth, height: 22, margin: "0 auto" }}>
        <Marker label="k" index={K} color="var(--correct)" />
      </div>

      <div className="viz-label">
        {frame.answerFound ? (
          <>
            kth smallest = <span className="viz-num">{ANSWER}</span> ✓
          </>
        ) : (
          <>
            pivot=<span className="viz-num">{frame.pivotValue}</span> lands at index{" "}
            <span className="viz-num">{frame.pivotFinalPos}</span>; k=<span className="viz-num">{K}</span> →{" "}
            {frame.goLeft ? "go left" : "go right"}
          </>
        )}
      </div>

      <PlaybackBar {...pb} />
    </div>
  );
}

function Marker({ label, index, color }: { label: string; index: number; color: string }) {
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
  minHeight: 200,
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
};
