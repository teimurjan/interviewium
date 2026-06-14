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

## Classic problem

**Implement Trie (Prefix Tree)** (LeetCode 208) — support `insert`, `search`, and
`startsWith`. Each node maps a character to a child; a flag marks where a word ends.

```ts
class TrieNode {
  children = new Map<string, TrieNode>();
  isWord = false;
}

class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isWord = true; // terminal marker
  }

  search(word: string): boolean {
    const node = this.walk(word);
    return node !== null && node.isWord; // full word, not just a prefix
  }

  startsWith(prefix: string): boolean {
    return this.walk(prefix) !== null;
  }

  private walk(s: string): TrieNode | null {
    let node = this.root;
    for (const ch of s) {
      const next = node.children.get(ch);
      if (!next) return null;
      node = next;
    }
    return node;
  }
}
```

## Common pitfalls

> Forgetting the terminal marker for words that are also prefixes.

> Creating substrings repeatedly instead of moving by index.
