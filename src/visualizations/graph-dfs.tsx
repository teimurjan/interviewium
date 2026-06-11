import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Depth-first search on the same small undirected graph. The call stack is shown
 * as a vertical strip: each step either pushes the deepest unvisited neighbour
 * ("visit") or pops the top frame ("backtrack"), flashing the node it leaves.
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
  stack: number[];
  visited: number[];
  current: number;
  action: "visit" | "backtrack";
};

const PATH: Frame[] = (() => {
  const frames: Frame[] = [];
  const visited = new Set<number>();
  const stack: number[] = [SOURCE];
  visited.add(SOURCE);
  frames.push({ stack: [...stack], visited: [...visited], current: SOURCE, action: "visit" });

  while (stack.length) {
    const top = stack[stack.length - 1];
    const next = ADJ[top].find((n) => !visited.has(n));
    if (next === undefined) {
      stack.pop();
      frames.push({ stack: [...stack], visited: [...visited], current: top, action: "backtrack" });
    } else {
      visited.add(next);
      stack.push(next);
      frames.push({ stack: [...stack], visited: [...visited], current: next, action: "visit" });
    }
  }
  return frames;
})();

export default function GraphDfs() {
  const pb = usePlayback(PATH.length, 2400);
  const { stack, visited, current, action } = PATH[pb.step];
  const seen = new Set(visited);
  const onStack = new Set(stack);

  return (
    <div style={root}>
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 400 180" style={{ width: "100%", maxWidth: 360 }}>
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
            const isCurrent = node.id === current;
            const fill = isCurrent
              ? action === "backtrack"
                ? "var(--warn-soft)"
                : "var(--accent)"
              : onStack.has(node.id)
                ? "var(--accent-soft)"
                : seen.has(node.id)
                  ? "var(--correct-soft)"
                  : "var(--surface-2)";
            const stroke = isCurrent
              ? action === "backtrack"
                ? "var(--warn)"
                : "var(--accent)"
              : seen.has(node.id)
                ? "var(--correct)"
                : "var(--line-2)";
            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  initial={{ r: 15, fill: "var(--surface-2)", stroke: "var(--line-2)" }}
                  animate={{ r: isCurrent ? 19 : 15, fill, stroke }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  strokeWidth={isCurrent ? 2.5 : 1.5}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    fontWeight: 600,
                    fill: isCurrent && action === "visit" ? "var(--accent-ink)" : "var(--ink)",
                  }}
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>

        <div style={stackCol}>
          <span className="mono" style={{ color: "var(--ink-3)", fontSize: 11 }}>
            stack
          </span>
          {[...stack].reverse().map((id, idx) => (
            <motion.div
              key={id}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              style={{
                ...slot,
                borderColor: idx === 0 ? "var(--accent)" : "var(--accent-line)",
                background: idx === 0 ? "var(--accent-soft)" : "var(--surface-2)",
              }}
            >
              {id}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="viz-label">
        {action === "backtrack" ? "backtrack from " : "visit "}
        <span className="viz-num">{current}</span>
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

const stackCol: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 5,
  alignItems: "center",
  minWidth: 44,
};

const slot: CSSProperties = {
  width: 30,
  height: 30,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  border: "1px solid var(--accent-line)",
  fontFamily: "var(--mono)",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--ink)",
};
