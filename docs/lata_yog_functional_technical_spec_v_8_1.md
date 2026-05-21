# Lata Yog Routine Guide — Functional and Technical Specification V8.1

**Document version:** 8.1  
**Project:** Lata Yog Routine Guide  
**Baseline:** V4 original product vision + Published V7.3 / V7 Transition Engine + V7.5 architecture direction + V8.1 step database unification  
**Purpose:** Define the functional product vision and technical implementation rules for the next controlled development phase.

---

## 1. Executive Summary

Lata Yog Routine Guide is intended to become much more than a simple yoga timer. It is a structured Yog guidance system that combines routine sequencing, posture naming, breathing guidance, safety instructions, benefits, visual support, multilingual display, and audio prompts.

The application should guide a user through a selected Yog routine step by step, while preserving traditional Yog terminology and making the experience practical for modern mobile and web users.

Version 8.1 focuses on stabilising the foundation before adding richer Yog-guide intelligence. It must also preserve the original V4 thought process, because V4 contains many of the early product ideas, user experience goals, routine concepts, and broader ambition beyond a basic timer. The most important V8.1 baseline decision is that `src/data/stepNames.js` becomes the single production source of truth for all Yog step metadata.

---

## 2. Product Vision

The long-term product vision is:

> A guided Yog practice assistant that combines traditional Yog sequence knowledge, safe practice instructions, breathing guidance, posture education, audio prompts, and routine progression into a simple mobile-friendly web app.

The app should eventually support:

- guided Patanjali Yog routines
- health-support routines such as diabetes, back pain, knee pain, neck pain, and weight loss
- Sanskrit, Hindi, Devanagari, Roman, and English naming conventions
- audio instructions
- breathing rhythm guidance
- posture benefits and cautions
- image and video reference placeholders
- routine progress tracking
- future personalisation and condition-aware guidance

---

## 3. V8.1 Scope

### 3.1 In Scope for V8.1

V8.1 is primarily a specification and foundation stabilisation release.

In scope:

1. Confirm the product vision.
2. Confirm functional requirements.
3. Confirm technical architecture.
4. Confirm central database structure.
5. Confirm routine engine behaviour.
6. Confirm step naming and multilingual rules.
7. Confirm known technical debt.
8. Establish a safe roadmap for future branches.
9. Preserve the current published application stability.
11. Preserve the original V4 product intent as the long-term feature memory.
10. Treat `stepNames.js` as the production Yog knowledge base.

### 3.2 Out of Scope for V8.1

The following should not be implemented directly inside the V8.1 specification branch unless separately planned:

- full UI redesign
- Surya Namaskar 12-substep engine implementation
- breathing animation implementation
- image/video integration with real URLs
- full audio prompt redesign
- personalised health recommendations
- database/backend/authentication
- mobile app wrapper

---

## 4. Current Baseline

The V8.1 baseline has four layers:

1. **V4 original thought process and feature vision** — used as the product memory for what the app was originally intended to become.
2. **Published V7.3 / V7 Transition Engine** — used as the current working implementation and deployment baseline.
3. **V7.5 streamlined architecture specification** — used as the technical architecture direction.
4. **V8.1 step database unification** — used as the corrected master-data foundation.

The current working implementation baseline is the published GitHub Pages application from the V7 transition engine branch.

The current simplified architecture is:

```text
src/
  App.jsx
  main.jsx
  styles.css

  components/
    SettingsCard.jsx
    CurrentActivityCard.jsx
    SessionControlsCard.jsx
    RoutinePlaylistCard.jsx

  data/
    stepNames.js
    routines.js
    backup/
      stepNamesv7.js
      stepNames8.1.js

  hooks/
    useRoutineRunner.js

  lib/
    audio.js
```

The project should continue using this structure for now. A larger folder split may be considered later, but not before the core routine and step systems are stable.

---

## 5. Functional Specification

## 5.1 Application Purpose

The app should help users practise Yog routines in a guided way by showing:

- the selected routine
- the current activity
- step names in traditional and modern formats
- timing or repetition target
- safety cautions
- benefits
- progress through the routine
- visual placeholder areas
- audio prompts where supported

