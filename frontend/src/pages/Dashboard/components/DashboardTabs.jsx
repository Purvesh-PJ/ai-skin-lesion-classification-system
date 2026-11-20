import React from 'react';
import { FiActivity, FiClock } from 'react-icons/fi';

export const DashboardTabs = ({ activeTab, onTabChange, hasScans }) => {
  return (
    <div className="flex items-center justify-between -mx-6 -mt-4 mb-4 px-6 py-3 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#121212]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onTabChange('analysis')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            activeTab === 'analysis'
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-emerald-500'
          }`}
        >
          <FiActivity size={14} />
          Analysis Result
        </button>

        <button
          type="button"
          onClick={() => {
            if (hasScans) onTabChange('history');
          }}
          disabled={!hasScans}
          title={hasScans ? 'View diagnostic scan history' : 'Perform an image scan to see history'}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            activeTab === 'history'
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : hasScans
              ? 'bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-emerald-500 cursor-pointer'
              : 'bg-transparent border-transparent text-neutral-400 opacity-40 cursor-not-allowed'
          }`}
        >
          <FiClock size={14} />
          See History
        </button>
      </div>
    </div>
  );
};

export default DashboardTabs;
