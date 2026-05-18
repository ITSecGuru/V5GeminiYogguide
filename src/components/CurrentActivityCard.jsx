export default function CurrentActivityCard({ currentStep }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-600">Current activity</h2>
        {currentStep?.id && <span className="text-sm text-gray-500">Step ID: {currentStep.id}</span>}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div 
          className="bg-slate-100 rounded-2xl flex-shrink-0 flex items-center justify-center border border-slate-200 shadow-inner overflow-hidden"
          style={{ width: '80px', height: '80px', minWidth: '80px', minHeight: '80px' }}
        >
          <img
            src={currentStep?.pictureUrl || '/assets/images/default.jpg'}
            alt={currentStep?.stepKey || 'Step placeholder'}
            className="object-cover"
            style={{ width: '80px', height: '80px' }}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = '/assets/images/default.jpg';
            }}
          />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-5xl font-bold text-slate-950 leading-tight">
            {currentStep?.names?.english || currentStep?.names?.devanagari || "Loading Routine..."}
          </h2>
          {currentStep?.description && <p className="text-xl text-slate-600">{currentStep.description}</p>}
          {currentStep?.notes && (
            <p className="text-lg text-slate-500 italic bg-gray-50 p-4 rounded-xl border border-gray-100">
              Notes: {currentStep.notes}
            </p>
          )}

          <div className="mt-4 space-y-4">
            <span className="inline-block bg-blue-50 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Type: {currentStep?.type || "None"}
            </span>
            {currentStep?.caution && (
              <div className="bg-amber-50 text-amber-950 border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
                <p className="text-lg leading-relaxed italic font-medium">
                  <strong className="text-amber-900 not-italic">Safety:</strong> {currentStep.caution}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}