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

## Canonical template

```ts
edges.sort((a, b) => a.cost - b.cost);
let total = 0;
for (const edge of edges) {
  if (union(edge.u, edge.v)) total += edge.cost;
}
return total;
```

## Common pitfalls

> Applying MST to shortest-path questions.

> Forgetting to verify every node became connected.
