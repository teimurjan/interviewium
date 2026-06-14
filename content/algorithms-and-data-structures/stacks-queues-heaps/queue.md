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

## Classic problem

**Number of Recent Calls** (LeetCode 933) — `ping(t)` returns how many calls happened in
the last 3000 ms. Push each timestamp; drop ones that fell out of the window from the
front.

```ts
class RecentCounter {
  private queue: number[] = []; // timestamps, oldest first
  private head = 0;             // front index — avoids O(n) shift()

  ping(t: number): number {
    this.queue.push(t);
    while (this.queue[this.head] < t - 3000) this.head++; // expire stale calls
    return this.queue.length - this.head;
  }
}
```

## Common pitfalls

> Using a list `.pop(0)` — O(n); use a deque.

> Forgetting to mark visited before enqueue (dupes).
