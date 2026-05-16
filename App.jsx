import React, { useState, useEffect } from 'react';
import { AlertTriangle, Image as ImageIcon, Video, Volume2, VolumeX } from 'lucide-react';
import { routines } from './data/routines';
import ControlsPanel from './components/ControlsPanel';
import RoutineStepList from './components/RoutineStepList';
import { playAudioPrompt } from './lib/audio';

export default function App() {
  const [currentRoutine, setCurrentRoutine] = useState(routines[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState('en');
  const [omitStepName, setOmitStepName] = useState(false);
  
  // NEW: State for the live countdown timer
  const [timeLeft, setTimeLeft] = useState(0);

  const activeStep = currentRoutine.steps[activeStepIndex];

  // NEW: Calculate the required time whenever the step changes
  useEffect(() => {
    if (activeStep.type === 'time') {
      setTimeLeft(activeStep.duration);
    } else if (activeStep.type === 'reps') {
      // Default: 5 seconds per repetition
      setTimeLeft(activeStep.reps * 5); 
    }
  }, [activeStepIndex, currentRoutine]);

  // NEW: The ticking countdown clock
  useEffect(() => {
    let interval = null;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      handleNext(); // Auto-advance when time is up
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  // Trigger audio on step change
  useEffect(() => {
    if (isPlaying && timeLeft === (activeStep.type === 'time' ? activeStep.duration : activeStep.reps * 5)) {
      playAudioPrompt(activeStep, language, omitStepName);
    }
  }, [activeStepIndex, isPlaying, language, omitStepName, activeStep, timeLeft]);

  const handleNext = () => {
    if (activeStepIndex < currentRoutine.steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      alert("Routine Complete. Well done!");
    }
  };

  const handleReset = () => {
    setActiveStepIndex(0);
    setIsPlaying(false);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  // ENHANCEMENT 1: The Routine Picker Dropdown Handler
  const handleRoutineChange = (e) => {
    const selected = routines.find(r => r.id === e.target.value);
    setCurrentRoutine(selected);
    setActiveStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-6">
      <main className="flex-1 flex flex-col gap-6">
        
        {/* Header with Routine Dropdown */}
        <header className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col mb-4 gap-4">
            
            {/* ROUTINE PICKER */}
            <div className="flex flex-col w-full md:max-w-md">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Select Routine</label>
              <select 
                className="text-lg font-bold bg-slate-100 border border-slate-300 rounded-lg px-4 py-2 text-slate-800 focus:ring-indigo-500"
                value={currentRoutine.id}
                onChange={handleRoutineChange}
              >
                {routines.map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>
            
            <p className="text-slate-500 text-sm mt-1">{currentRoutine.description}</p>
            
            {/* Audio Settings */}
            <div className="flex flex-col md:flex-row gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200 items-start md:items-center">
              <select 
                className="bg-white border border-slate-300 rounded px-2 py-1 text-sm font-medium"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English Audio</option>
                <option value="hi">Hindi Audio</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={omitStepName}
                  onChange={(e) => setOmitStepName(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                {omitStepName ? <VolumeX className="w-4 h-4 text-slate-400"/> : <Volume2 className="w-4 h-4 text-indigo-500"/>}
                Do not say step name
              </label>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3 text-amber-800 text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Routine Safety</p>
              <p>{currentRoutine.safetyNote}</p>
            </div>
          </div>
        </header>

        {/* Current Step Panel */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col relative">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-slate-800 mb-2">{activeStep.names.devanagari}</h2>
            <h3 className="text-xl text-slate-600 mb-1">{activeStep.names.roman}</h3>
            {activeStep.names.english && <p className="text-slate-500">{activeStep.names.english}</p>}
          </div>

          {activeStep.caution && (
            <div className="mx-auto max-w-md w-full bg-red-50 border border-red-100 rounded text-red-700 text-sm p-3 text-center mb-6">
              <span className="font-semibold">Caution: </span>{activeStep.caution}
            </div>
          )}

          {/* ENHANCEMENT 3: Dynamic Media Placeholders */}
          <div className="flex justify-center items-center gap-6 mb-6">
            {/* Picture: Only show the image block if a URL exists, otherwise show the missing icon */}
            {activeStep.pictureUrl ? (
              <img 
                src={activeStep.pictureUrl} 
                alt={activeStep.names.roman}
                className="w-48 h-32 object-cover bg-slate-100 rounded-lg border border-slate-200 shadow-sm"
              />
            ) : (
              <div className="w-32 h-24 bg-slate-50 rounded border border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                <span className="text-xs">No Picture</span>
              </div>
            )}

            {/* Video: Entirely hidden if the link is missing */}
            {activeStep.videoUrl && (
              <a href={activeStep.videoUrl} target="_blank" rel="noreferrer" className="w-48 h-32 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-lg border border-indigo-200 flex flex-col items-center justify-center text-indigo-600 shadow-sm cursor-pointer">
                <Video className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Watch Video</span>
              </a>
            )}
          </div>

          {/* Pass the ticking timeLeft down to the visualizer */}
          <ControlsPanel 
            isPlaying={isPlaying} 
            onTogglePlay={() => setIsPlaying(!isPlaying)} 
            onNext={handleNext}
            onReset={handleReset}
            activeStep={{...activeStep, duration: timeLeft, type: 'time'}} // Force the visualizer to show the ticking clock
          />
        </section>
      </main>

      <RoutineStepList 
        steps={currentRoutine.steps} 
        activeStepIndex={activeStepIndex} 
      />
    </div>
  );
}