---
title: Topological Sort
emoji: 🛠️
summary: Fit each part before what needs it.
scene: On the workshop bench, every part must be fitted before the part that depends on it — assembly in strict order.
triggers: [prerequisites, ordering, course schedule, dependencies, build order, DAG]
viz: topological-sort
order: 4
---

## Ask yourself

1. Ordering with "must come before" constraints?
2. Course schedule / build dependencies?
3. Kahn's BFS on in-degrees, or DFS post-order.

## Classic problem

**Course Schedule II** (LeetCode 210) — `prerequisites[i] = [course, prereq]`. Return a
valid order to take all courses, or `[]` if a cycle makes it impossible.

```ts
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const indegree = new Array<number>(numCourses).fill(0);
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);     // prereq → course edge
    indegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);   // no prereqs → ready to take
  }

  const order: number[] = [];
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    order.push(node);
    for (const next of adj[node]) {
      if (--indegree[next] === 0) queue.push(next); // last prereq cleared
    }
  }

  return order.length === numCourses ? order : []; // short order → a cycle exists
}
```

## Common pitfalls

> Cycle → fewer nodes in order than total (detect it).

> Forgetting to build in-degrees first.
