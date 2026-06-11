---
title: End-to-End Pipeline Design
emoji: 🛤️
summary: Discover, process, annotate, store, serve to training.
scene: "A factory line: raw material in one end, a clean versioned dataset out the other."
triggers: [pipeline design, etl, ingestion, orchestration, oltp olap, webdataset, data lineage]
order: 1
---

## Core idea

A production data pipeline is staged cheap-to-expensive and orchestrated as batch.
Discovery → download to blob storage → CPU processing (decode, resample, validate) →
GPU annotation → metadata to an OLTP store → nightly sync to OLAP for querying → ML
engineers freeze dataset IDs → a sharding step produces training-ready archives
(WebDataset) streamed to GPUs. **Airflow orchestrates; specialized systems execute.**

## Ask yourself

1. What's the cheap-to-expensive ordering so cheap filters cut work before GPUs?
2. Where's the OLTP→OLAP boundary (writes vs analytical queries)?
3. How are datasets frozen and versioned for reproducible training?

## Pitfalls

> Orchestrator fan-out to millions of tasks bottlenecks the scheduler — batch into shards.

> Serving individual files starves GPUs; shard into archives (WebDataset) for throughput.

> Without dataset versioning/lineage, a model bug can't be traced to its data.
