export const playAudioPrompt = (step, language = 'en', omitStepName = false) => {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  let promptText = "";

  if (omitStepName) {
    if (language === 'hi') {
      promptText = step.type === 'reps' ? "दोहराएं" : "समय शुरू"; 
    } else {
      promptText = step.type === 'reps' ? "Repeat" : "Time";
    }
  } else {
    // Prefer canonical names from the step database: devanagari for Hindi, roman for English
    const names = step.names || {};
    if (language === 'hi') {
      promptText = names.devanagari || (step.speech && step.speech.hi) || "शुरू करें";
    } else {
      // Use roman transliteration for English audio prompts (better pronunciation for Sanskrit/roman words)
      promptText = names.roman || (step.speech && step.speech.en) || names.english || "Begin.";
    }
  }

  const utterance = new SpeechSynthesisUtterance(promptText);
  const voices = window.speechSynthesis.getVoices();
  // Set voice by language preference if available, otherwise let browser pick default
  if (language === 'hi') {
    const hindiVoice = voices.find(v => v.lang.startsWith('hi')) || voices.find(v => v.lang.startsWith('hi-IN'));
    if (hindiVoice) utterance.voice = hindiVoice;
    utterance.lang = 'hi-IN';
  } else {
    const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices.find(v => v.lang.startsWith('en-US'));
    if (englishVoice) utterance.voice = englishVoice;
    utterance.lang = 'en-US';
  }

  window.speechSynthesis.speak(utterance);
};
