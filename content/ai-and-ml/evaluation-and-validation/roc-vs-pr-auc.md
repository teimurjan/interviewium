---
title: ROC-AUC vs PR-AUC
emoji: 📉
summary: For rare positives, PR-AUC tells the honest story.
scene: Two dashboards of the same engine — one hides the warning light that the other makes glaring.
triggers: [roc auc, pr auc, imbalanced, fraud, threshold free, ranking, positive class]
order: 3
---

## Core idea

**ROC-AUC** uses TPR and FPR — both have fixed denominators tied to the actual class
counts, so it's invariant to imbalance. That invariance can *hide* problems: a 1% FPR on
10,000 negatives is 100 false alarms. **PR-AUC** focuses on the positive class and exposes
this. For heavily imbalanced problems (fraud, healthcare), PR-AUC is the honest picture.

## Ask yourself

1. Is the positive class rare? → prefer PR-AUC.
2. Do I care about ranking quality across both classes equally? → ROC-AUC is fine.
3. What absolute false-alarm volume does my FPR imply at scale?

## Pitfalls

> ROC-AUC can look great on imbalanced data while the model is useless in practice.

> PR-AUC's baseline is the positive rate, not 0.5 — compare against that.

> AUC measures ranking, not calibration — a well-ranked model can still be miscalibrated.
