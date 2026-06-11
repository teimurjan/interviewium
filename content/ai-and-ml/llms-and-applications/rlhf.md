---
title: RLHF
emoji: 🎓
summary: Train a reward model, then RL the LLM to please it.
scene: A chef cooking for a critic whose scores they chase, while a leash stops them straying too far.
triggers: [rlhf, reward model, ppo, kl penalty, human preference, reward hacking, alignment]
order: 1
---

## Core idea

Reinforcement Learning from Human Feedback aligns an LLM in three pieces: (1) collect human
**preference comparisons** (A vs B), (2) train a **reward model** to predict them, (3) use
RL (PPO) to optimize the LLM for high reward. A **KL penalty** anchors the policy to the
original model so it doesn't drift into degenerate, reward-hacking outputs.

## Ask yourself

1. Do I have preference data (rankings), not just labels?
2. What keeps the policy from gaming the reward (KL penalty strength)?
3. Is the reward model itself robust, or will it be exploited?

## Pitfalls

> Without the KL penalty the policy **reward-hacks** — finds high-reward gibberish.

> The reward model is a proxy; over-optimizing it diverges from true human preference.

> Three models and an RL loop make it complex and unstable — see DPO for a simpler path.
