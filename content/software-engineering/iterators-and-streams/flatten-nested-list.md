---
title: Flatten Nested Iterator
emoji: 🪆
summary: A stack opens nested boxes only when needed.
scene: Nested boxes sit on a table; you open only the front box, placing its contents back in order.
triggers: [flatten, nested list, lazy iterator, stack, next integer]
order: 2
---

## Approach

Use a stack of items in reverse order. Before `next`, expand nested lists on top until the top is a value. This keeps flattening lazy.

## Skeleton

```ts
type Nested<T> = T | Nested<T>[];

class NestedIterator<T> {
  private stack: Nested<T>[];

  constructor(items: Nested<T>[]) {
    this.stack = [...items].reverse();
  }

  hasNext(): boolean {
    while (this.stack.length && Array.isArray(this.stack[this.stack.length - 1])) {
      const list = this.stack.pop() as Nested<T>[];
      for (let i = list.length - 1; i >= 0; i--) this.stack.push(list[i]);
    }
    return this.stack.length > 0;
  }

  next(): T {
    if (!this.hasNext()) throw new Error("Iterator exhausted");
    return this.stack.pop() as T;
  }
}
```

## Watch for

> Eager flattening can waste memory if the input is huge.

> Preserve left-to-right order when pushing nested contents.
