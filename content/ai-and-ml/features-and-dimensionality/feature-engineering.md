---
title: Feature Engineering
emoji: 🛠️
summary: Encode domain knowledge the model can't infer.
scene: A chef prepping ingredients — the raw shapes the model can actually cook with.
triggers: [feature engineering, aggregations, temporal features, ratios, domain knowledge]
order: 1
---

## Core idea

Transform raw fields into signals the model can use: **aggregations** (rolling counts,
sums per group), **temporal** features (hour, day-of-week, time-since-event), **ratios**
and interactions, and **target encoding** for categoricals. Often the highest-leverage
work in tabular ML — more than swapping models.

## Ask yourself

1. What aggregations capture behavior over time (rolling 5/10/15-min windows)?
2. Are there ratios or interactions the linear/tree model can't discover alone?
3. Is each feature computable at inference with only past-available data?

## Pitfalls

> Any feature using future or label-derived info is leakage — enforce point-in-time
> correctness.

> Over-engineering adds noise and maintenance cost; validate each family of features.

> Aggregations must be reproducible in production exactly as in training.
