---
title: 1D Dynamic Programming
emoji: 🗂️
summary: Every answer already filed away.
scene: An archivist sits walled in by thousands of already-solved index cards — every new question, he just reaches back.
triggers: [ways to, max / min over choices, climbing stairs, house robber, decode, longest increasing]
order: 1
---

## Ask yourself

1. Optimal/count over a 1D sequence of choices?
2. Does the answer at `i` depend on a few earlier `i`'s?
3. Define `dp[i]`, a recurrence, and a base case.

## Canonical template

```ts
const dp = Array(n + 1).fill(0);
dp[0] = base0;
dp[1] = base1;
for (let i = 2; i <= n; i++) {
  dp[i] = best(dp[i - 1], dp[i - 2] + a[i]);
}
return dp[n];
```

## Common pitfalls

> Wrong base cases / array size.

> Reading `dp[i-2]` before it's filled.
