// src/App.jsx
import { useState, useMemo } from 'react';
import { Play, Pause, StepForward, RefreshCw, Volume2, VolumeX, CheckCircle2, CircleDashed } from 'lucide-react';
import useRoutineRunner from './hooks/useRoutineRunner'; 
import { routines } from './data/routines';

function App() {
  const {
    steps,              
    currentStepIndex,   
    currentStep,
    chosenRoutineKey,
    setChosenRoutineKey,
    timerStatus,
    startTimer,
    pauseTimer,
    completeAndNext,
    resetSession,
    uiLanguage,
    setUiLanguage,
    audioLanguage,
    setAudioLanguage,
    isMuted,
    setIsMuted,
    totalStepsInRoutine,
    completedSteps,
    currentStepTimeTotal,
    currentStepTimeLeft
  } = useRoutineRunner();

  // Helper for routine dropdown options 
  const routineOptions = useMemo(() => {
    return routines.map((routine) => ({
      key: routine.id,
      name: routine.label 
    }));
  }, []);

  // NEW: Calculate the percentage remaining for the step timer bar
  const timerPercentRemaining = currentStepTimeTotal > 0
    ? (currentStepTimeLeft / currentStepTimeTotal) * 100
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* --- 1. SETTINGS CARD --- */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <header className="mb-10 border-b border-gray-100 pb-8">
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Lata Yog Routine Guide</h1>
            <p className="mt-4 text-xl text-slate-600">Canvas preview version for testing on desktop web.</p>
          </header>

          <div className="flex flex-col md:flex-row gap-8 items-end justify-between">
            <div className="flex-grow flex flex-col md:flex-row gap-8">
              {/* Routine Picker */}
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-lg font-semibold text-slate-700" htmlFor="routineSelect">Choose routine</label>
                <select
                  id="routineSelect"
                  className="w-full border-2 border-slate-200 rounded-xl p-4 text-lg bg-white focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                  value={chosenRoutineKey}
                  onChange={(e) => setChosenRoutineKey(e.target.value)}
                >
                  {routineOptions.map(option => (
                    <option key={option.key} value={option.key}>{option.name}</option>
                  ))}
                </select>
              </div>

              {/* UI Language */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold text-slate-700" htmlFor="uiLang">UI language</label>
                <select
                  id="uiLang"
                  className="w-full border-2 border-slate-200 rounded-xl p-4 text-lg bg-white"
                  value={uiLanguage}
                  onChange={(e) => setUiLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                </select>
              </div>

              {/* Audio Language */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold text-slate-700" htmlFor="audioLang">Audio language</label>
                <select
                  id="audioLang"
                  className="w-full border-2 border-slate-200 rounded-xl p-4 text-lg bg-white"
                  value={audioLanguage}
                  onChange={(e) => setAudioLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Both">Both (Cued)</option>
                </select>
              </div>
            </div>

            {/* Mute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-3 p-4 px-6 border-2 border-slate-300 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 transition-all text-slate-700"
            >
              {isMuted ? <VolumeX className="w-6 h-6 text-slate-500" /> : <Volume2 className="w-6 h-6 text-blue-600" />}
              <span className="text-lg font-medium">{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>
          </div>
        </div>

        {/* --- 2. CURRENT ACTIVITY CARD --- */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-slate-600">Current activity</h2>
            {currentStep?.id && (
              <span className="text-sm text-gray-500">Step ID: {currentStep.id}</span>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Bulletproof 80x80px (2cm) Container */}
            <div 
              className="bg-slate-100 rounded-2xl flex-shrink-0 flex items-center justify-center border border-slate-200 shadow-inner overflow-hidden"
              style={{ width: '80px', height: '80px', minWidth: '80px', minHeight: '80px' }}
            >
              <img
                src={currentStep?.pictureUrl || '/assets/images/default.jpg'}
                alt={currentStep?.stepKey || 'Step placeholder'}
                className="object-cover"
                style={{ width: '80px', height: '80px' }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/assets/images/default.jpg';
                }}
              />
            </div>

            {/* Step Details (Text Areas) */}
            <div className="flex flex-col gap-6 w-full">
              <h2 className="text-5xl font-bold text-slate-950 leading-tight">
                {currentStep?.names?.english || currentStep?.names?.devanagari || "Choose a Routine to Start"}
              </h2>
              {currentStep?.description && (
                <p className="text-xl text-slate-600">{currentStep.description}</p>
              )}
              {currentStep?.notes && (
                <p className="text-lg text-slate-500 italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                  Notes: {currentStep.notes}
                </p>
              )}

              {/* Type and Cautions Section */}
              <div className="mt-4 space-y-4">
                <span className="inline-block bg-blue-50 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Type: {currentStep?.type || "None"}
                </span>
                
                {/* CAUTION BLOCK */}
                {currentStep?.caution && (
                  <div className="bg-amber-50 text-amber-950 border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
                    <p className="text-lg leading-relaxed italic font-medium">
                      <strong className="text-amber-900 not-italic">Safety:</strong> {currentStep.caution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. SESSION CONTROLS CARD --- */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            
            {/* NEW: Dynamic Step Timer Display */}
            <div className="flex-1 w-full md:max-w-sm flex flex-col gap-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Step Timer</span>
                <span className="font-mono text-4xl font-extrabold tabular-nums text-slate-800 drop-shadow-sm">
                  {Math.floor(currentStepTimeLeft / 60).toString().padStart(2, '0')}:{(currentStepTimeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
              {/* Color-changing progress bar */}
              <div className="h-5 w-full bg-slate-100 rounded-full border border-slate-200 shadow-inner overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-linear ${
                    timerPercentRemaining > 50 ? 'bg-emerald-500' :
                    timerPercentRemaining > 20 ? 'bg-amber-400' :
                    'bg-rose-500'
                  }`}
                  style={{ width: `${timerPercentRemaining}%` }}
                ></div>
              </div>
            </div>

            {/* Control Buttons Group */}
            <div className="flex items-center gap-4">
              {/* Start/Resume */}
              <button
                onClick={startTimer}
                disabled={timerStatus === 'running' || !currentStep}
                className={`p-4 px-6 rounded-xl flex items-center gap-3 text-lg font-semibold transition-all active:scale-95 ${
                  timerStatus === 'running'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Play className="w-6 h-6" />
                {timerStatus === 'paused' ? 'Resume' : 'Start'}
              </button>

              {/* Pause */}
              <button
                onClick={pauseTimer}
                disabled={timerStatus !== 'running'}
                className="p-4 px-6 rounded-xl flex items-center gap-3 text-lg font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Pause className="w-6 h-6" />
                Pause
              </button>

              {/* Complete & Next */}
              <button
                onClick={completeAndNext}
                disabled={!currentStep}
                className="p-4 px-6 rounded-xl flex items-center gap-3 text-lg font-semibold bg-white border-2 border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <StepForward className="w-6 h-6" />
                Complete & Next
              </button>

              {/* Reset */}
              <button
                onClick={resetSession}
                className="p-4 px-6 rounded-xl flex items-center gap-3 text-lg font-semibold bg-white border-2 border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm transition-all active:scale-95"
              >
                <RefreshCw className="w-6 h-6" />
                Reset
              </button>
            </div>
          </div>

          {/* Overall Progress Section */}
          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-slate-700">Overall Session Progress</span>
              <span className="text-xl font-bold text-blue-600">
                {(totalStepsInRoutine > 0 ? ((completedSteps / totalStepsInRoutine) * 100) : 0).toFixed(0)}%
              </span>
            </div>
            
            {/* Session Progress Bar Container */}
            <div className="w-full bg-slate-100 rounded-full h-4 relative border border-slate-200 shadow-inner overflow-hidden">
              <div
                className="absolute top-0 left-0 bottom-0 bg-blue-500 rounded-full transition-all duration-500 ease-out h-full"
                style={{ width: `${totalStepsInRoutine > 0 ? ((completedSteps / totalStepsInRoutine) * 100) : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* --- 4. ROUTINE STEPS PLAYLIST --- */}
        {steps && steps.length > 0 && (
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-slate-600 mb-6">Routine Steps ({steps.length})</h2>
            
            {/* Scrollable list container */}
            <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-4">
              {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                
                return (
                  <div 
                    key={step.id} 
                    className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${
                      isActive ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.01]' : 
                      isCompleted ? 'border-transparent bg-slate-50 opacity-60' : 
                      'border-transparent bg-white hover:bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Dynamic Icon based on state */}
                      <div className="flex-shrink-0">
                        {isCompleted ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : 
                         isActive ? <Play className="w-6 h-6 text-blue-600 fill-blue-600 animate-pulse" /> : 
                         <CircleDashed className="w-6 h-6 text-slate-300" />}
                      </div>
                      
                      {/* Step Name */}
                      <div>
                        <p className={`font-bold text-lg ${isActive ? 'text-blue-900' : isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                          {index + 1}. {step.names?.english || step.names?.devanagari}
                        </p>
                        <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold mt-1">{step.type}</p>
                      </div>
                    </div>

                    {/* Time / Reps Badge */}
                    <div className="text-right whitespace-nowrap pl-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm border ${
                        isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'
                      }`}>
                        {step.duration ? `${step.duration}s` : step.reps ? `${step.reps} Reps` : 'N/A'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;