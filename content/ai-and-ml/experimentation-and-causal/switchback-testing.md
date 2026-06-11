---
title: Switchback Testing
emoji: 🔀
summary: Toggle treatment over time windows in a whole market.
scene: A city that flips its policy on and off each hour, comparing the on-hours to the off-hours.
triggers: [switchback, marketplace, interference, time windows, network effect, ride-hailing]
order: 3
---

## Core idea

When users interfere with each other (marketplaces, ride-hailing, pricing), a user-level
A/B test is biased — treating one rider changes the supply seen by control riders.
**Switchback** alternates the whole market between treatment and control over time windows,
so each period is internally consistent. The unit of randomization is the time-region block,
not the user.

## Ask yourself

1. Do treated and control units share a finite resource (drivers, inventory, price)?
2. Is the effect mediated by market-level state (surge, dispatch)?
3. What window length balances enough switches against carryover effects?

## Pitfalls

> Standard A/B with interference under- or over-states the effect; switchback removes the
> spillover.

> Carryover between adjacent windows biases results — leave burn-in or randomize block order.

> Fewer effective independent units (time blocks) means lower power than naive A/B math
> suggests.
