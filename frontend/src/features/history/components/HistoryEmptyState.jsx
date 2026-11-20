import React from 'react';
import { FiLayers } from 'react-icons/fi';

export const HistoryEmptyState = () => {
  return (
    <div className="p-6 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-[#181818] flex flex-col items-center gap-2">
      <FiLayers size={24} className="text-emerald-600 dark:text-emerald-400" />
      <p className="m-0 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        No scans recorded yet
      </p>
      <span className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
        Upload an image or pick a demo benchmark from the bottom rail to record a diagnostic scan!
      </span>
    </div>
  );
};

export default HistoryEmptyState;
