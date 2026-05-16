import React from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export default function ControlsPanel({ isPlaying, onTogglePlay, onNext, onReset, activeStep }) {
  return (
    <div className="flex flex-col items-center">
      <div className="my-8 w-48 h-48 rounded-full border-8 border-indigo-100 flex items-center justify-center bg-white shadow-inner">
        <span className="text-5xl font-bold text-indigo-600">
          {activeStep.type === 'time' ? `${activeStep.duration}s` : `${activeStep.reps}x`}
        </span>
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onTogglePlay}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5"/>}
          {isPlaying ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={onNext}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-medium transition-colors"
        >
          <SkipForward className="w-5 h-5"/> Next
        </button>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-medium transition-colors"
        >
          <RotateCcw className="w-5 h-5"/> Reset
        </button>
      </div>
    </div>
  );
}
