---
title: Tree DFS · Postorder
emoji: 🧮
summary: Clear both children first, then the parent — results bubble up.
scene: A demolition crew must clear both child rooms before they can stamp the parent room cleared, so the all-clear bubbles up from the basement.
triggers: [postorder, height, depth, diameter, subtree sum, delete tree, bottom-up, combine children]
viz: tree-postorder
order: 3
---

## Ask yourself

1. Do values bubble **up** from children — height, sums, diameter?
2. Tearing a tree **down** (delete/free) so children must go first?
3. Recurse in order: left, then right, then visit — combine child results.

## Classic problem

**Diameter of Binary Tree** (LeetCode 543) — the longest path between any two nodes. Each
node returns its height upward; the best path through a node is `left + right`.

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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let best = 0;

  function height(node: TreeNode | null): number {
    if (!node) return 0;
    const left = height(node.left);     // children answer first
    const right = height(node.right);
    best = Math.max(best, left + right); // path bending through this node
    return 1 + Math.max(left, right);    // height bubbles up to the parent
  }

  height(root);
  return best;
}
```

## Common pitfalls

> Forgetting the null base case.

> Combining child results in the wrong order or way.
