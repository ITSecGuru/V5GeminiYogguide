// src/components/CurrentActivityCard.jsx
import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

// Notice we added isPreparing to the props here
const CurrentActivityCard = ({ currentStep, isPreparing }) => { 
  if (!currentStep) return null;

  const imageSrc = currentStep.pictureUrl || `/assets/images/${currentStep.id}.jpg`;
  const hasVideo = currentStep.videoUrl && currentStep.videoUrl.trim() !== "";

  return (
    <div className={`bg-white rounded-2xl shadow-sm border ${isPreparing ? 'border-amber-400' : 'border-slate-100'} p-4 md:p-6 mb-4 md:mb-6 transition-colors duration-300`}>
      
      {/* V7 PREPARATION BANNER */}
      {isPreparing && (
        <div className="mb-4 bg-amber-100 text-amber-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2 animate-pulse">
          <Clock className="w-5 h-5" />
          GET READY: Transitioning to pose...
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
        
        {/* Dynamic Media Container */}
        {hasVideo ? (
          <div 
            className="flex-shrink-0 bg-black rounded-lg overflow-hidden border border-slate-200"
            style={{ width: '160px', height: '90px' }}
          >
            <video src={currentStep.videoUrl} autoPlay controls className="w-full h-full object-cover" />
          </div>
        ) : (
          <div 
            className="flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200"
            style={{ width: '80px', height: '80px' }}
          >
            <img 
              src={imageSrc}
              alt={currentStep.names?.english || "Yoga Pose"}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/assets/images/default.jpg' }}
            />
          </div>
        )}

        {/* The Multi-Lingual Text Container */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">
            {currentStep.names?.devanagari}
          </h2>
          <h3 className="text-lg font-medium text-slate-600 mb-1">
            {currentStep.names?.roman}
          </h3>
          <p className="text-sm text-slate-500 mb-3 pb-3 border-b border-slate-100">
            {currentStep.names?.english}
          </p>

          <div className="flex items-center flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100">
              {currentStep.type === 'time' ? 'Time-Based' : 'Repetitions'}
            </span>
            <span className="text-slate-600 text-sm font-medium">
              {currentStep.type === 'time' 
                ? `${currentStep.duration} Seconds` 
                : `${currentStep.reps} Reps`}
            </span>
            {/* V7 Category Tag */}
            {currentStep.category && (
               <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-full border border-emerald-100">
                 {currentStep.category}
               </span>
            )}
          </div>

          {currentStep.caution && (
            <div className="mt-3 flex items-start gap-2 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 font-medium leading-relaxed">
                {currentStep.caution}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentActivityCard;