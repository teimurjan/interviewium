---
title: Target Encoding (High-Cardinality)
emoji: 🏷️
summary: Replace a category with its smoothed target mean.
scene: Tagging each city with its historical average — but computed so today can't peek at itself.
triggers: [target encoding, high cardinality, categorical, mean encoding, smoothing, leakage]
order: 2
---

## Core idea

For categoricals with too many levels for one-hot, replace each level with the (smoothed)
mean target for that level. Powerful but leakage-prone: a level's encoding must not include
the row it's applied to. Use **fold-based / out-of-fold** encoding or CatBoost's ordered
scheme, plus smoothing toward the global mean for rare levels.

## Formula

`enc(c) = (nₚ·mean_c + α·mean_global) / (nₚ + α)` — `α` shrinks rare categories to the prior.

## Ask yourself

1. Is cardinality too high for one-hot (zip codes, user IDs, SKUs)?
2. Am I computing the encoding out-of-fold to avoid leakage?
3. Are rare levels smoothed toward the global mean?

## Pitfalls

> Encoding on the full dataset before CV leaks the target — do it **inside each fold**.

> Rare categories overfit to a single observation without smoothing.

> The encoding must be frozen from training and reused unchanged at inference.
