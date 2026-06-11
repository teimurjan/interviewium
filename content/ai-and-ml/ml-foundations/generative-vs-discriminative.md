---
title: Generative vs Discriminative
emoji: 🪞
summary: Model the data, or model the boundary.
scene: One artist learns to paint each animal; the other just learns to point at which is which.
triggers: [generative, discriminative, naive bayes, joint vs conditional, decision boundary]
order: 6
---

## Core idea

**Generative** models learn the joint `P(x, y)` — they could generate new samples — then
use Bayes' rule to classify (Naive Bayes, LDA, GMMs). **Discriminative** models learn
`P(y | x)` or the decision boundary directly (Logistic Regression, SVM, most neural nets).
Discriminative usually wins on accuracy with enough data; generative needs less data and
handles missing features more gracefully.

## Ask yourself

1. Do I need to sample or reason about how the data was produced? → generative.
2. Do I only need the label given the input? → discriminative.
3. Small data or missing features? → generative degrades more gracefully.

## Pitfalls

> The classic mix-up: **Naive Bayes / LDA are GENERATIVE; Logistic Regression and SVM are
> DISCRIMINATIVE.** Memory trick: "generative = could generate new samples."
