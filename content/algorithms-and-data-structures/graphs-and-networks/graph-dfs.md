---
title: Graph DFS
emoji: 🕯️
summary: Down each tunnel to its dead end.
scene: A lone explorer descends into the catacombs, following each tunnel to its dead end by candlelight before turning back.
triggers: [connected components, islands, flood fill, cycle in graph, reachable, regions]
viz: graph-dfs
order: 1
---

## Ask yourself

1. Explore a maze/grid/graph fully?
2. Count components / islands / flood fill?
3. Mark visited; recurse to neighbours.

## Classic problem

**Number of Islands** (LeetCode 200) — count groups of connected `"1"` cells in a grid.
Each unvisited land cell starts a DFS that floods its whole island.

```ts
function numIslands(grid: string[][]): number {
  const rows = grid.length, cols = grid[0].length;

  function sink(r: number, c: number): void {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === "0") return;
    grid[r][c] = "0";        // mark visited by sinking the land
    sink(r + 1, c);
    sink(r - 1, c);
    sink(r, c + 1);
    sink(r, c - 1);
  }

  let islands = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        sink(r, c);          // erase the rest of this island so we don't recount it
      }
    }
  }

  return islands;
}
```

## Common pitfalls

> Forgetting visited → infinite recursion.

> Stack overflow on deep graphs (use iterative).
