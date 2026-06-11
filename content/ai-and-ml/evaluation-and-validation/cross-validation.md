---
title: Cross-Validation
emoji: 🔁
summary: Rotate folds to estimate generalization honestly.
scene: Rotating which slice of the cake you save to taste-test, so every crumb gets judged once.
triggers: [cross validation, k-fold, stratified, groupkfold, time series cv, nested cv]
order: 4
---

## Core idea

Split data into k folds, train on k−1 and validate on the held-out one, rotating through.
Use **Stratified** k-fold for imbalanced classes, **GroupKFold** when rows share an entity
that must not straddle the split, and **time-series CV** (expanding/rolling window) for
temporal data so you never train on the future.

## Ask yourself

1. Imbalanced classes → stratify. Grouped entities → GroupKFold. Temporal → time-series CV.
2. Is all preprocessing happening *inside* the fold loop?
3. Am I tuning AND evaluating — if so, do I need nested CV?

## Pitfalls

> **Nested CV**: the fold used for *any* tuning decision cannot be the final-evaluation fold.
> Inner loop tunes, outer loop evaluates.

> Plain k-fold on time series leaks the future — always respect time order.

> Random splits with grouped data (same user in train and test) overstate performance.
