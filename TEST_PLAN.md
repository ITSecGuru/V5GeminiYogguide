# Test Plan for Lata Yog Guide Updates

## Purpose
This test plan covers the recent feature work completed so far:
- Breath animation variants for specific pranayama steps
- UI display of breath pattern guidance and animation type
- Sequence timing handling for `surya-namaskar`
- Duration calculation and progress math improvements in `useRoutineRunner`

## Areas to Test

### 1. Breath Animation Display

#### Steps
- Launch the app and select a routine containing `kapal-bhati`, `anulom-vilom`, or `bhramari`
- Start the routine and navigate to each pranayama step

#### Expected
- `kapal-bhati` shows a yellow/orange breathing badge with the label `Kapal Bhati` and uses the `kapal-bhati` animation
- `anulom-vilom` shows a slate-style breathing badge with the label `Anulom Vilom` and uses the `anulom-vilom` animation
- `bhramari` shows a violet breathing badge with the label `Bhramari` and uses the `bhramari` animation
- The breath pattern card displays a matching guidance text for each step

### 2. Breath Pattern Guidance Card

#### Steps
- Open the app and go to `easy-breathing`, `diaphragmatic-breath`, `surya-namaskar`, `kapal-bhati`, `anulom-vilom`, and `bhramari`

#### Expected
- Each step displays the breath pattern panel
- `surya-namaskar` defaults to the motion-sync message when no explicit `breathPattern` is defined
- `kapal-bhati`, `anulom-vilom`, and `bhramari` show their configured breaths
- Animation label text is visible in the card

### 3. Surya Namaskar Timing Calculation

#### Steps
- Select a routine containing `surya-namaskar`
- Advance to the `surya-namaskar` step
- Start the step timer and observe the countdown

#### Expected
- `surya-namaskar` uses a duration based on `reps * timePerRep`
- With `reps: 5` and `timePerRep: 18`, the step should show about `90` seconds (after prep)
- The progress bar in `SessionControlsCard` should reflect the full sequence duration
- The step should auto-advance correctly after the countdown ends

### 4. Sequence & Reps Progress Display

#### Steps
- Start a step with `type: sequence` or `type: reps`
- Observe the top timer badge and progress bar

#### Expected
- `sequence` step shows `Round X of Y` while running
- `reps` step shows `Rep X of Y (Z Left)` while running
- Both use the correct computed duration for progress math

### 5. App State and Navigation

#### Steps
- Switch routines while the timer is idle
- Reset a step during a breathing or sequence step
- Move between steps using `Next` and `Rewind`

#### Expected
- Routine selection resets the timer and current step
- `Reset` returns the current step to its initial prep or duration state
- `Next` and `Rewind` advance/retreat correctly without breaking timer logic

## Regression Checks
- Validate that non-breathing steps are unaffected by the new animation classes
- Verify `CurrentActivityCard` still displays image/video fallback correctly
- Confirm `SessionControlsCard` progress bar still works for `time` steps

## Visual Regression Checklist
- `kapal-bhati` uses a yellow/orange badge and pulsating inhale/exhale animation
- `anulom-vilom` uses a horizontal alternate-breath animation style
- `bhramari` uses a slow violet pulse with a humming-like ring effect
- The breath pattern panel explicitly shows `Animation: Kapal Bhati`, `Animation: Anulom Vilom`, or `Animation: Bhramari` for each step
- Regular steps still show the default blue breathing badge animation

## Validation Commands
- `npm run validate:data` — ensure data validation still passes without fatal errors
- `npm run dev` — manually test the app in the browser

## Notes
- There are still existing step metadata warnings for missing descriptions/cautions/benefits in the validator output; these are outside the current implementation scope.
