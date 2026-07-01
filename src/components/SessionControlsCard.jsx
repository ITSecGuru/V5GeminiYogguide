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
  currentStepDuration,
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
    const timePerRep = typeof currentStep.timePerRep === 'number'
      ? currentStep.timePerRep
      : currentStep.type === 'sequence' ? 15 : 5;
    return (currentStep.reps || 16) * timePerRep;
  };

  const maxDuration = currentStepDuration || getMaxDuration();
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
  const isSequenceType = currentStep?.type === 'sequence' && !isPreparing;
  const buttonBaseClass = 'flex h-[42px] items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30';

  const getButtonClass = (variant) => {
    switch (variant) {
      case 'rewind':
        return `${buttonBaseClass} border-slate-300 bg-slate-600 text-white hover:bg-slate-700`;
      case 'reset':
        return `${buttonBaseClass} border-amber-300 bg-amber-500 text-white hover:bg-amber-600`;
      case 'pause':
      case 'start':
        return `${buttonBaseClass} border-blue-300 bg-blue-600 text-white hover:bg-blue-700`;
      case 'next':
        return `${buttonBaseClass} border-emerald-300 bg-emerald-600 text-white hover:bg-emerald-700`;
      default:
        return `${buttonBaseClass} border-slate-300 bg-slate-600 text-white hover:bg-slate-700`;
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-4">
      
      {/* PROGRESS TRACKER SECTION */}
      <div className="flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3">
        <div>
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {/* Dynamic Label Header Switching Logic */}
            <span>{isPreparing ? 'Preparation Clock' : isRepsType ? 'Repetition Matrix Counter' : 'Active Posture Clock'}</span>
            
            {isPreparing ? (
              <span style={{ color: getTimerColor() }} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm transition-colors duration-300">
                {formatTime(timeLeft)} remaining
              </span>
            ) : isSequenceType ? (
              <span style={{ color: getTimerColor() }} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm transition-colors duration-300">
                {repTelemetry.substepLabel || `Round ${repTelemetry.currentRep} of ${repTelemetry.totalReps}`}
              </span>
            ) : isRepsType ? (
              <span style={{ color: getTimerColor() }} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm transition-colors duration-300">
                Rep {repTelemetry.currentRep} of {repTelemetry.totalReps} ({repTelemetry.repsLeft} Left)
              </span>
            ) : (
              <span style={{ color: getTimerColor() }} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm transition-colors duration-300">
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
          
          {/* Background Bar utilizes steady calculated seconds underneath for clean visual math */}
          <div className="ui-progress-track">
            <div 
              className="ui-progress-fill"
              style={{ 
                width: `${Math.min(Math.max(progressPercent, 0), 100)}%`,
                backgroundColor: getTimerColor()
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span>Overall Routine Matrix</span>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 shadow-sm">
              {Math.round(overallProgressPercent)}% ({currentStepIndex + 1}/{totalSteps})
            </span>
          </div>
          <div className="ui-progress-track h-1.5">
            <div className="ui-progress-fill bg-blue-600" style={{ width: `${overallProgressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* MATRIX CONTROLS */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-2 sm:grid-cols-4">
        <button
          type="button" onClick={prevStep} disabled={currentStepIndex === 0}
          className={getButtonClass('rewind')}
        >
          <Rewind className="h-3.5 w-3.5 fill-current" />
          <span>Rewind</span>
        </button>

        <button
          type="button" onClick={resetTimer}
          className={getButtonClass('reset')}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>

        {timerStatus === 'running' ? (
          <button
            type="button" onClick={pauseTimer}
            className={getButtonClass('pause')}
          >
            <Pause className="h-3.5 w-3.5 fill-current" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            type="button" onClick={startTimer}
            className={getButtonClass('start')}
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Start</span>
          </button>
        )}

        <button
          type="button" onClick={completeAndNext}
          className={getButtonClass('next')}
        >
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}