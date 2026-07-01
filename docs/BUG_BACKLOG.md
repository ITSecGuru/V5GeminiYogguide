# Lata Yog Routine Guide — Bug Backlog

## Purpose

This file tracks known bugs and technical debt separately from the main functional and technical specification.

The main specification describes the intended product and architecture. This backlog tracks practical implementation issues that should be fixed in future branches.

---

## BUG-001: Side-stepper sometimes skips Right Side

**Status:** Open  
**Priority:** Medium  
**Area:** Routine engine / side-step expansion  

### Description

The expanded routine sequence sometimes advances from a left-side step directly to the next exercise without presenting the right-side counterpart.

### Expected behaviour

For any step with `hasSides: true`, the app should progress as:

```text
Left Side → Right Side → Next Exercise
```

### Notes

The underlying mapping logic lives in `src/data/routines.js`, which expands `hasSides` steps into left/right items during routine construction.

---

## BUG-002: Anulom Vilom breathing animation and spec needs completion

**Status:** Resolved  
**Priority:** Medium  
**Area:** UI / Pranayama guidance

### Description

- `anulom-vilom` should support a full 24-second breathing cycle with four substeps: inhale (Purak), exhale (Rechak), inhale (Purak), exhale (Rechak).
- The current animation was too short and the step metadata lacked explicit breath cycle guidance.
- The card should display both the animation label and a descriptive breath pattern text.

### Resolution

- Updated `src/styles.css` so `anulom-vilom`, `kapal-bhati`, `bhastrika`, and `bhramari` animations use timing durations that match breath cycle metadata.
- Added explicit `animate-*-ring` classes for ring animations used by breath animation cards.
- Confirmed the metadata-driven UI now aligns animation timing with defined pranayama cycles.

### Notes

This issue has been addressed in the current main branch.

---

## Future Validation Improvements

The data validation script should eventually detect:

- unused step definitions
- duplicate names across languages
- missing media fallback
- invalid picture/video paths
- internalSteps consistency issues
- side-step progression risks
- missing breathing metadata for pranayama steps
