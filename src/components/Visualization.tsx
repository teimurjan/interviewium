import { useEffect, useState } from "react";
import { visualizations } from "../visualizations";

/**
 * Inline lesson visualization. Renders the registered motion component for the
 * given key, client-only: a fixed-height skeleton is shown on the server and
 * first paint, then the component mounts after hydration. This keeps the
 * prerendered HTML deterministic and avoids animation-driven hydration drift.
 */
export function Visualization({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const Component = visualizations[slug];
  if (!Component) return null;

  return (
    <figure className="viz">
      <figcaption className="eyebrow viz-caption">Watch it run</figcaption>
      <div className="viz-stage">{mounted ? <Component /> : <div className="viz-skeleton" />}</div>
    </figure>
  );
}
