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

## Canonical template

Children return their answer, you combine and pass it up. Height is the archetype.

```ts
function height(node: TreeNode | null): number {
  if (!node) return 0;
  const left = height(node.left);
  const right = height(node.right);
  return 1 + Math.max(left, right); // combine, on the way back up
}
```

## Common pitfalls

> Forgetting the null base case.

> Combining child results in the wrong order or way.
