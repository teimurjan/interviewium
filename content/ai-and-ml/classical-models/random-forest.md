---
title: Random Forest
emoji: 🌲
summary: Average many decorrelated trees to cut variance.
scene: A crowd of independent guessers — each a bit wrong, their average eerily right.
triggers: [bagging, bootstrap, ensemble, feature subsampling, variance reduction, robust]
order: 2
---

## Core idea

Build many deep trees in parallel, each on a **bootstrap sample** and a **random feature
subset** at each split. The randomness decorrelates the trees; averaging decorrelated
high-variance learners slashes variance without raising bias. Strong, robust default for
tabular data with little tuning.

## Ask yourself

1. Tabular data, want a reliable baseline with minimal tuning?
2. Noisy data where boosting might overfit?
3. Need free out-of-bag error estimates and feature importance?

## Pitfalls

> More trees never overfit — they only stabilize the average (unlike boosting, which can).

> Importance from impurity is biased toward high-cardinality features; prefer permutation
> importance.

> Big and slow to serve at scale compared to a single boosted model.
