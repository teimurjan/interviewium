import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Playback state shared by every visualization: an auto-advancing step counter
 * plus scrub + speed + play/pause controls. `baseMs` is the 1x dwell time per
 * step; speed multiplies it (2x is the default cadence).
 */
export type Playback = {
  step: number;
  steps: number;
  playing: boolean;
  speed: number;
  toggle: () => void;
  scrubTo: (s: number) => void;
  setSpeed: (m: number) => void;
};

const SPEEDS = [1, 2, 3];

export function usePlayback(steps: number, baseMs = 2200): Playback {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(2);

  useEffect(() => {
    if (reduce || !playing || steps <= 1) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps), baseMs / speed);
    return () => clearInterval(id);
  }, [reduce, playing, speed, steps, baseMs]);

  return {
    step,
    steps,
    playing,
    speed,
    toggle: () => setPlaying((p) => !p),
    scrubTo: (s) => {
      setPlaying(false);
      setStep(s);
    },
    setSpeed,
  };
}

export function PlaybackBar({ step, steps, playing, speed, toggle, scrubTo, setSpeed }: Playback) {
  return (
    <div className="viz-controls">
      <button className="viz-play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
        {playing ? "❚❚" : "▶"}
      </button>
      <input
        type="range"
        min={0}
        max={steps - 1}
        value={step}
        aria-label="Scrub animation step"
        onChange={(e) => scrubTo(Number(e.target.value))}
      />
      <div className="viz-speeds">
        {SPEEDS.map((m) => (
          <button
            key={m}
            onClick={() => setSpeed(m)}
            aria-pressed={speed === m}
            className={speed === m ? "is-active" : ""}
          >
            {m}x
          </button>
        ))}
      </div>
    </div>
  );
}
