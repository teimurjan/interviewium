import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * 2D grid path counting: dp[r][c] = dp[r-1][c] + dp[r][c-1], with the first row
 * and column seeded to 1. The bottom-right cell holds the total path count.
 */
const ROWS = 3;
const COLS = 4;
const CELL = 48;
const GAP = 10;
const STRIDE = CELL + GAP;

const GRID: number[][] = (() => {
  const g: number[][] = [];
  for (let r = 0; r < ROWS; r++) {
    g[r] = [];
    for (let c = 0; c < COLS; c++) {
      g[r][c] = r === 0 || c === 0 ? 1 : g[r - 1][c] + g[r][c - 1];
    }
  }
  return g;
})();

const STEPS = ROWS * COLS;

export default function Dp2d() {
  const pb = usePlayback(STEPS, 1700);
  const r = Math.floor(pb.step / COLS);
  const c = pb.step % COLS;
  const interior = r > 0 && c > 0;
  const value = GRID[r][c];

  const gridWidth = COLS * CELL + (COLS - 1) * GAP;
  const gridHeight = ROWS * CELL + (ROWS - 1) * GAP;

  return (
    <div style={root}>
      <div style={{ position: "relative", width: gridWidth, height: gridHeight, margin: "0 auto" }}>
        {GRID.map((row, ri) =>
          row.map((v, ci) => {
            const index = ri * COLS + ci;
            const shown = index <= pb.step;
            const isCurrent = ri === r && ci === c;
            const isSource = interior && ((ri === r - 1 && ci === c) || (ri === r && ci === c - 1));
            const bg = isCurrent ? "var(--accent-soft)" : isSource ? "var(--correct-soft)" : "var(--surface-2)";
            const border = isCurrent ? "var(--accent)" : isSource ? "var(--correct)" : "var(--line)";
            return (
              <motion.div
                key={`${ri}-${ci}`}
                initial={false}
                animate={{ opacity: shown ? 1 : 0.18, scale: isCurrent ? 1.08 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                style={{
                  ...cell,
                  left: ci * STRIDE,
                  top: ri * STRIDE,
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
      </div>

      <div className="viz-label">
        {interior ? (
          <>
            <span className="mono">
              dp[{r}][{c}]
            </span>{" "}
            = dp[{r - 1}][{c}] + dp[{r}][{c - 1}] = {GRID[r - 1][c]} + {GRID[r][c - 1]} ={" "}
            <span className="viz-num">{value}</span>
          </>
        ) : (
          <>
            edge cell{" "}
            <span className="mono">
              dp[{r}][{c}]
            </span>{" "}
            = <span className="viz-num">1</span>
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
  borderRadius: 11,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 15,
  fontWeight: 600,
  transition: "background .3s, border-color .3s, color .3s",
};
