---
title: Backtracking
emoji: 🌀
summary: Try a path, then undo every step.
scene: In the hedge maze you try a path, hit a dead end, and carefully retrace every step — undoing footprints as you go.
triggers: [all combinations, permutations, subsets, generate, n-queens, valid arrangements]
viz: backtracking
order: 5
---

## Ask yourself

1. Enumerate ALL valid configurations?
2. Permutations / combinations / subsets / placements?
3. Choose → recurse → un-choose.

## Classic problem

**Permutations** (LeetCode 46) — return every ordering of a distinct `nums`. Pick an unused
number, recurse, then put it back so the next branch can use it.

```ts
function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const used = new Array<boolean>(nums.length).fill(false);

  function backtrack(): void {
    if (path.length === nums.length) {
      result.push([...path]); // copy — path keeps mutating
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);   // choose
      backtrack();          // recurse
      path.pop();           // un-choose
      used[i] = false;
    }
  }

  backtrack();
  return result;
}
```

## Common pitfalls

> Forgetting to undo the choice after recursion.

> Appending a reference instead of a copy of `path`.
