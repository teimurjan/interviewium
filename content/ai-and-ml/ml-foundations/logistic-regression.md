---
title: Logistic Regression
emoji: 📈
summary: Log-odds modeled linearly, squashed to a probability.
scene: A dimmer switch that maps any voltage onto a smooth 0-to-1 brightness.
triggers: [binary classification, probability, sigmoid, log-odds, cross-entropy, odds ratio]
order: 2
---

## Core idea

Model the **log-odds** of the outcome as a linear combination of features; the sigmoid
converts log-odds back to a probability. Train by minimizing cross-entropy, which avoids
the vanishing-gradient problem MSE would create here. Coefficients read as log-odds
changes, or equivalently odds ratios. It is a **discriminative** model.

## Formula

`p = σ(wᵀx + b) = 1 / (1 + e^-(wᵀx + b))`, loss = `−Σ[y·log p + (1−y)·log(1−p)]`.

## Ask yourself

1. Binary (or one-vs-rest) outcome and need calibrated probabilities?
2. Want interpretable coefficients as odds ratios?
3. Is the data close to linearly separable — will weights blow up?

## Pitfalls

> **Perfect separation** makes weights diverge to infinity; fix with regularization. This
> is a training problem, unlike the XOR case which is a fundamental linear limit.

> Sigmoid isn't chosen for "nice properties" — it's the inverse of the logit, a direct
> consequence of the log-odds-are-linear assumption.

> It's DISCRIMINATIVE, not generative (Naive Bayes is the generative one).
