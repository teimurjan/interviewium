---
title: 1D Dynamic Programming
emoji: 🗂️
summary: Every answer already filed away.
scene: An archivist sits walled in by thousands of already-solved index cards — every new question, he just reaches back.
triggers: [ways to, max / min over choices, climbing stairs, house robber, decode, longest increasing]
viz: dp-1d
order: 1
---

## Ask yourself

1. Optimal/count over a 1D sequence of choices?
2. Does the answer at `i` depend on a few earlier `i`'s?
3. Define `dp[i]`, a recurrence, and a base case.

## Classic problem

**House Robber** (LeetCode 198) — given houses with `nums[i]` cash, take the maximum
total without robbing two adjacent houses.

```ts
function rob(nums: number[]): number {
  let skip = 0; // best loot ignoring the previous house
  let take = 0; // best loot up to and including the previous house

  for (const cash of nums) {
    const robThis = skip + cash;       // rob here → must have skipped the last
    const robLast = take;              // skip here → keep the previous best
    skip = take;
    take = Math.max(robThis, robLast);
  }

  return take;
}
```

## Common pitfalls

> Wrong base cases / array size.

> Reading `dp[i-2]` before it's filled.
