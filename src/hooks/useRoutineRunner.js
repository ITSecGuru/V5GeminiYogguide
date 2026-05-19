import { useState, useEffect, useMemo } from 'react';
import { routines } from '../data/routines';

const useRoutineRunner = () => {
  const [selectedRoutineId, setSelectedRoutineId] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerStatus, setTimerStatus] = useState('idle'); // idle, running, paused
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false); // NEW V7 STATE

  // Safety Fallback: Automatically select the first routine if empty
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

  // Calculate Initial Time: Check for prepTime first, then fallback to duration/reps
  useEffect(() => {
    if (currentStep) {
      const prep = currentStep.prepTime || 0;
      if (prep > 0) {
        setIsPreparing(true);
        setTimeLeft(prep);
      } else {
        setIsPreparing(false);
        const timePerRep = currentStep.timePerRep || 5; 
        setTimeLeft(currentStep.type === 'time' ? currentStep.duration : currentStep.reps * timePerRep);
      }
    }
  }, [currentStepIndex, currentStep]);

  // The Main Engine Loop
  useEffect(() => {
    let interval = null;
    
    if (timerStatus === 'running' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timerStatus === 'running' && timeLeft === 0) {
      
      // LOGIC GATE: Are we finishing Prep Time or the actual Exercise?
      if (isPreparing) {
        // Prep time is over, start the actual exercise timer
        setIsPreparing(false);
        if (currentStep) {
          const timePerRep = currentStep.timePerRep || 5; 
          setTimeLeft(currentStep.type === 'time' ? currentStep.duration : currentStep.reps * timePerRep);
        }
      } else {
        // Main exercise is over
        if (currentStep && currentStep.type === 'time') {
           completeAndNext();
        } else {
           setTimerStatus('paused'); // Wait for manual confirmation on Rep exercises
        }
      }
    }
    return () => clearInterval(interval);
  }, [timerStatus, timeLeft, currentStep, isPreparing]); // Re-run if isPreparing changes

  const startTimer = () => setTimerStatus('running');
  const pauseTimer = () => setTimerStatus('paused');
  
  const resetTimer = () => {
    setTimerStatus('idle');
    if (currentStep) {
      const prep = currentStep.prepTime || 0;
      if (prep > 0) {
        setIsPreparing(true);
        setTimeLeft(prep);
      } else {
        setIsPreparing(false);
        const timePerRep = currentStep.timePerRep || 5;
        setTimeLeft(currentStep.type === 'time' ? currentStep.duration : currentStep.reps * timePerRep);
      }
    }
  };

  const completeAndNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setTimerStatus('running'); // Auto-play the next step (which will trigger prepTime)
    } else {
      setTimerStatus('idle'); // Routine Complete
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setTimerStatus('running');
    }
  };

  const selectRoutine = (routineId) => {
    setSelectedRoutineId(routineId);
    setCurrentStepIndex(0);
    setTimerStatus('idle');
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
    isPreparing, // Exported to UI so the app knows we are in a transition
    startTimer,
    pauseTimer,
    resetTimer,
    completeAndNext,
    prevStep
  };
};

export default useRoutineRunner;