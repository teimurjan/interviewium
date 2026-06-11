---
title: Interval Problems
emoji: 📅
summary: Overlapping calendars, sorted & stapled.
scene: Dozens of overlapping calendar pages flutter in the sunlight; a steward sorts them by start, then staples the overlaps.
triggers: [intervals, overlap, merge, meeting rooms, schedule, start / end times]
viz: intervals
order: 5
---

## Ask yourself

1. Inputs are `[start, end]` ranges?
2. Merge, count overlaps, or insert into a schedule?
3. Sort by start (or by end for greedy selection).

## Canonical template

```ts
intervals.sort((a, b) => a[0] - b[0]);
const merged: number[][] = [intervals[0]];
for (const [start, end] of intervals.slice(1)) {
  const last = merged[merged.length - 1];
  if (start <= last[1]) last[1] = Math.max(last[1], end);
  else merged.push([start, end]);
}
```

## Common pitfalls

> Sorting by the wrong endpoint for the goal.

> Touching intervals (`[1,2]`, `[2,3]`) — decide if they merge.
