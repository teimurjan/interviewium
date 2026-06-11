---
title: LDA & QDA
emoji: 🧮
summary: Gaussian-per-class classifiers; shared vs separate covariance.
scene: Drawing a contour around each class's cloud — LDA forces equal-shaped clouds, QDA lets them differ.
triggers: [lda, qda, discriminant analysis, covariance, gaussian, dimensionality reduction]
order: 7
---

## Core idea

**Generative** classifiers assuming each class is Gaussian. **LDA** assumes a shared
covariance across classes → linear boundaries, and doubles as supervised dimensionality
reduction. **QDA** lets each class have its own covariance → quadratic boundaries, more
flexible but more parameters to estimate.

## Ask yourself

1. Roughly Gaussian classes with similar spread → LDA.
2. Classes with clearly different covariance shapes → QDA.
3. Want supervised dimensionality reduction for visualization → LDA.

## Pitfalls

> **LDA reduces to at most k−1 dimensions** for k classes (5 classes → 4, not 5).

> QDA needs enough data per class to estimate each covariance — it overfits on small classes.

> Both are generative, so they degrade gracefully with missing features but assume normality.
