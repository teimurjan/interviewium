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

## Canonical template

```ts
const dp = Array(cap + 1).fill(0);
for (const [weight, value] of items) {
  for (let c = cap; c >= weight; c--) {
    dp[c] = Math.max(dp[c], dp[c - weight] + value);
  }
}
return dp[cap];
```

## Common pitfalls

> Iterating capacity upward for 0/1 (double-counts items).

> Confusing bounded vs unbounded knapsack loops.
