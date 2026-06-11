---
title: Queue
emoji: 🎟️
summary: A first-come-first-served line.
scene: A velvet-roped line of guests in the waiting room — first to arrive is first to be seen, no cutting.
triggers: [FIFO, level by level, first come first served, moving average, recent counter]
viz: queue
order: 3
---

## Ask yourself

1. Process in arrival order (FIFO)?
2. Sliding max/min over a stream → monotonic deque.
3. Often the engine inside BFS.

## Canonical template

```ts
const q = [start];
for (let head = 0; head < q.length; head++) {
  const cur = q[head];
  for (const nxt of neighbors(cur)) q.push(nxt);
}
```

## Common pitfalls

> Using a list `.pop(0)` — O(n); use a deque.

> Forgetting to mark visited before enqueue (dupes).
