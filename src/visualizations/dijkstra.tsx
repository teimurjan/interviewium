import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Dijkstra on a small weighted undirected graph. Each step settles the nearest
 * unsettled node (turns it --correct) then relaxes its edges, flashing any
 * neighbour whose tentative distance improves.
 */
type Node = { id: string; x: number; y: number };
type Edge = { a: string; b: string; w: number };

const NODES: Node[] = [
  { id: "A", x: 60, y: 110 },
  { id: "B", x: 170, y: 40 },
  { id: "C", x: 170, y: 180 },
  { id: "D", x: 300, y: 90 },
  { id: "E", x: 360, y: 180 },
];

const EDGES: Edge[] = [
  { a: "A", b: "B", w: 4 },
  { a: "A", b: "C", w: 2 },
  { a: "B", b: "D", w: 5 },
  { a: "C", b: "B", w: 1 },
  { a: "C", b: "D", w: 8 },
  { a: "D", b: "E", w: 3 },
];

const INF = Infinity;
const START = "A";

type Frame = {
  dist: Record<string, number>;
  settled: string[];
  current: string;
  d: number;
  relaxed: string[]; // edge keys "a-b" improved this step
};

const ekey = (a: string, b: string) => [a, b].sort().join("-");

const FRAMES: Frame[] = (() => {
  const dist: Record<string, number> = {};
  for (const n of NODES) dist[n.id] = INF;
  dist[START] = 0;
  const settled = new Set<string>();
  const frames: Frame[] = [];

  while (settled.size < NODES.length) {
    let cur = "";
    let best = INF;
    for (const n of NODES) {
      if (!settled.has(n.id) && dist[n.id] < best) {
        best = dist[n.id];
        cur = n.id;
      }
    }
    if (cur === "") break;
    settled.add(cur);
    const relaxed: string[] = [];
    for (const e of EDGES) {
      let other = "";
      if (e.a === cur) other = e.b;
      else if (e.b === cur) other = e.a;
      else continue;
      if (settled.has(other)) continue;
      const cand = dist[cur] + e.w;
      if (cand < dist[other]) {
        dist[other] = cand;
        relaxed.push(ekey(cur, other));
      }
    }
    frames.push({
      dist: { ...dist },
      settled: [...settled],
      current: cur,
      d: best,
      relaxed,
    });
  }
  return frames;
})();

const W = 420;
const H = 220;
const R = 20;

export default function Dijkstra() {
  const pb = usePlayback(FRAMES.length, 2400);
  const f = FRAMES[pb.step];
  const pos = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div style={root}>
      <svg width={W} height={H} style={{ maxWidth: "100%", margin: "0 auto" }}>
        {EDGES.map((e) => {
          const pa = pos(e.a);
          const pb2 = pos(e.b);
          const improved = f.relaxed.includes(ekey(e.a, e.b));
          return (
            <g key={`${e.a}${e.b}`}>
              <line
                x1={pa.x}
                y1={pa.y}
                x2={pb2.x}
                y2={pb2.y}
                stroke={improved ? "var(--accent)" : "var(--line-2)"}
                strokeWidth={improved ? 3 : 1.5}
                style={{ transition: "stroke .3s, stroke-width .3s" }}
              />
              <text
                x={(pa.x + pb2.x) / 2}
                y={(pa.y + pb2.y) / 2 - 4}
                fill="var(--ink-3)"
                fontSize={12}
                fontFamily="var(--mono)"
                textAnchor="middle"
              >
                {e.w}
              </text>
            </g>
          );
        })}
        {NODES.map((n) => {
          const isSettled = f.settled.includes(n.id);
          const isCurrent = n.id === f.current;
          const fill = isCurrent ? "var(--accent-soft)" : isSettled ? "var(--correct-soft)" : "var(--surface-2)";
          const stroke = isCurrent ? "var(--accent)" : isSettled ? "var(--correct)" : "var(--line)";
          const d = f.dist[n.id];
          return (
            <g key={n.id}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={R}
                animate={{ scale: isCurrent ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ fill, stroke, strokeWidth: 2, originX: `${n.x}px`, originY: `${n.y}px` }}
              />
              <text x={n.x} y={n.y + 5} fill="var(--ink)" fontSize={14} fontWeight={700} textAnchor="middle">
                {n.id}
              </text>
              <text
                x={n.x}
                y={n.y - R - 6}
                fill={d === INF ? "var(--ink-3)" : "var(--ink-2)"}
                fontSize={12}
                fontFamily="var(--mono)"
                textAnchor="middle"
              >
                {d === INF ? "∞" : d}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="viz-label">
        settle <span className="viz-num">{f.current}</span> at dist <span className="mono">{f.d}</span>
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
  gap: 18,
};
