---
title: Sorting
emoji: 🧹
summary: Sweep chaos into useful order.
scene: A steward sorts scattered invitations by time, name, and priority until every later choice becomes obvious.
triggers: [sort, ordered, lexicographic, earliest, latest, compare, greedy]
viz: sorting
order: 1
---

## Ask yourself

1. Would ordering expose adjacency, duplicates, or the next best choice?
2. Is a custom comparator the core of the problem?
3. After sorting, can you solve with one pass?

## Classic problem

**Largest Number** (LeetCode 179) — arrange the numbers to form the largest possible
value. The whole problem is the comparator: `a` precedes `b` when `a + b` reads larger
than `b + a`.

```ts
function largestNumber(nums: number[]): string {
  const parts = nums.map(String);

  parts.sort((a, b) => {
    if (a + b > b + a) return -1; // a first makes the bigger number
    if (a + b < b + a) return 1;
    return 0;
  });

  if (parts[0] === "0") return "0"; // all zeros → avoid "000"
  return parts.join("");
}
```

## Common pitfalls

> Assuming JavaScript sorts numbers numerically without a comparator.

> Mutating input order when the caller expects it preserved.
