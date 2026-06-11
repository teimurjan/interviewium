---
title: Pub/Sub
emoji: 📡
summary: Managed messaging with per-subscription delivery.
scene: A bulletin board where each subscriber gets their own copy and tears off a tab to acknowledge it.
triggers: [pub/sub, gcp, subscription, ack, push pull, at-least-once, managed messaging]
order: 2
---

## Core idea

GCP Pub/Sub is fully managed messaging. A topic fans out to **subscriptions**; each
subscription gets its own copy of the stream (like a consumer group). Consumers **pull**
or receive a **push** to an endpoint, and explicitly **ack** each message — there's no
client-managed offset. Unacked messages are redelivered.

## Ask yourself

1. One subscription per independent consumer that needs the full stream?
2. Pull (consumer-paced) or push (event-driven to an endpoint)?
3. Is processing idempotent for redelivery?

## Pitfalls

> Mental model is **subscription-based pull/push with ack**, not "fetch a message by ID."

> Default is at-least-once — duplicates happen, so dedup/idempotency is on you.

> Forgetting to ack (or a too-short ack deadline) causes endless redelivery.
