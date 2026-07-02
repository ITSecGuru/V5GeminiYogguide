import { describe, expect, it } from 'vitest';
import { stepDatabase, testSteps } from './stepNames.js';

describe('step data organization', () => {
  it('sets Anulom Vilom to the intended total duration', () => {
    expect(stepDatabase['anulom-vilom'].duration).toBe(880);
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
