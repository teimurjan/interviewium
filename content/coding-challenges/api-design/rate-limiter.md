---
title: Rate Limiter
emoji: 🚦
summary: Let only enough requests through the gate.
scene: A gate counter drops old tickets from the last minute before deciding whether a new visitor may enter.
triggers: [rate limit, sliding window, allow request, throttle, quota]
order: 1
---

## Approach

For one user, keep a queue of timestamps. Drop expired timestamps, then accept if the queue is below the limit. For many users, map user IDs to queues.

## Skeleton

```ts
class SlidingWindowLimiter {
  private hits = new Map<string, number[]>();

  constructor(private limit: number, private windowMs: number) {}

  allow(userId: string, now: number): boolean {
    const q = this.hits.get(userId) ?? [];
    let head = 0;
    while (head < q.length && q[head] <= now - this.windowMs) head++;
    const active = q.slice(head);
    if (active.length >= this.limit) {
      this.hits.set(userId, active);
      return false;
    }
    active.push(now);
    this.hits.set(userId, active);
    return true;
  }
}
```

## Watch for

> Large queues need a real deque or stored head index.

> Clarify whether the window boundary is inclusive.
