import { beforeEach, describe, expect, it, vi } from 'vitest';
import { speakText } from './audio';

describe('speakText', () => {
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
});
