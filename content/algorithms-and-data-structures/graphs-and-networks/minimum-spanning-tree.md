---
title: Minimum Spanning Tree
emoji: 🌉
summary: Connect every island as cheaply as possible.
scene: Bridge builders sort every possible bridge by price and accept only bridges that join separate islands.
triggers: [connect all, minimum cost, spanning tree, Kruskal, Prim, edges]
viz: minimum-spanning-tree
order: 7
---

## Ask yourself

1. Must all nodes be connected with minimum total edge cost?
2. Are edges undirected?
3. Can sorted edges plus union find avoid cycles?

## Classic problem

**Min Cost to Connect All Points** (LeetCode 1584) — connect every point with the
minimum total Manhattan distance. Kruskal: sort edges, add the cheapest that joins two
separate groups.

```ts
function minCostConnectPoints(points: number[][]): number {
  const n = points.length;

  const edges: Array<[number, number, number]> = []; // [cost, i, j]
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const cost = Math.abs(points[i][0] - points[j][0]) +
                   Math.abs(points[i][1] - points[j][1]);
      edges.push([cost, i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);

  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  };

  let total = 0, used = 0;
  for (const [cost, i, j] of edges) {
    const ri = find(i), rj = find(j);
    if (ri === rj) continue;            // already connected → skip to avoid a cycle
    parent[ri] = rj;
    total += cost;
    if (++used === n - 1) break;        // n-1 edges spans every node
  }

  return total;
}
```

## Common pitfalls

> Applying MST to shortest-path questions.

> Forgetting to verify every node became connected.
