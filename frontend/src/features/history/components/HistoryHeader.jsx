import React from 'react';
import { FiDatabase, FiRefreshCw, FiTrash2 } from 'react-icons/fi';

export const HistoryHeader = ({ count, loading, onRefresh, onClearAll }) => {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="flex items-center gap-2">
        <FiDatabase className="text-emerald-600 dark:text-emerald-400" size={16} />
        <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 m-0">
          Diagnostic Scan History
        </h4>
        <span className="text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700">
          {count} Scans
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onRefresh}
          disabled={loading}
          title="Refresh records"
          className="flex items-center gap-1 px-2 py-1 text-xs font-semibold border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 bg-transparent cursor-pointer transition-colors"
        >
          <FiRefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
        {count > 0 && (
          <button
            onClick={onClearAll}
            title="Clear all history"
            className="flex items-center gap-1 px-2 py-1 text-xs font-semibold border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-red-600 hover:border-red-300 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md bg-transparent cursor-pointer transition-colors"
          >
            <FiTrash2 size={12} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryHeader;
