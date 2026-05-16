# Codex-Ready Technical Build Specification

**Version:** v5 — Factory Pattern Optimization, Centralized Database, and Cue-Only Speech Toggle

## Project: Lata Yog Routine Guide

## Objective

Build a React + Vite application named **Lata Yog Routine Guide** that uses a highly modular, data-driven architecture. 

Unlike previous versions with heavily hard-coded routine steps, v5 utilizes a **Centralized Step Database** (`stepNames.js`) and a **Master Playlist Factory** (`routines.js`). The app iterates over simple string arrays of step keys to dynamically build fully hydrated routine objects, preserving UI logic while drastically reducing code duplication.

---

## 1. Tech Stack

Use:
* React
* Vite
* Tailwind CSS
* Framer Motion
* lucide-react

Package dependencies must include:
* `react`, `react-dom`
* `@vitejs/plugin-react`, `vite`
* `tailwindcss`, `postcss`, `autoprefixer`
* `framer-motion`, `lucide-react`

Use:
* Functional React components and modern hooks
* Modular file structure
* No backend, database, or authentication

---

## 2. Architecture & File Structure Requirements

Do **not** build this as one giant component. Use exactly this structure:

```text
package.json
vite.config.js
tailwind.config.js
.gitignore
README.md
index.html
src/
  components/
    ControlsPanel.jsx
    RoutineStepList.jsx
    (Add others as needed: IllustrationPanel.jsx, etc.)
  data/
    stepNames.js      <-- Centralized Database (holds names, types, reps, timings, cautions)
    routines.js       <-- Master Playlist Factory (loops through stepKeys)
  lib/
    audio.js          <-- Contains speech synthesis logic and cue-only overrides
  App.jsx             <-- Main integration component
  main.jsx
  styles.css
