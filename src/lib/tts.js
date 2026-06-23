import ttsDebug from './ttsDebug.js';

const isBrowser = typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined';

export function speak(text, lang = 'en-US') {
  try {
    ttsDebug.logTtsEvent({ type: 'prompt', text, lang });
    if (!isBrowser) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  } catch (e) {
    // swallow; tts debug already logged
  }
}

export default { speak };
