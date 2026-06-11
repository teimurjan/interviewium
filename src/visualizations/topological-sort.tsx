import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Kahn's algorithm on a small DAG. Each step removes a zero-indegree node (it
 * fades from the graph into the output strip) and decrements its successors'
 * indegree badges. Ties break by alphabetical id for determinism.
 */
type Node = { id: string; x: number; y: number };
type Edge = { from: string; to: string };

const NODES: Node[] = [
  { id: "A", x: 50, y: 50 },
  { id: "B", x: 50, y: 160 },
  { id: "C", x: 175, y: 50 },
  { id: "D", x: 175, y: 160 },
  { id: "E", x: 300, y: 50 },
  { id: "F", x: 300, y: 160 },
];

const EDGES: Edge[] = [
  { from: "A", to: "C" },
  { from: "B", to: "C" },
  { from: "B", to: "D" },
  { from: "C", to: "E" },
  { from: "D", to: "E" },
  { from: "D", to: "F" },
];

type Frame = {
  removed: string[]; // output order so far (inclusive of this step)
  current: string;
  indeg: Record<string, number>;
};

const FRAMES: Frame[] = (() => {
  const indeg: Record<string, number> = {};
  for (const n of NODES) indeg[n.id] = 0;
  for (const e of EDGES) indeg[e.to]++;
  const removed: string[] = [];
  const frames: Frame[] = [];

  while (removed.length < NODES.length) {
    const ready = NODES.map((n) => n.id)
      .filter((id) => !removed.includes(id) && indeg[id] === 0)
      .sort();
    if (ready.length === 0) break;
    const current = ready[0];
    removed.push(current);
    for (const e of EDGES) if (e.from === current) indeg[e.to]--;
    frames.push({ removed: [...removed], current, indeg: { ...indeg } });
  }
  return frames;
})();

const W = 350;
const H = 215;
const R = 19;

export default function TopologicalSort() {
  const pb = usePlayback(FRAMES.length, 2400);
  const f = FRAMES[pb.step];
  const pos = (id: string) => NODES.find((n) => n.id === id)!;
  // a node is gone from the graph once it was removed on a prior step
  const removedBefore = f.removed.slice(0, -1);

  return (
    <div style={root}>
      <svg width={W} height={H} style={{ maxWidth: "100%", margin: "0 auto" }}>
        <defs>
          <marker id="topo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--line-2)" />
          </marker>
        </defs>
        {EDGES.map((e) => {
          const pa = pos(e.from);
          const pb2 = pos(e.to);
          const dx = pb2.x - pa.x;
          const dy = pb2.y - pa.y;
          const len = Math.hypot(dx, dy);
          const ux = dx / len;
          const uy = dy / len;
          const faded = removedBefore.includes(e.from);
          return (
            <line
              key={`${e.from}${e.to}`}
              x1={pa.x + ux * R}
              y1={pa.y + uy * R}
              x2={pb2.x - ux * (R + 6)}
              y2={pb2.y - uy * (R + 6)}
              stroke="var(--line-2)"
              strokeWidth={1.5}
              markerEnd="url(#topo-arrow)"
              style={{ transition: "opacity .4s", opacity: faded ? 0.18 : 1 }}
            />
          );
        })}
        {NODES.map((n) => {
          const gone = removedBefore.includes(n.id);
          const isCurrent = n.id === f.current;
          const ready = f.indeg[n.id] === 0 && !f.removed.includes(n.id);
          const fill = isCurrent ? "var(--accent-soft)" : ready ? "var(--correct-soft)" : "var(--surface-2)";
          const stroke = isCurrent ? "var(--accent)" : ready ? "var(--correct)" : "var(--line)";
          return (
            <motion.g key={n.id} animate={{ opacity: gone ? 0.12 : 1 }} transition={{ duration: 0.4 }}>
              <circle cx={n.x} cy={n.y} r={R} fill={fill} stroke={stroke} strokeWidth={2} style={{ transition: "fill .3s, stroke .3s" }} />
              <text x={n.x} y={n.y + 5} fill="var(--ink)" fontSize={14} fontWeight={700} textAnchor="middle">
                {n.id}
              </text>
              <circle cx={n.x + R - 2} cy={n.y - R + 2} r={9} fill="var(--surface)" stroke="var(--line-2)" strokeWidth={1} />
              <text x={n.x + R - 2} y={n.y - R + 6} fill="var(--ink-2)" fontSize={11} fontFamily="var(--mono)" textAnchor="middle">
                {Math.max(0, f.indeg[n.id])}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", minHeight: 34 }}>
        {f.removed.map((id) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            style={chip}
          >
            {id}
          </motion.div>
        ))}
      </div>

      <div className="viz-label">
        remove <span className="viz-num">{f.current}</span> (indegree 0)
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
  alignItems: "center",
  gap: 14,
};

const chip: CSSProperties = {
  width: 30,
  height: 30,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  background: "var(--accent-soft)",
  border: "1px solid var(--accent-line)",
  color: "var(--accent-ink)",
  fontFamily: "var(--mono)",
  fontSize: 14,
  fontWeight: 700,
};
