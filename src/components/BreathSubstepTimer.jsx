import React, { useEffect, useState, useRef } from 'react';
import { logTtsEvent, isTtsDebugEnabled } from '../lib/ttsDebug.js';
import tts from '../lib/tts.js';

const BreathSubstepTimer = ({ pranayamSteps = [], uiLanguage = 'English' }) => {
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(pranayamSteps?.[0]?.duration || 0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!pranayamSteps || pranayamSteps.length === 0) return;
    setIndex(0);
    setRemaining(pranayamSteps[0].duration);

    timerRef.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          // advance
          setIndex(i => {
            const next = (i + 1) % pranayamSteps.length;
            const dur = pranayamSteps[next]?.duration || 0;
            setRemaining(dur);
            // speak on change
            const label = pranayamSteps[next]?.names?.[uiLanguage === 'Devanagari' ? 'devanagari' : 'english'] || pranayamSteps[next]?.names?.english || '';
            if (label) {
              try { tts.speak(label); } catch (e) {}
              if (isTtsDebugEnabled()) logTtsEvent({ type: 'substep', label, duration: dur });
            }
            return next;
          });
          return 0; // will be reset by setIndex flow
        }
        return r - 1;
      });
    }, 1000);

    // initial speak
    const initialLabel = pranayamSteps[0]?.names?.[uiLanguage === 'Devanagari' ? 'devanagari' : 'english'] || pranayamSteps[0]?.names?.english || '';
    if (initialLabel) {
      try { tts.speak(initialLabel); } catch (e) {}
      if (isTtsDebugEnabled()) logTtsEvent({ type: 'substep', label: initialLabel, duration: pranayamSteps[0]?.duration });
    }

    return () => { clearInterval(timerRef.current); timerRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pranayamSteps), uiLanguage]);

  const current = pranayamSteps[index] || {};
  const displayName = uiLanguage === 'Devanagari' ? current.names?.devanagari : current.names?.english || current.names?.transliteration || '';

  return (
    <div className="mt-2 text-sm">
      <div className="font-semibold text-slate-700">{displayName}</div>
      <div className="text-xs text-slate-500">{current.action ? `${current.action.toUpperCase()} • ${remaining}s` : `${remaining}s`}</div>
    </div>
  );
};

export default BreathSubstepTimer;
