---
title: Stream Processing & Windows
emoji: 🪟
summary: Aggregate unbounded streams over time windows.
scene: Counting cars on a highway by the rolling last-five-minutes, not by waiting for the road to end.
triggers: [streaming, tumbling, sliding, session window, watermark, event time, aggregation]
order: 3
---

## Core idea

Streams are unbounded, so aggregations happen over **windows**. **Tumbling**: fixed,
non-overlapping. **Sliding**: fixed length, overlapping, emits often (good for rolling
metrics like surge). **Session**: gap-based, grouping bursts of activity. **Watermarks**
handle late/out-of-order events by event time.

## Ask yourself

1. Disjoint buckets (tumbling), smooth rolling metric (sliding), or activity bursts (session)?
2. Event time or processing time — how late can data arrive?
3. What window length and slide match the decision cadence?

## Pitfalls

> Sliding windows recompute on overlap — more frequent output but more compute.

> Processing-time windows misattribute late events; use event time + watermarks.

> Too-tight watermarks drop late data; too-loose ones delay results.
