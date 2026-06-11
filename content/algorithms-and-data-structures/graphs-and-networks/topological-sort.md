---
title: Topological Sort
emoji: 🛠️
summary: Fit each part before what needs it.
scene: On the workshop bench, every part must be fitted before the part that depends on it — assembly in strict order.
triggers: [prerequisites, ordering, course schedule, dependencies, build order, DAG]
order: 4
---

## Ask yourself

1. Ordering with "must come before" constraints?
2. Course schedule / build dependencies?
3. Kahn's BFS on in-degrees, or DFS post-order.

## Canonical template

```ts
const q = nodes.filter((node) => indegree.get(node) === 0);
const order: string[] = [];
for (let head = 0; head < q.length; head++) {
  const node = q[head];
  order.push(node);
  for (const next of adj.get(node) ?? []) {
    indegree.set(next, (indegree.get(next) ?? 0) - 1);
    if (indegree.get(next) === 0) q.push(next);
  }
}
```

## Common pitfalls

> Cycle → fewer nodes in order than total (detect it).

> Forgetting to build in-degrees first.
