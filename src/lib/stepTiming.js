import { substepAsanaPatterns } from '../data/substepAsanas.js';

const DEFAULT_TIME_PER_REP = 5;

const getSequenceProgress = (step = {}, timeLeft = 0, totalDuration = 0) => {
  const substeps = getSubstepPattern(step);
  const substepDuration = typeof step.substepDuration === 'number' ? step.substepDuration : 5;

  if (substeps.length <= 0 || substepDuration <= 0) {
    return { currentSubstep: 0, totalSubsteps: 0, substepLabel: '0/0' };
  }

  const cycleDuration = substeps.length * substepDuration;
  const effectiveDuration = totalDuration > 0 ? totalDuration : cycleDuration;
  const elapsedOverall = Math.max(0, effectiveDuration - timeLeft);
  const elapsedWithinCycle = elapsedOverall % cycleDuration;
  const currentSubstep = Math.min(substeps.length, Math.floor(elapsedWithinCycle / substepDuration) + 1);

  return {
    currentSubstep,
    totalSubsteps: substeps.length,
    substepLabel: `${currentSubstep}/${substeps.length}`
  };
};

const getSubstepPattern = (step = {}) => {
  if (Array.isArray(step.substepAsanaPattern) && step.substepAsanaPattern.length > 0) {
    return step.substepAsanaPattern;
  }

  if (typeof step.substepAsanaPatternKey === 'string' && step.substepAsanaPatternKey) {
    const pattern = substepAsanaPatterns[step.substepAsanaPatternKey];
    return pattern?.substeps || [];
  }

  return [];
};

const getSubstepTimeline = (step = {}) => {
  if (Array.isArray(step.pranayamSteps) && step.pranayamSteps.length > 0) {
    return step.pranayamSteps.map((substep, index) => ({
      ...substep,
      duration: typeof substep.duration === 'number' ? substep.duration : DEFAULT_TIME_PER_REP,
      action: substep.action || (index % 2 === 0 ? 'inhale' : 'exhale')
    }));
  }

  const substeps = getSubstepPattern(step);
  if (substeps.length <= 0) return [];

  const substepDuration = typeof step.substepDuration === 'number' ? step.substepDuration : DEFAULT_TIME_PER_REP;

  return substeps.map((substep, index) => ({
    ...substep,
    duration: typeof substep.duration === 'number' ? substep.duration : substepDuration,
    action: substep.action || (index % 2 === 0 ? 'inhale' : 'exhale')
  }));
};

const getStepDuration = (step = {}) => {
  if (!step) return 60;

  if (step.type === 'time') {
    return typeof step.duration === 'number' ? step.duration : 60;
  }

  if (step.type === 'reps') {
    const reps = typeof step.reps === 'number' ? step.reps : 1;
    const timePerRep = typeof step.timePerRep === 'number' ? step.timePerRep : DEFAULT_TIME_PER_REP;
    return reps * timePerRep;
  }

  if (step.type === 'sequence') {
    const substeps = getSubstepPattern(step);
    const cycles = typeof step.repeats === 'number' ? step.repeats : (typeof step.reps === 'number' ? step.reps : 1);
    const substepDuration = typeof step.substepDuration === 'number' ? step.substepDuration : 5;

    if (substeps.length > 0 && substepDuration > 0) {
      return substeps.length * substepDuration * cycles;
    }

    const reps = typeof step.reps === 'number' ? step.reps : 1;
    const timePerRep = typeof step.timePerRep === 'number' ? step.timePerRep : 15;
    return reps * timePerRep;
  }

  return 60;
};

const getStepCycleDuration = (step = {}) => {
  const substeps = getSubstepPattern(step);
  const substepDuration = typeof step.substepDuration === 'number' ? step.substepDuration : 5;

  if (substeps.length > 0 && substepDuration > 0) {
    return substeps.length * substepDuration;
  }

  if (step.type === 'reps') {
    const timePerRep = typeof step.timePerRep === 'number' ? step.timePerRep : DEFAULT_TIME_PER_REP;
    return timePerRep > 0 ? timePerRep : 0;
  }

  if (step.type === 'sequence') {
    const reps = typeof step.reps === 'number' ? step.reps : 1;
    const timePerRep = typeof step.timePerRep === 'number' ? step.timePerRep : 15;
    return reps > 0 ? timePerRep : 0;
  }

  return 0;
};

export { getSequenceProgress, getStepDuration, getStepCycleDuration, getSubstepTimeline };