The user should be able to start, pause, reset, move to the next step, and move to the previous step.

---

## 5.2 User Groups

Primary users:

1. General users practising guided Yog at home.
2. Users following Patanjali-style structured Yog sessions.
3. Users needing gentle health-support routines.
4. Users preferring Hindi/Devanagari/Sanskrit naming support.
5. Future users who may need condition-aware safety guidance.

---

## 5.3 Core User Journey

1. User opens the web app.
2. Default routine loads automatically.
3. User can change routine from the routine selector.
4. User reviews routine title, safety note, and first step.
5. User presses Start.
6. App guides the user through each step.
7. Timer or repetition estimate is shown depending on step type.
8. For side-based steps, app should guide left side and right side separately.
9. User can pause, resume, reset, go previous, or complete and move next.
10. App shows progress and routine playlist.
11. At the end, app marks the routine complete.

---

## 5.4 Routine Selection

The app must provide a flat routine selector with the following routines in this order:

1. Patanjali Yogic Jogging Part 1
2. Patanjali Yog Part 2 - Asanas
3. Patanjali Yog Phase 3
4. Diabetes Support
5. Weight Loss Flow
6. Back Pain Relief
7. Knee Pain Support
8. Neck Pain / Spondylosis Support
9. Beginner Flow
10. Intermediate Strength Flow
11. Gentle / Recovery
12. Pranayama & Om

### Default routine

The default selected routine should be:

```text
patanjaliJogging1
```

---

## 5.5 Step Display Requirements

For the active step, the app should show:

- English name
- Roman/Sanskrit name where available
- Devanagari name where available
- category
- step type
- duration or repetitions
- side indicator if applicable
- description or methodology
- benefits
- caution/safety note
- picture placeholder
- video placeholder

---

## 5.6 Step Types

The app should support three conceptual step types.

### 5.6.1 Time Step

Used for holds, breathing practices, relaxation, and timed activities.

Required fields:

```js
{
  type: "time",
  duration: number
}
```

### 5.6.2 Repetition Step

Used for kriyas, movements, and repeated practices.

Required fields:

```js
{
  type: "reps",
  reps: number,
  timePerRep: number
}
```

If `timePerRep` is missing, the app may use a safe fallback such as 5 seconds per repetition.

### 5.6.3 Sequence / Internal-Step Practice

Used for practices that contain internal steps, stages, rounds, or sub-movements.

Important principle:

Surya Namaskar must not be hardcoded as a one-off special routine. It is only one example of a broader pattern where a Yog practice contains internal steps. Other asanas, kriyas, pranayama practices, or therapeutic movements may also need internal stages.

Recommended future fields:

```js
{
  type: "sequence",
  duration: null,
  reps: null,
  rounds: number,
  internalSteps: [
    {
      id: "",
      order: number,
      names: {
        devanagari: "",
        roman: "",
        english: ""
      },
      instruction: "",
      breathCue: "",
      duration: number | null,
      reps: number | null,
      hasSides: boolean,
      caution: ""
    }
  ],
  sequenceMode: "manual" | "timed" | "breath-led" | "rep-led"
}
```

For V8.1, this remains a future target unless separately implemented. The key architectural rule is that the routine engine should support a generic `internalSteps` model rather than hardcoded Surya Namaskar logic.

---

## 5.7 Side-Based Step Requirements

Some steps require left-side and right-side practice.

The production field should be:

```js
hasSides: true
```

The routine expansion engine should convert such a step into two operational steps:

1. Left Side
2. Right Side

The UI should clearly display the side indicator.

### Known future bug

There is a known issue where in at least one instance the stepper may advance to the next exercise instead of moving from Left Side to Right Side.

This is not urgent for V8.1, but it must be tracked as future technical debt.

Likely files to inspect later:

```text
src/data/routines.js
src/hooks/useRoutineRunner.js
```

---

## 5.8 Safety Requirements

The app must include a global safety principle:

> Avoid jerky movements. Stop if you feel tired, dizzy, pain in any part of the body, or any discomfort.

