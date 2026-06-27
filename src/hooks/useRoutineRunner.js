/**
 * @file src/hooks/useRoutineRunner.js
 * @description State engine for the Lata Yog application framework.
 * Restores manual-start pause gates on initial step loads while preserving 
 * automated repetition counters and final class termination milestone flags.
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { routines } from '../data/routines';

const useRoutineRunner = () => {
  const [selectedRoutineId, setSelectedRoutineId] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerStatus, setTimerStatus] = useState('idle'); // idle, running, paused
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isRoutineComplete, setIsRoutineComplete] = useState(false);
  const nextStepPrepared = useRef(false);
  const stepAdvanceLock = useRef(false);
  const firstStepAutoStarted = useRef(false);

  // Safety Fallback: Automatically load primary routine array contents if empty
  useEffect(() => {
    if (!selectedRoutineId && routines.length > 0) {
      setSelectedRoutineId(routines[0].id);
    }
  }, [selectedRoutineId]);

  const currentRoutine = useMemo(() => 
    routines.find(r => r.id === selectedRoutineId) || routines[0], 
  [selectedRoutineId]);

  const steps = currentRoutine?.steps || [];
  const currentStep = steps[currentStepIndex];

  const getStepDuration = (step) => {
    if (!step) return 60;
    if (step.type === 'time') {
      return typeof step.duration === 'number' ? step.duration : 60;
    }

    const reps = typeof step.reps === 'number' ? step.reps : 1;
    const defaultTimePerRep = step.type === 'sequence' ? 15 : 5;
    const timePerRep = typeof step.timePerRep === 'number' ? step.timePerRep : defaultTimePerRep;

    return reps * timePerRep;
  };

  const currentStepDuration = getStepDuration(currentStep);

  // Dynamic Time Loader with absolute type guards to prevent NaN injection
  useEffect(() => {
    nextStepPrepared.current = false;

    if (currentStep && !isRoutineComplete) {
      const prep = typeof currentStep.prepTime === 'number' ? currentStep.prepTime : 5;

      if (currentStepIndex === 0 && !firstStepAutoStarted.current) {
        // Auto-start the first step with a visible 10-second countdown so mobile
        // users don't miss the hidden start control on initial launch.
        setIsPreparing(true);
        setTimeLeft(10);
        setTimerStatus('running');
        firstStepAutoStarted.current = true;
      } else if (prep > 0) {
        setIsPreparing(true);
        setTimeLeft(prep);
      } else {
        setIsPreparing(false);
        setTimeLeft(currentStepDuration);
      }

      nextStepPrepared.current = true;
    } else {
      setTimeLeft(0);
      setIsPreparing(false);
      nextStepPrepared.current = false;
    }
  }, [currentStepIndex, selectedRoutineId, isRoutineComplete, currentStepDuration]);

  // Main Core Chronos Engine Loop
  useEffect(() => {
    let interval = null;

    // Allow the timer loop to evaluate regardless of nextStepPrepared; rely
    // on `isAdvancingRef` and proper timeLeft initialization to avoid
    // duplicate advances. The previous early-return could prevent the
    // interval from starting after an auto-advance, leaving the UI stuck.

    if (timerStatus === 'running' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timerStatus === 'running' && timeLeft === 0) {
      if (isPreparing) {
        setIsPreparing(false);
        if (currentStep) {
          const duration = typeof currentStep.duration === 'number' ? currentStep.duration : 60;
          const reps = typeof currentStep.reps === 'number' ? currentStep.reps : 16;
          const timePerRep = typeof currentStep.timePerRep === 'number' ? currentStep.timePerRep : 5;
          setTimeLeft(currentStep.type === 'time' ? duration : reps * timePerRep);
        }
      } else {
        nextStepPrepared.current = false;
        completeAndNext({ source: 'auto' });
      }
    }
    return () => clearInterval(interval);
  }, [timerStatus, timeLeft, currentStep, isPreparing]);

  /**
   * CALCULATED UX READING: Computes current active repetition index
   */
  const repTelemetry = useMemo(() => {
    if (!currentStep || isPreparing || isRoutineComplete || !['reps', 'sequence'].includes(currentStep.type)) {
      return { currentRep: 0, totalReps: 0, repsLeft: 0 };
    }

    const totalReps = typeof currentStep.reps === 'number' ? currentStep.reps : 16;
    const defaultTimePerRep = currentStep.type === 'sequence' ? 15 : 5;
    const timePerRep = typeof currentStep.timePerRep === 'number' ? currentStep.timePerRep : defaultTimePerRep;
    const repsLeft = Math.max(0, Math.ceil(timeLeft / timePerRep));
    const currentRep = Math.max(1, totalReps - repsLeft + 1);

    return { currentRep, totalReps, repsLeft };
  }, [currentStep, timeLeft, isPreparing, isRoutineComplete]);

  const startTimer = () => setTimerStatus('running');
  const pauseTimer = () => setTimerStatus('paused');
  
  const resetTimer = () => {
    setTimerStatus('idle');
    setIsRoutineComplete(false);
    if (currentStep) {
      const prep = typeof currentStep.prepTime === 'number' ? currentStep.prepTime : 5;
      const time = getStepDuration(currentStep);

      if (prep > 0) {
        setIsPreparing(true);
        setTimeLeft(prep);
      } else {
        setIsPreparing(false);
        setTimeLeft(time);
      }
    }
  };

  const completeAndNext = ({ source = 'manual' } = {}) => {
    // If this advance was triggered by automatic time expiry, apply a short
    // lock to prevent duplicate auto-invocations from racing and skipping steps.
    if (source === 'auto') {
      if (stepAdvanceLock.current) return;
      stepAdvanceLock.current = true;
      setTimeout(() => { stepAdvanceLock.current = false; }, 350);
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setTimerStatus('running'); // Forces automatic play on subsequent step handoffs
    } else {
      setTimerStatus('idle');
      setIsRoutineComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setIsRoutineComplete(false);
      setCurrentStepIndex(prev => prev - 1);
      setTimerStatus('running');
    }
  };

  const selectRoutine = (routineId) => {
    setSelectedRoutineId(routineId);
    setCurrentStepIndex(0);
    setIsRoutineComplete(false);
    setTimerStatus('idle'); // Initial loaded or swapped routine waits for user to click Start
    firstStepAutoStarted.current = false;
  };

  return {
    routines,
    selectedRoutineId,
    selectRoutine,
    currentStep,
    steps,
    currentStepIndex,
    timerStatus,
    timeLeft,
    isPreparing,
    isRoutineComplete,
    repTelemetry,
    currentStepDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    completeAndNext,
    prevStep
  };
};

export default useRoutineRunner;
