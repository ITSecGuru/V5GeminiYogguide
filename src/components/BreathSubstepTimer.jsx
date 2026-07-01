import React, { useEffect, useMemo, useRef } from 'react';
import { logTtsEvent, isTtsDebugEnabled } from '../lib/ttsDebug.js';
import tts from '../lib/tts.js';
import { playSimpleBeep } from '../lib/audio.js';

const getPranayamDuration = (pranayamSteps = []) => pranayamSteps.reduce((total, step) => total + (step.duration || 0), 0);

const getSubstepFromElapsed = (pranayamSteps = [], elapsedStepTime = 0) => {
  const cycleDuration = getPranayamDuration(pranayamSteps) || 1;
  const cycleTick = cycleDuration > 0 ? elapsedStepTime % cycleDuration : 0;

  let cursor = 0;
  let activeIndex = 0;
  let timeIntoSubstep = 0;
  for (let i = 0; i < pranayamSteps.length; i += 1) {
    const duration = pranayamSteps[i].duration || 0;
    if (cycleTick < cursor + duration) {
      activeIndex = i;
      timeIntoSubstep = Math.max(0, cycleTick - cursor);
      break;
    }
    cursor += duration;
  }

  const current = pranayamSteps[activeIndex] || {};
  const remaining = Math.max(0, (current.duration || 0) - timeIntoSubstep);

  return { activeIndex, current, remaining };
};

const BreathSubstepTimer = ({ pranayamSteps = [], uiLanguage = 'English', timeLeft = 0, currentStepDuration = 0, isKapalBhati = false, isPreparing = false }) => {
  const [internalElapsedTime, setInternalElapsedTime] = React.useState(0);
  const shouldUseInternalTimer = (typeof currentStepDuration !== 'number' || typeof timeLeft !== 'number' || (currentStepDuration === 0 && timeLeft === 0));

  React.useEffect(() => {
    if (!shouldUseInternalTimer) return undefined;
    const interval = window.setInterval(() => {
      setInternalElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [shouldUseInternalTimer]);

  const elapsedStepTime = isPreparing
    ? 0
    : (shouldUseInternalTimer
      ? internalElapsedTime
      : Math.max(0, (typeof currentStepDuration === 'number' ? currentStepDuration : 0) - (typeof timeLeft === 'number' ? timeLeft : 0)));

  const { activeIndex, current, remaining } = useMemo(
    () => getSubstepFromElapsed(pranayamSteps, elapsedStepTime),
    [JSON.stringify(pranayamSteps), elapsedStepTime]
  );

  const previousIndex = useRef(activeIndex);

  useEffect(() => {
    if (!pranayamSteps || pranayamSteps.length === 0) return;
    if (previousIndex.current === activeIndex) return;

    previousIndex.current = activeIndex;

    if (isKapalBhati) {
      void playSimpleBeep();
      return;
    }

    const label = current.names?.[uiLanguage === 'Devanagari' ? 'devanagari' : 'english'] || current.names?.english || '';
    if (label) {
      const lang = /[\u0900-\u097F]/.test(label) ? 'hi-IN' : 'en-US';
      try { tts.speak(label, lang); } catch (e) {}
      if (isTtsDebugEnabled()) logTtsEvent({ type: 'substep', label, duration: current.duration });
    }
  }, [activeIndex, current, pranayamSteps, uiLanguage, isKapalBhati]);

  const displayName = isKapalBhati
    ? (uiLanguage === 'Devanagari' ? 'बीप' : 'Beep')
    : (uiLanguage === 'Devanagari' ? current.names?.devanagari : current.names?.english || current.names?.transliteration || '');
  const displayDetail = isKapalBhati
    ? `${Math.ceil(remaining)}s`
    : (current.action ? `${current.action.toUpperCase()} • ${Math.ceil(remaining)}s` : `${Math.ceil(remaining)}s`);

  return (
    <div className="mt-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-3 py-2 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="font-semibold text-slate-700">{displayName}</div>
          <div className="mt-0.5 text-[11px] font-medium text-slate-500">
            {isKapalBhati ? (uiLanguage === 'Devanagari' ? 'कपालभाति चक्र' : 'Kapal Bhati cycle') : (uiLanguage === 'Devanagari' ? 'वर्तमान चरण' : 'Current phase')}
          </div>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
          {displayDetail}
        </div>
      </div>
    </div>
  );
};

export default BreathSubstepTimer;
