---
title: DPO
emoji: ⚡
summary: Optimize preferences directly, skip the reward model.
scene: Skipping the critic entirely — just rewarding the dish people picked and demoting the one they didn't.
triggers: [dpo, direct preference optimization, preference pairs, reference model, no rl]
order: 2
---

## Core idea

Direct Preference Optimization skips the reward model and RL loop entirely. It trains
directly on preference pairs — raise the probability of the chosen response, lower the
rejected one — while staying anchored to a reference model. Same goal as RLHF, but simpler,
more stable, and cheaper. Now the default for most open-source alignment.

## Formula

Loss pushes `log[π(chosen)/π_ref(chosen)]` above `log[π(rejected)/π_ref(rejected)]`.

## Ask yourself

1. Have preference pairs and want to avoid RL complexity?
2. Is a stable reference model available to anchor against?
3. Is stability/cost a bigger concern than squeezing out the last bit of RLHF performance?

## Pitfalls

> Still needs the reference model — drifting too far from it degrades quality.

> Preference data quality dominates; noisy pairs teach the wrong thing.

> No explicit reward model means less control over the reward signal's shape.
