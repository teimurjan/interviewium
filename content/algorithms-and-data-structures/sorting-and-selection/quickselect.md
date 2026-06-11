---
title: Quickselect
emoji: 🎯
summary: Partition until the target rank is fixed.
scene: An archer splits the field around one target, discarding every side that cannot contain the kth mark.
triggers: [kth largest, kth smallest, top k, median, rank, selection]
order: 2
---

## Ask yourself

1. Do you need the kth item, not a fully sorted array?
2. Is average O(n) better than O(n log n)?
3. Can partitioning discard half the search space?

## Canonical template

```ts
function quickselect(a: number[], k: number): number {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const p = partition(a, lo, hi);
    if (p === k) return a[p];
    if (p < k) lo = p + 1;
    else hi = p - 1;
  }
  return -1;
}
```

## Common pitfalls

> Mixing kth-largest with zero-based kth-smallest indexes.

> Worst-case O(n^2) without randomized or robust pivot choice.
