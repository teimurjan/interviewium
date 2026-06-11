---
title: Iterator Implementation
emoji: 🔁
summary: Pull one value at a time without exposing storage.
scene: A ticket window reveals exactly one ticket per pull while the stack behind the glass stays hidden.
triggers: [iterator, hasNext, next, flatten, lazy, generator]
order: 1
---

## Approach

Keep the traversal state private. `hasNext` should be idempotent. `next` should either return one value and advance or throw when exhausted.

## Skeleton

```ts
class ArrayIterator<T> {
  private index = 0;

  constructor(private readonly items: T[]) {}

  hasNext(): boolean {
    return this.index < this.items.length;
  }

  next(): T {
    if (!this.hasNext()) throw new Error("Iterator exhausted");
    return this.items[this.index++];
  }
}
```

## Watch for

> Calling `hasNext` multiple times must not consume values.

> Define exhaustion behavior before coding.
