---
title: Grid BFS
emoji: 🧊
summary: Distance spreads across cells.
scene: Frost spreads from several tiles at once, freezing each neighboring tile exactly one minute later.
triggers: [matrix, grid, shortest path, nearest cell, rotten oranges, walls]
viz: grid-bfs
order: 6
---

## Ask yourself

1. Is the graph implicit in four or eight grid directions?
2. Do you need minimum steps from one or many sources?
3. Can you mark cells as visited when enqueued?

## Canonical template

```ts
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const q: Array<[number, number, number]> = [[sr, sc, 0]];
seen.add(`${sr},${sc}`);

for (let head = 0; head < q.length; head++) {
  const [r, c, d] = q[head];
  for (const [dr, dc] of dirs) {
    const nr = r + dr, nc = c + dc;
    if (inside(nr, nc) && !seen.has(`${nr},${nc}`)) q.push([nr, nc, d + 1]);
  }
}
```

## Common pitfalls

> Using `shift()` for large queues; keep a head index.

> Marking visited after dequeue and adding the same cell repeatedly.
