---
title: Bias-Variance Tradeoff
emoji: 🎯
summary: Underfit error vs sensitivity-to-data error.
scene: A dartboard — bias is aiming off-center, variance is a wide scatter even when aimed right.
triggers: [overfitting, underfitting, generalization, model complexity, train vs test gap]
order: 4
---

## Core idea

Expected test error decomposes into **bias** (error from too-simple assumptions —
underfitting), **variance** (error from over-sensitivity to the training sample —
overfitting), and irreducible noise. Increasing model complexity lowers bias but raises
variance. The goal is the sweet spot, found by validation, not by minimizing training error.

## Formula

`E[(y − ŷ)²] = Bias² + Variance + σ²_noise`.

## Ask yourself

1. Train error high too → high bias; add capacity or features.
2. Train error low but test error high → high variance; regularize or get more data.
3. Both already low → you're near the irreducible floor.

## Pitfalls

> More data reduces variance but not bias — a too-simple model stays wrong.

> Ensembles attack different terms: bagging cuts variance, boosting cuts bias.
