---
title: Dijkstra
emoji: 🧭
summary: Always extend the cheapest route first.
scene: From the observatory dome, a navigator always charts the cheapest unexplored route across the star-map first.
triggers: [shortest path, weighted, minimum cost, cheapest, non-negative weights, fastest]
order: 5
---

## Ask yourself

1. Shortest path with WEIGHTED, non-negative edges?
2. Minimum cost / time to reach a target?
3. Min-heap of `(dist, node)`, relax neighbours.

## Canonical template

```ts
const dist = new Map<string, number>([[start, 0]]);
const pq = new MinHeap<[number, string]>((a, b) => a[0] - b[0]);
pq.push([0, start]);

while (pq.size()) {
  const [d, node] = pq.pop()!;
  if (d > (dist.get(node) ?? Infinity)) continue;
  for (const [next, weight] of adj.get(node) ?? []) {
    const nd = d + weight;
    if (nd < (dist.get(next) ?? Infinity)) {
      dist.set(next, nd);
      pq.push([nd, next]);
    }
  }
}
```

## Common pitfalls

> Using on negative weights (use Bellman-Ford).

> Not skipping stale heap entries.
