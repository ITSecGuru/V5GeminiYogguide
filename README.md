# Lata Yog Routine Guide

A modern, responsive React web application for guided yoga routines, breathwork, and pranayama support. Built with Vite, Tailwind CSS, and lucide-react.

## Features
- React 18 + Vite frontend application
- Tailwind CSS responsive styling
- centralized step database in `src/data/stepNames.js`
- dynamic routine assembly from `src/data/routines.js` and step metadata hydration from `src/data/stepNames.js`
- localized UI and audio prompts for English and Devanagari
- breath guidance, structured `pranayamSteps`, and pranayama progress rendering
- step validation for routine and metadata consistency
- optional GitHub Pages deployment using the `gh-pages` package

## Setup Instructions
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Build for production: `npm run build`
4. Preview the production build: `npm run preview`
5. Validate the step database: `npm run validate:data`

## Available Scripts
- `npm run dev` — start the Vite development server
- `npm run build` — compile the app for production
- `npm run preview` — preview the built site locally
- `npm run test` — run unit tests with Vitest
- `npm run lint` — run ESLint across source files
- `npm run validate:data` — validate `src/data/stepNames.js` and routine integrity
- `npm run deploy` — deploy `dist` to GitHub Pages

## Recent Changes
- Added `src/lib/stepMetadata.js` to centralize step display name, breath animation, and audio prompt resolution.
- Added `src/components/PranayamaProgressRings.jsx` and `src/components/BreathSubstepTimer.jsx` for structured pranayama progress rendering.
- Updated `src/components/CurrentActivityCard.jsx` and `src/components/RoutinePlaylistCard.jsx` to use centralized metadata lookup instead of hardcoded labels.
- Updated `src/lib/audio.js` to use metadata-driven prompt text selection and better support English/Devanagari switch.
- Added accurate breath animation timing classes and ring animations to `src/styles.css`.
- Added `src/data/substepAsanas.js` and enhanced `src/data/stepNames.js` with structured pranayama metadata and cycle duration support.
- Fixed rep-telemetry progression so `Rep X of Y (Z Left)` now uses the correct cycle duration for rep-based steps and is covered by regression tests.

## Automation & Validation
- Confirmed build succeeds with `npm run build`.
- Confirmed unit tests pass with `npm test`.
- Confirmed rep-telemetry and step-timing regression tests pass with `npm test -- --run src/hooks/useRoutineRunner.test.jsx src/lib/stepTiming.test.js`.
- Confirmed step database validation runs with `npm run validate:data`.
- Note: `npm run lint` is declared in `package.json`, but ESLint requires a configuration file in the repo to execute successfully.

## Verification Checklist
- [x] Production build compiles cleanly
- [x] Existing Vitest suite passes
- [x] Step metadata validation script executes successfully
- [ ] Browser preview/manual UI verification still pending
- [ ] External TTS playback and animation rendering should be validated in-browser

## Notes
- `vite.config.js` sets the base path to `/V5GeminiYogguide/` for GitHub Pages.
- Core application logic lives in `src/App.jsx`, `src/hooks/useRoutineRunner.js`, and `src/components/CurrentActivityCard.jsx`.
- Routine definitions are assembled from `src/data/routines.js` and hydrated from `src/data/stepNames.js`.
