// src/components/SettingsCard.jsx
export default function SettingsCard({
  chosenRoutineKey,
  setChosenRoutineKey,
  routineOptions,
  uiLanguage,
  setUiLanguage,
  audioLanguage,
  setAudioLanguage,
  isMuted,
  setIsMuted
}) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Lata Yog Routine Guide 6.1
        </h1>
        <p className="text-sm text-gray-500">
          Canvas preview version for testing on desktop web.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Choose routine</label>
          <select
            value={chosenRoutineKey}
            onChange={(e) => setChosenRoutineKey(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {routineOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>{opt.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">UI language</label>
          <select
            value={uiLanguage}
            onChange={(e) => setUiLanguage(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="English">English</option>
            <option value="Devanagari">Devanagari</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Audio language</label>
          <select
            value={audioLanguage}
            onChange={(e) => setAudioLanguage(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="English">English</option>
            <option value="Devanagari">Devanagari</option>
          </select>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium h-[42px]"
        >
          {isMuted ? '🔇 Unmute' : '🔊 Mute'}
        </button>
      </div>
    </div>
  );
}