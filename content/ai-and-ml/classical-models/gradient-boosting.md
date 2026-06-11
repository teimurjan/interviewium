---
title: Gradient Boosting (XGBoost / LightGBM / CatBoost)
emoji: 🚀
summary: Sequentially fit trees to the residual errors.
scene: A sculptor making pass after pass, each one shaving exactly where the last left it wrong.
triggers: [xgboost, lightgbm, catboost, boosting, residuals, early stopping, learning rate]
order: 3
---

## Core idea

Build trees **sequentially**, each new tree predicting the residual errors (negative
gradient) of the current ensemble. Start with high-bias weak learners; sequential
correction drives down bias. Regularization, shrinkage (learning rate), and early stopping
keep variance in check. Best-in-class for tabular data when you can tune.

## Ask yourself

1. Tabular data, need maximum accuracy and have time to tune?
2. Tune order: learning rate + n_estimators (early stopping) → tree depth → regularization.
3. LightGBM for speed on big data; CatBoost for many categoricals; XGBoost as the workhorse.

## Pitfalls

> Unlike Random Forest, **more trees CAN overfit** — use early stopping on a validation set.

> Lower learning rate needs more trees; they trade off, tune together.

> CatBoost's ordered target encoding fights the leakage that naive encoding causes.
