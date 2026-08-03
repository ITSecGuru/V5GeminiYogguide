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
- `category`: step grouping like `Warm Up`, `Kriya`, `Pranayama`, `Asana`, or `Physio`
- `type`: `time`, `reps`, or `sequence`
- `description`: optional short instructional summary for the card UI
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

## Current implementation updates (2026-07-31)

The current application build adds a few important governance expectations:

- Routine sequencing is now split between yoga/pranayama content and a new physio-oriented flow, so step keys should be reviewed carefully when adding new routines.
- Repetition-based steps should include clear `description`, `benefits`, and `caution` values where appropriate so the UI can present safe, helpful guidance.
- Media references (`pictureUrl` / `videoUrl`) are now part of the content model and should be provided for step cards when suitable visual assets exist.
- Breath-based steps should continue to carry `breathPattern`, `breathAnimationKey`, and `pranayamSteps` when the UI needs animated or timed guidance.
- Audio prompts are now rep-aware for `reps` and `sequence` steps; keep the metadata consistent with the intended step pacing and repetition count.

## Example Step

```js
"anulom-vilom": {
  names: { devanagari: "अनुलोम विलोम", roman: "Anulom Vilom", english: "Alternate Nostril Breathing" },
  category: "Pranayama",
  type: "time",
  duration: 300,
  prepTime: 5,
  hasSides: false,
  breathPattern: "Cycle: Purak 4s, Rechak 8s, Purak 4s, Rechak 8s. Repeat for 40 cycles (~16 minutes).",
  breathAnimationKey: "anulom-vilom",
  breathCycleDuration: 24,
  recommendedCycles: 40,
  pranayamSteps: [
    { names: { english: "Purak", devanagari: "पूरक", transliteration: "Purak" }, action: "inhale", duration: 4 },
    { names: { english: "Rechak", devanagari: "रेचक", transliteration: "Rechak" }, action: "exhale", duration: 8 },
    { names: { english: "Purak", devanagari: "पूरक", transliteration: "Purak" }, action: "inhale", duration: 4 },
    { names: { english: "Rechak", devanagari: "रेचक", transliteration: "Rechak" }, action: "exhale", duration: 8 }
  ],
  benefits: "Improves breath control and calms the nervous system.",
}
```

## Change Guidelines

- When adding or updating steps, follow the existing key naming conventions and make sure step keys are unique.
- Keep step metadata in `src/data/stepNames.js` and routine sequencing in `src/data/routines.js`.
- If a step uses `hasSides`, confirm the app correctly expands both left and right versions in `src/data/routines.js`.
- For new pranayama steps, provide `breathPattern`, `breathAnimationKey`, and consider adding `pranayamSteps` to support progress rings and substep timers.
- For new physio or rehabilitation steps, provide `description`, `benefits`, `caution`, and media references where useful so the routine card remains informative and safe.
- Use `breathCycleDuration` when the total cycle time should be explicit; otherwise allow the UI to derive it from `pranayamSteps`.
- Avoid duplicating step behavior in components or hook code.
- Avoid runtime imports from backup files such as `./backup/stepNames` or `backup/stepNamesv7`.

## Validation

Run:

```bash
npm run validate:data
```

This validates step names, routine step keys, and step metadata consistency before merging changes.
