# Lata Yog Functional Technical Specification v8.1

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

### Recommended animation design
- Use a 24-second CSS animation for `anulom-vilom` to match the real Pranayama timing.
- The body badge animation should:
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

