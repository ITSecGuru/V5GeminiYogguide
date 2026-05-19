/**
 * @file src/components/SessionControlsCard.jsx
 * @description Operational execution dashboard for the V7 Lata Yog application.
 * Switches readouts dynamically to display current repetition values if active,
 * while utilizing total calculated seconds for steady background progress math.
 */

import React from 'react';
import { Play, Pause, RotateCcw, Rewind, CheckCircle } from 'lucide-react';

export default function SessionControlsCard({
  currentStep,
  timerStatus,
  timeLeft,
  isPreparing,
  repTelemetry, // Pulling dynamic tracking analytics from engine hook
  startTimer,
  pauseTimer,
  resetTimer,
  completeAndNext,
  prevStep,
  totalSteps,
  currentStepIndex
}) {
  
  const getMaxDuration = () => {
    if (!currentStep) return 60;
    if (currentStep.type === 'time') return currentStep.duration || 60;
    const timePerRep = currentStep.timePerRep || 5;
    return (currentStep.reps || 16) * timePerRep;
  };

  const maxDuration = getMaxDuration();
  const progressPercent = maxDuration > 0 ? ((maxDuration - timeLeft) / maxDuration) * 100 : 0;
  const overallProgressPercent = totalSteps > 0 ? ((currentStepIndex) / totalSteps) * 100 : 0;

  const getTimerColor = () => {
    if (maxDuration <= 0) return '#10b981';
    const percentLeft = (timeLeft / maxDuration) * 100;
    if (percentLeft > 50) return '#10b981'; // Green
    if (percentLeft > 20) return '#fbbf24'; // Yellow
    return '#f43f5e';                       // Red
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isRepsType = currentStep?.type === 'reps' && !isPreparing;

  return (
    <div className="w-full bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
      
      {/* PROGRESS TRACKER SECTION */}
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex justify-between items-center mb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {/* Dynamic Label Header Switching Logic */}
            <span>{isPreparing ? 'Preparation Clock' : isRepsType ? 'Repetition Matrix Counter' : 'Active Posture Clock'}</span>
            
            {isPreparing ? (
              <span style={{ color: getTimerColor() }} className="font-mono text-xs font-bold transition-colors duration-300">
                {formatTime(timeLeft)} remaining
              </span>
            ) : isRepsType ? (
              /* RESTORED REPETITION DISPLAY: Hides time values and outputs counts */
              <span style={{ color: getTimerColor() }} className="font-mono text-xs font-black bg-purple-50 px-2 py-0.5 rounded border border-purple-200 transition-colors duration-300 uppercase tracking-wider">
                Rep {repTelemetry.currentRep} of {repTelemetry.totalReps} ({repTelemetry.repsLeft} Left)
              </span>
            ) : (
              <span style={{ color: getTimerColor() }} className="font-mono text-xs font-bold transition-colors duration-300">
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
          
          {/* Background Bar utilizes steady calculated seconds underneath for clean visual math */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${Math.min(Math.max(progressPercent, 0), 100)}%`,
                backgroundColor: getTimerColor()
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Overall Routine Matrix</span>
            <span className="text-blue-600 font-mono text-xs font-bold">
              {Math.round(overallProgressPercent)}% ({currentStepIndex + 1}/{totalSteps})
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out" style={{ width: `${overallProgressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* MATRIX CONTROLS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
        <button
          type="button" onClick={prevStep} disabled={currentStepIndex === 0}
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-30 disabled:cursor-not-allowed h-[40px]"
        >
          <Rewind className="w-3.5 h-3.5 fill-current" />
          <span>Rewind</span>
        </button>

        <button
          type="button" onClick={resetTimer}
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm h-[40px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        {timerStatus === 'running' ? (
          <button
            type="button" onClick={pauseTimer}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md h-[40px]"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            type="button" onClick={startTimer}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md h-[40px]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start</span>
          </button>
        )}

        <button
          type="button" onClick={completeAndNext}
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md h-[40px]"
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}