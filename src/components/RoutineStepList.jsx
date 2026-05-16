import React from 'react';

export default function RoutineStepList({ steps, activeStepIndex }) {
  return (
    <aside className="w-full md:w-80 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-2rem)]">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800">Routine Steps</h3>
        <p className="text-xs text-slate-500">Step {activeStepIndex + 1} of {steps.length}</p>
      </div>
      <div className="overflow-y-auto p-2 flex-1">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPast = idx < activeStepIndex;
          
          return (
            <div 
              key={step.id} 
              className={`p-3 rounded-lg mb-2 border transition-all ${
                isActive 
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                  : isPast
                  ? 'opacity-60 border-transparent bg-slate-50'
                  : 'border-transparent hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`font-medium ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>
                  {step.names.devanagari}
                </span>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                  {step.type === 'time' ? `${step.duration}s` : `${step.reps}x`}
                </span>
              </div>
              <p className="text-sm text-slate-600">{step.names.roman}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
