# Lata Yog Functional Technical Specification v8.2

## Current implementation update (2026-07-31)

This revision brings the specification in line with the current application implementation and the latest content model updates.

### What changed in the current build
- The app now supports repeat-aware audio prompts for `reps` and `sequence` steps, including progress cues such as “Step 2 of 10”.
- Step metadata now supports richer instructional fields such as `description`, `benefits`, `caution`, `pictureUrl`, and `videoUrl` alongside the existing timing and breath guidance data.
- A new physio-oriented routine, “Leg and Knee Physio Routine”, has been introduced with step definitions for knee-friendly movements such as skateboard knee bending and knee extension physio.
- Pranayama and breathwork steps continue to use structured metadata via `breathAnimationKey`, `breathCycleDuration`, `recommendedCycles`, and `pranayamSteps` to drive the UI and animation logic.
- The UI now uses metadata-driven breath labels and pattern fallbacks rather than relying only on hardcoded component logic.

### Updated product scope
- The experience now covers both yoga/pranayama guidance and physio-inspired movement routines.
- The content model supports both instructional cards and safety-oriented guidance for low-impact repetition work.
- Visual media support is now part of the step definition model, allowing routines to present images or videos based on step metadata.

## Breathing Animation: Anulom Vilom

### Objective
Provide a clear, timed breathing guidance experience for `anulom-vilom` that reflects its four-part alternate nostril cycle and reinforces the correct inhale/exhale durations.

### Anulom Vilom breath structure
- Full cycle definition: inhale (Purak), exhale (Rechak), inhale (Purak), exhale (Rechak).
- Phase durations:
  - first inhale (Purak): 4 seconds
  - first exhale (Rechak): 8 seconds
  - second inhale (Purak): 4 seconds
  - second exhale (Rechak): 8 seconds
- One complete Anulom Vilom cycle = 24 seconds.
- Recommended session targets:
  - 40 cycles ≈ 16 minutes
  - 45 cycles ≈ 18 minutes

### UI/UX requirements
- `CurrentActivityCard` and the breath guidance card must show both:
  - a descriptive breathing pattern text for `anulom-vilom`
  - a visual animation representing the inhale/exhale timing and alternate-nostril rhythm.
- The animation should not be limited to a single static text label. It should visibly pulse through the four substeps and use a full 24-second cycle.
- The card should continue to display the current step label, animation label, and the breath pattern text together.
- Each Pranayama step must be handled using step metadata or a lookup table, not a hardcoded monolithic switch statement. This supports different breathing patterns per pranayama while keeping the component logic flexible.
- NOTE: The first five warm-up steps (`yogic-jogging-position-1` through `yogic-jogging-position-5`) still contain temporary pranayama metadata for the current breathing animation validation flow. Replace or reset these test entries once the production pranayama metadata path is fully validated.

### Recommended animation design
- Use a 24-second CSS animation for `anulom-vilom` to match the real Pranayama timing.
- Prefer a concentric ring design instead of a single static badge:
  - outer ring: shows total progress through the full pranayama session (e.g. 40 recommended cycles)
    - each completed cycle increments the visible count and changes the outer ring shade to reflect progress.
    - the outer ring should be drawn as a progress arc/circle that fills smoothly as cycles complete.
  - inner ring: indicates the current substep within the active 4-step cycle.
    - substeps are numbered 1 to 4 and visually highlighted in the inner ring.
    - the inner ring changes state on each `Purak` / `Rechak` transition.
  - core circle: animates expansion for inhale and compression for exhale.
    - inhalation should gently grow the core circle radius.
    - exhalation should gently shrink or soften the core circle.
- The body badge animation should also:
  - expand gently during each inhale phase
  - contract or soften during each exhale phase
  - move subtly left/right to suggest alternate nostrils between the two inhale/exhale pairs.
- The ring animation should pulse in sync with the 24-second cycle and support the inhale/exhale rhythm.
- The animation should be implemented in `src/styles.css` and referenced by the current `anulom-vilom` badge class.

### Data requirements
- The step metadata for `anulom-vilom` should include a breathPattern string describing:
  - the 4 substeps per full cycle
  - the 4-second inhale and 8-second exhale timing
  - the approximate total session length for 40 cycles.

### Pranayama data schema (`pranayamSteps`)
- Purpose: provide a structured, multi-lingual definition of each substep within a Pranayama cycle, allowing the UI and audio engine to drive timing, labels, and animations.
- Fields:
  - `pranayamSteps` (array): ordered list of substeps (max 8). Each item has:
    - `names`: { `english`, `devanagari`, `transliteration` }
    - `action`: `'inhale' | 'exhale' | 'hold'`
    - `duration`: number (seconds)
  - `breathAnimationKey` (string): selects the animation style
  - `breathCycleDuration` (number): total seconds for one full cycle (optional; computed by summing substeps if not provided)
  - `recommendedCycles` (number): suggested cycles for a standard session (optional)

This structured schema avoids hardcoded step logic in components and enables flexible support for advanced variants (e.g., up to 8 substeps per cycle).

### Acceptance criteria
- `anulom-vilom` uses a 24-second animation cycle, not a 6-second cycle.
- The UI shows explicit breathing guidance text, not just the animation label.
- The animation visually differentiates inhalation from exhalation within the cycle.
- The specification clearly documents the 4-step cycle and the 16–18 minute session target.
- Repetition-based steps can provide rep-aware prompts and progress guidance in the audio layer.
- Physio-style steps can include safety guidance, benefits, and media references without breaking the core routine flow.

