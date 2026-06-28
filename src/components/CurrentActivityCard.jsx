/**
 * @file src/components/CurrentActivityCard.jsx
 * @description Language-aware UI display card module monitoring live workout parameters.
 * Dynamically switches instruction headings, hold times, and caution fields between Hindi and English scripts.
 */

import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import {
  getBreathAnimation,
  getBreathPatternText,
  getStepDisplayName,
  getStepRomanName,
  getStepSecondaryName
} from '../lib/stepMetadata.js';
import BreathSubstepTimer from './BreathSubstepTimer.jsx';
import PranayamaProgressRings from './PranayamaProgressRings.jsx';

const CurrentActivityCard = ({ currentStep, isPreparing, uiLanguage, timeLeft, currentStepDuration }) => { 
  if (!currentStep) return null;

  const baseUrl = import.meta.env.BASE_URL || '/';
  const fallbackSrc = `${baseUrl}assets/images/default.jpg`;
  const defaultImageBase = `${baseUrl}assets/images/${currentStep.stepKey || currentStep.id}`;
  const imageSrc = currentStep.pictureUrl && currentStep.pictureUrl.trim() !== ""
    ? (currentStep.pictureUrl.startsWith('/') ? `${baseUrl.replace(/\/$/, '')}${currentStep.pictureUrl}` : currentStep.pictureUrl)
    : `${defaultImageBase}.gif`;
  const hasVideo = currentStep.videoUrl && currentStep.videoUrl.trim() !== "";
  const isRepsType = currentStep.type === 'reps';
  const isHindi = uiLanguage === "Devanagari";

  const breathAnimation = getBreathAnimation(currentStep, uiLanguage);

  return (
    <div className={`bg-white rounded-2xl shadow-sm border ${isPreparing ? 'border-amber-400 shadow-md' : 'border-slate-100'} p-4 md:p-5 mb-3 transition-all duration-300`}>
      
      {/* Dynamic Preparation Banners */}
      {isPreparing && (
        <div className="mb-3 bg-amber-100 text-amber-800 px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-2 animate-pulse border border-amber-200">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>{isHindi ? "तैयार हो जाइए: स्थिति बदल रही है..." : "GET READY: Changing tracking posture position..."}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start gap-4">
        
        {/* Guarded Layout Media Block */}
        {hasVideo ? (
          <div className="w-full sm:w-[160px] h-[90px] flex-shrink-0 bg-black rounded-xl overflow-hidden border border-slate-200 shadow-inner">
            <video src={currentStep.videoUrl} autoPlay controls className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-20 h-20 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
            <img 
              src={imageSrc}
              alt={currentStep.names?.english || "Yoga Pose"}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target;
                if (target instanceof HTMLImageElement) {
                  target.onerror = null;
                  if (target.src.endsWith('.gif')) {
                    target.src = `${defaultImageBase}.jpg`;
                  } else {
                    target.src = fallbackSrc;
                  }
                }
              }}
            />
          </div>
        )}

        {/* Localized Name Element Columns */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
              {getStepDisplayName(currentStep, uiLanguage)}
            </h2>
            {currentStep.sideIndicator && (
              <span className="px-2 py-0.5 text-[10px] font-black bg-purple-50 text-purple-700 rounded-md border border-purple-200 uppercase tracking-wider">
                {isHindi ? (currentStep.sideIndicator === "Left Side" ? "बायाँ भाग" : "दायाँ भाग") : currentStep.sideIndicator}
              </span>
            )}
          </div>
          
          {/* Sub-titles shift order based on active language focus */}
          <h3 className="text-sm font-semibold text-slate-500 mt-0.5 italic">
            {getStepRomanName(currentStep)}
          </h3>
          <p className="text-xs font-medium text-slate-400 pb-2 border-b border-slate-100 mt-0.5 uppercase tracking-tight">
            {getStepSecondaryName(currentStep, uiLanguage)}
          </p>

          {/* Practice Type Identifier Badges */}
          <div className="flex items-center gap-2 mt-2">
            {isRepsType ? (
              <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-black px-2.5 py-1 rounded-lg border border-purple-100">
                <span className="font-mono font-bold mr-0.5">#</span>
                <span>{isHindi ? `अभ्यास: ${currentStep.reps || 16} आवर्तन` : `EXECUTE: ${currentStep.reps || 16} Repetitions`}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-black px-2.5 py-1 rounded-lg border border-blue-100">
                <Clock className="w-3.5 h-3.5" />
                <span>{isHindi ? `समय सीमा: ${currentStep.duration || 60} सेकंड` : `HOLD TIME: ${currentStep.duration || 60} Seconds`}</span>
              </div>
            )}
            
            {currentStep.category && (
               <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-lg border border-emerald-100">
                 {currentStep.category}
               </span>
            )}
          </div>

          {((currentStep.breathPattern && currentStep.breathPattern.trim() !== '') || (currentStep.type === 'time' && currentStep.category === 'Pranayama')) && (
            <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${breathAnimation.bodyClass} flex items-center justify-center font-bold`}>
                  <span>{breathAnimation.label.charAt(0)}</span>
                </div>
                <div className={`absolute inset-0 rounded-full border ${breathAnimation.ringClass}`} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                  {isHindi ? 'श्वास पैटर्न' : 'Breath Pattern'}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1">
                  {isHindi ? `एनिमेशन: ${breathAnimation.label}` : `Animation: ${breathAnimation.label}`}
                </p>
                <p className="text-sm text-slate-600">
                  {getBreathPatternText(currentStep, uiLanguage)}
                </p>
                {currentStep.pranayamSteps && currentStep.pranayamSteps.length > 0 && (
                  <div className="mt-3 space-y-3">
                    <PranayamaProgressRings
                      step={currentStep}
                      uiLanguage={uiLanguage}
                      timeLeft={timeLeft}
                      currentStepDuration={currentStepDuration}
                    />
                    <BreathSubstepTimer
                      pranayamSteps={currentStep.pranayamSteps}
                      uiLanguage={uiLanguage}
                      timeLeft={timeLeft}
                      currentStepDuration={currentStepDuration}
                      isKapalBhati={currentStep.breathAnimationKey === 'kapal-bhati'}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Safety Advisory Panel */}
          {currentStep.caution && (
            <div className="mt-2.5 flex items-start gap-1.5 bg-amber-50/60 p-2 rounded-xl border border-amber-100">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 font-medium leading-normal">
                {currentStep.caution}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentActivityCard;