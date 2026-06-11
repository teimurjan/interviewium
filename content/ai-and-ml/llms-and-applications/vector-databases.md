---
title: Vector Databases
emoji: 🗃️
summary: Approximate nearest-neighbor search over embeddings.
scene: A library shelved by meaning, where finding "nearby ideas" is a quick walk, not a full scan.
triggers: [vector database, hnsw, ann, cosine, bi-encoder, cross-encoder, retrieval, index]
order: 5
---

## Core idea

Store embeddings and serve **approximate nearest-neighbor** (ANN) queries fast, typically
via an HNSW graph index. The retrieval stack uses a **bi-encoder** (embed query and docs
separately, cheap, indexable) for first-pass recall, then optionally a **cross-encoder**
(scores query-doc pairs jointly, accurate, slow) to re-rank the top candidates.

## Ask yourself

1. Is the corpus too big for brute-force search → ANN index (HNSW)?
2. Bi-encoder for scalable recall, cross-encoder re-rank for precision?
3. Which distance matches the embeddings (cosine for normalized text vectors)?

## Pitfalls

> **Cosine for text/embeddings** (direction), Euclidean for tabular (magnitude) — mismatched
> metric tanks recall.

> ANN trades a little recall for speed; tune HNSW params (M, ef) for the accuracy you need.

> Cross-encoders don't scale to the whole corpus — only re-rank the retrieved shortlist.
