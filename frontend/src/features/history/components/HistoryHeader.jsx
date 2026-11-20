import React from 'react';
import { FiDatabase, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import Button from '../../../components/ui/Button';

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
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          title="Refresh records"
          className="h-7 px-2 text-xs font-semibold border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <FiRefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </Button>
        {count > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            title="Clear all history"
            className="h-7 px-2 text-xs font-semibold border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-red-600 hover:border-red-300 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <FiTrash2 size={12} />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default HistoryHeader;
