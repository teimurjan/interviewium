---
title: GPU Cost Engineering
emoji: 🧾
summary: GPUs dominate spend; design for spot preemption.
scene: A taxi meter that only runs on the expensive highway — so you plan every mile on it.
triggers: [gpu cost, spot instances, preemptible, checkpointing, late ack, unit economics, scale]
order: 2
---

## Core idea

In annotation-heavy pipelines, **GPU is 70–80% of spend** (CPU second, storage third).
Track a unit metric like **$/hour of clean output**. Run on **spot/preemptible** instances
(~70% cheaper) and make that safe with **late acknowledgment** and **per-step
checkpointing**, so a preemption loses at most one item's partial work. Do the GPU math:
50M files × 90s ≈ 142 years on one GPU — parallelism and cheaper-per-item are mandatory.

## Ask yourself

1. What's the cost per unit of useful output, and which stage dominates it?
2. Is the workload preemption-safe (late ack + checkpoint) so spot is viable?
3. Which levers cut GPU time (batching, smaller models, cheaper pre-filters)?

## Pitfalls

> Ranking storage as the top cost — it's **GPU first**, CPU second, storage third.

> Spot without checkpointing/late-ack loses whole batches on preemption.

> Optimizing CPU/storage while GPUs sit underutilized misses the real bill.
