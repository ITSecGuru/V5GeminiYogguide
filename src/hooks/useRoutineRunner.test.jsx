import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useRoutineRunner from './useRoutineRunner';

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
});
