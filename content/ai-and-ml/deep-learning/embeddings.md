---
title: Embeddings
emoji: 🧬
summary: Dense vectors where geometry encodes meaning.
scene: A map where synonyms sit as neighbors and "king − man + woman" lands near "queen".
triggers: [embeddings, word2vec, bpe, sentence embeddings, cosine similarity, semantic, vector]
order: 4
---

## Core idea

Map discrete tokens to dense vectors so that semantic similarity becomes geometric
proximity. Static embeddings (Word2Vec) give one vector per word; contextual ones (from
transformers) vary by sentence. **BPE/subword** tokenization handles rare and unseen words.
Sentence embeddings pool token vectors for retrieval and clustering.

## Ask yourself

1. Do I need static (word-level) or contextual (sentence-level) vectors?
2. Is the similarity metric right for the geometry (text → cosine)?
3. How are out-of-vocabulary tokens handled (subword/BPE)?

## Pitfalls

> Use **cosine** similarity for text/embeddings — direction carries meaning, not magnitude;
> Euclidean is for tabular where magnitude matters.

> Word2Vec gives one vector per word, blind to context ("bank" river vs money).

> The lookup matrix is `vocab × embedding_dim`; sequence length is a separate axis — don't
> conflate them.
