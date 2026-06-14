---
title: Heap / Priority Queue
emoji: 🕶️
summary: A bouncer keeps only the top K.
scene: A velvet-suited bouncer guards the VIP lounge, admitting only the top-K guests and ejecting the rest at the door.
triggers: [top k, k largest, k smallest, median, stream, closest, merge k]
viz: heap
order: 4
---

## Ask yourself

1. "Top / Kth largest or smallest"?
2. Running median or merging K sorted streams?
3. Need the extreme element repeatedly, cheaply?

## Classic problem

**K Closest Points to Origin** (LeetCode 973) — return the `k` points nearest the origin.
Keep a max-heap of size `k`; when it overflows, drop the farthest point.

```ts
class Heap<T> {
  private items: T[] = [];
  constructor(private compare: (a: T, b: T) => number) {}
  size(): number { return this.items.length; }
  toArray(): T[] { return [...this.items]; }
  push(value: T): void {
    const h = this.items;
    h.push(value);
    let i = h.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(h[i], h[parent]) >= 0) break;
      [h[i], h[parent]] = [h[parent], h[i]];
      i = parent;
    }
  }
  pop(): T {
    const h = this.items;
    const top = h[0];
    const last = h.pop()!;
    if (h.length) {
      h[0] = last;
      let i = 0;
      for (;;) {
        const left = 2 * i + 1, right = 2 * i + 2;
        let smallest = i;
        if (left < h.length && this.compare(h[left], h[smallest]) < 0) smallest = left;
        if (right < h.length && this.compare(h[right], h[smallest]) < 0) smallest = right;
        if (smallest === i) break;
        [h[i], h[smallest]] = [h[smallest], h[i]];
        i = smallest;
      }
    }
    return top;
  }
}

function kClosest(points: number[][], k: number): number[][] {
  const dist = (p: number[]): number => p[0] * p[0] + p[1] * p[1];
  // Max-heap on distance: comparator inverted so the farthest sits on top.
  const heap = new Heap<number[]>((a, b) => dist(b) - dist(a));

  for (const point of points) {
    heap.push(point);
    if (heap.size() > k) heap.pop(); // evict the current farthest
  }

  return heap.toArray();
}
```

## Common pitfalls

> Min-heap vs max-heap; choose the heap direction for the rank you keep.

> Heap of size k for kth-largest, not full sort.
