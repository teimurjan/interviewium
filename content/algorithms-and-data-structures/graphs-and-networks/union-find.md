---
title: Union Find
emoji: 🪢
summary: A merchant ropes islands together.
scene: A weathered rope merchant lashes scattered islands together; ask him if two isles connect and he tugs one rope.
triggers: [connected?, groups, merge accounts, number of provinces, redundant connection, dynamic connectivity]
order: 3
---

## Ask yourself

1. Dynamically merging groups and asking "same set?"
2. Count components as edges arrive?
3. Find with path compression, union by rank.

## Canonical template

```ts
function find(x: number): number {
  while (parent[x] !== x) {
    parent[x] = parent[parent[x]];
    x = parent[x];
  }
  return x;
}

function union(a: number, b: number): boolean {
  const ra = find(a), rb = find(b);
  if (ra === rb) return false;
  parent[ra] = rb;
  return true;
}
```

## Common pitfalls

> No path compression → near-O(n) finds.

> Counting components wrong after unions.
