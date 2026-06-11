---
title: Graph BFS
emoji: 📡
summary: Signal ripples outward, ring by ring.
scene: A radio tower in the attic pulses signal outward ring by ring — the nearest rooftops light first, the farthest last.
triggers: [shortest path, fewest steps, minimum moves, unweighted, nearest, spread]
viz: graph-bfs
order: 2
---

## Ask yourself

1. Shortest path / fewest steps in an UNWEIGHTED graph?
2. Spread / infection / multi-source expansion?
3. Queue, track distance per layer.

## Canonical template

```ts
const q: Array<[string, number]> = [[start, 0]];
const seen = new Set([start]);
for (let head = 0; head < q.length; head++) {
  const [node, dist] = q[head];
  for (const next of adj.get(node) ?? []) {
    if (!seen.has(next)) {
      seen.add(next);
      q.push([next, dist + 1]);
    }
  }
}
```

## Common pitfalls

> Marking visited at dequeue, not enqueue (dupes blow up).

> Using BFS on a weighted graph (need Dijkstra).
