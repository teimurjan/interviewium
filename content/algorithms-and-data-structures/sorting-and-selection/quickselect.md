---
title: Quickselect
emoji: 🎯
summary: Partition until the target rank is fixed.
scene: An archer splits the field around one target, discarding every side that cannot contain the kth mark.
triggers: [kth largest, kth smallest, top k, median, rank, selection]
viz: quickselect
order: 2
---

## Ask yourself

1. Do you need the kth item, not a fully sorted array?
2. Is average O(n) better than O(n log n)?
3. Can partitioning discard half the search space?

## Classic problem

**Kth Largest Element in an Array** (LeetCode 215) — partition around a pivot and recurse
only into the side holding the target rank. The kth largest is the `(n - k)`th smallest.

```ts
function findKthLargest(nums: number[], k: number): number {
  const target = nums.length - k; // 0-based index in ascending order

  function partition(lo: number, hi: number): number {
    const pivot = nums[hi];
    let store = lo;
    for (let i = lo; i < hi; i++) {
      if (nums[i] < pivot) {
        [nums[i], nums[store]] = [nums[store], nums[i]];
        store++;
      }
    }
    [nums[store], nums[hi]] = [nums[hi], nums[store]]; // pivot to its sorted slot
    return store;
  }

  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const p = partition(lo, hi);
    if (p === target) return nums[p];
    if (p < target) lo = p + 1;   // target rank is to the right
    else hi = p - 1;              // target rank is to the left
  }

  return -1;
}
```

## Common pitfalls

> Mixing kth-largest with zero-based kth-smallest indexes.

> Worst-case O(n^2) without randomized or robust pivot choice.
