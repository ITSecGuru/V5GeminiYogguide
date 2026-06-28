import React, { useEffect, useMemo, useRef } from 'react';
import { logTtsEvent, isTtsDebugEnabled } from '../lib/ttsDebug.js';
import tts from '../lib/tts.js';

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

const BreathSubstepTimer = ({ pranayamSteps = [], uiLanguage = 'English', timeLeft = 0, currentStepDuration = 0, isKapalBhati = false }) => {
  const [internalElapsedTime, setInternalElapsedTime] = React.useState(0);
  const shouldUseInternalTimer = (typeof currentStepDuration !== 'number' || typeof timeLeft !== 'number' || (currentStepDuration === 0 && timeLeft === 0));

  React.useEffect(() => {
    if (!shouldUseInternalTimer) return undefined;
    const interval = window.setInterval(() => {
      setInternalElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [shouldUseInternalTimer]);

  const elapsedStepTime = shouldUseInternalTimer
    ? internalElapsedTime
    : Math.max(0, (typeof currentStepDuration === 'number' ? currentStepDuration : 0) - (typeof timeLeft === 'number' ? timeLeft : 0));

  const { activeIndex, current, remaining } = useMemo(
    () => getSubstepFromElapsed(pranayamSteps, elapsedStepTime),
    [JSON.stringify(pranayamSteps), elapsedStepTime]
  );

  const previousIndex = useRef(activeIndex);

  useEffect(() => {
    if (!pranayamSteps || pranayamSteps.length === 0 || isKapalBhati) return;
    if (previousIndex.current === activeIndex) return;

    previousIndex.current = activeIndex;
    const label = current.names?.[uiLanguage === 'Devanagari' ? 'devanagari' : 'english'] || current.names?.english || '';
    if (label) {
      const lang = /[\u0900-\u097F]/.test(label) ? 'hi-IN' : 'en-US';
      try { tts.speak(label, lang); } catch (e) {}
      if (isTtsDebugEnabled()) logTtsEvent({ type: 'substep', label, duration: current.duration });
    }
  }, [activeIndex, current, pranayamSteps, uiLanguage]);

  const displayName = isKapalBhati
    ? (uiLanguage === 'Devanagari' ? 'बीप' : 'Beep')
    : (uiLanguage === 'Devanagari' ? current.names?.devanagari : current.names?.english || current.names?.transliteration || '');
  const displayDetail = isKapalBhati
    ? `${Math.ceil(remaining)}s`
    : (current.action ? `${current.action.toUpperCase()} • ${Math.ceil(remaining)}s` : `${Math.ceil(remaining)}s`);

  return (
    <div className="mt-2 text-sm">
      <div className="font-semibold text-slate-700">{displayName}</div>
      <div className="text-xs text-slate-500">{displayDetail}</div>
    </div>
  );
};

export default BreathSubstepTimer;
