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

## Classic problem

**Two Sum II — Input Array Is Sorted** (LeetCode 167) — return the 1-based indices of the
two numbers that add up to `target`. The sum's direction tells you which pointer to move.

```ts
function twoSum(numbers: number[], target: number): number[] {
  let i = 0, j = numbers.length - 1;

  while (i < j) {
    const sum = numbers[i] + numbers[j];
    if (sum === target) return [i + 1, j + 1]; // problem uses 1-based indices
    if (sum < target) i++;                     // need more → raise the low end
    else j--;                                  // need less → lower the high end
  }

  return [];
}
```

## Common pitfalls

> Forgetting to skip duplicates in 3Sum-style problems.

> Moving the wrong pointer for the condition.
