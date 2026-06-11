---
title: Batch Processing (Spark / dbt / Dataflow)
emoji: ⚙️
summary: Distributed transforms over large datasets.
scene: A kitchen of line cooks each prepping a tray, then everything plated together at the pass.
triggers: [spark, dbt, dataflow, beam, map shuffle reduce, distributed, etl, transformation]
order: 5
---

## Core idea

Process big data by distributing work across workers. **Spark** runs map–shuffle–reduce
over partitioned data in memory. **Apache Beam/Dataflow** expresses pipelines that run on a
managed autoscaling runner with shuffle. **dbt** does the in-warehouse SQL transform layer
(staging → intermediate → marts) with `ref()` lineage and tests. The expensive step is
almost always the **shuffle**.

## Ask yourself

1. SQL transforms inside a warehouse → dbt. Arbitrary distributed compute → Spark/Beam.
2. Managed autoscaling (Dataflow) vs self-managed cluster?
3. Can I cut the shuffle (partition/cluster wisely, pre-aggregate)?

## Pitfalls

> Shuffles dominate cost — minimize wide transforms and skewed keys.

> Data skew leaves one worker doing most of the work while others idle.

> dbt transforms data already in the warehouse; it doesn't move or ingest it.
