// src/hooks/useRoutineRunner.js
import { useState, useEffect, useMemo } from 'react';
import { routines } from '../data/routines';

export default function useRoutineRunner() {
  const [chosenRoutineKey, setChosenRoutineKey] = useState(routines[0]?.id || 'patanjaliJogging1');
  const [uiLanguage, setUiLanguage] = useState('English');
  const [audioLanguage, setAudioLanguage] = useState('English');
  const [isMuted, setIsMuted] = useState(false);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerStatus, setTimerStatus] = useState('idle'); // 'idle', 'running', 'paused', 'completed'
  const [currentStepTimeTotal, setCurrentStepTimeTotal] = useState(60); 
  const [currentStepTimeLeft, setCurrentStepTimeLeft] = useState(60);

  const steps = useMemo(() => {
    const routine = routines.find(r => r.id === chosenRoutineKey);
    return routine ? routine.steps : [];
  }, [chosenRoutineKey]);

  const currentStep = steps[currentStepIndex] || null;
  const totalStepsInRoutine = steps.length;
  const completedSteps = currentStepIndex;

  // Reset when routine changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setTimerStatus('idle');
    setCurrentStepTimeTotal(60);
    setCurrentStepTimeLeft(60);
  }, [chosenRoutineKey]);

  // Reset timer when step changes
  useEffect(() => {
    setCurrentStepTimeTotal(60);
    setCurrentStepTimeLeft(60);
  }, [currentStepIndex]);

  const startTimer = () => setTimerStatus('running');
  const pauseTimer = () => setTimerStatus('paused');
  const resetSession = () => {
    setCurrentStepIndex(0);
    setTimerStatus('idle');
    setCurrentStepTimeLeft(60);
  };

  const completeAndNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setTimerStatus('running'); // Auto-plays the next step
    } else {
      setTimerStatus('completed');
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setTimerStatus('paused'); // Pauses so they can catch their breath
    }
  };

  // The Timer Loop
  useEffect(() => {
    let interval = null;
    if (timerStatus === 'running') {
      if (currentStepTimeLeft > 0) {
        interval = setInterval(() => {
          setCurrentStepTimeLeft(prev => prev - 1);
        }, 1000);
      } else {
        completeAndNext(); // Auto-advances when time hits zero
      }
    }
    return () => clearInterval(interval);
  }, [timerStatus, currentStepTimeLeft]);

  return {
    steps, currentStepIndex, currentStep, chosenRoutineKey, setChosenRoutineKey,
    timerStatus, startTimer, pauseTimer, completeAndNext, prevStep, resetSession,
    uiLanguage, setUiLanguage, audioLanguage, setAudioLanguage,
    isMuted, setIsMuted, totalStepsInRoutine, completedSteps,
    currentStepTimeTotal, currentStepTimeLeft
  };
}