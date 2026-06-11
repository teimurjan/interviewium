---
title: LoRA & QLoRA
emoji: 🧩
summary: Fine-tune tiny low-rank adapters, freeze the rest.
scene: Adding a thin overlay sheet to a printed book instead of reprinting every page.
triggers: [lora, qlora, low rank adaptation, peft, fine-tuning, quantization, adapter]
order: 4
---

## Core idea

LoRA freezes the base model and trains small **low-rank** update matrices injected into the
weights — a fraction of the parameters, so it's cheap and adapters are swappable. **QLoRA**
quantizes the frozen base to 4-bit, letting large models fine-tune on a single GPU. Reach
for fine-tuning over prompting when you need a consistent style/format or to teach a narrow
skill.

## Formula

Replace `W` with `W + BA` where `B` is `d×r`, `A` is `r×d`, and rank `r ≪ d`.

## Ask yourself

1. Is prompting/RAG insufficient — do I need to change behavior, not knowledge?
2. Is GPU memory the constraint → QLoRA's 4-bit base.
3. What rank `r` balances capacity against overfitting on my small dataset?

## Pitfalls

> Fine-tuning teaches behavior/style, not fresh facts — use RAG for changing knowledge.

> Too-high rank overfits small datasets and erodes the savings.

> QLoRA's quantization can cost a little quality versus full-precision LoRA.
