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

## Canonical template

```ts
function backtrack(path: Choice[], choices: Choice[]): void {
  if (done(path)) {
    res.push([...path]);
    return;
  }
  for (const choice of choices) {
    path.push(choice);
    backtrack(path, nextChoices(choice));
    path.pop();
  }
}
```

## Common pitfalls

> Forgetting to undo the choice after recursion.

> Appending a reference instead of a copy of `path`.