Each routine may also define its own routine-level safety note.

Each step may define its own caution note.

### Kapal Bhati safety

Kapal Bhati must include a special safety warning:

> Avoid Kapal Bhati for 6–12 months after surgery. People with hypertension should slow down the rhythm and practise gently.

### General safety principle

The app is a guide, not a medical diagnosis tool. It should avoid making medical claims beyond general Yog practice guidance.

---

## 5.9 Naming Rules

### 5.9.1 Savasana

Wherever Savasana appears, display:

```text
Savasana / Yog Nidra
```

### 5.9.2 Prayer

Where earlier versions used “Centering Breath”, use:

```text
Prayer / Prarthana
```

Optional legacy wording may be kept internally as a common name, but not as the primary title.

### 5.9.3 Phase 3 Formal Naming

The following should preserve formal names as primary titles and common names as secondary text:

| Formal name | Common name |
|---|---|
| Hasta–Manibandha–Kurpara–Skandha Chakra | Hand, Wrist, Elbow & Shoulder Rotation |
| Greeva Sanchalana - 3 Types | Neck Rotation - 3 Types |
| Greeva Anti-Pressure | Neck Anti-Pressure |
| Netra Chakra | Eye Rotation |

---

## 5.10 Language Requirements

The app should support:

- English UI
- Hindi/Devanagari display
- Roman/Sanskrit naming display
- English audio prompts
- Hindi audio prompts where supported

For the current codebase, preserve existing working language values unless a planned refactor is created.

Future internal language codes may become:

```text
en
hi
```

but this should not be forced in V8.1 unless tested safely.

---

## 5.11 Audio Requirements

The app should use browser speech synthesis.

Required behaviour:

- audio cue on step change
- mute toggle
- selected audio language support
- safe fallback if speech synthesis is unavailable
- no crash if voices are missing

Future enhancement:

- dedicated Hindi prompts for important practices
- improved pronunciation of Sanskrit/Devanagari names
- step-specific teaching prompts

---

## 5.12 Breathing Guidance Requirements

The app should eventually show breathing guidance for pranayama and selected steps.

Future supported breathing practices:

- Prayer / Prarthana
- Easy Breathing
- Diaphragmatic Breath
- Bhastrika Pranayama
- Kapal Bhati
- Anulom Vilom
- Bhramari
- Om / Pranav

### Kapal Bhati rule

Kapal Bhati should be described as:

- active exhale
- passive/natural inhale

The app should not instruct users to forcefully inhale during Kapal Bhati.

Future enhancement:

- active stroke counter during Kapal Bhati

---

## 5.13 Image and Video Placeholder Requirements

The app should support two media placeholder areas for each step:

1. Picture Link
2. Video Link

For now, actual URLs are optional.

If no media URL exists, the UI should show a clean placeholder or gracefully hide the empty media frame.

Future enhancement:

- link each step to curated images and videos
- support local static assets
- support thumbnail previews

---

## 5.14 Progress Requirements

The app should show:

- current step number
- total steps
- completed count
- progress bar or visual progress indicator
- timer countdown for time steps
- estimated timer for repetition steps
- routine completion state

---

## 5.15 Mobile and Web Requirements

The application must remain usable on:

- desktop browser
- tablet browser
- mobile browser
- GitHub Pages hosting

Layout requirements:

- desktop: main panel plus right-side playlist
- mobile: stacked layout
- controls must be easy to tap
- timer and current step should remain prominent
- routine playlist should remain readable

---

# 6. Routine Functional Specification

## 6.1 Patanjali Yogic Jogging Part 1

Purpose:

A warm-up and kriya sequence including Yogic Jogging positions, individual kriyas, Surya Namaskar, Mishra Dand, and easy breathing.

Important rule:

Yogic Jogging and related kriya items should remain independent top-level steps. They should not be grouped into a single sequence.

Future rule:

Surya Namaskar should become a grouped internal-step practice with 12 substeps and multiple rounds. However, this should be implemented using the generic `internalSteps` model, not with hardcoded Surya Namaskar-only logic.

