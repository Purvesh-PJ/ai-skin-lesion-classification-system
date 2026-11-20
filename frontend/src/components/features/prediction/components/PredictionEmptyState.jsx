import React from 'react';
import { FiShield } from 'react-icons/fi';

export const PredictionEmptyState = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 mb-4 shadow-sm">
        <FiShield size={32} />
      </div>
      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg m-0">
        No Diagnostic Data
      </h4>
      <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 max-w-xs m-0 leading-relaxed">
        Upload a skin lesion image on the left panel to execute multi-model ensemble analysis.
      </p>
    </div>
  );
};

export default PredictionEmptyState;
