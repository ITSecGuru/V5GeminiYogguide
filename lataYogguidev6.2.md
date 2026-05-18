Here is the official, refreshed technical specification for Lata Yog Routine Guide 6.1.

1. High-Level Architecture (The Tech Stack)
Framework: React 18 powered by Vite (for lightning-fast hot module reloading).

Styling: Tailwind CSS (configured for mobile-first responsiveness using md: prefixes).

Hosting: GitHub Pages (deployed via the gh-pages npm package).

State Management: Centralized Custom Hook (useRoutineRunner.js), keeping the UI components "dumb" and strictly focused on rendering.

2. The Data Model (src/data/routines.js)
The app relies on a structured JSON-like array. To prepare for our upcoming database timing upgrade, the data structure explicitly separates the total time from the individual repetitions.

JavaScript
// Example Data Structure
export const routines = [
  {
    id: 'patanjaliJogging1',
    label: 'Patanjali Yogic Jogging Part 1',
    steps: [
      {
        id: 'patanjaliJogging1-step-1',
        type: 'reps', // or 'time'
        names: {
          english: 'Yogic Jogging Position 1',
          devanagari: 'यौगिक जॉगिंग स्थिति 1'
        },
        defaultTotalTime: 60,
        timePerRep: 5, // <-- Our next major feature will utilize this!
        image: '/assets/images/patanjaliJogging1-step-1.jpg' 
      }
    ]
  }
];
3. Component Manifest & Design Rules
The UI is broken into four distinct "Cards" orchestrated by App.jsx. The design language uses a light gray background (bg-slate-50) with stark white cards (bg-white) featuring soft shadows and rounded corners (rounded-2xl).

A. Settings Card (SettingsCard.jsx)
Responsibility: Handles global app variables (Routine selection, UI Language, Audio Language, Global Mute).

Design Note: Uses standard HTML <select> dropdowns styled with Tailwind focus rings (focus:ring-blue-500) to remain accessible and native on mobile devices.

B. Current Activity Card (CurrentActivityCard.jsx)
Responsibility: Displays the active step's image, localized name, and exercise type.

Code Concept (Graceful Fallbacks): Images are loaded dynamically, but if a specific image fails to load, it falls back to a default placeholder to prevent UI breaks.

JavaScript
// Graceful Image Fallback Logic
const baseUrl = import.meta.env.BASE_URL;
const imageSrc = currentStep.image || `${baseUrl}assets/images/${currentStep.id}.jpg`;
const fallbackSrc = `${baseUrl}assets/images/default.jpg`;

<img 
  src={imageSrc} 
  onError={(e) => { e.target.onerror = null; e.target.src = fallbackSrc; }} 
/>
C. Session Controls Card (SessionControlsCard.jsx)
Responsibility: The "Tape Deck." Manages the timer, auto-play progression, and overall session progress bar.

Design Note: Buttons are strictly color-coded by action severity:

Start: Emerald (bg-emerald-600)

Pause: Amber (bg-amber-500)

Complete & Next: Blue (bg-blue-600)

Prev: Slate (bg-slate-600)

Reset: Light Slate (bg-slate-200)

D. Routine Playlist Card (RoutinePlaylistCard.jsx)
Responsibility: Shows the upcoming queue of exercises.

Code Concept (Dynamic Styling): Uses conditional template literals to highlight the active step and visually dim past steps.

JavaScript
// Playlist Styling Logic
className={`... ${
  isActive 
    ? 'border-blue-500 bg-blue-50' 
    : isPast 
      ? 'border-gray-200 bg-gray-50 opacity-60' 
      : 'border-gray-100 bg-white'
}`}
4. Core Engine (useRoutineRunner.js)
This is the brain of the app. It holds all state and runs the timer loop via useEffect.

Auto-Play Logic: When currentStepTimeLeft hits 0, it triggers completeAndNext(), which increments the index and explicitly sets setTimerStatus('running') to seamlessly chain exercises together.