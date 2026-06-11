---
title: Linked List
emoji: 🚂
summary: Coupled carriages, forward only.
scene: A train of carriages stretches down the corridor; you can only walk forward, car to coupled car.
triggers: [reverse list, cycle, middle node, nth from end, merge lists, fast & slow]
order: 5
---

## Ask yourself

1. Pointer surgery on nodes (reverse, reorder)?
2. Cycle / middle → fast & slow pointers.
3. A dummy head simplifies edge cases.

## Canonical template

```ts
let prev: ListNode | null = null;
let cur = head;
while (cur) {
  const next = cur.next;
  cur.next = prev;
  prev = cur;
  cur = next;
}
return prev;
```

## Common pitfalls

> Losing the rest of the list by reassigning `.next` too early.

> Null-deref on the final node.
