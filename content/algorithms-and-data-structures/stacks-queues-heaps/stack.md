---
title: Stack
emoji: 🍽️
summary: A teetering stack of plates.
scene: A towering stack of porcelain plates on the cellar stairs — you can only ever touch the top one.
triggers: [matching, valid parentheses, nested, undo, last seen, balanced]
viz: stack
order: 1
---

## Ask yourself

1. Matching / nesting (brackets, tags)?
2. Need the most-recent unmatched thing?
3. Evaluate or simplify left-to-right with backtracking of one step?

## Classic problem

**Valid Parentheses** (LeetCode 20) — is a string of `()[]{}` correctly matched? Push each
opener; on a closer, the top must be its partner.

```ts
function isValid(s: string): boolean {
  const partner: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else if (stack.pop() !== partner[ch]) {
      return false; // wrong opener on top, or stack was empty (pop → undefined)
    }
  }

  return stack.length === 0; // leftover openers → unbalanced
}
```

## Common pitfalls

> Popping an empty stack.

> Forgetting the stack must be empty at the end.
