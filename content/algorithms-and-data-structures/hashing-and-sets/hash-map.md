---
title: Hash Map Counting
emoji: 🗃️
summary: Every key has a labeled drawer.
scene: A clerk opens labeled drawers instantly, adding one tally mark for every matching key.
triggers: [frequency, count, anagram, two sum, seen before, lookup]
order: 1
---

## Ask yourself

1. Do you need to remember whether a value appeared before?
2. Are counts, frequencies, or complements central to the answer?
3. Can one pass with a `Map` replace a nested scan?

## Canonical template

```ts
const count = new Map<number, number>();
for (const x of nums) {
  count.set(x, (count.get(x) ?? 0) + 1);
}

for (const x of nums) {
  const need = target - x;
  if ((count.get(need) ?? 0) > 0) return true;
}
return false;
```

## Common pitfalls

> Forgetting that `0` is a valid stored count or index.

> Using an object when keys may not be safe property names.
