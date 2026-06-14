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

## Classic problem

**Rotting Oranges** (LeetCode 994) — `2` is rotten, `1` is fresh, `0` is empty. Each
minute rot spreads to adjacent fresh oranges. Return minutes until none are fresh, or `-1`.

```ts
function orangesRotting(grid: number[][]): number {
  const rows = grid.length, cols = grid[0].length;
  const queue: Array<[number, number]> = [];
  let fresh = 0;

  for (let r = 0; r < rows; r++) {           // seed every rotten orange as a source
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let minutes = 0;

  for (let head = 0; head < queue.length && fresh > 0; ) {
    const levelEnd = queue.length;           // one full ring = one minute
    minutes++;
    while (head < levelEnd) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;                  // mark on enqueue so it isn't re-rotted
          fresh--;
          queue.push([nr, nc]);
        }
      }
    }
  }

  return fresh === 0 ? minutes : -1;         // leftover fresh → unreachable
}
```

## Common pitfalls

> Using `shift()` for large queues; keep a head index.

> Marking visited after dequeue and adding the same cell repeatedly.
