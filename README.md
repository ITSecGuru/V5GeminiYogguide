# Lata Yog Routine Guide

A modern, responsive React web application designed to guide users through structured yoga routines. Built with Vite, Tailwind CSS, and lucide-react.

## Features
- React 18 + Vite frontend application
- Tailwind CSS layout and responsive styling
- centralized step database in `src/data/stepNames.js`
- dynamic routine assembly from `src/data/routines.js`
- localized UI and audio prompts for English and Devanagari
- breath guidance and pranayama progress rendering
- GitHub Pages support using the `gh-pages` deploy script

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
- `npm run validate:data` — validate `src/data/stepNames.js`
- `npm run deploy` — deploy `dist` to GitHub Pages

## Notes
- The app base path is configured in `vite.config.js` as `/V5GeminiYogguide/` for GitHub Pages.
- Main application logic lives in `src/App.jsx`, `src/hooks/useRoutineRunner.js`, and `src/components/CurrentActivityCard.jsx`.
- Routine definitions are sourced from `src/data/routines.js` and hydrated from the central step database in `src/data/stepNames.js`.
