---
title: t-SNE & UMAP
emoji: 🗺️
summary: Non-linear embeddings for visualization only.
scene: Flattening a crumpled map to see which towns cluster — but the printed distances now lie.
triggers: [t-sne, umap, visualization, manifold, clusters, embedding, neighborhood]
order: 6
---

## Core idea

Non-linear dimensionality reduction that preserves **local neighborhoods** to reveal
cluster structure in 2-D/3-D. UMAP is faster and keeps more global structure than t-SNE.
Both are for *visualization and exploration*, not as features or distance metrics for
downstream models.

## Ask yourself

1. Do I want to *see* cluster structure, not feed a model?
2. UMAP for speed and some global structure; t-SNE for fine local clusters.
3. Have I tuned perplexity / n_neighbors and checked stability across seeds?

## Pitfalls

> **Distances and cluster sizes in the output are not meaningful** — don't read magnitudes
> into them.

> Results shift with hyperparameters and random seed; never use the embedding as input
> features.

> Apparent gaps can be artifacts, not real separation.
