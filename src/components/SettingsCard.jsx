/**
 * @file src/components/SettingsCard.jsx
 * @description Enhanced configuration panel layout for Lata Yog Guide V8.1.
 * Expands the routine selector component width dynamically to prevent text 
 * truncation, and minifies audio controls down to a clean status symbol block.
 */

import React from 'react';

export default function SettingsCard({
  routines,
  selectedRoutineId,
  selectRoutine,
  uiLanguage,
  setUiLanguage,
  audioLanguage,
  setAudioLanguage,
  isMuted,
  setIsMuted
}) {
  return (
    <div className="w-full bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100">
      
      {/* PROMINENT CONFIGURATION MATRIX LAYOUT
          Uses flexible responsive spans to make the routine bar much wider and prominent */}
      <div className="grid grid-cols-12 gap-3 items-end">
        
        {/* 1. Dynamic Routine Picker (Spans 12 columns on small displays, 6 columns on large) */}
        <div className="flex flex-col col-span-12 md:col-span-6">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
            Active Yoga Routine Flow Journey
          </label>
          <select
            value={selectedRoutineId || (routines && routines[0]?.id) || ""}
            onChange={(e) => selectRoutine(e.target.value)}
            className="w-full border-2 border-blue-100 rounded-xl p-2.5 bg-slate-50 text-slate-800 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all cursor-pointer shadow-sm min-h-[44px]"
          >
            {routines && routines.length > 0 ? (
              routines.map((routine) => (
                <option key={routine.id} value={routine.id}>
                  {routine.label}
                </option>
              ))
            ) : (
              <option value="" disabled>No routines initialized</option>
            )}
          </select>
        </div>

        {/* 2. UI Localization Vector (Spans 6 columns on mobile, 2 columns on large screens) */}
        <div className="flex flex-col col-span-5 sm:col-span-4 md:col-span-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 truncate">
            Display
          </label>
          <select
            value={uiLanguage || "English"}
            onChange={(e) => setUiLanguage && setUiLanguage(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-slate-700 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all cursor-pointer h-[44px] shadow-inner"
          >
            <option value="English">EN</option>
            <option value="Devanagari">हिन्दी</option>
          </select>
        </div>

        {/* 3. Audio Voice Selector Vector (Spans 5 columns on mobile, 2 columns on large screens) */}
        <div className="flex flex-col col-span-5 sm:col-span-5 md:col-span-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 truncate">
            Voice Guide
          </label>
          <select
            value={audioLanguage || "English"}
            onChange={(e) => setAudioLanguage && setAudioLanguage(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-slate-700 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all cursor-pointer h-[44px] shadow-inner"
          >
            <option value="English">EN Voice</option>
            <option value="Devanagari">Sanskrit / Devanagari Voice</option>
          </select>
        </div>

        {/* 4. MINIMALIST MUTE SYMBOL BUTTON (Spans 2 columns on mobile, 2 columns on large) */}
        <div className="col-span-2 sm:col-span-3 md:col-span-2">
          <button
            type="button"
            onClick={() => setIsMuted && setIsMuted(!isMuted)}
            className={`w-full flex items-center justify-center rounded-xl font-black text-lg border h-[44px] transition-all cursor-pointer shadow-sm ${
              isMuted 
                ? 'bg-rose-50 border-rose-200 hover:bg-rose-100 scale-95 opacity-80' 
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
            }`}
            title={isMuted ? "Unmute Practice Audio" : "Mute Practice Audio"}
          >
            {/* Renders solely as a clean, responsive status layout emoji symbol */}
            <span className="transform active:scale-75 transition-transform duration-100">
              {isMuted ? '🔇' : '🔊'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}