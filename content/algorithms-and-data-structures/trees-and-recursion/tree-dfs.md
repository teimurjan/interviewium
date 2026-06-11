---
title: Tree DFS
emoji: 📚
summary: Down one shelf to the floor, then the next.
scene: A scholar plunges down one towering bookshelf to the very floor before ever sidestepping to the next aisle.
triggers: [path, depth, root-to-leaf, subtree, diameter, ancestor]
viz: tree-dfs
order: 1
---

## Ask yourself

1. Need info that bubbles up from children?
2. Root-to-leaf paths, depth, diameter, LCA?
3. Recurse left & right, combine results.

## Canonical template

```ts
function dfs(node: TreeNode | null): number {
  if (!node) return 0;
  const left = dfs(node.left);
  const right = dfs(node.right);
  return 1 + Math.max(left, right);
}
```

## Common pitfalls

> Missing the null base case.

> Combining child results in the wrong order/way.
