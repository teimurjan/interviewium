---
title: Hash Map Counting
emoji: 🗃️
summary: Every key has a labeled drawer.
scene: A clerk opens labeled drawers instantly, adding one tally mark for every matching key.
triggers: [frequency, count, anagram, two sum, seen before, lookup]
viz: hash-map
order: 1
---

## Ask yourself

1. Do you need to remember whether a value appeared before?
2. Are counts, frequencies, or complements central to the answer?
3. Can one pass with a `Map` replace a nested scan?

## Classic problem

**Two Sum** (LeetCode 1) — return the indices of the two numbers in `nums` that add up
to `target`. Store each value as you go and look up its complement.

```ts
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>(); // value → index

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i]; // complement already passed
    seen.set(nums[i], i);
  }

  return []; // problem guarantees one answer, but stay total
}
```

## Common pitfalls

> Forgetting that `0` is a valid stored count or index.

> Using an object when keys may not be safe property names.
