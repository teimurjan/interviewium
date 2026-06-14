import { type CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * One depth-first traversal of a fixed 7-node binary tree, in a single order.
 * The recursion is identical across orders — only the line where you *visit* the
 * node moves (before / between / after the child calls). That line is lit in the
 * skeleton, the other two dimmed, so each order's page shows the same walk with
 * one line relocated. Used by tree-preorder / -inorder / -postorder.
 */
export type Order = "pre" | "in" | "post";

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

const PARENT: Record<number, number> = (() => {
  const parent: Record<number, number> = {};
  for (const node of NODES) for (const c of CHILDREN[node.id]) parent[c] = node.id;
  return parent;
})();

const META: Record<Order, { name: string; rule: string }> = {
  pre: { name: "preorder", rule: "root → left → right" },
  in: { name: "inorder", rule: "left → root → right" },
  post: { name: "postorder", rule: "left → right → root" },
};

// Same recursive walk; only the highlighted `visit` line shifts per order.
const SKELETON: { code: string; visit?: Order }[] = [
  { code: "function dfs(node) {" },
  { code: "  if (!node) return;" },
  { code: "  visit(node)", visit: "pre" },
  { code: "  dfs(node.left)" },
  { code: "  visit(node)", visit: "in" },
  { code: "  dfs(node.right)" },
  { code: "  visit(node)", visit: "post" },
  { code: "}" },
];

const byId = (id: number) => NODES[id];
const edgeKey = (a: number, b: number) => `${Math.min(a, b)}-${Math.max(a, b)}`;

const pathTo = (id: number): number[] => {
  const path = [id];
  for (let cur = id; PARENT[cur] !== undefined; ) {
    cur = PARENT[cur];
    path.unshift(cur);
  }
  return path;
};

const sequence = (order: Order): number[] => {
  const out: number[] = [];
  const walk = (id: number) => {
    const [left, right] = CHILDREN[id];
    if (order === "pre") out.push(id);
    if (left !== undefined) walk(left);
    if (order === "in") out.push(id);
    if (right !== undefined) walk(right);
    if (order === "post") out.push(id);
  };
  walk(0);
  return out;
};

type Frame = { current: number; step: number; visited: number[]; path: number[] };

const FRAMES: Record<Order, Frame[]> = {
  pre: build("pre"),
  in: build("in"),
  post: build("post"),
};

function build(order: Order): Frame[] {
  const seq = sequence(order);
  return seq.map((id, i) => ({ current: id, step: i, visited: seq.slice(0, i + 1), path: pathTo(id) }));
}

export default function TreeTraversal({ order }: { order: Order }) {
  const frames = FRAMES[order];
  const pb = usePlayback(frames.length, 2400);
  const frame = frames[pb.step];
  const seen = new Set(frame.visited);
  const currentNode = byId(frame.current);
  const meta = META[order];

  const pathEdges = new Set<string>();
  for (let i = 0; i < frame.path.length - 1; i++) pathEdges.add(edgeKey(frame.path[i], frame.path[i + 1]));

  return (
    <div style={root}>
      <div style={rule}>
        <span style={{ color: "var(--ink-3)" }}>visit order</span> {meta.rule}
      </div>

      <svg viewBox="0 0 400 190" style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
        {EDGES.map(([a, b], i) => {
          const onPath = pathEdges.has(edgeKey(a, b));
          return (
            <motion.line
              key={i}
              x1={byId(a).x}
              y1={byId(a).y}
              x2={byId(b).x}
              y2={byId(b).y}
              animate={{ stroke: onPath ? "var(--accent)" : "var(--line)" }}
              transition={{ duration: 0.25 }}
              strokeWidth={onPath ? 3 : 1.5}
            />
          );
        })}
        {NODES.map((node) => {
          const isCurrent = node.id === frame.current;
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

      <div style={skeleton}>
        {SKELETON.map((line, i) => {
          const isVisit = line.visit !== undefined;
          const lit = line.visit === order;
          return (
            <div key={i} style={isVisit ? (lit ? lineLit : lineDim) : lineCode}>
              {line.code}
              {isVisit ? `   // ${META[line.visit!].name}` : ""}
            </div>
          );
        })}
      </div>

      <div style={strip}>
        <span className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>
          output
        </span>
        {frame.visited.map((id, i) => (
          <motion.span
            key={id}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            style={{ ...chip, ...(i === frame.visited.length - 1 ? chipCurrent : chipDone) }}
          >
            {byId(id).label}
          </motion.span>
        ))}
      </div>

      <div className="viz-label">
        visit <span className="viz-num">{currentNode.label}</span> ({meta.name} #
        <span className="viz-num">{frame.step + 1}</span>)
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
  gap: 14,
};

const rule: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 12.5,
  color: "var(--ink)",
  textAlign: "center",
};

const skeleton: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 12,
  lineHeight: 1.75,
  background: "var(--surface-2)",
  border: "1px solid var(--line)",
  borderRadius: 11,
  padding: "12px 14px",
  maxWidth: 320,
  width: "100%",
  margin: "0 auto",
  whiteSpace: "pre",
  overflowX: "auto",
};

const lineCode: CSSProperties = { color: "var(--ink-2)" };
const lineDim: CSSProperties = { color: "var(--ink-3)", opacity: 0.55 };
const lineLit: CSSProperties = {
  color: "var(--accent-ink)",
  fontWeight: 700,
  background: "var(--accent-soft)",
  borderRadius: 5,
  margin: "0 -4px",
  padding: "0 4px",
};

const strip: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  justifyContent: "center",
  flexWrap: "wrap",
};

const chip: CSSProperties = {
  minWidth: 28,
  height: 28,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  fontFamily: "var(--mono)",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--ink)",
  padding: "0 6px",
};

const chipDone: CSSProperties = { border: "1px solid var(--correct)", background: "var(--correct-soft)" };
const chipCurrent: CSSProperties = { border: "1px solid var(--accent-line)", background: "var(--accent-soft)" };
