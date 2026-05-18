import { Volume2, VolumeX } from 'lucide-react';

export default function SettingsCard({
  chosenRoutineKey, setChosenRoutineKey, routineOptions,
  uiLanguage, setUiLanguage, audioLanguage, setAudioLanguage,
  isMuted, setIsMuted
}) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <header className="mb-10 border-b border-gray-100 pb-8">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Lata Yog Routine Guide 6.1</h1>
        <p className="mt-4 text-xl text-slate-600">Canvas preview version for testing on desktop web.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8 items-end justify-between">
        <div className="flex-grow flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-lg font-semibold text-slate-700" htmlFor="routineSelect">Choose routine</label>
            <select
              id="routineSelect"
              className="w-full border-2 border-slate-200 rounded-xl p-4 text-lg bg-white focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              value={chosenRoutineKey}
              onChange={(e) => setChosenRoutineKey(e.target.value)}
            >
              {routineOptions.map(option => (
                <option key={option.key} value={option.key}>{option.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-slate-700" htmlFor="uiLang">UI language</label>
            <select
              id="uiLang"
              className="w-full border-2 border-slate-200 rounded-xl p-4 text-lg bg-white"
              value={uiLanguage}
              onChange={(e) => setUiLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-slate-700" htmlFor="audioLang">Audio language</label>
            <select
              id="audioLang"
              className="w-full border-2 border-slate-200 rounded-xl p-4 text-lg bg-white"
              value={audioLanguage}
              onChange={(e) => setAudioLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Both">Both (Cued)</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center gap-3 p-4 px-6 border-2 border-slate-300 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 transition-all text-slate-700"
        >
          {isMuted ? <VolumeX className="w-6 h-6 text-slate-500" /> : <Volume2 className="w-6 h-6 text-blue-600" />}
          <span className="text-lg font-medium">{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>
      </div>
    </div>
  );
}