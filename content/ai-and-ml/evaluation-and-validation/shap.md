---
title: SHAP & Interpretability
emoji: 🔍
summary: Fairly attribute a prediction to its features.
scene: Splitting a team's bonus by each member's true marginal contribution to the win.
triggers: [shap, interpretability, feature importance, shapley, local explanation, additivity]
order: 7
---

## Core idea

SHAP shows how each feature moves a prediction from the baseline (average prediction) to
this specific output, using game-theoretic **Shapley values** to distribute credit fairly.
Key property: **additivity** — all SHAP values sum to `(prediction − baseline)`. Use it for
local debugging ("why was this flagged?") and global importance (mean |SHAP| across rows).

## Ask yourself

1. Do I need per-prediction explanations (local) or overall drivers (global)?
2. Is the audience expecting "why this case," which SHAP answers directly?
3. Am I about to read causation into what is only association?

## Pitfalls

> SHAP shows **correlation/attribution, not causation** — a feature can matter to the model
> without causing the outcome.

> Correlated features split credit between themselves, muddying importance.

> Exact SHAP is expensive; TreeSHAP is fast for tree models, KernelSHAP approximates.
