---
title: Storage (BigQuery / GCS / Postgres)
emoji: 🏛️
summary: Row store for writes, column store for analytics, blobs for files.
scene: A filing cabinet for live paperwork, a warehouse for bulk analysis, a locker room for raw boxes.
triggers: [bigquery, gcs, postgres, oltp, olap, columnar, partitioning, storage classes]
order: 6
---

## Core idea

Match the store to the access pattern. **PostgreSQL** is row-oriented OLTP — fast point
writes/reads, transactions, indexes. **BigQuery** is column-oriented OLAP — scans huge
tables cheaply with partitioning + clustering. **GCS** holds blobs (audio, models) with
storage classes (Standard → Nearline → Coldline → Archive) trading retrieval cost for
storage cost. A common architecture: write to Postgres, sync nightly to BigQuery.

## Ask yourself

1. Transactional writes/lookups (OLTP → Postgres) or big analytical scans (OLAP → BigQuery)?
2. Unstructured files → GCS; which storage class for the access frequency?
3. Are BigQuery tables partitioned/clustered on the filter columns?

## Pitfalls

> Running analytics on the OLTP store (or transactions on the OLAP store) fights the engine.

> BigQuery bills by bytes scanned — partition/cluster or you pay for full scans.

> Cold GCS classes have minimum retention and retrieval fees — wrong class costs more.