---

## 6.2 Patanjali Yog Part 2 - Asanas

Purpose:

A structured asana sequence focused on prone, supine, spinal, abdominal, and relaxation practices.

Includes practices such as:

- Makarasana
- Bhujangasana variations
- Shalabhasana
- Dhanurasana
- Bal Vishram Asana
- Markat Asana
- Uttanapadasana
- Naukasana
- Pawanmuktasana
- Savasana / Yog Nidra

---

## 6.3 Patanjali Yog Phase 3

Purpose:

A broader session including prayer, joint rotations, eye practices, pranayama, asana, kriya, acupressure, and closing relaxation.

This routine requires strong naming discipline because several steps have formal Sanskrit/Hindi titles plus common English explanations.

---

## 6.4 Health-Support Routines

The following routines are included as guided support flows:

- Diabetes Support
- Weight Loss Flow
- Back Pain Relief
- Knee Pain Support
- Neck Pain / Spondylosis Support
- Beginner Flow
- Intermediate Strength Flow
- Gentle / Recovery
- Pranayama & Om

These routines should be presented as general Yog support routines, not as medical treatment plans.

---

# 7. Technical Specification

## 7.1 Technical Stack

Current approved stack:

```text
React
Vite
Tailwind CSS
lucide-react
GitHub Pages
```

Optional future stack:

```text
Framer Motion
```

Framer Motion should not be treated as a required dependency unless intentionally added and tested.

---

## 7.2 Deployment Requirements

The app is deployed as a static site through GitHub Pages.

Vite must be configured with the correct repository base path.

The deployment setup should not be changed unless there is a specific publishing issue.

---

## 7.3 Production File Structure

Approved current structure:

```text
src/
  App.jsx
  main.jsx
  styles.css

  components/
    SettingsCard.jsx
    CurrentActivityCard.jsx
    SessionControlsCard.jsx
    RoutinePlaylistCard.jsx

  data/
    stepNames.js
    routines.js
    backup/
      stepNamesv7.js
      stepNames8.1.js

  hooks/
    useRoutineRunner.js

  lib/
    audio.js
```

Future optional expanded structure:

```text
src/
  components/
    ui/
    layout/
    practice/
  data/
    uiText.js
    audioPrompts.js
    illustrations.js
    safety.js
  lib/
    routineEngine.js
    breathing.js
```

The future structure should only be introduced if complexity requires it.

---

## 7.4 Central Step Database

Production file:

```text
src/data/stepNames.js
```

Trusted V8.1 backup baseline:

```text
src/data/backup/stepNames8.1.js
```

Older working source archive:

```text
src/data/backup/stepNamesv7.js
```

### Rule

Application runtime should import from:

```js
import { stepDatabase } from './stepNames';
```

It should not import from backup files.

---

## 7.5 Step Database Object Shape

Recommended production shape:

```js
{
  names: {
    devanagari: "",
    roman: "",
    english: ""
  },
  description: "",
  category: "",
  type: "time" | "reps" | "sequence",
  duration: number | null,
  reps: number | null,
  timePerRep: number | null,
  prepTime: number,
  hasSides: boolean,
  breathPattern: "",
  caution: "",
  benefits: "",
  pictureUrl: "",
  videoUrl: "",
  audioUrl: ""
}
```

### Data governance rule

`stepNames.js` is a master data file. Changes should be deliberate, reviewed, and backed up before major edits.

---

## 7.6 Routine Configuration File

Production file:

```text
src/data/routines.js
```

Responsibilities:

- define routine list
- define routine labels
- define routine descriptions
- define routine safety notes
- define ordered `stepKeys`
- hydrate steps from `stepNames.js`
- expand side-based steps into left/right operational steps

---

## 7.7 Routine Expansion Rules

Pseudo logic:

```js
for each routine:
  for each stepKey:
    find step in stepDatabase
    if missing:
      warn and skip
    if hasSides:
      create left operational step
      create right operational step
    else:
      create normal operational step
```

Operational step IDs should be stable enough for React rendering and routine navigation.

