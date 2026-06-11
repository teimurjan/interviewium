---
title: 2D Dynamic Programming
emoji: 🧮
summary: A grid of solved decisions.
scene: A chessboard ledger fills square by square, each answer borrowing from its left, top, or diagonal neighbor.
triggers: [grid paths, edit distance, longest common subsequence, matrix, two strings]
viz: dp-2d
order: 3
---

## Ask yourself

1. Do two indexes define the state?
2. Are you comparing two strings or walking a grid?
3. Does each cell depend on nearby solved cells?

## Canonical template

```ts
const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    dp[i][j] = best(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  }
}
return dp[m][n];
```

## Common pitfalls

> Building the table with shared inner arrays.

> Forgetting the extra row and column for empty prefixes.
