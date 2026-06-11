---
title: Feature Scaling
emoji: ⚖️
summary: Put features on comparable scales — when it matters.
scene: Tuning instruments to the same pitch before the orchestra plays together.
triggers: [standardization, normalization, z-score, min-max, gradient descent, distance metric]
order: 5
---

## Core idea

Standardize (`z = (x − μ)/σ`) or min-max scale features when the algorithm cares about
distance or gradient geometry: gradient descent, SVM, KNN, PCA, k-means, neural nets.
Tree-based models (Random Forest, XGBoost) are split-based and **scale-invariant** — don't
bother. Sometimes raw magnitude is the signal itself and scaling destroys it.

## Ask yourself

1. Distance- or gradient-based model → scale it.
2. Tree ensemble → skip scaling.
3. Does raw magnitude carry meaning (e.g. gene expression levels)? Then think twice.

## Pitfalls

> Fit the scaler on the training fold only, then apply to validation/test — fitting on all
> data leaks distribution information.

> Unscaled features create an elongated loss valley, causing slow or non-converging
> gradient descent — that's geometry, not non-convexity.
