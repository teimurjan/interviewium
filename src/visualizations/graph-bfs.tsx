import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Breadth-first search on a small undirected graph. BFS expands in layers from
 * the source: each step dequeues a node, marks it visited, and enqueues its
 * undiscovered neighbours. Nodes are tinted by their BFS distance.
 */
type Node = { id: number; x: number; y: number };

const NODES: Node[] = [
  { id: 0, x: 60, y: 90 },
  { id: 1, x: 150, y: 40 },
  { id: 2, x: 150, y: 140 },
  { id: 3, x: 250, y: 40 },
  { id: 4, x: 250, y: 140 },
  { id: 5, x: 340, y: 90 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [3, 4],
];

const ADJ: number[][] = NODES.map(() => []);
for (const [a, b] of EDGES) {
  ADJ[a].push(b);
  ADJ[b].push(a);
}
for (const list of ADJ) list.sort((p, q) => p - q);

const SOURCE = 0;

type Frame = {
  current: number;
  visited: number[];
  queue: number[];
  dist: Record<number, number>;
};

const PATH: Frame[] = (() => {
  const frames: Frame[] = [];
  const dist: Record<number, number> = { [SOURCE]: 0 };
  const enqueued = new Set<number>([SOURCE]);
  const queue: number[] = [SOURCE];
  const visited: number[] = [];
  while (queue.length) {
    const current = queue.shift()!;
    visited.push(current);
    for (const n of ADJ[current]) {
      if (!enqueued.has(n)) {
        enqueued.add(n);
        dist[n] = dist[current] + 1;
        queue.push(n);
      }
    }
    frames.push({
      current,
      visited: [...visited],
      queue: [...queue],
      dist: { ...dist },
    });
  }
  return frames;
})();

const MAX_DIST = Math.max(...Object.values(PATH[PATH.length - 1].dist));

function tintFor(d: number | undefined): string {
  if (d === undefined) return "var(--surface-2)";
  const t = MAX_DIST === 0 ? 0 : d / MAX_DIST;
  return `color-mix(in srgb, var(--accent) ${Math.round(25 + t * 55)}%, var(--accent-soft))`;
}

export default function GraphBfs() {
  const pb = usePlayback(PATH.length, 2400);
  const { current, visited, queue, dist } = PATH[pb.step];
  const seen = new Set(visited);

  return (
    <div style={root}>
      <svg viewBox="0 0 400 180" style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="var(--line)"
            strokeWidth={1.5}
          />
        ))}
        {NODES.map((node) => {
          const d = dist[node.id];
          const isCurrent = node.id === current;
          const discovered = seen.has(node.id) || d !== undefined;
          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                initial={{ r: 15, fill: "var(--surface-2)", stroke: "var(--line-2)" }}
                animate={{
                  r: isCurrent ? 19 : 15,
                  fill: discovered ? tintFor(d) : "var(--surface-2)",
                  stroke: isCurrent ? "var(--accent)" : "var(--line-2)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                strokeWidth={isCurrent ? 2.5 : 1.5}
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, fill: "var(--ink)" }}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={strip}>
        <span className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>
          queue
        </span>
        {queue.length === 0 ? (
          <span style={{ ...chip, color: "var(--ink-3)" }}>∅</span>
        ) : (
          queue.map((id) => (
            <motion.span
              key={id}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={chip}
            >
              {id}
            </motion.span>
          ))
        )}
      </div>

      <div className="viz-label">
        visit <span className="viz-num">{current}</span> (dist{" "}
        <span className="viz-num">{dist[current]}</span>)
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

const strip: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  justifyContent: "center",
};

const chip: CSSProperties = {
  minWidth: 28,
  height: 28,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  border: "1px solid var(--accent-line)",
  background: "var(--accent-soft)",
  fontFamily: "var(--mono)",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--ink)",
  padding: "0 6px",
};
