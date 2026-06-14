---
title: Tree DFS · Preorder
emoji: 🏷️
summary: Stamp the node on arrival, then descend.
scene: A night watchman stamps each landing the instant he steps onto it, then drops down the stairwell to stamp the floors below.
triggers: [preorder, copy tree, clone, serialize, prefix, root first, paths from root]
viz: tree-preorder
order: 1
---

## Ask yourself

1. Act on a node **before** you descend — copy, clone, serialize?
2. Building a path **from the root** downward?
3. Recurse in order: visit, then left, then right.

## Classic problem

**Path Sum** (LeetCode 112) — is there a root-to-leaf path summing to `targetSum`? Act on
each node on the way down, subtracting its value, and check the balance at a leaf.

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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;

  const remaining = targetSum - root.val;          // visit first, on the way down
  if (!root.left && !root.right) return remaining === 0; // leaf → did it land on zero?

  return hasPathSum(root.left, remaining) ||
         hasPathSum(root.right, remaining);
}
```

## Common pitfalls

> Forgetting the null base case.

> Checking the sum at a null child instead of a true leaf (double-counts paths).
