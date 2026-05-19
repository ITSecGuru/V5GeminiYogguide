/**
 * @file src/App.jsx
 * @description App core orchestrator framework layout for Lata Yog Guide V7.3.
 * Extracts session metrics and repetition tracking telemetry from the runner hook
 * and handles layout distribution between configuration panels and list metrics.
 */

import React, { useState } from 'react';
import SettingsCard from './components/SettingsCard';
import CurrentActivityCard from './components/CurrentActivityCard';
import SessionControlsCard from './components/SessionControlsCard';
import RoutinePlaylistCard from './components/RoutinePlaylistCard';
import useRoutineRunner from './hooks/useRoutineRunner';

const App = () => {
  // Shared localization states for application context mapping
  const [uiLanguage, setUiLanguage] = useState("English");
  const [audioLanguage, setAudioLanguage] = useState("English");
  const [isMuted, setIsMuted] = useState(false);

  // Pull advanced timing parameters and repetition count states from the hook
  const { 
    routines, 
    selectedRoutineId, 
    selectRoutine, 
    currentStep, 
    steps, 
    currentStepIndex, 
    timerStatus, 
    timeLeft, 
    isPreparing, 
    repTelemetry, // Extracted V7.3 state variable for counting repetitions dynamically
    startTimer, 
    pauseTimer, 
    resetTimer, 
    completeAndNext, 
    prevStep 
  } = useRoutineRunner();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Application Header Title Bar */}
        <header className="mb-5 border-b border-slate-200 pb-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lata Yog Guide <span className="text-blue-600 font-black">V7.3</span>
          </h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base font-medium">
            Your interactive, continuous data-driven practice.
          </p>
        </header>

        {/* Master Responsive Grid Framework */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* Main Control Panel (Interactive Input & Operational Area) */}
          <div className="flex-1 w-full flex flex-col gap-4">
            
            <SettingsCard 
              routines={routines} 
              selectedRoutineId={selectedRoutineId} 
              selectRoutine={selectRoutine} 
              uiLanguage={uiLanguage} 
              setUiLanguage={setUiLanguage} 
              audioLanguage={audioLanguage} 
              setAudioLanguage={setAudioLanguage} 
              isMuted={isMuted} 
              setIsMuted={setIsMuted}
            />

            <CurrentActivityCard 
              currentStep={currentStep} 
              isPreparing={isPreparing} 
            />

            <SessionControlsCard 
              currentStep={currentStep} 
              timerStatus={timerStatus} 
              timeLeft={timeLeft} 
              isPreparing={isPreparing}
              repTelemetry={repTelemetry} // Pipes repetition count analytics straight to the visual dashboards
              startTimer={startTimer} 
              pauseTimer={pauseTimer} 
              resetTimer={resetTimer} 
              completeAndNext={completeAndNext} 
              prevStep={prevStep} 
              totalSteps={steps.length} 
              currentStepIndex={currentStepIndex}
            />

          </div>

          {/* Sidebar Area (Stationary List Sequence Tracker) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8 flex-shrink-0">
            <RoutinePlaylistCard 
              steps={steps} 
              currentStepIndex={currentStepIndex} 
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;