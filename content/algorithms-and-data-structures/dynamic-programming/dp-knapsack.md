---
title: Knapsack DP
emoji: 💰
summary: Pack the sack for maximum worth.
scene: In the vault, a thief weighs every jewel against a fixed-size sack, packing for maximum worth without bursting it.
triggers: [subset sum, partition, coin change, target sum, capacity, choose items]
viz: dp-knapsack
order: 2
---

## Ask yourself

1. Choose a subset under a capacity/target?
2. Coin change / partition / subset-sum?
3. `dp` over (item, remaining capacity).

## Classic problem

**Partition Equal Subset Sum** (LeetCode 416) — can `nums` be split into two subsets
with equal sums? That is 0/1 subset-sum for a target of `total / 2`.

```ts
function canPartition(nums: number[]): boolean {
  const total = nums.reduce((sum, n) => sum + n, 0);
  if (total % 2 !== 0) return false;          // odd total can't split evenly
  const target = total / 2;

  // dp[c] = can we hit sum c using items seen so far?
  const dp = new Array<boolean>(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let c = target; c >= num; c--) {     // descend so each item is used once
      dp[c] = dp[c] || dp[c - num];
    }
  }

  return dp[target];
}
```

## Common pitfalls

> Iterating capacity upward for 0/1 (double-counts items).

> Confusing bounded vs unbounded knapsack loops.
