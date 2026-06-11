import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Naive string matching — the pattern slides under the text one position at a
 * time. Each step compares characters at the current alignment: a run of
 * matches glows green, the first mismatch glows amber, then the pattern shifts
 * right by one. A full match lights the whole window.
 */
const TEXT = "ABACABABC";
const PATTERN = "ABABC";
const CELL = 38;
const GAP = 6;
const STRIDE = CELL + GAP;

type Frame = {
  shift: number;
  matched: number; // count of leading matched chars at this shift
  mismatch: number; // index into pattern of first mismatch, or -1 if full match
  full: boolean;
};

const PATH: Frame[] = (() => {
  const frames: Frame[] = [];
  const last = TEXT.length - PATTERN.length;
  for (let shift = 0; shift <= last; shift++) {
    let matched = 0;
    while (matched < PATTERN.length && TEXT[shift + matched] === PATTERN[matched]) {
      matched++;
    }
    const full = matched === PATTERN.length;
    frames.push({ shift, matched, mismatch: full ? -1 : matched, full });
    if (full) break;
  }
  return frames;
})();

export default function StringMatching() {
  const pb = usePlayback(PATH.length, 2400);
  const { shift, matched, mismatch, full } = PATH[pb.step];
  const rowWidth = TEXT.length * CELL + (TEXT.length - 1) * GAP;

  return (
    <div style={root}>
      <div style={{ position: "relative", width: rowWidth, height: CELL, margin: "0 auto" }}>
        {TEXT.split("").map((ch, idx) => {
          const inWindow = idx >= shift && idx < shift + PATTERN.length;
          const offset = idx - shift;
          const isMatch = inWindow && offset < matched;
          const isMismatch = inWindow && offset === mismatch;
          return (
            <div
              key={idx}
              style={{
                ...cell,
                left: idx * STRIDE,
                background: isMatch
                  ? "var(--correct-soft)"
                  : isMismatch
                    ? "var(--warn-soft)"
                    : "var(--surface-2)",
                borderColor: isMatch
                  ? "var(--correct)"
                  : isMismatch
                    ? "var(--warn)"
                    : "var(--line)",
                color: inWindow ? "var(--ink)" : "var(--ink-2)",
                transition: "background .3s, border-color .3s, color .3s",
              }}
            >
              {ch}
            </div>
          );
        })}
      </div>

      <motion.div
        animate={{ x: shift * STRIDE }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        style={{ position: "relative", height: CELL, width: rowWidth, margin: "0 auto" }}
      >
        {PATTERN.split("").map((ch, idx) => {
          const isMatch = idx < matched;
          const isMismatch = idx === mismatch;
          return (
            <div
              key={idx}
              style={{
                ...cell,
                left: idx * STRIDE,
                background: isMatch
                  ? "var(--correct-soft)"
                  : isMismatch
                    ? "var(--warn-soft)"
                    : "var(--accent-soft)",
                borderColor: isMatch
                  ? "var(--correct)"
                  : isMismatch
                    ? "var(--warn)"
                    : "var(--accent-line)",
                color: "var(--ink)",
                transition: "background .3s, border-color .3s",
              }}
            >
              {ch}
            </div>
          );
        })}
      </motion.div>

      <div className="viz-label">
        {full ? (
          <>
            match at index <span className="viz-num">{shift}</span> ✓
          </>
        ) : (
          <>
            mismatch at offset <span className="viz-num">{mismatch}</span> → shift
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
  top: 0,
  width: CELL,
  height: CELL,
  display: "grid",
  placeItems: "center",
  borderRadius: 9,
  border: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 15,
  fontWeight: 600,
};
