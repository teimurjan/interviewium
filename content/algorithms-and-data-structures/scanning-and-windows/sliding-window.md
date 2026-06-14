---
title: Sliding Window
emoji: 🪟
summary: A glass pane slides across the counter.
scene: A massive pane of glass slides across the marble counter, framing exactly the dishes that matter right now.
triggers: [substring, subarray, contiguous, longest, shortest, at most k, window]
viz: sliding-window
order: 3
---

## Ask yourself

1. Is the answer a contiguous run (substring / subarray)?
2. Are you asked for longest / shortest / count under a constraint?
3. Can you expand right, then shrink left while invalid?

## Classic problem

**Longest Substring Without Repeating Characters** (LeetCode 3) — return the length of the
longest substring with all-distinct characters. Grow `right`, and shrink `left` until the
window is valid again.

```ts
function lengthOfLongestSubstring(s: string): number {
  const window = new Set<string>();
  let left = 0, best = 0;

  for (let right = 0; right < s.length; right++) {
    while (window.has(s[right])) {  // duplicate → shrink from the left first
      window.delete(s[left]);
      left++;
    }
    window.add(s[right]);
    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

## Common pitfalls

> Shrinking with `if` instead of `while`.

> Updating the answer before restoring validity.
