---
title: Dijkstra
emoji: 🧭
summary: Always extend the cheapest route first.
scene: From the observatory dome, a navigator always charts the cheapest unexplored route across the star-map first.
triggers: [shortest path, weighted, minimum cost, cheapest, non-negative weights, fastest]
viz: dijkstra
order: 5
---

## Ask yourself

1. Shortest path with WEIGHTED, non-negative edges?
2. Minimum cost / time to reach a target?
3. Min-heap of `(dist, node)`, relax neighbours.

## Classic problem

**Network Delay Time** (LeetCode 743) — signals start at node `k`; return the time for
all `n` nodes to receive it, or `-1` if some node is unreachable.

```ts
class Heap<T> {
  private items: T[] = [];
  constructor(private compare: (a: T, b: T) => number) {}
  size(): number { return this.items.length; }
  push(value: T): void {
    const h = this.items;
    h.push(value);
    let i = h.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(h[i], h[parent]) >= 0) break;
      [h[i], h[parent]] = [h[parent], h[i]];
      i = parent;
    }
  }
  pop(): T {
    const h = this.items;
    const top = h[0];
    const last = h.pop()!;
    if (h.length) {
      h[0] = last;
      let i = 0;
      for (;;) {
        const left = 2 * i + 1, right = 2 * i + 2;
        let smallest = i;
        if (left < h.length && this.compare(h[left], h[smallest]) < 0) smallest = left;
        if (right < h.length && this.compare(h[right], h[smallest]) < 0) smallest = right;
        if (smallest === i) break;
        [h[i], h[smallest]] = [h[smallest], h[i]];
        i = smallest;
      }
    }
    return top;
  }
}

function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj = new Map<number, Array<[number, number]>>(); // node → [neighbour, weight]
  for (const [u, v, w] of times) {
    if (!adj.has(u)) adj.set(u, []);
    adj.get(u)!.push([v, w]);
  }

  const dist = new Map<number, number>();
  const pq = new Heap<[number, number]>((a, b) => a[0] - b[0]); // [dist, node]
  pq.push([0, k]);

  while (pq.size()) {
    const [d, node] = pq.pop()!;
    if (dist.has(node)) continue;          // first pop of a node is its shortest dist
    dist.set(node, d);
    for (const [next, weight] of adj.get(node) ?? []) {
      if (!dist.has(next)) pq.push([d + weight, next]);
    }
  }

  if (dist.size < n) return -1;            // someone never heard the signal
  return Math.max(...dist.values());
}
```

## Common pitfalls

> Using on negative weights (use Bellman-Ford).

> Not skipping stale heap entries.
