---
title: Sliding Window
emoji: 🪟
summary: A glass pane slides across the counter.
scene: A massive pane of glass slides across the marble counter, framing exactly the dishes that matter right now.
triggers: [substring, subarray, contiguous, longest, shortest, at most k, window]
order: 3
---

## Ask yourself

1. Is the answer a contiguous run (substring / subarray)?
2. Are you asked for longest / shortest / count under a constraint?
3. Can you expand right, then shrink left while invalid?

## Canonical template

```ts
let left = 0;
for (let right = 0; right < a.length; right++) {
  add(a[right]);
  while (invalid()) remove(a[left++]);
  best = Math.max(best, right - left + 1);
}
```

## Common pitfalls

> Shrinking with `if` instead of `while`.

> Updating the answer before restoring validity.
