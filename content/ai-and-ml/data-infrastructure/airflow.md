---
title: Airflow
emoji: 🗓️
summary: Schedule and orchestrate batch DAGs.
scene: "A railway timetable: tasks are trains, dependencies are tracks, the scheduler keeps them in order."
triggers: [airflow, dag, operator, scheduler, executor, cloud composer, orchestration, batch]
order: 4
---

## Core idea

Airflow orchestrates batch workflows as **DAGs** of tasks with dependencies and schedules.
It **orchestrates**, it doesn't execute heavy compute — operators (e.g.
KubernetesPodOperator) hand work to other systems. Executors set the parallelism:
Sequential → Local → Celery → Kubernetes as scale grows. **Cloud Composer** is managed
Airflow — same DAGs, same operators.

## Ask yourself

1. Is this scheduled batch with dependencies (vs real-time streaming)?
2. Which executor fits the scale (Local for small, Celery/Kubernetes for distributed)?
3. Should the heavy compute run in an operator that offloads to K8s/Spark?

## Pitfalls

> Airflow **orchestrates, not executes** — don't run big jobs in the scheduler; offload them.

> Fanning out to millions of tasks bottlenecks the scheduler; batch the work instead.

> Tasks should be idempotent and retry-safe — they will be re-run.
