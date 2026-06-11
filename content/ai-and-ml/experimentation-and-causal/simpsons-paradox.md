---
title: Simpson's Paradox
emoji: 🔄
summary: A trend that reverses once you segment.
scene: A drug that helps every age group yet looks harmful overall — because the sick skewed one arm.
triggers: [simpsons paradox, confounding, mix shift, aggregation, stratified, subgroup reversal]
order: 4
---

## Core idea

An aggregate comparison can reverse when you split by a confounder, because the groups
differ in composition (**mix shift**). The aggregate is dominated by *which* units fell in
each arm, not the treatment. Defend with **stratified randomization** and by checking
segment-level results, not just the pooled number.

## Ask yourself

1. Do the arms differ in composition (a confounder unevenly distributed)?
2. Does the conclusion hold within each segment, or only in aggregate?
3. Was assignment stratified on the key covariate?

## Pitfalls

> A balanced overall metric can hide a uniform per-segment effect — always slice key segments.

> Pooling traffic with different base rates produces a mix-shift illusion.

> Stratify randomization on known confounders up front rather than fixing it post hoc.
