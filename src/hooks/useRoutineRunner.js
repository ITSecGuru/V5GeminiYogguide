/**
 * @file src/hooks/useRoutineRunner.js
 * @description State engine for the Lata Yog application framework.
 * Restores manual-start pause gates on initial step loads while preserving 
 * automated repetition counters and final class termination milestone flags.
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { routines } from '../data/routines';
import { getSequenceProgress, getStepCycleDuration, getStepDuration } from '../lib/stepTiming';

export const calculateRepTelemetry = (currentStep, timeLeft, isPreparing, isRoutineComplete) => {
  if (!currentStep || isPreparing || isRoutineComplete || !['reps', 'sequence'].includes(currentStep.type)) {
    return { currentRep: 0, totalReps: 0, repsLeft: 0, currentSubstep: 0, totalSubsteps: 0, substepLabel: '0/0' };
  }

  const totalReps = typeof currentStep.repeats === 'number'
    ? currentStep.repeats
    : (typeof currentStep.reps === 'number' ? currentStep.reps : 1);
  const cycleDuration = getStepCycleDuration(currentStep) || (currentStep.type === 'reps'
    ? (typeof currentStep.timePerRep === 'number' ? currentStep.timePerRep : 5)
    : 0);
  const totalStepDuration = getStepDuration(currentStep);
  const elapsedStepTime = totalStepDuration > 0 && typeof timeLeft === 'number'
    ? Math.max(0, totalStepDuration - timeLeft)
    : 0;
  const repsCompleted = cycleDuration > 0 ? Math.floor(elapsedStepTime / cycleDuration) : 0;
  const currentRep = Math.max(1, Math.min(totalReps, repsCompleted + 1));
  const repsLeft = Math.max(0, totalReps - currentRep);
  const sequenceProgress = currentStep.type === 'sequence'
    ? getSequenceProgress(currentStep, timeLeft, getStepDuration(currentStep))
    : { currentSubstep: 0, totalSubsteps: 0, substepLabel: '0/0' };

  return { currentRep, totalReps, repsLeft, ...sequenceProgress };
};

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
          const fallbackDuration = typeof currentStep.duration === 'number'
            ? currentStep.duration
            : (typeof currentStep.reps === 'number'
              ? currentStep.reps * (typeof currentStep.timePerRep === 'number' ? currentStep.timePerRep : 5)
              : 60);
          const resolvedDuration = typeof currentStepDuration === 'number' && currentStepDuration > 0
            ? currentStepDuration
            : fallbackDuration;
          setTimeLeft(resolvedDuration);
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
  const repTelemetry = useMemo(() => calculateRepTelemetry(currentStep, timeLeft, isPreparing, isRoutineComplete), [currentStep, timeLeft, isPreparing, isRoutineComplete]);

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
