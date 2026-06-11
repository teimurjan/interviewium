---
title: A/B Testing (Bayesian)
emoji: 🎲
summary: Posterior probability that B beats A.
scene: Updating your belief about two dice with every roll, instead of waiting for a verdict.
triggers: [bayesian ab test, posterior, prior, probability b beats a, credible interval]
order: 2
---

## Core idea

Instead of a p-value, compute the **posterior** over each variant's rate and report
`P(B > A)` and the expected loss of choosing wrong. It answers the question stakeholders
actually ask, allows continuous monitoring without the peeking penalty, and naturally
incorporates a prior (the base rate).

## Formula

`posterior ∝ likelihood × prior`; decide on `P(B > A)` and expected loss thresholds.

## Ask yourself

1. Do stakeholders want "probability B is better," not "reject H₀"?
2. Is there a sensible prior / base rate to encode?
3. What expected-loss threshold makes the decision acceptable?

## Pitfalls

> The prior matters — with little data the base rate dominates the posterior.

> "P(B > A) = 95%" is a probability about the parameter, unlike a frequentist p-value.

> Still needs a decision rule (loss threshold); a high P(B>A) with tiny effect may not be
> worth shipping.
