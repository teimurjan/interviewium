---
title: Two Pointers
emoji: ⚔️
summary: Two knights close from both ends.
scene: Two armoured knights march from opposite ends of a long banquet table, closing in until they meet.
triggers: [sorted array, pair / triplet, two sum, palindrome, remove duplicates, opposite ends]
viz: two-pointers
order: 2
---

## Ask yourself

1. Sorted input, or can sorting help?
2. Looking for a pair/triplet meeting a condition?
3. Can one pass with converging pointers replace a nested loop?

## Canonical template

```ts
let i = 0, j = a.length - 1;
while (i < j) {
  const sum = a[i] + a[j];
  if (sum === target) return [i, j];
  if (sum < target) i++;
  else j--;
}
```

## Common pitfalls

> Forgetting to skip duplicates in 3Sum-style problems.

> Moving the wrong pointer for the condition.
