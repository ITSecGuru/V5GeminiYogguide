/**
 * @file src/App.jsx
 * @description Master framework layout layer for Lata Yog Guide V8.1.
 * Pipes real-time repetition telemetry, step transition countdown states,
 * and global multilingual display parameters directly down into presentation panels.
 */

import React, { useState, useEffect } from 'react';
import { Award, RefreshCw, Sparkles, Compass } from 'lucide-react';
import SettingsCard from './components/SettingsCard';
import CurrentActivityCard from './components/CurrentActivityCard';
import SessionControlsCard from './components/SessionControlsCard';
import RoutinePlaylistCard from './components/RoutinePlaylistCard';
import useRoutineRunner from './hooks/useRoutineRunner';
import { playAudioPrompt } from './lib/audio';

const App = () => {
  // Shared state parameters for system localization vectors
  const [uiLanguage, setUiLanguage] = useState("English");
  const [audioLanguage, setAudioLanguage] = useState("English");
  const [isMuted, setIsMuted] = useState(false);
  const [ttsStatus, setTtsStatus] = useState('unknown');
  const debugMode = import.meta.env.VITE_TTS_DEBUG === 'true' || import.meta.env.VITE_TTS_DEBUG === true;

  // Extract advanced dynamic practice metrics and final lifecycle milestones
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
    isRoutineComplete, // Triggers celebration panel visibility at final index completion
    repTelemetry,      // Provides precise rep-by-rep countdown tracking metrics
    startTimer, 
    pauseTimer, 
    resetTimer, 
    completeAndNext, 
    prevStep 
  } = useRoutineRunner();

  // Play audio prompt when a new step becomes active (respecting mute and voice selection)
  useEffect(() => {
    if (!currentStep) return;
    if (isMuted) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      return;
    }

    const langCode = audioLanguage === 'Devanagari' ? 'hi' : 'en';
    playAudioPrompt(currentStep, langCode, false);
  }, [currentStepIndex, audioLanguage, isMuted, currentStep]);

  // Show a small TTS status indicator when the debug build is active
  useEffect(() => {
    if (!debugMode || typeof window === 'undefined') return;

    const initialStatus = window.__externalTtsActive ? 'external' : 'browser';
    setTtsStatus(initialStatus);

    const handleStatus = (e) => {
      setTtsStatus(e.detail?.external ? 'external' : 'browser');
    };

    window.addEventListener('tts-status-changed', handleStatus);
    return () => window.removeEventListener('tts-status-changed', handleStatus);
  }, [debugMode]);

  // Handle inner template translations for the final celebration panel
  const isHindi = uiLanguage === "Devanagari";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Application Header Title Bar */}
        <header className="mb-5 pb-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lata Yog Guide
          </h1>
        </header>

        {/* Master Responsive Grid Matrix Layout */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* Main Control Panel (Interactive Panels & Active Elements) */}
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

            {/* DYNAMIC LIFECYCLE GATEWAY: Switch views cleanly upon session completion */}
            {isRoutineComplete ? (
              <div className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col items-center text-center gap-5 border border-blue-500 animate-fadeIn relative overflow-hidden">
                
                {/* Decorative Background Accents */}
                <div className="absolute top-[-20%] left-[-10%] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-amber-300 shadow-md backdrop-blur-sm border border-white/20 animate-bounce">
                  <Award className="w-10 h-10" />
                </div>

                <div className="flex flex-col gap-1.5 max-w-md">
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-300 fill-current" />
                    <span>{isHindi ? "हरि ओम्! पूर्ण हुआ!" : "Hari Om! Complete!"}</span>
                    <Sparkles className="w-5 h-5 text-amber-300 fill-current" />
                  </h2>
                  <p className="text-sm font-medium text-blue-100 leading-relaxed">
                    {isHindi 
                      ? "आपने सफलतापूर्वक पूरा अभ्यास क्रम समाप्त कर लिया है। आपका मन केंद्रित है, श्वसन गहरा है, और आपकी प्राण ऊर्जा पूरी तरह से संतुलित है।" 
                      : "You have successfully completed the entire session pathway. Your mind is focused, your breathing is deep, and your energy channels are completely aligned."}
                  </p>
                </div>

                <hr className="w-full max-w-xs border-white/20 my-1" />

                {/* CONGRATS REDIRECT ROUTINE CALL TO ACTION SELECTOR */}
                <div className="w-full max-w-xs flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-blue-200 flex items-center justify-center gap-1">
                    <Compass className="w-3 h-3" />
                    <span>{isHindi ? "अगला अभ्यास मार्ग चुनें" : "Select Next Practice Journey"}</span>
                  </label>
                  <select
                    value={selectedRoutineId || ""}
                    onChange={(e) => selectRoutine(e.target.value)}
                    className="w-full border border-white/20 rounded-xl p-2.5 bg-white/10 text-white text-sm font-bold focus:ring-2 focus:ring-white focus:bg-slate-900 outline-none transition-all cursor-pointer text-center"
                  >
                    {routines.map((routine) => (
                      <option key={routine.id} value={routine.id} className="text-slate-800 font-semibold">
                        {routine.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={resetTimer}
                  className="mt-2 flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md transform active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{isHindi ? "यह अभ्यास पुनः प्रारंभ करें" : "Restart Current Flow"}</span>
                </button>

              </div>
            ) : (
              /* STANDARD WORKING LAYOUT VIEWPORTS */
              <>
                <CurrentActivityCard 
                  currentStep={currentStep} 
                  isPreparing={isPreparing} 
                  uiLanguage={uiLanguage} // Forwards state parameter to toggle main text nodes dynamically
                />

                <SessionControlsCard 
                  currentStep={currentStep} 
                  timerStatus={timerStatus} 
                  timeLeft={timeLeft} 
                  isPreparing={isPreparing}
                  repTelemetry={repTelemetry} 
                  startTimer={startTimer} 
                  pauseTimer={pauseTimer} 
                  resetTimer={resetTimer} 
                  completeAndNext={completeAndNext} 
                  prevStep={prevStep} 
                  totalSteps={steps.length} 
                  currentStepIndex={currentStepIndex}
                />
              </>
            )}

          </div>

          {/* Sidebar Area (Stationary List Sequence Tracker) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8 flex-shrink-0">
            <RoutinePlaylistCard 
              steps={steps} 
              currentStepIndex={currentStepIndex} 
              uiLanguage={uiLanguage} // Forwards state parameter to toggle sidebar itinerary columns
            />
          </div>

        </div>
      </div>
      <div className="fixed bottom-3 right-3 z-50 select-none pointer-events-none">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
          <span className="font-semibold">v8.1</span>
          {debugMode && (
            <span className="text-slate-500">TTS: {ttsStatus === 'external' ? 'External' : ttsStatus === 'browser' ? 'Browser' : 'Unknown'}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;