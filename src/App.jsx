/**
 * @file src/App.jsx
 * @description Main application controller and structural layouts layout layer. 
 * Extracts full state variables from useRoutineRunner and cleanly pipes data down into 
 * individual presentational cards while strictly decoupling business logic from UI layouts.
 */

import React from 'react';
import SettingsCard from './components/SettingsCard';
import CurrentActivityCard from './components/CurrentActivityCard';
import SessionControlsCard from './components/SessionControlsCard';
import RoutinePlaylistCard from './components/RoutinePlaylistCard';
import useRoutineRunner from './hooks/useRoutineRunner';

const App = () => {
  // Pulling advanced session telemetry and V7 branch state from the hook
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
        <header className="mb-6 md:mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lata Yog Guide <span className="text-blue-600 font-black">V7</span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">
            Your interactive, data-driven daily practice.
          </p>
        </header>

        {/* Master Responsive Grid Framework */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* Main Control Panel (Interactive Area) */}
          <div className="flex-1 w-full flex flex-col gap-4 md:gap-6">
            
            <SettingsCard 
              routines={routines} 
              selectedRoutineId={selectedRoutineId} 
              selectRoutine={selectRoutine} 
            />

            <CurrentActivityCard 
              currentStep={currentStep} 
              isPreparing={isPreparing} 
            />

            <SessionControlsCard 
              currentStep={currentStep}
              timerStatus={timerStatus} 
              timeLeft={timeLeft} 
              startTimer={startTimer} 
              pauseTimer={pauseTimer} 
              resetTimer={resetTimer} 
              completeAndNext={completeAndNext} 
              prevStep={prevStep}
              totalSteps={steps.length}
              currentStepIndex={currentStepIndex}
            />

          </div>

          {/* Sidebar Area (Stationary Step Sequence Tracker) */}
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