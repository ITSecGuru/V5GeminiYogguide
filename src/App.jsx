// src/App.jsx
import { useMemo } from 'react';
import useRoutineRunner from './hooks/useRoutineRunner'; 
import { routines } from './data/routines';

import SettingsCard from './components/SettingsCard';
import CurrentActivityCard from './components/CurrentActivityCard';
import SessionControlsCard from './components/SessionControlsCard';
import RoutinePlaylistCard from './components/RoutinePlaylistCard';

function App() {
  const {
    steps, currentStepIndex, currentStep, chosenRoutineKey, setChosenRoutineKey,
    timerStatus, startTimer, pauseTimer, completeAndNext, prevStep, resetSession,
    uiLanguage, setUiLanguage, audioLanguage, setAudioLanguage,
    isMuted, setIsMuted, totalStepsInRoutine, completedSteps,
    currentStepTimeTotal, currentStepTimeLeft
  } = useRoutineRunner();

  const routineOptions = useMemo(() => {
    return routines.map((routine) => ({ key: routine.id, name: routine.label }));
  }, []);

  const timerPercentRemaining = currentStepTimeTotal > 0
    ? (currentStepTimeLeft / currentStepTimeTotal) * 100 : 0;

  const getTimerColor = (percent) => {
    if (percent > 50) return '#10b981'; // Emerald Green
    if (percent > 20) return '#fbbf24'; // Amber Yellow
    return '#f43f5e'; // Rose Red
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 p-3 md:p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        
        <SettingsCard 
          chosenRoutineKey={chosenRoutineKey} setChosenRoutineKey={setChosenRoutineKey}
          routineOptions={routineOptions}
          uiLanguage={uiLanguage} setUiLanguage={setUiLanguage}
          audioLanguage={audioLanguage} setAudioLanguage={setAudioLanguage}
          isMuted={isMuted} setIsMuted={setIsMuted}
        />

        <CurrentActivityCard currentStep={currentStep} />

        <SessionControlsCard 
          currentStepTimeLeft={currentStepTimeLeft}
          timerPercentRemaining={timerPercentRemaining}
          getTimerColor={getTimerColor}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          completeAndNext={completeAndNext}
          prevStep={prevStep}
          resetSession={resetSession}
          timerStatus={timerStatus}
          currentStepIndex={currentStepIndex}
          totalStepsInRoutine={totalStepsInRoutine}
          completedSteps={completedSteps}
        />

        <RoutinePlaylistCard 
          steps={steps} 
          currentStepIndex={currentStepIndex} 
        />

      </div>
    </div>
  );
}

export default App;