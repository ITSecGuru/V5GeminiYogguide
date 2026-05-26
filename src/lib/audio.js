import { isTtsDebugEnabled, logTtsEvent } from './ttsDebug';

const getBestVoice = (voices, preferredLangs) => {
  for (const lang of preferredLangs) {
    const match = voices.find((v) => v.lang?.toLowerCase().startsWith(lang.toLowerCase()));
    if (match) return match;
  }

  for (const lang of preferredLangs) {
    const match = voices.find((v) => v.name?.toLowerCase().includes(lang.toLowerCase()));
    if (match) return match;
  }

  return voices[0] || null;
};

const isDevanagariText = (text) => /[\u0900-\u097F]/.test(text);

// runtime flag exposed so callers can inspect which TTS is active
let externalActive = false;

const setTtsStatus = (isExternal) => {
  externalActive = !!isExternal;
  try {
    window.__externalTtsActive = externalActive; // easy debug from console
    const ev = new CustomEvent('tts-status-changed', { detail: { external: externalActive } });
    window.dispatchEvent(ev);
  } catch (err) {
    // ignore dispatch errors in non-browser test environments
  }
};

const isExternalTtsAvailable = () => typeof window.externalSpeechSynthesizer?.speak === 'function';

const speakExternal = (text, options = {}) => {
  if (!isExternalTtsAvailable()) return false;

  try {
    window.externalSpeechSynthesizer.speak({ text, ...options });
    setTtsStatus(true);
    if (isTtsDebugEnabled()) logTtsEvent({ type: 'external-speak', text, options, stepId: options?.stepId });
    return true;
  } catch (error) {
    console.warn('External speech synthesizer failed, falling back to native TTS.', error);
    setTtsStatus(false);
    if (isTtsDebugEnabled()) logTtsEvent({ type: 'external-fail', error: String(error), text, options, stepId: options?.stepId });
    return false;
  }
};

const speakNative = (text, lang, rate = 0.8, pitch = 1.05, volume = 1, meta = {}) => {
  // mark native as active before speaking
  setTtsStatus(false);
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const useHiVoice = lang === 'hi' || isDevanagariText(text);

  const voiceMap = {
    hi: ['hi-IN', 'hi'],
    en: ['en-US', 'en-GB', 'en']
  };

  const bestVoice = getBestVoice(voices, useHiVoice ? voiceMap.hi : voiceMap.en);
  if (bestVoice) utterance.voice = bestVoice;

  utterance.lang = useHiVoice ? 'hi-IN' : 'en-US';
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  if (isTtsDebugEnabled()) {
    logTtsEvent({ type: 'native-speak', text, lang: utterance.lang, voice: utterance.voice?.name || null, rate, pitch, volume, stepId: meta?.stepId });
  }

  if (!voices.length) {
    const handleVoicesChanged = () => {
      const updatedVoices = window.speechSynthesis.getVoices();
      const fallbackVoice = getBestVoice(updatedVoices, useHiVoice ? voiceMap.hi : voiceMap.en);
      if (fallbackVoice) utterance.voice = fallbackVoice;
      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    return;
  }

  window.speechSynthesis.speak(utterance);
};

export const isExternalTTSActive = () => externalActive;

export const speakDevanagari = (text) => {
  if (!text) return;
  const options = { lang: 'hi-IN', rate: 0.8, pitch: 1.05, volume: 1 };
  if (speakExternal(text, options)) return;
  speakNative(text, 'hi', options.rate, options.pitch, options.volume, { stepId: options.stepId });
};

export const speakText = (text, language = 'en', meta = {}) => {
  if (!text) return;
  if (isDevanagariText(text)) {
    // pass stepId through to speakDevanagari's external/native call
    const options = { lang: 'hi-IN', rate: 0.8, pitch: 1.05, volume: 1, stepId: meta?.stepId };
    if (speakExternal(text, options)) return;
    speakNative(text, 'hi', options.rate, options.pitch, options.volume, { stepId: meta?.stepId });
    return;
  }

  const lang = language === 'hi' ? 'hi' : 'en';
  const options = {
    lang: lang === 'hi' ? 'hi-IN' : 'en-US',
    rate: language === 'hi' ? 0.8 : 0.95,
    pitch: 1.05,
    volume: 1,
    stepId: meta?.stepId
  };

  if (speakExternal(text, options)) return;
  speakNative(text, lang, options.rate, options.pitch, options.volume, { stepId: meta?.stepId });
};

export const playAudioPrompt = (step, language = 'en', omitStepName = false) => {
  window.speechSynthesis?.cancel();
  const names = step.names || {};
  let promptText = '';

  if (omitStepName) {
    promptText = language === 'hi' ? (step.type === 'reps' ? 'दोहराएं' : 'समय शुरू') : (step.type === 'reps' ? 'Repeat' : 'Time');
  } else {
    const devanagariPriority = names.devanagari || step.speech?.hi;
    if (devanagariPriority) {
      promptText = devanagariPriority;
    } else if (language === 'hi') {
      promptText = step.speech?.hi || names.english || 'शुरू करें';
    } else {
      promptText = step.speech?.en || names.english || 'Begin.';
    }
  }

    // Log prompt selection; include stepId only when prompt text is not Devanagari
    if (isTtsDebugEnabled()) {
      const isDeva = isDevanagariText(promptText);
      const promptEvt = { type: 'prompt', text: promptText, language };
      if (!isDeva && step && step.id) promptEvt.stepId = step.id;
      logTtsEvent(promptEvt);
    }

    speakText(promptText, language);
};
