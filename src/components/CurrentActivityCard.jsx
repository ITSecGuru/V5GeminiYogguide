// src/components/CurrentActivityCard.jsx
export default function CurrentActivityCard({ currentStep }) {
  if (!currentStep) return null;

  const baseUrl = import.meta.env.BASE_URL;
  
  // Define both your dynamic path and your fallback path
  const imageSrc = currentStep.image || `${baseUrl}assets/images/${currentStep.id}.jpg`;
  const fallbackSrc = `${baseUrl}assets/images/default.jpg`;

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-700">Current activity</h3>
        <span className="text-xs text-gray-400">Step ID: {currentStep.id}</span>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* The Image Wrapper */}
        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-300 shadow-inner">
          <img 
            src={imageSrc} 
            alt={currentStep.names?.english || 'Yoga Posture'} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Stop infinite loops if default.jpg is also missing
              e.target.onerror = null; 
              // Swap to the default image!
              e.target.src = fallbackSrc; 
            }}
          />
        </div>
        
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            {currentStep.names?.english || currentStep.names?.devanagari}
          </h2>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold tracking-wider rounded-full uppercase">
            TYPE: {currentStep.type}
          </span>
        </div>
      </div>
    </div>
  );
}