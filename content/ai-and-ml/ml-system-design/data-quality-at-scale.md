---
title: Data Quality at Scale
emoji: 🧹
summary: A cheap-to-expensive validation funnel with batch gates.
scene: Airport security lanes — quick ID check first, full bag scan only for those who pass.
triggers: [data quality, validation funnel, schema vs semantic, snr, batch gate, drift]
order: 3
---

## Core idea

Validate in a **funnel, cheapest checks first** so expensive ones only see survivors. For
audio: format → signal-level (SNR, clipping) → VAD speech % → speaker diarization → ASR
(Whisper). CPU checks run inline; GPU checks run as a separate stage. Apply **batch-level
quality gates**: 0.2% failures are noise, 40% failures halt the batch for investigation.

## Ask yourself

1. What order makes cheap checks reject bad data before expensive ones run?
2. Am I checking **schema** (right shape/type) *and* **semantic** (meaningful content)?
3. What failure rate is noise vs a batch-halting signal?

## Pitfalls

> **Schema ≠ semantic validity**: a valid WAV tagged "English" whose audio is French passes
> schema but fails semantics.

> No batch gate means a corrupted source silently poisons the dataset.

> Running the expensive check first wastes GPU on data a format check would have dropped.
