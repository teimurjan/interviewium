---
title: Set Membership
emoji: 🧿
summary: A guard recognizes every forbidden token.
scene: A gate guard checks each token against a short forbidden list and waves through only unseen visitors.
triggers: [unique, duplicate, contains, visited, membership, intersection]
viz: set-membership
order: 2
---

## Ask yourself

1. Is the question only about presence, not count?
2. Do you need uniqueness, intersection, or visited state?
3. Can membership checks be O(1)?

## Classic problem

**Contains Duplicate** (LeetCode 217) — return `true` if any value in `nums` appears more
than once. Track what you've seen; bail the moment a value repeats.

```ts
function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) return true; // second sighting → duplicate
    seen.add(num);
  }

  return false;
}
```

## Common pitfalls

> Storing mutable objects when value equality is expected.

> Waiting too long to mark `visited` in graph-style problems.
