import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlaybackBar, usePlayback } from "./playback";

/**
 * Prefix sum — each running total is built from the one before it plus the next
 * value (pre[i] = pre[i−1] + a[i]), filling left to right. Once built, any range
 * total is one subtraction: sum(i..j) = pre[j] − pre[i−1].
 */
const VALUES = [3, 1, 4, 1, 5, 2];
const PREFIX = VALUES.reduce<number[]>((acc, v, i) => [...acc, (acc[i - 1] ?? 0) + v], []);
const QI = 1;
const QJ = 4;
const RESULT = PREFIX[QJ] - PREFIX[QI - 1];
const CELL = 44;
const GAP = 8;
const STRIDE = CELL + GAP;
const STEPS = VALUES.length + 1; // fill each prefix, then the query frame

export default function PrefixSum() {
  const pb = usePlayback(STEPS, 1900);
  const step = pb.step;
  const query = step === VALUES.length;
  const cur = query ? -1 : step; // index of the prefix being computed this step
  const filled = query ? VALUES.length : step + 1;
  const rowWidth = VALUES.length * CELL + (VALUES.length - 1) * GAP;

  return (
    <div style={root}>
      <div style={{ position: "relative", width: rowWidth, height: CELL * 2 + 24, margin: "0 auto" }}>
        <Tag y={-2} text="a" />
        {VALUES.map((v, idx) => {
          const inRange = query && idx >= QI && idx <= QJ;
          const adding = idx === cur; // the value being added into the running total
          return (
            <div
              key={`v${idx}`}
              style={{
                ...cell,
                top: 0,
                left: idx * STRIDE,
                background: inRange || adding ? "var(--accent-soft)" : "var(--surface-2)",
                borderColor: inRange || adding ? "var(--accent)" : "var(--line)",
                color: inRange || adding ? "var(--accent-ink)" : "var(--ink-2)",
                transition: "background .3s, border-color .3s, color .3s",
              }}
            >
              {v}
            </div>
          );
        })}

        <Tag y={CELL + 24 - 2} text="pre" />
        {PREFIX.map((p, idx) => {
          const shown = idx < filled;
          const isEndpoint = query && (idx === QJ || idx === QI - 1);
          const isNew = idx === cur; // running total just computed this step
          const isPrev = !query && idx === cur - 1; // pre[i−1] feeding the sum
          const stroke = isEndpoint || isNew
            ? "var(--correct)"
            : isPrev
              ? "var(--accent)"
              : "var(--line)";
          const fill = isEndpoint || isNew
            ? "var(--correct-soft)"
            : isPrev
              ? "var(--accent-soft)"
              : "var(--surface)";
          return (
            <motion.div
              key={`p${idx}`}
              initial={false}
              animate={{ opacity: shown ? 1 : 0.18, scale: isNew ? 1.08 : shown ? 1 : 0.85 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{
                ...cell,
                top: CELL + 24,
                left: idx * STRIDE,
                background: fill,
                borderColor: stroke,
                color: "var(--ink)",
              }}
            >
              {p}
            </motion.div>
          );
        })}
      </div>

      <div className="viz-label">
        {query ? (
          <>
            sum({QI}..{QJ}) = pre[{QJ}] − pre[{QI - 1}] = {PREFIX[QJ]} − {PREFIX[QI - 1]} ={" "}
            <span className="viz-num">{RESULT}</span>
          </>
        ) : cur === 0 ? (
          <>
            pre[0] = a[0] = <span className="viz-num">{PREFIX[0]}</span>
          </>
        ) : (
          <>
            pre[{cur}] = pre[{cur - 1}] + a[{cur}] = {PREFIX[cur - 1]} + {VALUES[cur]} ={" "}
            <span className="viz-num">{PREFIX[cur]}</span>
          </>
        )}
      </div>
      <PlaybackBar {...pb} />
    </div>
  );
}

function Tag({ y, text }: { y: number; text: string }) {
  return (
    <span
      style={{
        position: "absolute",
        left: -34,
        top: y,
        height: CELL,
        display: "grid",
        placeItems: "center",
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: "var(--ink-3)",
      }}
    >
      {text}
    </span>
  );
}

const root: CSSProperties = {
  minHeight: 184,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 22,
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
};