---

## 7.8 Runner Hook

Production file:

```text
src/hooks/useRoutineRunner.js
```

Responsibilities:

- selected routine state
- current step index
- timer status
- countdown time
- preparation state
- routine completion state
- start/pause/reset/next/previous actions
- automatic step advancement
- step-change audio trigger

The hook should not contain hardcoded Yog content.

---

## 7.9 Audio Helper

Production file:

```text
src/lib/audio.js
```

Responsibilities:

- build speech prompt
- select language/voice where possible
- cancel previous speech before new speech
- safely no-op if browser speech synthesis is unavailable
- respect mute state

---

## 7.10 Component Responsibilities

### SettingsCard

Responsible for:

- routine selection
- UI language selection
- audio language selection
- mute toggle

### CurrentActivityCard

Responsible for:

- active step display
- names
- description
- caution
- benefits
- side indicator
- media placeholders or media frame

### SessionControlsCard

Responsible for:

- timer display
- start
- pause
- previous
- complete and next
- reset
- progress count

### RoutinePlaylistCard

Responsible for:

- routine step list
- active step styling
- completed styling
- side indicator display
- badges for category/type

---

## 7.11 Build and Validation Requirements

Before merging any branch:

```bash
npm run build
```

Recommended checks:

```bash
grep -R "backup/stepNamesv7" -n src
```

Expected result:

```text
No runtime import from backup/stepNamesv7
```

Also check:

```bash
wc -l src/data/stepNames.js
wc -l src/data/backup/stepNames8.1.js
```

The files should be reasonably aligned if the backup is intended to match production.

---

# 8. Data Integrity and Validation Requirements

## 8.1 Step Database Validation Script

A validation script should be created early in the V8 roadmap.

Suggested file:

```text
scripts/validateStepNames.js
```

Suggested package script:

```json
{
  "scripts": {
    "validate:data": "node scripts/validateStepNames.js"
  }
}
```

The validation script should check:

1. `stepDatabase` exists and exports correctly.
2. Every step has a stable step ID.
3. Every step has `names.english`, `names.roman`, and `names.devanagari`.
4. Every step has `category`.
5. Every step has a valid `type`.
6. `time` steps have a valid `duration`.
7. `reps` steps have valid `reps` and preferably `timePerRep`.
8. `hasSides` is always a boolean.
9. Every `stepKey` in `routines.js` exists in `stepNames.js`.
10. No runtime source imports `backup/stepNamesv7`.
11. No obvious blank or duplicate step names exist.

Before any branch is merged, run:

```bash
npm run validate:data
npm run build
```

## 8.2 Manual Editing Support Using VS Code Outline

When manually editing `src/data/stepNames.js`, developers should use the VS Code / Codespaces **Outline** panel as a navigation and structure-checking aid.

Purpose of Outline usage:

1. Quickly navigate to a specific step inside `stepDatabase`.
2. Confirm that the selected step appears under the correct parent object.
3. Visually compare fields such as `names`, `category`, `type`, `duration`, `reps`, `timePerRep`, `prepTime`, `hasSides`, `breathPattern`, `benefits`, `caution`, `audioUrl`, `pictureUrl`, and `videoUrl`.
4. Detect obvious structural corruption, such as broken nesting, misplaced fields, or a second accidental `stepDatabase` declaration.
5. Reduce the risk of editing the wrong step in a large file.

Recommended manual edit process:

```text
1. Open src/data/stepNames.js.
2. Open the VS Code Outline panel.
3. Expand stepDatabase.
4. Navigate to the required step ID.
5. Edit only the intended step block.
6. Use Outline to confirm the surrounding structure still looks correct.
7. Save the file.
8. Run npm run validate:data once the validation script exists.
9. Run npm run build before commit.
```

Important limitation:

Outline is a navigation and visual inspection helper only. It does not replace the validation script. The validation script remains the formal integrity check for `stepNames.js` and `routines.js`.

## 8.3 Validation Script Scope Rule

The first version of the validation script should be read-only. It should check and report issues, but it should not automatically modify `stepNames.js` or `routines.js`.

