---
title: Missing Data
emoji: 🕳️
summary: Treat missingness as signal, not just a gap to fill.
scene: A form with blanks — sometimes the blank itself tells you more than any guess.
triggers: [missing data, imputation, NaN, indicator variable, MCAR, MAR, MNAR]
order: 3
---

## Core idea

Why is it missing? **MCAR** (random) is safe to impute; **MAR** depends on observed data;
**MNAR** (missingness depends on the missing value itself) means the *fact* of missingness
is informative. Add an **indicator variable** for "was missing," then impute. Tree models
can often handle NaN natively.

## Ask yourself

1. Is missingness random, or does it correlate with the target (MNAR)?
2. Should I add a "was-missing" indicator before imputing?
3. Can the model (XGBoost/LightGBM) handle NaN directly instead?

## Pitfalls

> Blindly mean-imputing destroys MNAR signal — the missingness was the feature.

> Fit imputers on the training fold only; imputing on all data leaks distribution info.

> Imputing with the target or post-event data is leakage.
