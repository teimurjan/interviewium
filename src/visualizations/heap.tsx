import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Binary min-heap insert with sift-up. Two values are inserted into a heap shown
 * as a complete binary tree over fixed slot coordinates. After landing at the
 * next free slot, a node swaps with its parent while it is smaller, bubbling up
 * until the heap property holds. Every swap (and each settled state) is one
 * precomputed frame.
 */
const SLOTS = [
  { x: 170, y: 24 }, // 0
  { x: 90, y: 84 }, // 1
  { x: 250, y: 84 }, // 2
  { x: 50, y: 144 }, // 3
  { x: 130, y: 144 }, // 4
  { x: 210, y: 144 }, // 5
  { x: 290, y: 144 }, // 6
] as const;

const INITIAL = [4, 8, 9, 12]; // already a valid min-heap
const INSERTS = [3, 1];

type Frame = {
  heap: number[];
  // pair currently highlighted (a child index and its parent)
  swap: [number, number] | null;
  inserted: number; // index of node being sifted
  done: boolean;
  label: string;
};

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const heap = [...INITIAL];
  for (const value of INSERTS) {
    let i = heap.length;
    heap.push(value);
    frames.push({
      heap: [...heap],
      swap: null,
      inserted: i,
      done: false,
      label: `insert ${value} at slot ${i}`,
    });
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent] <= heap[i]) break;
      frames.push({
        heap: [...heap],
        swap: [i, parent],
        inserted: i,
        done: false,
        label: `swap ${heap[i]} ↕ ${heap[parent]} (child < parent)`,
      });
      [heap[i], heap[parent]] = [heap[parent], heap[i]];
      i = parent;
    }
    frames.push({
      heap: [...heap],
      swap: null,
      inserted: i,
      done: true,
      label: "heap property restored",
    });
  }
  return frames;
})();

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
];

export default function Heap() {
  const pb = usePlayback(FRAMES.length, 2200);
  const { heap, swap, inserted, done, label } = FRAMES[pb.step];
  const swapSet = new Set(swap ?? []);

  return (
    <div style={root}>
      <svg viewBox="0 0 340 180" style={{ width: "100%", maxWidth: 340, margin: "0 auto" }}>
        {EDGES.map(([a, b]) =>
          a < heap.length && b < heap.length ? (
            <line
              key={`${a}-${b}`}
              x1={SLOTS[a].x}
              y1={SLOTS[a].y}
              x2={SLOTS[b].x}
              y2={SLOTS[b].y}
              stroke="var(--line)"
              strokeWidth={1.5}
            />
          ) : null,
        )}
        {heap.map((value, i) => {
          const inSwap = swapSet.has(i);
          const isFocus = i === inserted;
          const fill = inSwap
            ? "var(--warn-soft)"
            : isFocus && done
              ? "var(--correct-soft)"
              : isFocus
                ? "var(--accent-soft)"
                : "var(--surface-2)";
          const stroke = inSwap
            ? "var(--warn)"
            : isFocus && done
              ? "var(--correct)"
              : isFocus
                ? "var(--accent)"
                : "var(--line-2)";
          return (
            <g key={i}>
              <motion.circle
                initial={{ cx: SLOTS[i].x, cy: SLOTS[i].y, fill, stroke }}
                animate={{ cx: SLOTS[i].x, cy: SLOTS[i].y, fill, stroke }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                r={16}
                strokeWidth={2}
              />
              <motion.text
                initial={{ x: SLOTS[i].x, y: SLOTS[i].y + 4 }}
                animate={{ x: SLOTS[i].x, y: SLOTS[i].y + 4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                textAnchor="middle"
                style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700, fill: "var(--ink)" }}
              >
                {value}
              </motion.text>
            </g>
          );
        })}
      </svg>

      <div style={arrRow}>
        {heap.map((value, i) => (
          <span
            key={i}
            style={{
              ...arrCell,
              background: swapSet.has(i) ? "var(--warn-soft)" : "var(--surface-2)",
              borderColor: swapSet.has(i) ? "var(--warn)" : "var(--line)",
            }}
          >
            {value}
          </span>
        ))}
      </div>

      <div className="viz-label">
        <span className="mono">{label}</span>
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
  gap: 16,
};

const arrRow: CSSProperties = { display: "flex", gap: 5 };

const arrCell: CSSProperties = {
  minWidth: 28,
  height: 28,
  display: "grid",
  placeItems: "center",
  borderRadius: 7,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--ink-2)",
  padding: "0 4px",
  transition: "background .3s, border-color .3s",
};
