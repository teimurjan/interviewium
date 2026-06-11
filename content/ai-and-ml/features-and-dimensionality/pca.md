---
title: PCA
emoji: 🔭
summary: Project onto directions of maximum variance.
scene: Photographing a 3-D object from the angle that reveals the most shape in one flat image.
triggers: [pca, eigenvectors, variance, dimensionality reduction, principal components, whitening]
order: 5
---

## Core idea

Find orthogonal directions (**eigenvectors** of the covariance matrix) that capture the
most variance, and project the data onto the top-k. Unsupervised, linear, great for
decorrelation, denoising, and compression. Components are ordered by explained variance.

## Formula

Eigendecompose `Cov(X) = VΛVᵀ`; keep the top-k eigenvectors (largest eigenvalues `λ`).

## Ask yourself

1. Are features correlated and is variance a good proxy for signal?
2. How many components reach ~90–95% explained variance?
3. Do I need interpretable axes, or just a compressed input?

## Pitfalls

> Always **standardize first** — PCA chases large-variance features, so unscaled units
> dominate spuriously.

> Maximum variance ≠ maximum class separation; PCA is unsupervised (use LDA if you need
> discriminative axes).

> Components are linear combinations — they lose direct interpretability.
