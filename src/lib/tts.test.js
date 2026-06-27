import { describe, expect, it, vi, beforeEach } from 'vitest';
import { speak } from './tts.js';

describe('tts helper', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.SpeechSynthesisUtterance = vi.fn().mockImplementation((text) => ({ text, lang: '', rate: 1, pitch: 1, volume: 1 }));
    window.speechSynthesis = {
      cancel: vi.fn(),
      speak: vi.fn(),
    };
  });

  it('speaks English text with en-US lang', () => {
    speak('Begin Purak', 'en-US');
    expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.speak.mock.calls[0][0].lang).toBe('en-US');
  });

  it('speaks Hindi text with hi-IN lang', () => {
    speak('पूरक', 'hi-IN');
    expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.speak.mock.calls[0][0].lang).toBe('hi-IN');
  });
});
