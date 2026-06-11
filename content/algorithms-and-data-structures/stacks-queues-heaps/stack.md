---
title: Stack
emoji: 🍽️
summary: A teetering stack of plates.
scene: A towering stack of porcelain plates on the cellar stairs — you can only ever touch the top one.
triggers: [matching, valid parentheses, nested, undo, last seen, balanced]
order: 1
---

## Ask yourself

1. Matching / nesting (brackets, tags)?
2. Need the most-recent unmatched thing?
3. Evaluate or simplify left-to-right with backtracking of one step?

## Canonical template

```ts
const stack: string[] = [];
for (const ch of s) {
  if (opens.has(ch)) stack.push(ch);
  else if (!stack.length || stack.pop() !== match[ch]) return false;
}
return stack.length === 0;
```

## Common pitfalls

> Popping an empty stack.

> Forgetting the stack must be empty at the end.
