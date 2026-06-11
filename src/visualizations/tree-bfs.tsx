import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Level-order (BFS) traversal of a fixed 7-node binary tree. Each step dequeues
 * the next node, marks it current, then enqueues its children. Visited nodes
 * flash --accent and settle to --correct; the queue strip shows what is pending.
 */
type TreeNode = { id: number; label: string; x: number; y: number; level: number };

const NODES: TreeNode[] = [
  { id: 0, label: "A", x: 200, y: 30, level: 0 },
  { id: 1, label: "B", x: 110, y: 95, level: 1 },
  { id: 2, label: "C", x: 290, y: 95, level: 1 },
  { id: 3, label: "D", x: 60, y: 160, level: 2 },
  { id: 4, label: "E", x: 160, y: 160, level: 2 },
  { id: 5, label: "F", x: 240, y: 160, level: 2 },
  { id: 6, label: "G", x: 340, y: 160, level: 2 },
];

const CHILDREN: Record<number, number[]> = {
  0: [1, 2],
  1: [3, 4],
  2: [5, 6],
  3: [],
  4: [],
  5: [],
  6: [],
};

const EDGES: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (const node of NODES) for (const c of CHILDREN[node.id]) out.push([node.id, c]);
  return out;
})();

type Frame = { current: number; visited: number[]; queue: number[] };

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const queue: number[] = [0];
  const visited: number[] = [];
  while (queue.length) {
    const current = queue.shift()!;
    visited.push(current);
    for (const c of CHILDREN[current]) queue.push(c);
    frames.push({ current, visited: [...visited], queue: [...queue] });
  }
  return frames;
})();

const byId = (id: number) => NODES[id];

export default function TreeBfs() {
  const pb = usePlayback(FRAMES.length, 2400);
  const { current, visited, queue } = FRAMES[pb.step];
  const seen = new Set(visited);
  const currentNode = byId(current);

  return (
    <div style={root}>
      <svg viewBox="0 0 400 190" style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={byId(a).x}
            y1={byId(a).y}
            x2={byId(b).x}
            y2={byId(b).y}
            stroke="var(--line)"
            strokeWidth={1.5}
          />
        ))}
        {NODES.map((node) => {
          const isCurrent = node.id === current;
          const isVisited = seen.has(node.id);
          const fill = isCurrent
            ? "var(--accent-soft)"
            : isVisited
              ? "var(--correct-soft)"
              : "var(--surface-2)";
          const stroke = isCurrent
            ? "var(--accent)"
            : isVisited
              ? "var(--correct)"
              : "var(--line-2)";
          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                initial={{ r: 14, fill: "var(--surface-2)", stroke: "var(--line-2)" }}
                animate={{ r: isCurrent ? 18 : 14, fill, stroke }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                strokeWidth={isCurrent ? 2.5 : 1.5}
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, fill: "var(--ink)" }}
              >
                {node.label}
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
          <span style={{ ...chip, color: "var(--ink-3)", border: "1px dashed var(--line)", background: "transparent" }}>
            ∅
          </span>
        ) : (
          queue.map((id) => (
            <motion.span
              key={id}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={chip}
            >
              {byId(id).label}
            </motion.span>
          ))
        )}
      </div>

      <div className="viz-label">
        level <span className="viz-num">{currentNode.level}</span>: visit{" "}
        <span className="viz-num">{currentNode.label}</span>
      </div>
      <PlaybackBar {...pb} />
    </div>
  );
}

const root: CSSProperties = {
  minHeight: 210,
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
