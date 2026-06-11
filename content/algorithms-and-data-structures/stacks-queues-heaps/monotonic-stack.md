---
title: Monotonic Stack
emoji: 🍷
summary: Bottles racked in strict order.
scene: A fastidious sommelier keeps the rack strictly ascending — any shorter bottle behind a taller one gets pulled.
triggers: [next greater, next smaller, warmer temperature, histogram, span, nearest larger]
order: 2
---

## Ask yourself

1. "Next/previous greater or smaller element"?
2. Largest rectangle / trapping water by bars?
3. Maintain a stack that stays increasing or decreasing.

## Canonical template

```ts
const stack: number[] = [];
for (let i = 0; i < a.length; i++) {
  while (stack.length && a[stack[stack.length - 1]] < a[i]) {
    const j = stack.pop()!;
    ans[j] = i - j;
  }
  stack.push(i);
}
```

## Common pitfalls

> Wrong monotonic direction (inc vs dec).

> Storing values when you need indices (or vice-versa).
