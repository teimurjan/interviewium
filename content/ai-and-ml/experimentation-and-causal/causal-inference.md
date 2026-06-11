---
title: Causal Inference
emoji: 🧭
summary: Estimate effects when you can't randomize.
scene: A natural experiment — a policy that flips on one date, the before and after as your arms.
triggers: [causal inference, quasi-experiment, diff-in-diff, interrupted time series, confounder]
order: 6
---

## Core idea

When an A/B test is impossible, approximate the counterfactual with quasi-experiments:
**difference-in-differences** (compare treated vs control trends across a change),
**interrupted time series** (model the pre-trend, measure the jump at intervention), and
instrumental variables. The whole game is constructing a credible "what would have happened
otherwise."

## Ask yourself

1. Why can't I randomize — and what natural variation can I exploit instead?
2. Is there a valid control group or a stable pre-trend to extrapolate?
3. What confounders threaten the parallel-trends / no-other-shock assumption?

## Pitfalls

> Correlation isn't causation — an unmodeled confounder can fake the whole effect.

> Diff-in-diff needs parallel pre-trends; interrupted time series needs no coincident shock.

> Quasi-experimental estimates are only as good as their identifying assumptions — state them.
