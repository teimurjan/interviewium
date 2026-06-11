---
title: Neural Network Foundations
emoji: 🧠
summary: Stacked non-linear layers trained by backprop.
scene: A bucket brigade passing signal forward, then passing blame backward to fix each hand.
triggers: [neural network, backpropagation, relu, vanishing gradient, activation, skip connection]
order: 1
---

## Core idea

Layers of linear transforms with non-linear activations let a network approximate complex
functions. Train by **backpropagation**: compute the loss gradient layer by layer via the
chain rule, then step. Depth brings power but also **vanishing/exploding gradients**, fixed
by ReLU activations, normalization, and skip (residual) connections.

## Formula

Forward: `aₗ = φ(Wₗ·aₗ₋₁ + bₗ)`. Backprop applies the chain rule to get `∂L/∂Wₗ`.

## Ask yourself

1. Is the relationship non-linear enough to beat a tree/linear model and justify the cost?
2. Enough data to train without overfitting?
3. Are gradients flowing — do I need ReLU, BatchNorm, or residual connections?

## Pitfalls

> Sigmoid/tanh saturate and **vanish gradients** in deep stacks — ReLU and skip connections
> are the standard fixes.

> Unnormalized inputs and bad init stall training; use proper initialization + normalization.

> Without regularization (dropout, weight decay) deep nets overfit fast.
