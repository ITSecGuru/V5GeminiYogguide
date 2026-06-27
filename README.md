# Lata Yog Routine Guide

A modern, responsive React web application for guided yoga routines, breathwork, and pranayama support. Built with Vite, Tailwind CSS, and lucide-react.

## Features
- React 18 + Vite frontend application
- Tailwind CSS responsive styling
- centralized step database in `src/data/stepNames.js`
- dynamic routine assembly from `src/data/routines.js`
- localized UI and audio prompts for English and Devanagari
- breath guidance and pranayama progress rendering
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

## Notes
- `vite.config.js` sets the base path to `/V5GeminiYogguide/` for GitHub Pages.
- Core application logic lives in `src/App.jsx`, `src/hooks/useRoutineRunner.js`, and `src/components/CurrentActivityCard.jsx`.
- Routine definitions are assembled from `src/data/routines.js` and hydrated from `src/data/stepNames.js`.
