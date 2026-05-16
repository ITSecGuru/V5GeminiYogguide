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
    const speechData = step.speech || {};
    promptText = language === 'hi' 
      ? (speechData.hi || speechData.fallbackHi || "शुरू करें")
      : (speechData.en || speechData.fallbackEn || "Begin.");
  }

  const utterance = new SpeechSynthesisUtterance(promptText);
  const voices = window.speechSynthesis.getVoices();
  
  if (language === 'hi') {
    const hindiVoice = voices.find(v => v.lang.startsWith('hi'));
    if (hindiVoice) utterance.voice = hindiVoice;
  } else {
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};
