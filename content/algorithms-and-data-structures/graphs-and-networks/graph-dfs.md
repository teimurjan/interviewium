---
title: Graph DFS
emoji: 🕯️
summary: Down each tunnel to its dead end.
scene: A lone explorer descends into the catacombs, following each tunnel to its dead end by candlelight before turning back.
triggers: [connected components, islands, flood fill, cycle in graph, reachable, regions]
viz: graph-dfs
order: 1
---

## Ask yourself

1. Explore a maze/grid/graph fully?
2. Count components / islands / flood fill?
3. Mark visited; recurse to neighbours.

## Canonical template

```ts
function dfs(node: string): void {
  visited.add(node);
  for (const next of adj.get(node) ?? []) {
    if (!visited.has(next)) dfs(next);
  }
}
```

## Common pitfalls

> Forgetting visited → infinite recursion.

> Stack overflow on deep graphs (use iterative).
