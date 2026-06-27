# Lata Yog Routine Guide — Step Database Governance

## Purpose

This document defines how to safely manage the core Yog step database used by the Lata Yog Routine Guide.

The step database is not just code. It is the central Yog knowledge base for the application. It contains step names, timings, repetitions, safety notes, benefits, breathing patterns, side indicators, and media references.

Production file:

```text
src/data/stepNames.js
```

## Step Database Principles

- Keep each step definition small and reusable.
- Store localized names, timing metadata, and breathing guidance with the step itself.
- Avoid hardcoded step behavior in components; use metadata and lookup tables instead.
- Use `hasSides: true` only when a step must be performed on both left and right sides.
- Validate every change with `npm run validate:data` before opening a PR.

## Key Fields

A typical step entry includes:

- `names`: localized labels such as `english`, `devanagari`, and `roman`
- `category`: step grouping like `Warm Up`, `Kriya`, `Pranayama`, or `Asana`
- `type`: `time`, `reps`, or `sequence`
- `duration`: total seconds for time-based steps
- `reps`: number of repetitions for `reps` or `sequence` steps
- `timePerRep`: per-repetition duration when needed
- `prepTime`: seconds before the timer begins
- `hasSides`: whether the step is expanded into left/right entries
- `breathPattern`: on-screen breathing guidance text
- `breathAnimationKey`: optional animation selector for pranayama
- `pranayamSteps`: optional structured breath metadata for pranayama steps
- `caution`: additional safety guidance
- `benefits`: practice benefits or outcome notes
- `pictureUrl` / `videoUrl`: optional media references

## Example Step

```js
"anulom-vilom": {
  category: "Pranayama",
  type: "time",
  duration: 60,
  prepTime: 5,
  hasSides: false,
  breathPattern: "Cycle: Purak 4s, Rechak 8s, Purak 4s, Rechak 8s. Repeat for 40 cycles (~16 minutes).",
  breathAnimationKey: "anulom-vilom",
  recommendedCycles: 40,
  benefits: "Improves breath control and calms the nervous system.",
}
```

## Change Guidelines

- When adding or updating steps, follow the existing key naming conventions and make sure step keys are unique.
- If a step uses `hasSides`, confirm the app correctly expands both left and right versions in `src/data/routines.js`.
- For new pranayama steps, provide `breathPattern` text and consider adding `pranayamSteps` to support progress rings.
- Keep the database normalized: do not duplicate step logic in components or hook code.

## Validation

Run:

```bash
npm run validate:data
```

This validates step names and step metadata consistency before merging changes.
