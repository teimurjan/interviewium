---
title: Tree BFS
emoji: 🌿
summary: Light every level before the next.
scene: Glass tiers of the conservatory light up one level at a time, every plant on a floor before the next floor wakes.
triggers: [level order, by level, shortest depth, right side view, zigzag, per row]
viz: tree-bfs
order: 4
---

## Ask yourself

1. Process tree level by level?
2. Min depth / level totals / row views?
3. Queue, capturing `len(queue)` per level.

## Classic problem

**Binary Tree Level Order Traversal** (LeetCode 102) — return node values grouped by
level. Snapshot the queue size before each level so you drain exactly one row at a time.

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const levels: number[][] = [];
  const queue: TreeNode[] = [root];

  for (let head = 0; head < queue.length; ) {
    const levelSize = queue.length - head; // freeze this row's count
    const level: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue[head++];
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    levels.push(level);
  }

  return levels;
}
```

## Common pitfalls

> Not snapshotting level size before the inner loop.

> Enqueuing `None` children.
