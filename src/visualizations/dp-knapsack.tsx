import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * 0/1 knapsack table: rows are items, columns are capacities 0..CAP. Each cell
 * dp[i][c] = max(skip = dp[i-1][c], take = value + dp[i-1][c-weight]).
 */
type Item = { w: number; v: number };
const ITEMS: Item[] = [
  { w: 1, v: 1 },
  { w: 2, v: 3 },
  { w: 3, v: 4 },
  { w: 2, v: 2 },
];
const CAP = 5;
const ROWS = ITEMS.length + 1; // row 0 = empty knapsack
const COLS = CAP + 1;
const CELL = 40;
const GAP = 6;
const STRIDE = CELL + GAP;
const LABEL_W = 56;

type Frame = {
  i: number; // item row (1..ITEMS.length)
  c: number; // capacity column
  value: number;
  skip: number;
  take: number | null; // null when item doesn't fit
  took: boolean;
};

const TABLE: number[][] = [];
const FRAMES: Frame[] = [];
(() => {
  for (let i = 0; i < ROWS; i++) {
    TABLE[i] = new Array<number>(COLS).fill(0);
  }
  for (let i = 1; i < ROWS; i++) {
    const { w, v } = ITEMS[i - 1];
    for (let c = 0; c < COLS; c++) {
      const skip = TABLE[i - 1][c];
      const fits = w <= c;
      const take = fits ? v + TABLE[i - 1][c - w] : null;
      const took = take !== null && take > skip;
      const value = took ? (take as number) : skip;
      TABLE[i][c] = value;
      FRAMES.push({ i, c, value, skip, take, took });
    }
  }
})();

export default function DpKnapsack() {
  const pb = usePlayback(FRAMES.length, 1500);
  const frame = FRAMES[pb.step];
  const totalCols = LABEL_W + COLS * CELL + (COLS - 1) * GAP;
  const totalRows = 26 + ROWS * CELL + (ROWS - 1) * GAP;

  return (
    <div style={root}>
      <div style={{ position: "relative", width: totalCols, height: totalRows, margin: "0 auto" }}>
        {Array.from({ length: COLS }, (_, c) => (
          <span key={`h${c}`} style={{ ...header, left: LABEL_W + c * STRIDE }}>
            {c}
          </span>
        ))}

        {TABLE.map((row, i) =>
          row.map((v, c) => {
            const filledIndex = (i - 1) * COLS + c; // index in FRAMES this cell fills
            const shown = i === 0 || filledIndex <= pb.step;
            const isCurrent = i === frame.i && c === frame.c;
            const isSkip = i === frame.i - 1 && c === frame.c; // dp[i-1][c]
            const isTake = frame.take !== null && i === frame.i - 1 && c === frame.c - ITEMS[frame.i - 1].w;
            const chosenSource = (frame.took && isTake) || (!frame.took && isSkip);
            const candidate = (isSkip || isTake) && !chosenSource; // compared but not picked
            const bg = isCurrent
              ? "var(--accent-soft)"
              : chosenSource
                ? "var(--correct-soft)"
                : candidate
                  ? "var(--warn-soft)"
                  : "var(--surface-2)";
            const border = isCurrent
              ? "var(--accent)"
              : chosenSource
                ? "var(--correct)"
                : candidate
                  ? "var(--warn)"
                  : "var(--line)";
            return (
              <motion.div
                key={`${i}-${c}`}
                initial={false}
                animate={{ opacity: shown ? 1 : 0.16, scale: isCurrent ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                style={{
                  ...cell,
                  left: LABEL_W + c * STRIDE,
                  top: 26 + i * STRIDE,
                  background: bg,
                  borderColor: border,
                  color: shown ? "var(--ink)" : "var(--ink-3)",
                }}
              >
                {v}
              </motion.div>
            );
          }),
        )}

        {ITEMS.map((it, idx) => (
          <span key={`r${idx}`} style={{ ...rowLabel, top: 26 + (idx + 1) * STRIDE }}>
            w{it.w}/v{it.v}
          </span>
        ))}
        <span style={{ ...rowLabel, top: 26 }}>—</span>
      </div>

      <div className="viz-label">
        item <span className="mono">w{ITEMS[frame.i - 1].w}/v{ITEMS[frame.i - 1].v}</span> at cap {frame.c}:{" "}
        {frame.took ? (
          <>
            take → <span className="viz-num">{frame.value}</span>
          </>
        ) : (
          <>
            skip → <span className="viz-num">{frame.value}</span>
          </>
        )}
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
  gap: 18,
};

const cell: CSSProperties = {
  position: "absolute",
  width: CELL,
  height: CELL,
  display: "grid",
  placeItems: "center",
  borderRadius: 9,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 14,
  fontWeight: 600,
  transition: "background .3s, border-color .3s, color .3s",
};

const header: CSSProperties = {
  position: "absolute",
  top: 0,
  width: CELL,
  height: 22,
  display: "grid",
  placeItems: "center",
  fontFamily: "var(--mono)",
  fontSize: 11,
  color: "var(--ink-3)",
};

const rowLabel: CSSProperties = {
  position: "absolute",
  left: 0,
  width: LABEL_W - 8,
  height: CELL,
  display: "grid",
  placeItems: "center",
  fontFamily: "var(--mono)",
  fontSize: 11,
  color: "var(--ink-3)",
};
