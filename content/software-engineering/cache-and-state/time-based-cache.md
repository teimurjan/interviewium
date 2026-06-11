---
title: Time-Based Key Value Store
emoji: ⏱️
summary: Values live on a timestamped shelf.
scene: Each key owns a timeline of labels; a clerk binary-searches the latest label not after the requested time.
triggers: [timestamp, get at time, binary search, versioned value, snapshot]
order: 2
---

## Approach

Store an append-only array of `[timestamp, value]` per key. On `get`, binary-search for the rightmost timestamp `<= target`.

## Skeleton

```ts
class TimeMap {
  private data = new Map<string, Array<[number, string]>>();

  set(key: string, value: string, timestamp: number): void {
    const list = this.data.get(key) ?? [];
    list.push([timestamp, value]);
    this.data.set(key, list);
  }

  get(key: string, timestamp: number): string {
    const list = this.data.get(key) ?? [];
    let lo = 0, hi = list.length - 1, ans = "";
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (list[mid][0] <= timestamp) {
        ans = list[mid][1];
        lo = mid + 1;
      } else hi = mid - 1;
    }
    return ans;
  }
}
```

## Watch for

> This assumes timestamps arrive sorted for each key.

> Returning the latest earlier value, not only exact matches.
