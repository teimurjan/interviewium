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

## Canonical template

```ts
function inorder(node: TreeNode | null, out: number[]): void {
  if (!node) return;
  inorder(node.left, out);
  out.push(node.val); // visit between the two children
  inorder(node.right, out);
}
```

## Common pitfalls

> Forgetting the null base case.

> Assuming sorted output on a tree that isn't a BST — the ordering only holds there.
