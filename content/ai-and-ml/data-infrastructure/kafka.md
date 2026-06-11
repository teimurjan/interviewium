---
title: Kafka
emoji: 📬
summary: Partitioned, replayable log for event streams.
scene: A row of append-only ledgers; each reader keeps their own bookmark and reads at their own pace.
triggers: [kafka, topics, partitions, consumer groups, offsets, at-least-once, event streaming]
order: 1
---

## Core idea

Kafka is a distributed append-only log. **Topics** split into **partitions** (the unit of
parallelism and ordering); producers append, consumers track their own **offset**.
**Consumer groups** divide partitions among members for scale-out. Ordering is guaranteed
only within a partition, so the partition key decides what stays in order.

## Ask yourself

1. What's the partition key — does it give the ordering and parallelism I need?
2. How many consumers vs partitions (partitions cap group parallelism)?
3. What delivery guarantee, and is my consumer idempotent?

## Pitfalls

> Practical delivery is **at-least-once** → make consumers idempotent (upsert on a key) to
> survive redelivery.

> Ordering holds only within a partition, never across the whole topic.

> More consumers than partitions leaves some consumers idle.
