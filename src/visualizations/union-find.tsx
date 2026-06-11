import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Union-Find / disjoint sets. A sequence of unions merges components; each set
 * gets a stable colour, and on every union the smaller group recolours to the
 * survivor's colour and the nodes reflow (layout) into shared rows. The final
 * step answers a connected? query.
 */
const ELEMENTS = ["0", "1", "2", "3", "4", "5"];

const UNIONS: Array<[string, string]> = [
  ["0", "1"],
  ["2", "3"],
  ["1", "3"],
  ["4", "5"],
];

const QUERY: [string, string] = ["0", "2"];

const COLORS = ["var(--accent)", "var(--correct)", "var(--warn)", "var(--ink-2)", "var(--accent-ink)", "var(--ink-3)"];

type Op = { kind: "union"; a: string; b: string } | { kind: "query"; a: string; b: string };
const OPS: Op[] = [...UNIONS.map(([a, b]) => ({ kind: "union" as const, a, b })), { kind: "query", a: QUERY[0], b: QUERY[1] }];

type Frame = {
  op: Op;
  root: Record<string, string>; // element -> representative
  groups: string[][]; // partition, each sorted
  label: string;
  connected: boolean | null;
};

const FRAMES: Frame[] = (() => {
  const parent: Record<string, string> = {};
  for (const e of ELEMENTS) parent[e] = e;
  const find = (x: string): string => (parent[x] === x ? x : (parent[x] = find(parent[x])));

  const snapshot = (): { root: Record<string, string>; groups: string[][] } => {
    const root: Record<string, string> = {};
    const byRoot: Record<string, string[]> = {};
    for (const e of ELEMENTS) {
      const r = find(e);
      root[e] = r;
      (byRoot[r] ??= []).push(e);
    }
    const groups = Object.values(byRoot).map((g) => [...g].sort());
    groups.sort((a, b) => a[0].localeCompare(b[0]));
    return { root, groups };
  };

  const frames: Frame[] = [];
  for (const op of OPS) {
    if (op.kind === "union") {
      const ra = find(op.a);
      const rb = find(op.b);
      if (ra !== rb) parent[ra] = rb;
      const { root, groups } = snapshot();
      const set = groups.find((g) => g.includes(op.a))!;
      frames.push({
        op,
        root,
        groups,
        label: `union(${op.a}, ${op.b}) → {${set.join(", ")}}`,
        connected: null,
      });
    } else {
      const connected = find(op.a) === find(op.b);
      const { root, groups } = snapshot();
      frames.push({
        op,
        root,
        groups,
        label: `connected(${op.a}, ${op.b})? → ${connected ? "yes" : "no"}`,
        connected,
      });
    }
  }
  return frames;
})();

// stable colour per representative across frames
const rootColor = (root: string) => COLORS[ELEMENTS.indexOf(root) % COLORS.length];

export default function UnionFind() {
  const pb = usePlayback(FRAMES.length, 2500);
  const f = FRAMES[pb.step];
  const touched = new Set([f.op.a, f.op.b]);

  return (
    <div style={root}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", minHeight: 90 }}>
        {f.groups.map((group) => {
          const rep = f.root[group[0]];
          const color = rootColor(rep);
          return (
            <motion.div
              key={rep}
              layout
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              style={{
                display: "flex",
                gap: 6,
                padding: 8,
                borderRadius: 12,
                border: `1.5px solid ${color}`,
                background: "var(--surface-2)",
              }}
            >
              {group.map((el) => {
                const hot = f.op.kind === "union" && touched.has(el);
                return (
                  <motion.div
                    key={el}
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    animate={{ scale: hot ? 1.1 : 1 }}
                    style={{
                      ...node,
                      borderColor: color,
                      color,
                      background: hot ? "var(--accent-soft)" : "var(--surface)",
                    }}
                  >
                    {el}
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="viz-label"
        key={pb.step}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        style={{
          color: f.connected === null ? undefined : f.connected ? "var(--correct)" : "var(--warn)",
        }}
      >
        <span className="mono">{f.label}</span>
      </motion.div>
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

const node: CSSProperties = {
  width: 38,
  height: 38,
  display: "grid",
  placeItems: "center",
  borderRadius: 9,
  border: "1.5px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 15,
  fontWeight: 700,
  transition: "background .3s",
};
