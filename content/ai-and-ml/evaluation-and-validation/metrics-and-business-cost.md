---
title: Metrics & Business Cost
emoji: 💰
summary: Choose the metric from the cost of being wrong.
scene: Before scoring anything, asking what a false alarm and a missed case each actually cost.
triggers: [evaluation, business cost, false positive, false negative, metric selection, KPI]
order: 1
---

## Core idea

Pick the metric from the **business decision**, not habit. Start by asking the cost of a
false positive vs a false negative, what action the prediction drives, and what constraints
(latency, explainability) exist. Only then map to technical metrics and a threshold. A
model optimizing the wrong metric is worse than useless.

## Ask yourself

1. What does a false positive cost vs a false negative? (Fraud, healthcare → FN is dear.)
2. What decision/action does the score trigger, at what threshold?
3. Are classes imbalanced — does accuracy hide failure?

## Pitfalls

> Accuracy is misleading under imbalance — 99% by predicting the majority class.

> A single threshold-free metric still needs a threshold chosen by business constraints.

> Optimize the offline metric that actually tracks the online outcome you care about.
