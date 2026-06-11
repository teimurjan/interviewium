---
title: Prefix Sum
emoji: 🧾
summary: An accountant's running receipt.
scene: A meticulous accountant tapes a running receipt down the pantry wall — any range total is just one subtraction.
triggers: [range sum, subarray sum equals k, count of subarrays, cumulative, between i and j]
order: 4
---

## Ask yourself

1. Repeated range-sum / range-count queries?
2. "Subarray summing to K" — pair with a hashmap of prefixes.
3. Can a difference of two prefixes give the answer in O(1)?

## Canonical template

```ts
const pref = new Map<number, number>([[0, 1]]);
let sum = 0, ans = 0;
for (const x of a) {
  sum += x;
  ans += pref.get(sum - k) ?? 0;
  pref.set(sum, (pref.get(sum) ?? 0) + 1);
}
```

## Common pitfalls

> Forgetting the seed prefix `{0: 1}` for subarrays starting at index 0.

> Off-by-one between inclusive/exclusive prefix arrays.
