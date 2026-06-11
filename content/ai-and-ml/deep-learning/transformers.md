---
title: Transformers
emoji: 🤖
summary: Attention blocks stacked, no recurrence.
scene: An assembly line where every station sees the whole product at once, not just the piece before it.
triggers: [transformer, encoder, decoder, multi-head, positional encoding, self-attention, BERT, GPT]
order: 3
---

## Core idea

Transformers stack multi-head self-attention + feed-forward blocks with residual
connections and layer norm. **Encoders** (BERT) see the whole sequence bidirectionally —
good for understanding/classification. **Decoders** (GPT) are causal/masked — good for
generation. **Positional encodings** inject order since attention is permutation-invariant.

## Ask yourself

1. Understanding/classification → encoder. Generation → decoder. Seq-to-seq → both.
2. Multi-head: different heads attend to different relationships in parallel.
3. How is order encoded (sinusoidal, learned, rotary)?

## Pitfalls

> Without positional encodings the model can't tell word order — attention alone is order-blind.

> Quadratic attention cost limits context length; long-context variants approximate it.

> Encoder vs decoder masking is the key difference — bidirectional vs causal.
