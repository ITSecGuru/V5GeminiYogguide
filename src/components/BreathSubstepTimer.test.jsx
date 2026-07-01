import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { playSimpleBeep } from '../lib/audio.js';

vi.mock('../lib/audio.js', async () => {
  const actual = await vi.importActual('../lib/audio.js');
  return {
    ...actual,
    playSimpleBeep: vi.fn()
  };
});

import BreathSubstepTimer from './BreathSubstepTimer.jsx';

describe('BreathSubstepTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders first substep and counts down, then advances to next substep', async () => {
    const steps = [
      { names: { english: 'Purak', devanagari: 'पूरक' }, action: 'inhale', duration: 2 },
      { names: { english: 'Rechak', devanagari: 'रेचक' }, action: 'exhale', duration: 1 }
    ];

    render(<BreathSubstepTimer pranayamSteps={steps} uiLanguage="English" />);

    // initial render shows Purak
    expect(screen.getByText(/Purak/)).toBeTruthy();
    expect(screen.getByText(/INHALE|inhale|2s/)).toBeTruthy();

    // advance 1 second -> remaining should decrement
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText(/INHALE.*1s/i)).toBeTruthy();

    // advance another second -> should advance to next substep (Rechak)
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText(/Rechak/)).toBeTruthy();
    expect(screen.getByText(/EXHALE.*1s/i)).toBeTruthy();
  });

  it('shows a simple beep prompt for kapalbhati instead of an exhale label', () => {
    const steps = [
      { names: { english: 'Exhale', devanagari: 'रेचक' }, action: 'exhale', duration: 2 }
    ];

    render(<BreathSubstepTimer pranayamSteps={steps} uiLanguage="English" isKapalBhati />);

    expect(screen.getByText(/Beep/i)).toBeTruthy();
    expect(screen.queryByText(/EXHALE/i)).toBeNull();
  });

  it('plays a beep on each kapal bhati substep transition', () => {
    const steps = [
      { names: { english: 'Exhale', devanagari: 'रेचक' }, action: 'exhale', duration: 2 },
      { names: { english: 'Exhale', devanagari: 'रेचक' }, action: 'exhale', duration: 2 }
    ];

    render(<BreathSubstepTimer pranayamSteps={steps} uiLanguage="English" isKapalBhati />);

    act(() => { vi.advanceTimersByTime(2000); });
    expect(playSimpleBeep).toHaveBeenCalledTimes(1);

    act(() => { vi.advanceTimersByTime(2000); });
    expect(playSimpleBeep).toHaveBeenCalledTimes(2);
  });
});
