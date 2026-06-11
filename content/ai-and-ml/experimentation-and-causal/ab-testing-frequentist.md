---
title: A/B Testing (Frequentist)
emoji: 🧪
summary: Split traffic, test against the null with power.
scene: Two near-identical storefronts, customers flipped by coin, watching which till rings more.
triggers: [a/b test, p-value, statistical power, mde, sample size, peeking, significance]
order: 1
---

## Core idea

Randomly assign users to control/treatment, then test whether the difference is bigger than
chance. Set the **MDE** (smallest effect worth detecting), compute the **sample size** for
adequate power (usually 80%), run to completion, then read the **p-value** against α.
Randomization is what licenses the causal claim.

## Formula

`p-value = P(data this extreme | H₀ true)`. Power `= P(reject H₀ | H₁ true)`.

## Ask yourself

1. What's the MDE, and what sample size does 80% power require?
2. Is assignment truly random and units independent?
3. Have I fixed the horizon to avoid peeking?

## Pitfalls

> **p-value = P(data | H₀), NOT P(H₁ | data).** It is not "97% chance the variant wins."

> **Peeking** and stopping at the first significant moment inflates false positives — fix
> the sample size or use sequential tests.

> Multiple metrics/variants need correction (Bonferroni, FDR).
