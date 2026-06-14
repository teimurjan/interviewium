---
title: Binary Search
emoji: 🪓
summary: The Executioner halves it every time.
scene: A hooded executioner cleaves every problem clean in half — again, and again, and again.
triggers: [sorted, minimum possible, maximum possible, feasible?, monotonic, find the boundary]
viz: binary-search
order: 1
---

## Ask yourself

1. Is the search space sorted, or monotonic in some predicate?
2. Can you ask a yes/no "is X feasible?" question?
3. Are you minimizing a maximum (or vice-versa)?

## Classic problem

**Binary Search** (LeetCode 704) — return the index of `target` in a sorted `nums`, or
`-1`. Halve the range each step by comparing against the middle.

```ts
function search(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2); // avoids lo + hi overflow
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;       // answer is to the right
    else hi = mid - 1;                          // answer is to the left
  }

  return -1;
}
```

## Common pitfalls

> Off-by-one in the loop bound (`lo < hi` vs `lo <= hi`).

> Updating `hi = mid - 1` when `mid` might be the answer.

> Overflow on `(lo + hi)` in languages without big ints.
