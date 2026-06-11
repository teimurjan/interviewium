---
title: RAG
emoji: 📚
summary: Retrieve relevant context, then generate grounded answers.
scene: An open-book exam — the model looks up the right page before writing its answer.
triggers: [rag, retrieval augmented generation, chunking, hybrid search, grounding, hallucination]
order: 3
---

## Core idea

Retrieval-Augmented Generation injects retrieved documents into the prompt so the LLM
answers from current, private, or factual context instead of parametric memory. Pipeline:
**chunk** documents, embed and index them, **retrieve** top-k for a query (often hybrid
dense + keyword), then **generate** grounded in those chunks. Use it instead of fine-tuning
when knowledge changes or must be cited.

## Ask yourself

1. Is the knowledge dynamic, private, or citation-requiring → RAG over fine-tuning?
2. What chunk size and overlap preserve meaning without diluting retrieval?
3. Would hybrid search (dense + BM25) beat pure vector search here?

## Pitfalls

> Bad chunking wrecks everything — too large dilutes relevance, too small loses context.

> Retrieval quality caps answer quality; a re-ranker (cross-encoder) often helps.

> RAG reduces but doesn't eliminate hallucination — the model can still ignore the context.
