import { describe, expect, it } from 'vitest';
import { stepDatabase } from '../data/stepNames.js';
import { getSequenceProgress, getStepCycleDuration, getStepDuration, getSubstepTimeline } from './stepTiming.js';

describe('stepTiming', () => {
  it('computes substep-asana duration from the substep pattern and cycle count', () => {
    const step = stepDatabase['surya-namaskar'];

    expect(getStepDuration(step)).toBe(300);
    expect(getStepCycleDuration(step)).toBe(60);
  });

  it('uses the shared substep pattern for mishra-dand with 3 substeps and 5 repeats', () => {
    const step = stepDatabase['mishra-dand'];

    expect(getStepDuration(step)).toBe(60);
    expect(getStepCycleDuration(step)).toBe(12);
  });

  it('uses the per-repetition duration as the cycle for repetition-based steps', () => {
    const step = stepDatabase['hasta-sanchalan-kriya'];

    expect(getStepDuration(step)).toBe(80);
    expect(getStepCycleDuration(step)).toBe(5);
  });

  it('reports the active substep position for sequence steps', () => {
    const step = stepDatabase['surya-namaskar'];

    expect(getSequenceProgress(step, 300, 300)).toEqual({ currentSubstep: 1, totalSubsteps: 12, substepLabel: '1/12' });
    expect(getSequenceProgress(step, 295, 300)).toEqual({ currentSubstep: 2, totalSubsteps: 12, substepLabel: '2/12' });
  });

  it('derives a pranayam timeline from explicit pranayamSteps metadata', () => {
    const step = stepDatabase['anulom-vilom'];
    const timeline = getSubstepTimeline(step);

    expect(timeline.length).toBe(4);
    expect(timeline[0]).toEqual(expect.objectContaining({ action: 'inhale', duration: 4 }));
    expect(timeline[1]).toEqual(expect.objectContaining({ action: 'exhale', duration: 8 }));
    expect(timeline[2]).toEqual(expect.objectContaining({ action: 'inhale', duration: 4 }));
    expect(timeline[3]).toEqual(expect.objectContaining({ action: 'exhale', duration: 8 }));
  });
});
