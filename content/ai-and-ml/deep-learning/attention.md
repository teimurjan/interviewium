---
title: Attention
emoji: 👁️
summary: Weight every token by relevance to the query.
scene: Reading a sentence and letting each word glance back at the few others that explain it.
triggers: [attention, query key value, scaled dot product, softmax, context, self-attention]
order: 2
---

## Core idea

Attention lets each position pull information from all others, weighted by relevance. Each
token emits a **query**, every token a **key** and **value**; the dot product of query and
keys (scaled, softmaxed) gives weights that mix the values. This captures long-range
dependencies in parallel, unlike sequential RNNs.

## Formula

`Attention(Q, K, V) = softmax(QKᵀ / √dₖ)·V` — the `√dₖ` keeps dot products from saturating
softmax.

## Ask yourself

1. Do distant elements need to influence each other directly?
2. Is parallelism over a sequence valuable (vs RNN recurrence)?
3. Self-attention (within one sequence) or cross-attention (between two)?

## Pitfalls

> Forgetting the `√dₖ` scaling pushes softmax into tiny gradients.

> Attention is O(n²) in sequence length — long contexts get expensive.

> It has no inherent order — positional encodings supply the sequence information.
