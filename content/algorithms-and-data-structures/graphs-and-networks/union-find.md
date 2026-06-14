---
title: Union Find
emoji: 🪢
summary: A merchant ropes islands together.
scene: A weathered rope merchant lashes scattered islands together; ask him if two isles connect and he tugs one rope.
triggers: [connected?, groups, merge accounts, number of provinces, redundant connection, dynamic connectivity]
viz: union-find
order: 3
---

## Ask yourself

1. Dynamically merging groups and asking "same set?"
2. Count components as edges arrive?
3. Find with path compression, union by rank.

## Classic problem

**Number of Provinces** (LeetCode 547) — `isConnected[i][j] === 1` means cities `i` and
`j` are directly linked. Count the connected groups. Start with `n` groups and merge.

```ts
function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const parent = Array.from({ length: n }, (_, i) => i);
  let provinces = n;

  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]; // path compression: halve the chain
      x = parent[x];
    }
    return x;
  };

  const union = (a: number, b: number): void => {
    const ra = find(a), rb = find(b);
    if (ra === rb) return;           // already same group
    parent[ra] = rb;
    provinces--;                     // two groups became one
  };

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] === 1) union(i, j);
    }
  }

  return provinces;
}
```

## Common pitfalls

> No path compression → near-O(n) finds.

> Counting components wrong after unions.
