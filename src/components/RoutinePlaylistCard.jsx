import { CheckCircle2, Play, CircleDashed } from 'lucide-react';

export default function RoutinePlaylistCard({ steps, currentStepIndex }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-slate-600 mb-6">Routine Steps ({steps.length})</h2>
      
      <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-4">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          return (
            <div 
              key={step.id} 
              className={`px-4 py-3 rounded-xl flex items-center justify-between border transition-all ${
                isActive ? 'border-blue-500 bg-blue-50 shadow-sm transform scale-[1.01]' : 
                isCompleted ? 'border-slate-300 bg-slate-100 opacity-50 grayscale' : 
                'border-slate-100 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="flex-shrink-0">
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : 
                   isActive ? <Play className="w-5 h-5 text-blue-600 fill-blue-600 animate-pulse" /> : 
                   <CircleDashed className="w-5 h-5 text-slate-300" />}
                </div>
                
                <div className="flex items-baseline gap-2 truncate">
                  <span className={`font-bold text-lg truncate ${isActive ? 'text-blue-900' : isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                    {index + 1}. {step.names?.english || step.names?.devanagari}
                  </span>
                  <span className="text-xs text-slate-400 uppercase tracking-wide font-semibold hidden md:inline-block">
                    ({step.type})
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 ml-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border ${
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
  );
}