---
title: Implement LRU Cache
emoji: 🗄️
summary: A cache where the oldest untouched entry leaves first.
scene: A librarian moves every borrowed book to the front desk; when shelves overflow, the dusty book at the back is removed.
triggers: [LRU, cache, O(1), eviction, get, put]
order: 1
---

## Approach

Use a `Map` for key lookup and a doubly linked list for recency. `get` moves the node to the front. `put` updates or inserts, then evicts the tail if capacity is exceeded.

## Skeleton

```ts
class Node<K, V> {
  constructor(public key: K, public value: V, public prev: Node<K, V> | null = null, public next: Node<K, V> | null = null) {}
}

class LRUCache<K, V> {
  private nodes = new Map<K, Node<K, V>>();
  private head: Node<K, V> | null = null;
  private tail: Node<K, V> | null = null;

  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    const node = this.nodes.get(key);
    if (!node) return undefined;
    this.moveToFront(node);
    return node.value;
  }

  put(key: K, value: V): void {
    const existing = this.nodes.get(key);
    if (existing) {
      existing.value = value;
      this.moveToFront(existing);
      return;
    }
    const node = new Node(key, value);
    this.nodes.set(key, node);
    this.addFront(node);
    if (this.nodes.size > this.capacity) this.evictTail();
  }
}
```

## Watch for

> Updating an existing key must refresh recency.

> Eviction must remove from both the list and the map.
