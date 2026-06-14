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

## Classic problem

**Longest Common Subsequence** (LeetCode 1143) — return the length of the longest
subsequence present in both strings `a` and `b`.

```ts
function longestCommonSubsequence(a: string, b: string): number {
  const m = a.length, n = b.length;
  // dp[i][j] = LCS of a[0..i) and b[0..j); row/col 0 are the empty prefixes.
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1] + 1                     // chars match → extend the diagonal
        : Math.max(dp[i - 1][j], dp[i][j - 1]);    // drop one char from either string
    }
  }

  return dp[m][n];
}
```

## Common pitfalls

> Building the table with shared inner arrays.

> Forgetting the extra row and column for empty prefixes.
