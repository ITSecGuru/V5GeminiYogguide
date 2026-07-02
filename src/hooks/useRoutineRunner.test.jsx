import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useRoutineRunner, { calculateRepTelemetry } from './useRoutineRunner';

describe('useRoutineRunner', () => {
  it('uses the full step duration for sequence steps after preparation finishes', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useRoutineRunner());

    act(() => {
      result.current.selectRoutine('patanjaliJogging1');
    });

    while (result.current.currentStep?.stepKey !== 'surya-namaskar') {
      act(() => {
        result.current.completeAndNext({ source: 'manual' });
      });
    }

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(300);
    vi.useRealTimers();
  });

  it('counts reps forward from 1 and never exceeds the total reps', () => {
    const step = { type: 'reps', reps: 16, timePerRep: 5 };

    const startTelemetry = calculateRepTelemetry(step, 76, false, false);
    const midTelemetry = calculateRepTelemetry(step, 75, false, false);
    const endTelemetry = calculateRepTelemetry(step, 1, false, false);

    expect(startTelemetry.totalReps).toBe(16);
    expect(startTelemetry.currentRep).toBe(1);
    expect(startTelemetry.repsLeft).toBe(15);
    expect(midTelemetry.currentRep).toBe(2);
    expect(endTelemetry.currentRep).toBe(16);
    expect(endTelemetry.currentRep).toBeLessThanOrEqual(endTelemetry.totalReps);
  });
});
