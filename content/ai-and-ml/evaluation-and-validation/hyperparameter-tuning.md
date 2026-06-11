---
title: Hyperparameter Tuning
emoji: 🎛️
summary: Search the config space without overfitting it.
scene: Turning dials on a mixing board — sampling settings smartly beats turning every knob fully.
triggers: [hyperparameter, grid search, random search, bayesian optimization, tuning]
order: 5
---

## Core idea

Search hyperparameters on a validation signal. **Random search** beats grid search in
high dimensions — it explores each important dimension more densely for the same budget.
**Bayesian optimization** models the objective to propose promising configs, worth it when
each evaluation is expensive. Always tune on validation, never the test set.

## Ask yourself

1. Few cheap evaluations → random search. Expensive evaluations → Bayesian.
2. Which 2–3 hyperparameters actually move the metric (tune those first)?
3. Am I tuning on a separate split from final evaluation (nested CV)?

## Pitfalls

> Grid search wastes budget on unimportant dimensions; random covers important ones better.

> Tuning against the test set silently overfits it — that's a leak.

> Report the score from an untouched fold, not the best tuning-run score.
