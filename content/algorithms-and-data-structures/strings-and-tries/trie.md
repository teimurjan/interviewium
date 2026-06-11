---
title: Trie
emoji: 🌲
summary: Each letter opens the next branch.
scene: A word tree fills the library wall; every letter chooses a branch until a complete word is marked.
triggers: [prefix, autocomplete, dictionary, word search, startsWith, wildcard]
viz: trie
order: 1
---

## Ask yourself

1. Are many words queried by prefix?
2. Is `startsWith` or dictionary pruning repeated?
3. Would a tree of characters avoid repeated string scans?

## Canonical template

```ts
class TrieNode {
  children = new Map<string, TrieNode>();
  word = false;
}

function insert(root: TrieNode, word: string): void {
  let node = root;
  for (const ch of word) {
    if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
    node = node.children.get(ch)!;
  }
  node.word = true;
}
```

## Common pitfalls

> Forgetting the terminal marker for words that are also prefixes.

> Creating substrings repeatedly instead of moving by index.
