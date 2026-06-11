---
title: Sorting
emoji: 🧹
summary: Sweep chaos into useful order.
scene: A steward sorts scattered invitations by time, name, and priority until every later choice becomes obvious.
triggers: [sort, ordered, lexicographic, earliest, latest, compare, greedy]
viz: sorting
order: 1
---

## Ask yourself

1. Would ordering expose adjacency, duplicates, or the next best choice?
2. Is a custom comparator the core of the problem?
3. After sorting, can you solve with one pass?

## Canonical template

```ts
items.sort((a, b) => a.start - b.start || a.end - b.end);

let best = 0;
for (const item of items) {
  best = Math.max(best, score(item));
}
return best;
```

## Common pitfalls

> Assuming JavaScript sorts numbers numerically without a comparator.

> Mutating input order when the caller expects it preserved.
