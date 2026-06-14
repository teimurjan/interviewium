---
title: Tree DFS · Inorder
emoji: 📖
summary: Left wing, sign the door, right wing — values come out sorted.
scene: An auditor clears the entire left wing of a hall, signs the central doorway, then proceeds into the right wing — so the signatures come out in order.
triggers: [inorder, BST, sorted order, kth smallest, validate BST, in-order successor]
viz: tree-inorder
order: 2
---

## Ask yourself

1. Is it a **BST** and you want values in **sorted** order?
2. kth-smallest, validate-BST, in-order successor?
3. Recurse in order: left, then visit, then right.

## Classic problem

**Kth Smallest Element in a BST** (LeetCode 230) — an inorder walk of a BST visits values
in ascending order, so the kth value visited is the answer. The iterative form stops the
moment it's found.

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

function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let node = root;

  while (node || stack.length) {
    while (node) {           // dive to the leftmost unvisited node
      stack.push(node);
      node = node.left;
    }
    node = stack.pop()!;     // visit in sorted order
    if (--k === 0) return node.val;
    node = node.right;       // then the right subtree
  }

  return -1;
}
```

## Common pitfalls

> Forgetting the null base case.

> Assuming sorted output on a tree that isn't a BST — the ordering only holds there.
