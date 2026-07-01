# Test Plan for Lata Yog Guide Updates

## Purpose
This test plan covers the recent feature work completed so far:
- Breath animation variants for specific pranayama steps
- UI display of breath pattern guidance and animation type
- Sequence timing handling for `surya-namaskar`
- Duration calculation and progress math improvements in `useRoutineRunner`

## Areas to Test

### 1. Default Language and Audio Settings

#### Steps
- Launch the app fresh in a browser session
- Observe the initial display and audio language settings

#### Expected
- Display language defaults to `Devanagari`
- Audio language defaults to `Devanagari`
- The main activity card and routine playlist render in Devanagari-first text by default
- Audio guidance uses the Hindi voice path by default

### 2. Breath Animation Display

#### Steps
- Launch the app and select a routine containing `kapal-bhati`, `anulom-vilom`, or `bhramari`
- Start the routine and navigate to each pranayama step

#### Expected
- `kapal-bhati` shows a yellow/orange breathing badge with the label `Kapal Bhati`, uses the `kapal-bhati` animation, and emits a beep at each substep transition.
- `anulom-vilom` shows a slate-style breathing badge with the label `Anulom Vilom` and uses a full 24-second alternate nostril animation cycle.
- `bhramari` shows a violet breathing badge with the label `Bhramari` and uses a 22-second humming breath animation.
- The breath pattern card displays a matching guidance text for each step

### 3. Breath Pattern Guidance Card

#### Steps
- Open the app and go to `easy-breathing`, `diaphragmatic-breath`, `surya-namaskar`, `kapal-bhati`, `anulom-vilom`, and `bhramari`

#### Expected
- Each step displays the breath pattern panel
- `surya-namaskar` defaults to the motion-sync message when no explicit `breathPattern` is defined
- `kapal-bhati`, `anulom-vilom`, and `bhramari` show their configured breaths, structured `pranayamSteps`, and ring progress rendering
- Animation label text is visible in the card

### 4. Surya Namaskar Timing Calculation

#### Steps
- Select a routine containing `surya-namaskar`
- Advance to the `surya-namaskar` step
- Start the step timer and observe the countdown

#### Expected
- `surya-namaskar` uses a duration based on `reps * timePerRep`
- With `reps: 5` and `timePerRep: 18`, the step should show about `90` seconds (after prep)
- The progress bar in `SessionControlsCard` should reflect the full sequence duration
- The step should auto-advance correctly after the countdown ends

### 5. Sequence & Reps Progress Display

#### Steps
- Start a step with `type: sequence` or `type: reps`
- Observe the top timer badge and progress bar

#### Expected
- `sequence` step shows `Round X of Y` while running
- `reps` step shows `Rep X of Y (Z Left)` while running
- Both use the correct computed duration for progress math

### 6. App State and Navigation

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
- Verify that changing the language settings still updates both display and audio behavior correctly
- Verify Kapal Bhati produces an audible beep cue on each substep transition when the exercise is running
- If the beep is not heard in a browser, confirm that the app still shows the expected running state and that the cue is attempted from the correct timer transition point
- Verify the control buttons keep strong contrast and distinct color states for Rewind, Reset, Start/Pause, and Next

## Visual Regression Checklist
- `kapal-bhati` uses a yellow/orange badge and rapid 2-second pulse animation
- `anulom-vilom` uses a full 24-second alternate-breath animation cycle
- `bhramari` uses a slow violet 22-second pulse with a humming-like ring effect
- The breath pattern panel explicitly shows `Animation: Kapal Bhati`, `Animation: Anulom Vilom`, or `Animation: Bhramari` for each step
- Regular steps still show the default blue breathing badge animation

## Validation Commands
- `npm run validate:data` — ensure data validation still passes without fatal errors
- `npm run dev` — manually test the app in the browser

## Notes
- There are still existing step metadata warnings for missing descriptions/cautions/benefits in the validator output; these are outside the current implementation scope.
