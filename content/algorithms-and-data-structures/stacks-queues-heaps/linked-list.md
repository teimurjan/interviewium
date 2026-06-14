---
title: Linked List
emoji: 🚂
summary: Coupled carriages, forward only.
scene: A train of carriages stretches down the corridor; you can only walk forward, car to coupled car.
triggers: [reverse list, cycle, middle node, nth from end, merge lists, fast & slow]
viz: linked-list
order: 5
---

## Ask yourself

1. Pointer surgery on nodes (reverse, reorder)?
2. Cycle / middle → fast & slow pointers.
3. A dummy head simplifies edge cases.

## Classic problem

**Reverse Linked List** (LeetCode 206) — reverse a singly linked list and return the new
head. Walk forward, flipping each `next` pointer to point back at the node behind it.

```ts
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let cur = head;

  while (cur) {
    const next = cur.next; // save before we overwrite the link
    cur.next = prev;       // flip the pointer backwards
    prev = cur;
    cur = next;
  }

  return prev; // prev is the old tail = new head
}
```

## Common pitfalls

> Losing the rest of the list by reassigning `.next` too early.

> Null-deref on the final node.
