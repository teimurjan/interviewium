---
title: Linear Regression
emoji: 📏
summary: Fit a line by minimizing squared error.
scene: A taut elastic band threaded through a scatter of points, pulled to the position that strains it least.
triggers: [continuous target, regression, least squares, coefficients, OLS, linear relationship]
order: 1
---

## Core idea

Model the target as a linear combination of features and choose weights that minimize
squared error. Three lenses give the same answer: the **statistics** view (minimize
residual sum of squares), the **probabilistic** view (MLE assuming Gaussian noise), and
the **ML** view (a one-layer model trained by gradient descent).

## Formula

`ŷ = wᵀx + b`, loss = mean of `(y − ŷ)²`. Closed form: `w = (XᵀX)⁻¹Xᵀy`.

## Ask yourself

1. Is the target continuous and roughly linear in the features?
2. Do I need interpretable coefficients (effect per unit)?
3. Are features collinear — will `XᵀX` be near-singular?

## Pitfalls

> Squared error is sensitive to outliers; one bad point bends the whole line.

> Collinear features make coefficients unstable — regularize or drop them.

> A high R² on training data says nothing about generalization.
