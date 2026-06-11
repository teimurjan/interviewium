---
title: Naive Bayes
emoji: 📨
summary: Bayes' rule with a naive independence assumption.
scene: Judging a letter as spam word by word, pretending each word's verdict is independent.
triggers: [naive bayes, conditional independence, generative, text classification, spam, prior]
order: 5
---

## Core idea

A **generative** classifier: model `P(features | class)` and the class prior, then apply
Bayes' rule. The "naive" assumption is conditional independence of features given the
class — usually false, yet it works because the *decision* only needs the right argmax, not
calibrated probabilities ("same broken scale" on both classes). Fast, strong baseline for
text.

## Formula

`P(y | x) ∝ P(y)·∏ᵢ P(xᵢ | y)`. Predict the class maximizing this product.

## Ask yourself

1. High-dimensional sparse features (bag-of-words)?
2. Need a fast, low-data baseline before heavier models?
3. Are probabilities or just rankings needed? (Its probabilities are poorly calibrated.)

## Pitfalls

> It's GENERATIVE — it models the joint and could generate samples.

> Use Laplace (add-one) smoothing or an unseen feature zeroes the whole product.

> Correlated features get double-counted, skewing the probability estimates.
