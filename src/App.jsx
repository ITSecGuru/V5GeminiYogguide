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

  const activeStep = currentRoutine.steps[activeStepIndex];

  useEffect(() => {
    if (isPlaying) {
      playAudioPrompt(activeStep, language, omitStepName);
    }
  }, [activeStepIndex, isPlaying, language, omitStepName]);

  const handleNext = () => {
    if (activeStepIndex < currentRoutine.steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      alert("Routine Complete!");
    }
  };

  const handleReset = () => {
    setActiveStepIndex(0);
    setIsPlaying(false);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-6">
      <main className="flex-1 flex flex-col gap-6">
        <header className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Lata Yog Routine Guide</h1>
              <p className="text-slate-500 text-sm mt-1">{currentRoutine.description}</p>
            </div>
            <div className="flex flex-col gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
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

          <div className="flex justify-center gap-4 mb-6">
            <div className="w-32 h-24 bg-slate-100 rounded border border-slate-200 flex flex-col items-center justify-center text-slate-400">
              <ImageIcon className="w-6 h-6 mb-1" />
              <span className="text-xs">Picture</span>
            </div>
            <div className="w-32 h-24 bg-slate-100 rounded border border-slate-200 flex flex-col items-center justify-center text-slate-400">
              <Video className="w-6 h-6 mb-1" />
              <span className="text-xs">Video</span>
            </div>
          </div>

          <ControlsPanel 
            isPlaying={isPlaying} 
            onTogglePlay={() => setIsPlaying(!isPlaying)} 
            onNext={handleNext}
            onReset={handleReset}
            activeStep={activeStep}
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