Automatic modification can be considered later as a separate tool, but not in the first validation branch.

Recommended staged approach:

```text
Stage 1: Validate and report only
Stage 2: Generate a human-readable data quality report
Stage 3: Suggest fixes, but do not apply automatically
Stage 4: Optional controlled fixer script for simple safe changes only
```

This staged approach protects the integrity of the Yog knowledge base while still allowing future automation.

# 9. Known Bugs and Technical Debt

## 9.1 Side Stepper Bug

Issue:

In at least one instance, a side-based step advances to the next exercise instead of moving from Left Side to Right Side.

Priority:

Medium, but not urgent.

Likely investigation areas:

```text
src/data/routines.js
src/hooks/useRoutineRunner.js
```

Potential causes:

- side expansion not consistent for all records
- duplicate or unstable operational IDs
- `completeAndNext` skipping index under timer/preparation condition
- inconsistent current step index after routine change or auto-advance

Resolution approach later:

1. Identify affected step.
2. Verify it has `hasSides: true`.
3. Inspect expanded routine output.
4. Add console/debug view or test helper.
5. Confirm index sequence moves Left → Right → next step.

---

## 9.2 Internal-Step / Sequence Engine Gap

Current state:

Surya Namaskar may be represented as a repetition step, and the current engine may not yet fully support practices with internal stages.

Future target:

Create a generic internal-step engine that can support Surya Namaskar and other multi-stage asanas, kriyas, pranayama practices, and therapeutic movements.

The engine should support:

- parent practice step
- internal substeps
- configurable rounds
- optional breath cues
- optional duration per internal step
- optional reps per internal step
- optional side-based internal steps
- manual, timed, breath-led, or rep-led progression modes

Priority:

High for V8 feature roadmap, but should be implemented in a separate branch.

---

## 9.3 Media Placeholder Gap

Current state:

Media support may be partial or placeholder-based.

Future target:

Each step may show clean picture and video placeholders, and later real curated links.

Priority:

Medium.

---

## 9.4 Breathing Guide Gap

Current state:

Breathing metadata exists for some steps, but full animated breathing guidance may not be complete.

Future target:

Dedicated breathing panel for pranayama and breath-related steps.

Priority:

High after sequence stability.

---

# 10. Branching Roadmap

## 10.1 Completed / Current Foundation

```text
feature/v8-stepdb-unification
```

Purpose:

- restore production `stepNames.js`
- create V8.1 backup baseline
- make routines import from production step database

---

## 10.2 Recommended Next Branch

```text
feature/v8-super-spec
```

Purpose:

- add this V8.1 functional and technical specification into the repo

Suggested file:

```text
docs/LATA_YOG_FUNCTIONAL_TECHNICAL_SPEC_V8_1.md
```

---

## 10.3 Future Feature Branches

Recommended order:

```text
feature/v8-data-validation-script
feature/v8-surya-namaskar-sequence
feature/v8-side-stepper-fix
feature/v8-breathing-guide
feature/v8-media-placeholders
feature/v8-hindi-audio-prompts
feature/v8-yog-guru-step-guidance
feature/v8-health-routine-safety-layer
```

The validation script should be implemented with one of the first feature changes, preferably before or together with the Surya Namaskar sequence work. This protects the central `stepNames.js` database before larger routine and teaching-guide changes are added.

---

# 11. Acceptance Criteria for V8.1 Specification

V8.1 is accepted when:

1. A specification document exists in the repo.
2. The document defines product vision and technical architecture.
3. `stepNames.js` is confirmed as production source of truth.
4. Backup baseline is documented.
5. Known side-stepper bug is recorded.
6. Future Surya Namaskar sequence work is documented.
7. No new runtime-breaking code changes are introduced by the spec branch.
8. The published app remains stable.

---

# 12. Guiding Principle

Every future feature should follow this principle:

> Preserve the working published app first. Add Yog intelligence gradually through small, testable branches.

The app should grow from a reliable timer into a true Yog guide, but each step must protect the central routine database, the current deployment, and the user practice experience.

