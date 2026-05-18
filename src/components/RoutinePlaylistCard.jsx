// src/components/RoutinePlaylistCard.jsx
export default function RoutinePlaylistCard({ steps, currentStepIndex }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Routine Playlist</h3>
      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isPast = index < currentStepIndex;
          
          return (
            <div
              key={`${step.id}-${index}`}
              className={`p-3 rounded-lg border flex items-center gap-3 transition-colors ${
                isActive 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : isPast 
                    ? 'border-gray-200 bg-gray-50 opacity-60' 
                    : 'border-gray-100 bg-white'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isActive ? 'bg-blue-600 text-white' : isPast ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${isActive ? 'text-blue-900' : 'text-gray-700'}`}>
                  {step.names?.english || step.id}
                </p>
                <p className="text-xs text-gray-500 uppercase">{step.type}</p>
              </div>
              {isActive && (
                <span className="text-blue-600 text-xs font-bold animate-pulse">
                  ACTIVE
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}