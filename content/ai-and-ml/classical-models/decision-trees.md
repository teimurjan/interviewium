---
title: Decision Trees
emoji: 🌳
summary: Greedily split features to purify the target.
scene: A game of twenty questions, each question chosen to cut the remaining uncertainty most.
triggers: [decision tree, gini, entropy, information gain, splits, pruning, interpretable]
order: 1
---

## Core idea

Recursively split the data on the feature/threshold that most reduces impurity, forming a
tree of if-then rules. Greedy and interpretable, but a single deep tree overfits badly —
it's the weak learner that ensembles tame.

## Formula

Gini `= 1 − Σpᵢ²`; entropy `= −Σpᵢ·log pᵢ`. Pick the split with the largest impurity drop
(information gain).

## Ask yourself

1. Need a human-readable rule set or quick feature intuition?
2. Non-linear interactions that linear models miss?
3. Will I bag/boost it, or use it standalone (then prune hard)?

## Pitfalls

> An unpruned tree memorizes the training set — limit depth, min-samples, or prune.

> Greedy splits are locally optimal, not globally; small data changes reshape the tree.

> Biased toward high-cardinality features when using naive information gain.
