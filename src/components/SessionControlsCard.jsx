// src/components/SessionControlsCard.jsx
export default function SessionControlsCard({
  currentStepTimeLeft,
  timerPercentRemaining,
  getTimerColor,
  startTimer,
  pauseTimer,
  completeAndNext,
  prevStep,
  resetSession,
  timerStatus,
  currentStepIndex,
  totalStepsInRoutine,
  completedSteps
}) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const overallProgress = totalStepsInRoutine > 0 
    ? Math.round((completedSteps / totalStepsInRoutine) * 100) 
    : 0;

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="mb-6">
        <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
          <span>Step Timer</span>
          <span className="text-2xl font-bold text-slate-900 font-mono">
            {formatTime(currentStepTimeLeft)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full transition-all duration-1000 ease-linear"
            style={{ 
              width: `${timerPercentRemaining}%`,
              backgroundColor: getTimerColor(timerPercentRemaining)
            }}
          ></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={startTimer}
          disabled={timerStatus === 'running' || timerStatus === 'completed'}
          className="flex-1 min-w-[80px] bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 text-sm md:text-base"
        >
          ▶ Start
        </button>
        <button
          onClick={pauseTimer}
          disabled={timerStatus !== 'running'}
          className="flex-1 min-w-[80px] bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 text-sm md:text-base"
        >
          ⏸ Pause
        </button>
        <button
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className="flex-1 min-w-[80px] bg-slate-600 hover:bg-slate-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 text-sm md:text-base"
        >
          ⏪ Prev
        </button>
        <button
          onClick={completeAndNext}
          className="flex-1 min-w-[100px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 text-sm md:text-base"
        >
          ⏭ Next
        </button>
        <button
          onClick={resetSession}
          className="flex-1 min-w-[80px] bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 text-sm md:text-base"
        >
          🔄 Reset
        </button>
      </div>

      <div>
        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
          <span>Overall Session Progress</span>
          <span>{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}