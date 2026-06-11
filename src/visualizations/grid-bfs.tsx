import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Multi-source BFS flood on a 2D grid. Two source cells expand simultaneously,
 * one minute at a time, routing around wall cells. Each step reveals the next
 * distance ring; cells are tinted by how many minutes it took to reach them.
 */
const COLS = 6;
const ROWS = 5;
const CELL = 34;
const GAP = 5;

const SOURCES: [number, number][] = [
  [0, 0],
  [4, 3],
];
const WALLS = new Set<number>([cellId(2, 1), cellId(2, 2), cellId(2, 3)]);

function cellId(r: number, c: number): number {
  return r * COLS + c;
}

type DistMap = Record<number, number>;

const DIST: DistMap = (() => {
  const dist: DistMap = {};
  let frontier: [number, number][] = [];
  for (const [r, c] of SOURCES) {
    dist[cellId(r, c)] = 0;
    frontier.push([r, c]);
  }
  const deltas: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let d = 0;
  while (frontier.length) {
    const next: [number, number][] = [];
    for (const [r, c] of frontier) {
      for (const [dr, dc] of deltas) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
        const id = cellId(nr, nc);
        if (WALLS.has(id) || id in dist) continue;
        dist[id] = d + 1;
        next.push([nr, nc]);
      }
    }
    frontier = next;
    d++;
  }
  return dist;
})();

const MAX_DIST = Math.max(...Object.values(DIST));
const NUM_STEPS = MAX_DIST + 1;

const REACHED_BY_STEP: number[] = (() => {
  const counts: number[] = [];
  for (let t = 0; t < NUM_STEPS; t++) {
    counts.push(Object.values(DIST).filter((d) => d <= t).length);
  }
  return counts;
})();

function tintFor(d: number): string {
  const ratio = MAX_DIST === 0 ? 0 : d / MAX_DIST;
  return `color-mix(in srgb, var(--accent) ${Math.round(20 + ratio * 60)}%, var(--accent-soft))`;
}

export default function GridBfs() {
  const pb = usePlayback(NUM_STEPS, 2200);
  const t = pb.step;

  return (
    <div style={root}>
      <div style={{ ...grid, gridTemplateColumns: `repeat(${COLS}, ${CELL}px)` }}>
        {Array.from({ length: ROWS * COLS }, (_, id) => {
          const isWall = WALLS.has(id);
          const d = DIST[id];
          const reached = d !== undefined && d <= t;
          const justReached = d === t;
          const isSource = d === 0;

          return (
            <motion.div
              key={id}
              animate={{
                scale: justReached && reached ? [0.7, 1.08, 1] : 1,
                opacity: 1,
                background: isWall
                  ? "var(--line-2)"
                  : reached
                    ? tintFor(d)
                    : "var(--surface-2)",
                borderColor: reached ? "var(--accent-line)" : "var(--line)",
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                ...cell,
                border: isSource ? "2px solid var(--accent)" : "1px solid var(--line)",
                color: reached ? "var(--ink)" : "var(--ink-3)",
              }}
            >
              {isWall ? "" : reached ? d : ""}
            </motion.div>
          );
        })}
      </div>

      <div className="viz-label">
        minute <span className="viz-num">{t}</span> —{" "}
        <span className="viz-num">{REACHED_BY_STEP[t]}</span> cells reached
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
  gap: 16,
};

const grid: CSSProperties = {
  display: "grid",
  gap: GAP,
  justifyContent: "center",
  margin: "0 auto",
};

const cell: CSSProperties = {
  width: CELL,
  height: CELL,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  fontFamily: "var(--mono)",
  fontSize: 13,
  fontWeight: 600,
};
