---
title: Audio & TTS Pipelines
emoji: 🎙️
summary: Clean, normalize, and keep speaker identity intact.
scene: A recording studio that labels every take with the singer's name, so each voice trains as itself.
triggers: [tts, audio preprocessing, lufs, vad, resample, speaker id, asr, deduplication]
order: 4
---

## Core idea

Audio prep: resample to a target rate (e.g. 24kHz mono), trim leading/trailing silence with
**VAD** (keep internal pauses — they carry prosody), and normalize loudness with **LUFS**,
not peak. For **TTS** (the opposite of ASR), the model must learn individual voices, so a
consistent **speaker_id** grouping is essential — without it outputs become "average mush."
Dedup with SHA-256 (exact) and Chromaprint + LSH (near-duplicate).

## Ask yourself

1. Is loudness normalized by perceived loudness (LUFS), not peak?
2. Is speaker identity preserved and grouped (required for TTS)?
3. Are exact and near-duplicates removed before training?

## Pitfalls

> **Peak normalization** scales to the loudest sample — one click breaks it; **LUFS**
> measures perceived loudness over time.

> **TTS needs speaker_id** — it's the opposite of ASR; mixing speakers yields averaged,
> identity-less output.

> VAD should trim only leading/trailing silence; cutting internal pauses destroys prosody.
