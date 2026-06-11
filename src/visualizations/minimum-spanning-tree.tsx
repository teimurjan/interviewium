import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Kruskal's MST. Edges are scanned cheapest-first: accept (--correct) if the two
 * endpoints sit in different components, otherwise reject (--warn, struck) since
 * it would close a cycle. Running total accumulates accepted weights.
 */
type Node = { id: string; x: number; y: number };
type Edge = { a: string; b: string; w: number };

const NODES: Node[] = [
  { id: "A", x: 60, y: 50 },
  { id: "B", x: 200, y: 40 },
  { id: "C", x: 50, y: 170 },
  { id: "D", x: 190, y: 165 },
  { id: "E", x: 300, y: 105 },
];

const RAW: Edge[] = [
  { a: "A", b: "B", w: 6 },
  { a: "A", b: "C", w: 1 },
  { a: "B", b: "D", w: 5 },
  { a: "C", b: "D", w: 2 },
  { a: "B", b: "E", w: 4 },
  { a: "D", b: "E", w: 3 },
  { a: "C", b: "B", w: 7 },
];

const SORTED = [...RAW].sort((a, b) => a.w - b.w);

type Frame = {
  index: number; // edge being considered
  accept: boolean;
  total: number;
  acceptedKeys: string[];
};

const ekey = (e: Edge) => `${e.a}${e.b}`;

const FRAMES: Frame[] = (() => {
  const parent: Record<string, string> = {};
  for (const n of NODES) parent[n.id] = n.id;
  const find = (x: string): string => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const frames: Frame[] = [];
  const acceptedKeys: string[] = [];
  let total = 0;
  SORTED.forEach((e, index) => {
    const ra = find(e.a);
    const rb = find(e.b);
    const accept = ra !== rb;
    if (accept) {
      parent[ra] = rb;
      total += e.w;
      acceptedKeys.push(ekey(e));
    }
    frames.push({ index, accept, total, acceptedKeys: [...acceptedKeys] });
  });
  return frames;
})();

const W = 340;
const H = 220;
const R = 18;

export default function MinimumSpanningTree() {
  const pb = usePlayback(FRAMES.length, 2400);
  const f = FRAMES[pb.step];
  const considered = SORTED[f.index];
  const pos = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div style={root}>
      <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {SORTED.map((e, i) => {
            const isCur = i === f.index;
            const accepted = f.acceptedKeys.includes(ekey(e));
            const rejected = isCur && !f.accept;
            const color = accepted ? "var(--correct)" : rejected ? "var(--warn)" : "var(--ink-2)";
            const bg = isCur ? (f.accept ? "var(--correct-soft)" : "var(--warn-soft)") : "transparent";
            return (
              <div
                key={ekey(e)}
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "3px 9px",
                  borderRadius: 7,
                  background: bg,
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color,
                  textDecoration: rejected ? "line-through" : "none",
                  border: `1px solid ${isCur ? color : "transparent"}`,
                  transition: "background .3s, color .3s, border-color .3s",
                }}
              >
                <span>{e.a}–{e.b}</span>
                <span className="viz-num">{e.w}</span>
              </div>
            );
          })}
        </div>

        <svg width={W} height={H} style={{ maxWidth: "100%" }}>
          {SORTED.map((e) => {
            const pa = pos(e.a);
            const pb2 = pos(e.b);
            const accepted = f.acceptedKeys.includes(ekey(e));
            const isCur = e === considered;
            const stroke = accepted ? "var(--correct)" : isCur ? "var(--warn)" : "var(--line-2)";
            return (
              <line
                key={ekey(e)}
                x1={pa.x}
                y1={pa.y}
                x2={pb2.x}
                y2={pb2.y}
                stroke={stroke}
                strokeWidth={accepted ? 3 : 1.5}
                strokeDasharray={isCur && !f.accept ? "5 4" : undefined}
                style={{ transition: "stroke .3s, stroke-width .3s" }}
              />
            );
          })}
          {NODES.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={R} fill="var(--surface-2)" stroke="var(--line)" strokeWidth={2} />
              <text x={n.x} y={n.y + 5} fill="var(--ink)" fontSize={13} fontWeight={700} textAnchor="middle">
                {n.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <motion.div className="viz-label" key={pb.step} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
        {considered.a}–{considered.b} ({considered.w}): {f.accept ? "accept" : "reject — cycle"} · total{" "}
        <span className="viz-num">{f.total}</span>
      </motion.div>
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
  gap: 18,
};
