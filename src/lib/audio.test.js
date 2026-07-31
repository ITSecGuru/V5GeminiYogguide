import { beforeEach, describe, expect, it, vi } from 'vitest';
import { speakText, playAudioPrompt } from './audio';

describe('audio helpers', () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    global.SpeechSynthesisUtterance = vi.fn().mockImplementation((text) => ({ text, lang: '', rate: 1, pitch: 1, volume: 1 }));

    window.speechSynthesis = {
      cancel: vi.fn(),
      speak: vi.fn(),
      getVoices: vi.fn(() => []),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    window.externalSpeechSynthesizer = undefined;
  });

  it('speaks Devanagari text even when no voices are available', () => {
    speakText('नमस्ते', 'hi');

    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
  });

  it('chooses English prompt text when audio language is en', () => {
    const step = {
      id: 'step-1',
      type: 'time',
      names: { english: 'Purak', devanagari: 'पूरक' },
      speech: { en: 'Begin Purak', hi: 'पूरक प्रारंभ करें।' }
    };

    playAudioPrompt(step, 'en', false);

    expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.speak.mock.calls[0][0].text).toBe('Begin Purak');
  });

  it('chooses Hindi prompt text when audio language is hi', () => {
    const step = {
      id: 'step-2',
      type: 'time',
      names: { english: 'Rechak', devanagari: 'रेचक' },
      speech: { en: 'Begin Rechak', hi: 'रेचक प्रारंभ करें।' }
    };

    playAudioPrompt(step, 'hi', false);

    expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.speak.mock.calls[0][0].text).toBe('रेचक प्रारंभ करें।');
  });

  it('appends repeat guidance for rep-based steps', () => {
    const step = {
      id: 'step-3',
      stepKey: 'skateboard-knee-bending',
      type: 'reps',
      names: { english: 'Skateboard Knee Bending', devanagari: 'स्केटबोर्ड घुटना मोड़ना' },
      speech: { en: 'Begin Skateboard Knee Bending', hi: 'स्केटबोर्ड घुटना मोड़ना प्रारंभ करें।' }
    };

    playAudioPrompt(step, 'en', false, { currentRep: 2, totalReps: 4 });

    expect(window.speechSynthesis.speak.mock.calls[0][0].text).toBe('Begin Skateboard Knee Bending. Step 2 of 4');
  });

  it('speaks only repeat progress when step name is omitted', () => {
    const step = {
      id: 'step-4',
      stepKey: 'skateboard-knee-bending',
      type: 'reps',
      names: { english: 'Skateboard Knee Bending', devanagari: 'स्केटबोर्ड घुटना मोड़ना' },
      speech: { en: 'Begin Skateboard Knee Bending', hi: 'स्केटबोर्ड घुटना मोड़ना प्रारंभ करें।' }
    };

    playAudioPrompt(step, 'en', true, { currentRep: 3, totalReps: 10 });

    expect(window.speechSynthesis.speak.mock.calls[0][0].text).toBe('Step 3 of 10');
  });
});
