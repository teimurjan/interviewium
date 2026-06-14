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

## Canonical template

```ts
function preorder(node: TreeNode | null, out: number[]): void {
  if (!node) return;
  out.push(node.val); // visit first, on the way down
  preorder(node.left, out);
  preorder(node.right, out);
}
```

Same walk with an explicit stack — push right before left so left pops first.

```ts
function preorderIterative(root: TreeNode | null): number[] {
  const out: number[] = [];
  const stack: TreeNode[] = root ? [root] : [];
  while (stack.length) {
    const node = stack.pop()!;
    out.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return out;
}
```

## Common pitfalls

> Forgetting the null base case.

> Pushing left before right in the iterative form — that reverses the order.
