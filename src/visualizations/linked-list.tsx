import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Singly linked list reversal. Node boxes sit at fixed x-positions; each step
 * flips one link (curr.next = prev), then advances prev/curr. Forward links
 * point right, reversed links point left, tracked per step. prev/curr markers
 * slide between slots. The end state is the fully reversed list.
 */
const VALUES = [1, 2, 3, 4, 5];
const N = VALUES.length;

type Frame = {
  // reversed[i] === true means node i's arrow now points left (to its predecessor)
  reversed: boolean[];
  prev: number; // node index, or -1 for null
  curr: number; // node index, or N for null (done)
  label: string;
};

const FRAMES: Frame[] = (() => {
  const frames: Frame[] = [];
  const reversed = VALUES.map(() => false);
  let prev = -1;
  let curr = 0;
  frames.push({ reversed: [...reversed], prev, curr, label: "prev = null, curr = head" });
  while (curr < N) {
    reversed[curr] = true; // curr.next = prev
    frames.push({
      reversed: [...reversed],
      prev,
      curr,
      label: "curr.next = prev; advance",
    });
    prev = curr;
    curr += 1;
  }
  frames.push({ reversed: [...reversed], prev, curr, label: "curr = null → reversed" });
  return frames;
})();

const SLOT = 70;
const NODE = 40;
const WIDTH = N * SLOT;

export default function LinkedList() {
  const pb = usePlayback(FRAMES.length, 2000);
  const { reversed, prev, curr, label } = FRAMES[pb.step];

  return (
    <div style={root}>
      <div style={{ position: "relative", width: WIDTH, height: 110, margin: "0 auto" }}>
        {VALUES.map((v, i) => {
          const isCurr = i === curr;
          const isPrev = i === prev;
          const accent = isCurr ? "var(--accent)" : isPrev ? "var(--correct)" : "var(--line)";
          const tint = isCurr ? "var(--accent-soft)" : isPrev ? "var(--correct-soft)" : "var(--surface-2)";
          return (
            <div key={i} style={{ ...node, left: i * SLOT, background: tint, borderColor: accent }}>
              {v}
            </div>
          );
        })}

        {VALUES.slice(0, N - 1).map((_, i) => {
          const flipped = reversed[i];
          const midX = i * SLOT + NODE + (SLOT - NODE) / 2;
          return (
            <motion.div
              key={i}
              animate={{ rotate: flipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{
                ...arrow,
                left: midX - 9,
                color: flipped ? "var(--correct)" : "var(--ink-3)",
              }}
            >
              →
            </motion.div>
          );
        })}

        <Marker label="prev" index={prev} color="var(--correct)" />
        <Marker label="curr" index={curr} color="var(--accent)" />
      </div>

      <div className="viz-label">
        <span className="mono">{label}</span>
      </div>
      <PlaybackBar {...pb} />
    </div>
  );
}

function Marker({ label, index, color }: { label: string; index: number; color: string }) {
  const isNull = index < 0 || index >= N;
  return (
    <motion.div
      animate={{ x: isNull ? (index < 0 ? -SLOT * 0.7 : N * SLOT - SLOT * 0.3) : index * SLOT, opacity: isNull ? 0.45 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      style={{ ...marker, width: NODE, color }}
    >
      ▲ {label}
      {isNull && <span style={{ display: "block", fontSize: 10 }}>null</span>}
    </motion.div>
  );
}

const root: CSSProperties = {
  minHeight: 200,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 16,
};

const node: CSSProperties = {
  position: "absolute",
  top: 26,
  width: NODE,
  height: NODE,
  display: "grid",
  placeItems: "center",
  borderRadius: 11,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 15,
  fontWeight: 600,
  color: "var(--ink)",
  transition: "background .3s, border-color .3s",
};

const arrow: CSSProperties = {
  position: "absolute",
  top: 32,
  width: 18,
  textAlign: "center",
  fontFamily: "var(--mono)",
  fontSize: 18,
  fontWeight: 700,
};

const marker: CSSProperties = {
  position: "absolute",
  top: 74,
  left: 0,
  textAlign: "center",
  fontFamily: "var(--mono)",
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.2,
};
