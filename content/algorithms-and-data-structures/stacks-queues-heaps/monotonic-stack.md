---
title: Monotonic Stack
emoji: 🍷
summary: Bottles racked in strict order.
scene: A fastidious sommelier keeps the rack strictly ascending — any shorter bottle behind a taller one gets pulled.
triggers: [next greater, next smaller, warmer temperature, histogram, span, nearest larger]
viz: monotonic-stack
order: 2
---

## Ask yourself

1. "Next/previous greater or smaller element"?
2. Largest rectangle / trapping water by bars?
3. Maintain a stack that stays increasing or decreasing.

## Classic problem

**Daily Temperatures** (LeetCode 739) — for each day, how many days until a warmer one.
Keep a stack of indices with decreasing temperatures; a hotter day resolves everything
cooler behind it.

```ts
function dailyTemperatures(temperatures: number[]): number[] {
  const answer = new Array<number>(temperatures.length).fill(0);
  const stack: number[] = []; // indices, temperatures decreasing down the stack

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const j = stack.pop()!;     // day j finally found a warmer day
      answer[j] = i - j;
    }
    stack.push(i);
  }

  return answer; // unresolved days keep their default 0
}
```

## Common pitfalls

> Wrong monotonic direction (inc vs dec).

> Storing values when you need indices (or vice-versa).
