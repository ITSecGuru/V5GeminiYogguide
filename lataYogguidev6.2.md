Here is the official, refreshed technical specification for Lata Yog Routine Guide 6.1.

1. High-Level Architecture (The Tech Stack)
Framework: React 18 powered by Vite (for lightning-fast hot module reloading).

Styling: Tailwind CSS (configured for mobile-first responsiveness with utility classes).

Hosting: GitHub Pages (deployed via the gh-pages npm package).

State Management: Centralized custom hook (`useRoutineRunner.js`), keeping the UI components focused on rendering.

2. The Data Model
The app uses a data-driven routine assembly model. `src/data/routines.js` references step keys and hydrates them with metadata from `src/data/stepNames.js`.

A single source of truth for step definitions keeps the app flexible and avoids hardcoded exercise logic in components.

3. Component Manifest & Design Rules
The UI is broken into a small set of reusable cards managed by `App.jsx`.

A. Settings Card (`SettingsCard.jsx`)
Responsibility: Handles routine selection, UI language, audio language, and mute state.

B. Current Activity Card (`CurrentActivityCard.jsx`)
Responsibility: Displays the active step’s media, localized labels, timing, and breath guidance.

C. Session Controls Card (`SessionControlsCard.jsx`)
Responsibility: Manages the timer, auto progression, step reset, and playback controls.

D. Routine Playlist Card (`RoutinePlaylistCard.jsx`)
Responsibility: Displays the current routine queue and highlights the active step.

4. Core Engine (`useRoutineRunner.js`)
This hook contains the session state and timer loop. It increments the active step, advances through side-based steps, and tracks preparation/active timing.

5. Pranayama and Breath Guidance
Pranayama steps use metadata such as `breathPattern`, `breathAnimationKey`, and optional `pranayamSteps` to render breathing guidance and progress rings.

6. Implementation Notes
- Actual dependencies are: `react`, `react-dom`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`, `vite`, `vitest`, `eslint`, `lucide-react`, and `gh-pages`.
- `framer-motion` is not currently part of the installed dependency set.

7. Recommended File Structure
```text
package.json
vite.config.js
tailwind.config.js
.gitignore
README.md
index.html
src/
  components/
    CurrentActivityCard.jsx
    RoutinePlaylistCard.jsx
    SettingsCard.jsx
    SessionControlsCard.jsx
  data/
    stepNames.js
    routines.js
  hooks/
    useRoutineRunner.js
  lib/
    audio.js
  App.jsx
  main.jsx
  styles.css
```
