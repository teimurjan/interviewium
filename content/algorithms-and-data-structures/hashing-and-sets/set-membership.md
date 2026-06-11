---
title: Set Membership
emoji: 🧿
summary: A guard recognizes every forbidden token.
scene: A gate guard checks each token against a short forbidden list and waves through only unseen visitors.
triggers: [unique, duplicate, contains, visited, membership, intersection]
order: 2
---

## Ask yourself

1. Is the question only about presence, not count?
2. Do you need uniqueness, intersection, or visited state?
3. Can membership checks be O(1)?

## Canonical template

```ts
const seen = new Set<string>();
for (const item of items) {
  if (seen.has(item)) return true;
  seen.add(item);
}
return false;
```

## Common pitfalls

> Storing mutable objects when value equality is expected.

> Waiting too long to mark `visited` in graph-style problems.
