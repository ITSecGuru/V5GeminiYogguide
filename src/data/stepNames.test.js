import { describe, expect, it } from 'vitest';
import { stepDatabase, testSteps } from './stepNames.js';

describe('step data organization', () => {
  it('sets Anulom Vilom to the intended total duration', () => {
    expect(stepDatabase['anulom-vilom'].duration).toBe(880);
  });

  it('defines the requested walking steps with the expected timing and side support', () => {
    expect(stepDatabase['leg-knee-placeholder-19']).toMatchObject({
      names: expect.objectContaining({
        english: 'Forward and Reverse Walk'
      }),
      type: 'reps',
      reps: 4,
      timePerRep: 30,
      prepTime: 5,
      hasSides: false,
      description: 'Repeat 4 times with 30 seconds per rep.'
    });

    expect(stepDatabase['leg-knee-placeholder-20']).toMatchObject({
      names: expect.objectContaining({
        english: 'Sideways Walking'
      }),
      type: 'reps',
      reps: 4,
      timePerRep: 30,
      prepTime: 5,
      hasSides: true,
      description: 'Repeat 4 times on each side with 30 seconds per rep.'
    });

    expect(stepDatabase['leg-knee-placeholder-21']).toMatchObject({
      names: expect.objectContaining({
        english: 'Walking 100 Meters'
      }),
      type: 'reps',
      reps: 1,
      timePerRep: 100,
      prepTime: 5,
      hasSides: false,
      description: 'Repeat 1 time with 100 seconds per rep.'
    });
  });

  it('keeps testing-only steps in a dedicated testSteps export', () => {
    const testStepKeys = [
      'yogic-jogging-position-1',
      'yogic-jogging-position-2',
      'yogic-jogging-position-3',
      'yogic-jogging-position-4',
      'yogic-jogging-position-5'
    ];

    for (const key of testStepKeys) {
      expect(testSteps[key]).toBeDefined();
      expect(stepDatabase[key]).toBeUndefined();
    }
  });
});
