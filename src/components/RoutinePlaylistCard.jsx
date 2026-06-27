/**
 * @file src/components/RoutinePlaylistCard.jsx
 * @description Sidebar checklist menu displaying concurrent stacked multilingual tags.
 * Synchronizes heading layouts dynamically with the global uiLanguage configuration.
 */

import React from 'react';
import { Check, PlayCircle } from 'lucide-react';

export default function RoutinePlaylistCard({ steps, currentStepIndex, uiLanguage }) {
  const isHindi = uiLanguage === "Devanagari";

  return (
    <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 max-h-[85vh] flex flex-col">
      
      {/* Localized Playlist Header */}
      <div className="mb-3 pb-2 border-b border-slate-100 flex-shrink-0">
        <h2 className="text-md font-bold text-slate-900 tracking-tight uppercase">
          {isHindi ? "आसन अनुक्रम सूची" : "Routine Itinerary"}
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          {isHindi ? `कुल अभ्यास संख्या: ${steps?.length || 0}` : `${steps?.length || 0} Total Practices in Sequence`}
        </p>
      </div>

      <div className="overflow-y-auto flex-1 pr-1 flex flex-col gap-2 scrollbar-thin">
        {steps && steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;

          return (
            <div
              key={step.id || index}
              className={`p-2.5 rounded-xl border transition-all duration-200 flex items-start gap-2.5 relative ${
                isActive ? 'bg-blue-50/70 border-blue-400 shadow-sm ring-1 ring-blue-400' : isCompleted ? 'bg-slate-50/60 border-slate-200 opacity-75' : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isCompleted ? (
                  <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : isActive ? (
                  <PlayCircle className="w-4 h-4 text-blue-600 animate-pulse" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 text-center font-mono text-[9px] text-slate-400 font-bold leading-3 flex items-center justify-center">
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Stacked Multilingual Text Fields */}
              <div className="flex-1 min-w-0 flex flex-col">
                {/* 1. Main Display Row: Changes primary weight based on uiLanguage */}
                <span className={`text-sm font-bold block truncate leading-tight ${isActive ? 'text-blue-900' : 'text-slate-800'}`}>
                  {isHindi ? (step.names?.devanagari || step.name) : (step.names?.english || step.name)}
                </span>
                
                {/* 2. Roman Phonetic Script */}
                <span className="text-xs font-medium text-slate-500 italic truncate tracking-wide mt-0.5">
                  {step.names?.roman || ""}
                </span>
                
                {/* 3. Secondary Display Row */}
                <span className="text-[11px] font-medium text-slate-400 truncate uppercase tracking-tight mt-0.5">
                  {isHindi ? step.names?.english : step.names?.devanagari}
                </span>
              </div>

              <div className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded ml-auto flex-shrink-0 mt-0.5">
                {step.type === 'time' ? `${step.duration}s` : `${step.reps}r`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}