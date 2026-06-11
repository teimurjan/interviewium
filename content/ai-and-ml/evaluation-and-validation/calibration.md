---
title: Calibration
emoji: 🌡️
summary: Make predicted probabilities match reality.
scene: A weather forecaster whose "70% rain" days actually rain 70% of the time.
triggers: [calibration, reliability diagram, platt scaling, isotonic, probability, brier]
order: 6
---

## Core idea

A model is **calibrated** when, among samples it scores 0.7, about 70% are truly positive.
Check with a **reliability diagram** (predicted prob on x, observed frequency on y). Fix
with **Platt scaling** (sigmoid fit) or **isotonic regression** (non-parametric, needs more
data). Matters whenever the probability itself drives a decision (pricing, expected value).

## Ask yourself

1. Does a downstream decision use the probability value, not just the ranking?
2. Is the reliability curve off the diagonal?
3. Enough data for isotonic, or use Platt scaling?

## Pitfalls

> On a reliability diagram, **below the diagonal = OVERCONFIDENT** (reality < prediction).
> The y-axis is reality.

> Boosted trees and SVMs are often miscalibrated despite good AUC.

> Fit the calibrator on a held-out set, not the training data.
