import React from 'react';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getPranayamDuration = (pranayamSteps = []) => pranayamSteps.reduce((total, step) => total + (step.duration || 0), 0);

const getOuterRingColor = (progress) => {
  const hue = 28;
  const saturation = 90;
  const lightness = 68 - clamp(progress, 0, 1) * 28;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const getOuterRingBackground = () => 'rgba(251, 191, 36, 0.18)';

const getInnerRingColor = (progress) => {
  const hue = 350;
  const saturation = 68;
  const lightness = 82 - clamp(progress, 0, 1) * 44;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const getInnerInactiveColor = () => 'rgba(139, 23, 24, 0.16)';

const getActionColor = (action) => {
  if (action === 'inhale') return '#0d9488';
  if (action === 'exhale') return '#f97316';
  if (action === 'hold') return '#8b5cf6';
  return '#475569';
};

const PranayamaProgressRings = ({ step = {}, uiLanguage = 'English', timeLeft = 0, currentStepDuration = 0 }) => {
  const pranayamSteps = step.pranayamSteps || [];
  const cycleDuration = step.breathCycleDuration || getPranayamDuration(pranayamaSteps) || 1;
  const totalCycles = typeof step.recommendedCycles === 'number'
    ? step.recommendedCycles
    : (typeof step.reps === 'number' ? step.reps : 1);

  // derive elapsed time from the host timer values (keeps UI in sync)
  const elapsedStepTime = Math.max(0, (typeof currentStepDuration === 'number' ? currentStepDuration : 0) - (typeof timeLeft === 'number' ? timeLeft : 0));
  const completedCycles = Math.min(totalCycles, Math.floor(elapsedStepTime / cycleDuration));
  const cycleTick = cycleDuration > 0 ? (elapsedStepTime % cycleDuration) : 0;

  // determine active substep and how far into it we are
  let cursor = 0;
  let activeIndex = 0;
  let timeIntoSubstep = 0;
  for (let i = 0; i < pranayamSteps.length; i += 1) {
    const d = pranayamSteps[i].duration || 0;
    if (cycleTick < cursor + d) {
      activeIndex = i;
      timeIntoSubstep = Math.max(0, cycleTick - cursor);
      break;
    }
    cursor += d;
  }

  const currentSubstep = pranayamSteps[activeIndex] || {};
  const substepFraction = (currentSubstep.duration && currentSubstep.duration > 0) ? clamp(timeIntoSubstep / currentSubstep.duration, 0, 1) : 0;

  // outer progress considers cycles completed + progress inside current cycle broken down by substeps
  const cyclesProgressWithinCurrent = pranayamSteps.length > 0
    ? (activeIndex + substepFraction) / pranayamSteps.length
    : 0;

  const outerProgress = totalCycles > 0
    ? clamp((completedCycles + cyclesProgressWithinCurrent) / totalCycles, 0, 1)
    : 0;

  const outerColor = getOuterRingColor(outerProgress);
  const outerBackgroundColor = getOuterRingBackground();
  const isKapalBhati = step?.breathAnimationKey === 'kapal-bhati';

  const innerCompletedColor = getInnerRingColor(1);
  const innerActiveColor = getInnerRingColor(substepFraction);
  const innerInactiveColor = getInnerInactiveColor();

  const isInhale = currentSubstep.action === 'inhale';
  const isExhale = currentSubstep.action === 'exhale';
  const coreColor = getActionColor(currentSubstep.action);
  const activeSubstepLabel = `${activeIndex + 1}/${pranayamSteps.length || 1}`;
  const outerLabel = uiLanguage === 'Devanagari' ? 'चक्र' : 'Cycle';
  const substepLabel = uiLanguage === 'Devanagari' ? 'उप चरण' : 'Substep';

  // compute a precise scale for the core circle that follows the substep progress
  const MIN_SCALE = 0.92;
  const MAX_SCALE = 1.12;
  let coreScale = 1;
  if (currentSubstep && typeof currentSubstep.duration === 'number' && currentSubstep.duration > 0) {
    if (isInhale) {
      coreScale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * substepFraction;
    } else if (isExhale) {
      coreScale = MAX_SCALE - (MAX_SCALE - MIN_SCALE) * substepFraction;
    } else if (currentSubstep.action === 'hold') {
      // prefer staying at the end of the previous action (if available)
      let prevAction = 'inhale';
      if (activeIndex > 0) prevAction = pranayamSteps[activeIndex - 1].action || prevAction;
      else if (pranayamSteps.length > 0) prevAction = pranayamSteps[pranayamSteps.length - 1].action || prevAction;
      coreScale = (prevAction === 'inhale') ? MAX_SCALE : MIN_SCALE;
    }
  }

  // inner ring: highlight the active substep as a segment using conic-gradient
  const innerSegments = pranayamSteps.length > 0
    ? pranayamSteps.map((s, i) => {
      const start = (i / pranayamSteps.length) * 360;
      const end = ((i + 1) / pranayamSteps.length) * 360;
      if (i < activeIndex) return `${innerCompletedColor} ${start}deg ${end}deg`;
      if (i === activeIndex) return `${innerActiveColor} ${start}deg ${start + (end - start) * substepFraction}deg, ${innerInactiveColor} ${start + (end - start) * substepFraction}deg ${end}deg`;
      return `${innerInactiveColor} ${start}deg ${end}deg`;
    }).join(', ') : `${getInnerRingColor(0)} 0deg 360deg`;

  // SVG outer ring parameters
  const viewBoxSize = 100;
  const radius = 40; // leaves padding inside the 100x100 box
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 10;
  const dashOffset = clamp(circumference * (1 - outerProgress), 0, circumference);
  const visualScale = isKapalBhati ? (substepFraction < 0.5 ? 1.04 : 1.16) : coreScale;

  return (
    <div className="flex items-center gap-4">
      <div className={`relative ${isKapalBhati ? 'w-36 h-36' : 'w-28 h-28'} shrink-0`}>
        <div className="absolute inset-0 rounded-full bg-slate-100" style={{ boxShadow: 'inset 0 0 0 1px rgba(148, 163, 184, 0.24)' }} />

        <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className="absolute inset-0 w-full h-full">
          <circle cx="50" cy="50" r={radius} fill="none" stroke={outerBackgroundColor} strokeWidth={strokeWidth} />
          <circle
            className="pranayama-outer-circle"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={outerColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>

        {!isKapalBhati && <div className="absolute inset-5 rounded-full" style={{ background: `conic-gradient(${innerSegments})` }} />}

        <div
          className={`absolute ${isKapalBhati ? 'inset-3' : 'inset-7'} rounded-full border border-slate-200`}
          style={{
            backgroundColor: coreColor,
            transform: `scale(${visualScale})`,
            transition: 'transform 220ms linear'
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1 pointer-events-none">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{outerLabel}</div>
          <div className="text-sm font-black text-slate-900">{Math.min(totalCycles, completedCycles) + 1}/{totalCycles}</div>
        </div>
      </div>
      
    </div>
  );
};

export default PranayamaProgressRings;
