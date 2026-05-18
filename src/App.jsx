// src/App.jsx
import { useMemo } from 'react';
import useRoutineRunner from './hooks/useRoutineRunner'; 
import { routines } from './data/routines';

// Import our new modular components
import SettingsCard from './components/SettingsCard';
import CurrentActivityCard from './components/CurrentActivityCard';
import SessionControlsCard from './components/SessionControlsCard';
import RoutinePlaylistCard from './components/RoutinePlaylistCard';

function App() {
  const {
    steps, currentStepIndex, currentStep, chosenRoutineKey, setChosenRoutineKey,
    timerStatus, startTimer, pauseTimer, completeAndNext, resetSession,
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
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
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
          resetSession={resetSession}
          timerStatus={timerStatus}
          currentStep={currentStep}
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