---
title: K-Nearest Neighbors
emoji: 🧲
summary: Predict from the labels of the closest points.
scene: Asking your k nearest neighbors how they voted and going with the majority.
triggers: [knn, nearest neighbor, distance, lazy learning, curse of dimensionality, k]
order: 6
---

## Core idea

No training — store the data, and at inference label a point by the majority (or average)
of its k nearest neighbors. Simple and non-parametric, but every prediction is a full
search, and distances become meaningless in high dimensions (curse of dimensionality).

## Ask yourself

1. Low-dimensional data with a meaningful distance metric?
2. Small-to-medium dataset (inference cost grows with n)?
3. Is the decision boundary irregular and local rather than global?

## Pitfalls

> **Curse of dimensionality**: in high dimensions all points are nearly equidistant — KNN
> degrades. Reduce dimensions first.

> Must scale features; an unscaled large-range feature dominates the distance.

> Small k = noisy/overfit; large k = oversmoothed. Tune via CV.
