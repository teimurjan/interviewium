---
title: Regularization (L1 / L2 / ElasticNet)
emoji: 🪢
summary: Penalize big weights to trade variance for bias.
scene: A budget on coefficient size — spend it all on one feature, or spread it thin across many.
triggers: [overfitting, L1, L2, lasso, ridge, elasticnet, sparsity, shrinkage, penalty]
order: 3
---

## Core idea

Add a penalty on weight magnitude to the loss so the model can't lean too hard on any
feature. **L2 (Ridge)** shrinks weights smoothly toward zero; **L1 (Lasso)** drives some
exactly to zero, giving feature selection; **ElasticNet** mixes both. Geometrically, L1's
diamond constraint hits axes (sparsity), L2's circle does not. Probabilistically, L2 is a
Gaussian prior on weights, L1 a Laplace prior.

## Formula

Ridge: loss `+ λΣwᵢ²`. Lasso: loss `+ λΣ|wᵢ|`. Larger `λ` = stronger penalty.

## Ask yourself

1. Many features, suspect most are noise → L1 for sparsity.
2. Correlated features, want to keep them all but tamed → L2.
3. Both at once (grouped correlated predictors) → ElasticNet.

## Pitfalls

> In SVM/logistic the knob is `C = 1/λ`: **smaller C = stronger regularization** —
> backwards from Ridge/Lasso's `λ`.

> Always scale features before penalizing — the penalty is not scale-invariant.

> L1 picks one of a group of correlated features arbitrarily; L2 or ElasticNet is steadier.
