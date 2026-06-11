import type { CSSProperties, ReactElement } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Trie construction — words are inserted letter by letter. A letter that
 * already exists on the path is reused (its node glows accent); a new letter
 * grows a fresh node and edge into view. The final letter of each word marks a
 * word-end node with a correct-colored ring.
 */
type TrieNode = {
  id: string; // unique path key, e.g. "ca"
  letter: string;
  parent: string | null; // parent id, null for root
  x: number;
  y: number;
  end: boolean; // is a word-end after all inserts
};

const ROOT = "_root";

const NODES: TrieNode[] = [
  { id: ROOT, letter: "•", parent: null, x: 180, y: 30, end: false },
  { id: "c", letter: "c", parent: ROOT, x: 110, y: 84, end: false },
  { id: "ca", letter: "a", parent: "c", x: 110, y: 134, end: false },
  { id: "car", letter: "r", parent: "ca", x: 68, y: 186, end: true },
  { id: "cat", letter: "t", parent: "ca", x: 152, y: 186, end: true },
  { id: "d", letter: "d", parent: ROOT, x: 256, y: 84, end: false },
  { id: "do", letter: "o", parent: "d", x: 256, y: 134, end: false },
  { id: "dog", letter: "g", parent: "do", x: 256, y: 186, end: true },
];

const NODE_BY_ID = new Map(NODES.map((n) => [n.id, n]));

const WORDS = ["car", "cat", "dog"];

type Frame = {
  visible: Set<string>; // node ids present after this step
  active: string; // node id touched this step
  label: ReactElement;
};

const PATH: Frame[] = (() => {
  const frames: Frame[] = [];
  const visible = new Set<string>([ROOT]);
  for (const word of WORDS) {
    let path = "";
    for (let k = 0; k < word.length; k++) {
      path += word[k];
      const reuse = visible.has(path);
      visible.add(path);
      const last = k === word.length - 1;
      const label = last ? (
        <>
          '<span className="viz-num">{word}</span>' complete ✓
        </>
      ) : reuse ? (
        <>
          insert '<span className="viz-num">{word[k]}</span>' (reuse)
        </>
      ) : (
        <>
          insert '<span className="viz-num">{word[k]}</span>' (new branch)
        </>
      );
      frames.push({ visible: new Set(visible), active: path, label });
    }
  }
  return frames;
})();

export default function Trie() {
  const pb = usePlayback(PATH.length, 2200);
  const { visible, active, label } = PATH[pb.step];

  return (
    <div style={root}>
      <svg viewBox="0 0 360 216" style={{ width: "100%", maxWidth: 360, margin: "0 auto" }}>
        {NODES.filter((n) => n.parent && visible.has(n.id)).map((n) => {
          const p = NODE_BY_ID.get(n.parent!)!;
          const isActiveEdge = n.id === active;
          return (
            <motion.line
              key={`edge-${n.id}`}
              x1={p.x}
              y1={p.y}
              x2={n.x}
              y2={n.y}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              stroke={isActiveEdge ? "var(--accent)" : "var(--line-2)"}
              strokeWidth={isActiveEdge ? 2.5 : 1.5}
            />
          );
        })}

        <AnimatePresence>
          {NODES.filter((n) => visible.has(n.id)).map((n) => {
            const isActive = n.id === active;
            const isEnd = n.end;
            return (
              <motion.g
                key={`node-${n.id}`}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                {isEnd && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={18}
                    fill="none"
                    stroke="var(--correct)"
                    strokeWidth={2}
                  />
                )}
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  initial={{ r: 13, fill: "var(--surface-2)", stroke: "var(--line-2)" }}
                  animate={{
                    r: isActive ? 16 : 13,
                    fill: isActive
                      ? "var(--accent-soft)"
                      : isEnd
                        ? "var(--correct-soft)"
                        : "var(--surface-2)",
                    stroke: isActive ? "var(--accent)" : isEnd ? "var(--correct)" : "var(--line-2)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    fontWeight: 600,
                    fill: n.id === ROOT ? "var(--ink-3)" : "var(--ink)",
                  }}
                >
                  {n.letter}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>

      <div className="viz-label">{label}</div>
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
