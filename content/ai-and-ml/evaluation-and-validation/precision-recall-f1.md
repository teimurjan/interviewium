---
title: Precision, Recall, F1
emoji: 🎚️
summary: Trade false alarms against misses at a threshold.
scene: A bouncer choosing how strict to be — too tight rejects friends, too loose lets trouble in.
triggers: [precision, recall, f1, threshold, confusion matrix, true positive, tradeoff]
order: 2
---

## Core idea

**Precision** = of those predicted positive, how many are right (`TP/(TP+FP)`). **Recall** =
of actual positives, how many we caught (`TP/(TP+FN)`). They trade off as you move the
threshold. **F1** is their harmonic mean — use it when you need one number balancing both.
Choose the operating point from the constraint, not the default 0.5.

## Formula

`Precision = TP/(TP+FP)`, `Recall = TP/(TP+FN)`, `F1 = 2·P·R/(P+R)`.

## Ask yourself

1. Is a missed positive (recall) or a false alarm (precision) more costly?
2. Is there a hard constraint ("≥95% recall") that fixes the threshold?
3. Should I report F1, or precision@k / recall@k for the real use case?

## Pitfalls

> Default threshold 0.5 is arbitrary — set it from the precision/recall constraint.

> F1 weights precision and recall equally; use Fβ when one matters more.

> Tune the threshold on validation data, not on the test set.
