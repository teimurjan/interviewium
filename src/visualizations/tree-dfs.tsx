import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Preorder depth-first traversal of the SAME fixed 7-node binary tree used by
 * tree-bfs. Each step visits the next node in preorder (root, left, right);
 * visited nodes settle to --correct, the current node is --accent, and the
 * active root-to-node path is highlighted plus mirrored in a recursion stack.
 */
type TreeNode = { id: number; label: string; x: number; y: number };

const NODES: TreeNode[] = [
  { id: 0, label: "A", x: 200, y: 30 },
  { id: 1, label: "B", x: 110, y: 95 },
  { id: 2, label: "C", x: 290, y: 95 },
  { id: 3, label: "D", x: 60, y: 160 },
  { id: 4, label: "E", x: 160, y: 160 },
  { id: 5, label: "F", x: 240, y: 160 },
  { id: 6, label: "G", x: 340, y: 160 },
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

type Frame = { current: number; order: number; visited: number[]; path: number[] };

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const visited: number[] = [];
  let order = 0;
  const walk = (id: number, path: number[]) => {
    const here = [...path, id];
    visited.push(id);
    frames.push({ current: id, order: order++, visited: [...visited], path: here });
    for (const c of CHILDREN[id]) walk(c, here);
  };
  walk(0, []);
  return frames;
})();

const byId = (id: number) => NODES[id];

const edgeKey = (a: number, b: number) => `${Math.min(a, b)}-${Math.max(a, b)}`;

export default function TreeDfs() {
  const pb = usePlayback(FRAMES.length, 2400);
  const { current, order, visited, path } = FRAMES[pb.step];
  const seen = new Set(visited);
  const currentNode = byId(current);

  const pathEdges = new Set<string>();
  for (let i = 0; i < path.length - 1; i++) pathEdges.add(edgeKey(path[i], path[i + 1]));

  return (
    <div style={root}>
      <svg viewBox="0 0 400 190" style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
        {EDGES.map(([a, b], i) => {
          const active = pathEdges.has(edgeKey(a, b));
          return (
            <motion.line
              key={i}
              x1={byId(a).x}
              y1={byId(a).y}
              x2={byId(b).x}
              y2={byId(b).y}
              animate={{ stroke: active ? "var(--accent)" : "var(--line)" }}
              transition={{ duration: 0.25 }}
              strokeWidth={active ? 3 : 1.5}
            />
          );
        })}
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
          stack
        </span>
        {path.map((id) => (
          <motion.span
            key={id}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            style={chip}
          >
            {byId(id).label}
          </motion.span>
        ))}
      </div>

      <div className="viz-label">
        visit <span className="viz-num">{currentNode.label}</span> (preorder #
        <span className="viz-num">{order + 1}</span>)
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
