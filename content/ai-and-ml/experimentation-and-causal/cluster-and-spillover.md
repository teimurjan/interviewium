---
title: Cluster & Spillover
emoji: 🕸️
summary: Randomize groups when treatment leaks between units.
scene: Vaccinating whole villages, not individuals, so the protected don't shield the controls.
triggers: [cluster randomization, spillover, interference, network effect, SUTVA, contamination]
order: 5
---

## Core idea

When one unit's treatment affects another's outcome, the independence assumption (SUTVA)
breaks and per-user randomization is biased. **Cluster randomization** assigns whole groups
(cities, social clusters, villages) to one arm so spillover stays inside a cluster.
Switchback is the time-based cousin for marketplaces.

## Ask yourself

1. Can treatment leak between units (social, geographic, marketplace)?
2. What's the natural cluster boundary that contains the spillover?
3. Do I have enough clusters for power (clusters, not users, are the unit)?

## Pitfalls

> Treating clusters' users as independent overstates power — analyze at the cluster level.

> Too few large clusters tanks statistical power despite many users.

> Residual cross-cluster leakage still biases the estimate; pick boundaries carefully.
