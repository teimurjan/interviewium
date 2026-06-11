---
title: Tree BFS
emoji: 🌿
summary: Light every level before the next.
scene: Glass tiers of the conservatory light up one level at a time, every plant on a floor before the next floor wakes.
triggers: [level order, by level, shortest depth, right side view, zigzag, per row]
viz: tree-bfs
order: 2
---

## Ask yourself

1. Process tree level by level?
2. Min depth / level totals / row views?
3. Queue, capturing `len(queue)` per level.

## Canonical template

```ts
const q = [root];
for (let head = 0; head < q.length;) {
  const levelEnd = q.length;
  while (head < levelEnd) {
    const node = q[head++];
    for (const child of [node.left, node.right]) if (child) q.push(child);
  }
}
```

## Common pitfalls

> Not snapshotting level size before the inner loop.

> Enqueuing `None` children.
