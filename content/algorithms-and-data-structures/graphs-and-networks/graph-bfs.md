---
title: Graph BFS
emoji: 📡
summary: Signal ripples outward, ring by ring.
scene: A radio tower in the attic pulses signal outward ring by ring — the nearest rooftops light first, the farthest last.
triggers: [shortest path, fewest steps, minimum moves, unweighted, nearest, spread]
viz: graph-bfs
order: 2
---

## Ask yourself

1. Shortest path / fewest steps in an UNWEIGHTED graph?
2. Spread / infection / multi-source expansion?
3. Queue, track distance per layer.

## Classic problem

**Shortest path in an unweighted graph** — given `n` nodes and an undirected
`edges` list, return the fewest edges from `start` to `target`, or `-1`.

```ts
function shortestPath(n: number, edges: number[][], start: number, target: number): number {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const seen = new Array<boolean>(n).fill(false);
  const queue: Array<[number, number]> = [[start, 0]]; // [node, distance]
  seen[start] = true;

  for (let head = 0; head < queue.length; head++) {   // head index = O(1) dequeue
    const [node, dist] = queue[head];
    if (node === target) return dist;
    for (const next of adj[node]) {
      if (!seen[next]) {
        seen[next] = true;          // mark on enqueue, not dequeue
        queue.push([next, dist + 1]);
      }
    }
  }

  return -1;
}
```

## Common pitfalls

> Marking visited at dequeue, not enqueue (dupes blow up).

> Using BFS on a weighted graph (need Dijkstra).
