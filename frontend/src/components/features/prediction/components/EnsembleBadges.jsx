import React from 'react';

export const EnsembleBadges = () => {
  return (
    <div className="p-3.5 bg-white dark:bg-[#121212] rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[0.7rem] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">
          Ensemble Consensus Verification
        </span>
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          3/3 Models Evaluated
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
          ResNet-101
        </span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">
          DenseNet-121
        </span>
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
          EfficientNet-B3
        </span>
      </div>
    </div>
  );
};

export default EnsembleBadges;
