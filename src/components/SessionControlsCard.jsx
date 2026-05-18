import { Play, Pause, StepForward, RefreshCw } from 'lucide-react';

export default function SessionControlsCard({
  currentStepTimeLeft, timerPercentRemaining, getTimerColor,
  startTimer, pauseTimer, completeAndNext, resetSession,
  timerStatus, currentStep, totalStepsInRoutine, completedSteps
}) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        
        <div className="flex-1 w-full md:max-w-sm flex flex-col gap-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Step Timer</span>
            <span className="font-mono text-4xl font-extrabold tabular-nums text-slate-800 drop-shadow-sm">
              {Math.floor(currentStepTimeLeft / 60).toString().padStart(2, '0')}:{(currentStepTimeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="h-6 w-full bg-slate-100 rounded-full border border-slate-200 shadow-inner overflow-hidden">
            <div
              className="h-full transition-all duration-1000 ease-linear"
              style={{ width: `${timerPercentRemaining}%`, backgroundColor: getTimerColor(timerPercentRemaining) }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={startTimer}
            disabled={timerStatus === 'running' || !currentStep}
            className={`p-4 px-6 rounded-xl flex items-center gap-3 text-lg font-semibold transition-all active:scale-95 ${
              timerStatus === 'running' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Play className="w-6 h-6" />
            {timerStatus === 'paused' ? 'Resume' : 'Start'}
          </button>

          <button
            onClick={pauseTimer}
            disabled={timerStatus !== 'running'}
            className="p-4 px-6 rounded-xl flex items-center gap-3 text-lg font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pause className="w-6 h-6" /> Pause
          </button>

          <button
            onClick={completeAndNext}
            disabled={!currentStep}
            className="p-4 px-6 rounded-xl flex items-center gap-3 text-lg font-semibold bg-white border-2 border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <StepForward className="w-6 h-6" /> Complete & Next
          </button>

          <button
            onClick={resetSession}
            className="p-4 px-6 rounded-xl flex items-center gap-3 text-lg font-semibold bg-white border-2 border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm transition-all active:scale-95"
          >
            <RefreshCw className="w-6 h-6" /> Reset
          </button>
        </div>
      </div>

      <div className="space-y-3 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-slate-700">Overall Session Progress</span>
          <span className="text-xl font-bold text-blue-600">
            {(totalStepsInRoutine > 0 ? ((completedSteps / totalStepsInRoutine) * 100) : 0).toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 relative border border-slate-200 shadow-inner overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 rounded-full transition-all duration-500 ease-out h-full"
            style={{ width: `${totalStepsInRoutine > 0 ? ((completedSteps / totalStepsInRoutine) * 100) : 0}%`, backgroundColor: '#3b82f6' }}
          ></div>
        </div>
      </div>
    </div>
  );
}