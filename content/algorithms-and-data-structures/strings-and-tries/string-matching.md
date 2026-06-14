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

## Classic problem

**Find the Index of the First Occurrence in a String** (LeetCode 28) — return the first
index of `needle` in `haystack`, or `-1`. KMP precomputes a fallback table so the text
pointer never moves backward.

```ts
function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  const lps = buildLps(needle);

  for (let i = 0, j = 0; i < haystack.length; ) {
    if (haystack[i] === needle[j]) {
      i++; j++;
      if (j === needle.length) return i - j; // matched the whole needle
    } else if (j > 0) {
      j = lps[j - 1];                         // reuse the matched prefix, keep i put
    } else {
      i++;                                    // no prefix to fall back on
    }
  }

  return -1;
}

// lps[i] = length of the longest proper prefix of p[0..i] that is also a suffix.
function buildLps(p: string): number[] {
  const lps = new Array<number>(p.length).fill(0);
  for (let i = 1, len = 0; i < p.length; ) {
    if (p[i] === p[len]) {
      lps[i++] = ++len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}
```

## Common pitfalls

> Advancing both pointers after a mismatch in KMP.

> Ignoring Unicode details when the prompt is not plain ASCII.
