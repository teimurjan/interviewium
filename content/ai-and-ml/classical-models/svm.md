---
title: Support Vector Machines
emoji: 🛡️
summary: Find the widest-margin separating boundary.
scene: Pushing two opposing crowds apart and standing in the widest possible gap between them.
triggers: [svm, margin, hinge loss, kernel trick, support vectors, maximum margin]
order: 4
---

## Core idea

Find the hyperplane that **maximizes the margin** to the nearest points (the support
vectors). The hinge loss penalizes margin violations; the **kernel trick** maps data into
higher dimensions implicitly, letting a linear boundary carve non-linear shapes. A
discriminative, margin-based method.

## Formula

Decision `= sign(wᵀx + b)`; hinge loss `= max(0, 1 − y·(wᵀx + b))` plus `λ‖w‖²`.

## Ask yourself

1. Medium-sized data, clear margin, high dimensions (e.g. text)?
2. Need non-linear boundary → RBF/polynomial kernel.
3. Want probabilities? SVM gives scores; calibrate separately.

## Pitfalls

> **LinearSVC is O(n·d)** and scales well; kernel SVM is roughly O(n²)–O(n³) — avoid on
> huge datasets.

> `C` is inverse regularization: smaller C = wider margin, more tolerance for violations.

> Always scale features — margins are distance-based.
