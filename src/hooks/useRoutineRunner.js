// src/hooks/useRoutineRunner.js
import { useState, useEffect } from 'react';
import { routines } from '../data/routines';

export default function useRoutineRunner() {
  // --- 1. SETTINGS STATE ---
  // Safely grab the first routine ID as the absolute default
  const defaultRoutineId = routines.length > 0 ? routines[0].id : '';
  const [chosenRoutineKey, setChosenRoutineKey] = useState(defaultRoutineId);
  
  const [uiLanguage, setUiLanguage] = useState('English');
  const [audioLanguage, setAudioLanguage] = useState('English');
  const [isMuted, setIsMuted] = useState(false);

  // --- 2. SESSION STATE ---
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerStatus, setTimerStatus] = useState('idle'); // 'idle', 'running', 'paused'
  const [currentStepTimeLeft, setCurrentStepTimeLeft] = useState(0);

  // --- 3. SAFETY OVERRIDE ---
  // If the browser cache ever tries to force an empty key, snap it back to the first routine
  useEffect(() => {
    if (!chosenRoutineKey && routines.length > 0) {
      setChosenRoutineKey(routines[0].id);
    }
  }, [chosenRoutineKey]);

  // --- 4. DERIVED DATA ---
  // Find the routine, but if chosenRoutineKey is somehow broken, fallback to routines[0]
  const routine = routines.find(r => r.id === chosenRoutineKey) || routines[0];
  const steps = routine ? routine.steps : []; 
  
  const totalStepsInRoutine = steps.length;
  const completedSteps = currentStepIndex;
  const currentStep = steps[currentStepIndex] || null;

  // V6 Time Rule: uses database duration, or reps * 5 seconds
  const currentStepTimeTotal = currentStep 
    ? currentStep.duration || (currentStep.reps ? currentStep.reps * 5 : 0) 
    : 0;

  // --- 5. EFFECTS ---
  // Reset session when routine changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setTimerStatus('idle');
    if (steps.length > 0) {
      const firstStep = steps[0];
      setCurrentStepTimeLeft(firstStep.duration || (firstStep.reps ? firstStep.reps * 5 : 0));
    } else {
      setCurrentStepTimeLeft(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenRoutineKey]);

  // Timer Countdown Logic
  useEffect(() => {
    let interval;
    if (timerStatus === 'running' && currentStepTimeLeft > 0) {
      interval = setInterval(() => {
        setCurrentStepTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerStatus === 'running' && currentStepTimeLeft === 0) {
      // Auto-advance when timer hits zero
      completeAndNext();
    }
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerStatus, currentStepTimeLeft]);

  // --- 6. ACTIONS ---
  const startTimer = () => setTimerStatus('running');
  
  const pauseTimer = () => setTimerStatus('paused');
  
  const completeAndNext = () => {
    if (currentStepIndex < totalStepsInRoutine - 1) {
      const nextIndex = currentStepIndex + 1;
      const nextStep = steps[nextIndex];
      setCurrentStepIndex(nextIndex);
      setCurrentStepTimeLeft(nextStep.duration || (nextStep.reps ? nextStep.reps * 5 : 0));
      setTimerStatus('idle');
    } else {
      setTimerStatus('idle');
      setCurrentStepTimeLeft(0);
    }
  };

  const resetSession = () => {
    setCurrentStepIndex(0);
    setTimerStatus('idle');
    if (steps.length > 0) {
      const firstStep = steps[0];
      setCurrentStepTimeLeft(firstStep.duration || (firstStep.reps ? firstStep.reps * 5 : 0));
    }
  };

  return {
    steps,
    currentStepIndex,
    currentStep,
    chosenRoutineKey,
    setChosenRoutineKey,
    timerStatus,
    startTimer,
    pauseTimer,
    completeAndNext,
    resetSession,
    uiLanguage,
    setUiLanguage,
    audioLanguage,
    setAudioLanguage,
    isMuted,
    setIsMuted,
    totalStepsInRoutine,
    completedSteps,
    currentStepTimeTotal,
    currentStepTimeLeft
  };
}