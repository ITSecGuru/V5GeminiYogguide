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

In at least one instance, a side-based step advances to the next exercise instead of moving from Left Side to Right Side.

### Expected behaviour

For any step with `hasSides: true`, the app should move:

```text
Left Side → Right Side → Next Exercise


---

## 3. Optional small update to `docs/BUG_BACKLOG.md`

Add this at the bottom:

```markdown
---

## Future Validation Improvements

The data validation script should eventually detect:

```text
unused step definitions
duplicate names across languages
missing media fallback
invalid picture/video paths
internalSteps consistency
side-step progression risks
missing breathing metadata for pranayama steps