import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Badge } from '../../../ui';

export const ConfidenceGauge = ({ diseaseName, confidenceValue }) => {
  return (
    <>
      {/* Result Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 shrink-0">
          <FiCheckCircle size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 m-0 tracking-tight">
            {diseaseName}
          </h3>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            AI Diagnosis Output
          </span>
        </div>
        <Badge variant="medical" className="ml-auto text-sm font-bold px-3 py-1">
          {confidenceValue}% Match
        </Badge>
      </div>

      {/* Progress Bar Section */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-neutral-600 dark:text-neutral-400">
            Ensemble Confidence Score
          </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {confidenceValue}%
          </span>
        </div>
        <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${confidenceValue}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default ConfidenceGauge;
