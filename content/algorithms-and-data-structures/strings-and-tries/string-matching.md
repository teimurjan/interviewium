---
title: String Matching
emoji: 🔎
summary: Match characters without re-reading the hallway.
scene: A detective marks each matching footprint, then jumps ahead using what the earlier footprints already proved.
triggers: [substring search, pattern, repeated string, palindrome, rolling hash, KMP]
viz: string-matching
order: 2
---

## Ask yourself

1. Are you searching for one string inside another?
2. Do repeated prefixes or suffixes matter?
3. Is O(nm) too slow for the input sizes?

## Canonical template

```ts
function buildLps(p: string): number[] {
  const lps = Array(p.length).fill(0);
  for (let i = 1, len = 0; i < p.length;) {
    if (p[i] === p[len]) lps[i++] = ++len;
    else if (len) len = lps[len - 1];
    else lps[i++] = 0;
  }
  return lps;
}
```

## Common pitfalls

> Advancing both pointers after a mismatch in KMP.

> Ignoring Unicode details when the prompt is not plain ASCII.
