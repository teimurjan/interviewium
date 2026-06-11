---
title: Heap / Priority Queue
emoji: 🕶️
summary: A bouncer keeps only the top K.
scene: A velvet-suited bouncer guards the VIP lounge, admitting only the top-K guests and ejecting the rest at the door.
triggers: [top k, k largest, k smallest, median, stream, closest, merge k]
order: 4
---

## Ask yourself

1. "Top / Kth largest or smallest"?
2. Running median or merging K sorted streams?
3. Need the extreme element repeatedly, cheaply?

## Canonical template

```ts
const heap = new MinHeap<number>();
for (const x of a) {
  heap.push(x);
  if (heap.size() > k) heap.pop();
}
return heap.peek();
```

## Common pitfalls

> Min-heap vs max-heap; choose the heap direction for the rank you keep.

> Heap of size k for kth-largest, not full sort.
