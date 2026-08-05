import BREATH_ANIMATIONS from './breathAnimations.js';
import { pranayamNames } from '../data/stepNames.js';

const UI_LANGUAGE_KEYS = {
  English: 'english',
  Devanagari: 'devanagari'
};

const DEFAULT_NAME = 'Practice';
const DEFAULT_ANIMATION_KEY = 'default';

const DEFAULT_BREATH_PATTERN = {
  english: 'Breathe slowly and evenly',
  devanagari: 'धीमा और समान श्वास लें'
};

const SURYA_NAMASKAR_PATTERN = {
  english: 'Sync inhale/exhale with movement',
  devanagari: 'आसन के साथ सांस में समन्वय करें'
};

const getNameKey = (uiLanguage = 'English') => UI_LANGUAGE_KEYS[uiLanguage] || UI_LANGUAGE_KEYS.English;
const getAlternateNameKey = (uiLanguage = 'English') => (
  getNameKey(uiLanguage) === 'devanagari' ? 'english' : 'devanagari'
);

export const getStepDisplayName = (step = {}, uiLanguage = 'English') => {
  const nameKey = getNameKey(uiLanguage);
  return step.names?.[nameKey]
    || step.names?.roman
    || step.names?.transliteration
    || step.names?.english
    || step.names?.devanagari
    || step.name
    || DEFAULT_NAME;
};

export const getStepSecondaryName = (step = {}, uiLanguage = 'English') => {
  const alternateKey = getAlternateNameKey(uiLanguage);
  return step.names?.[alternateKey]
    || step.names?.roman
    || step.names?.english
    || step.names?.devanagari
    || '';
};

export const getStepRomanName = (step = {}) => (
  step.names?.roman || step.names?.transliteration || ''
);

export const getBreathAnimationKey = (step = {}) => (
  step.breathAnimationKey || step.stepKey || DEFAULT_ANIMATION_KEY
);

export const getPranayamMetadata = (step = {}, uiLanguage = 'English') => {
  const animationKey = getBreathAnimationKey(step);
  const pranayamMetadata = pranayamNames[animationKey] || null;
  const nameKey = getNameKey(uiLanguage);

  if (!pranayamMetadata) {
    return {
      label: step.names?.[nameKey]
        || step.names?.english
        || step.names?.devanagari
        || BREATH_ANIMATIONS[animationKey]?.label
        || BREATH_ANIMATIONS.default.label,
      animationKey
    };
  }

  return {
    label: pranayamMetadata[nameKey] || pranayamMetadata.english || pranayamMetadata.devanagari || BREATH_ANIMATIONS[animationKey]?.label || BREATH_ANIMATIONS.default.label,
    animationKey
  };
};

export const getBreathAnimation = (step = {}, uiLanguage = 'English') => {
  const animationKey = getBreathAnimationKey(step);
  const stepAnimation = BREATH_ANIMATIONS[animationKey] || BREATH_ANIMATIONS.default;
  const pranayamData = getPranayamMetadata(step, uiLanguage);

  return {
    ...stepAnimation,
    label: pranayamData.label || stepAnimation.label
  };
};

export const getBreathPatternText = (step = {}, uiLanguage = 'English') => {
  if (step.breathPattern && step.breathPattern.trim() !== '') {
    return step.breathPattern;
  }

  const nameKey = getNameKey(uiLanguage);
  const patternFallback = step.stepKey === 'surya-namaskar'
    ? SURYA_NAMASKAR_PATTERN[nameKey]
    : DEFAULT_BREATH_PATTERN[nameKey];

  return patternFallback;
};

const getRepGuidanceText = (step = {}, language = 'en', repGuidance = {}) => {
  const { currentRep, totalReps } = repGuidance || {};
  const shouldGuide = step.type === 'reps' || step.type === 'sequence';

  if (!shouldGuide || typeof currentRep !== 'number' || typeof totalReps !== 'number') {
    return '';
  }

  if (currentRep < 1 || totalReps < 1) {
    return '';
  }

  if (step.category === 'Physio') {
    return String(totalReps - currentRep + 1);
  }

  return language === 'hi'
    ? `चरण ${currentRep}/${totalReps}`
    : `Step ${currentRep} of ${totalReps}`;
};

export const getAudioPromptText = (step = {}, language = 'en', omitStepName = false, repGuidance = {}) => {
  const repGuidanceText = getRepGuidanceText(step, language, repGuidance);

  if (omitStepName) {
    if (repGuidanceText) {
      return repGuidanceText;
    }

    if (language === 'hi') {
      return step.type === 'reps' ? 'दोहराएं' : 'समय शुरू';
    }
    return step.type === 'reps' ? 'Repeat' : 'Time';
  }

  const names = step.names || {};
  const basePrompt = language === 'hi'
    ? step.speech?.hi || names.devanagari || names.english || 'शुरू करें'
    : step.speech?.en || names.english || names.devanagari || 'Begin.';

  return repGuidanceText ? `${basePrompt}. ${repGuidanceText}` : basePrompt;
};
