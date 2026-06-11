---
title: Data Leakage
emoji: 🚰
summary: Train-time access to info unavailable at predict-time.
scene: A student who "studied hard" — by reading the answer key the night before.
triggers: [leakage, point-in-time, train test contamination, adversarial validation, too good]
order: 4
---

## Core idea

Leakage is when the model sees information at training time it won't have at prediction
time, producing great offline metrics that collapse in production. Sources: target-derived
features, future data, fitting transforms on the whole dataset, and target encoding done
outside folds. Enforce **point-in-time correctness** and put all preprocessing inside the CV loop.

## Ask yourself

1. Is every feature computable using only data available *before* the prediction moment?
2. Are scalers/imputers/encoders fit inside the fold, not on the full set?
3. Does a metric look suspiciously perfect? Probe with **adversarial validation**.

## Pitfalls

> SMOTE/resampling must happen **inside each fold**, never before splitting.

> A feature that's a proxy for the label (e.g. "account closed date" for churn) is leakage.

> Train/test rows from the same entity or time window leak across the split — use GroupKFold
> or time-series CV.
