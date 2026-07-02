import { describe, expect, it } from 'vitest';
import { getExpectedDurationForStep } from './validateStepNames.js';

describe('step duration validation', () => {
  it('computes rep-based duration from reps and timePerRep', () => {
    expect(getExpectedDurationForStep({ type: 'reps', reps: 4, timePerRep: 6 })).toBe(24);
  });

  it('computes substep-based duration from substep totals and repetitions', () => {
    expect(
      getExpectedDurationForStep({
        type: 'reps',
        reps: 3,
        pranayamSteps: [
          { duration: 4 },
          { duration: 8 }
        ]
      })
    ).toBe(36);
  });
});
