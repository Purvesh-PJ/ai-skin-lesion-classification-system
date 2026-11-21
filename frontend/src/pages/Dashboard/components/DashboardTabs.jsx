import React from 'react';
import { FiActivity, FiClock } from 'react-icons/fi';
import Button from '../../../components/ui/Button';

export const DashboardTabs = ({ activeTab, onTabChange, hasScans }) => {
  const getHistoryTabClass = () => {
    if (activeTab === 'history') {
      return 'bg-emerald-600 border-emerald-600 text-white';
    }
    if (hasScans) {
      return 'bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-emerald-500 cursor-pointer';
    }
    return 'bg-transparent border-transparent text-neutral-400 opacity-40 cursor-not-allowed';
  };

  return (
    <div className="flex items-center justify-between -mx-6 -mt-4 mb-4 px-6 py-3 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#121212]">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="sm"
          onClick={() => onTabChange('analysis')}
          className={`h-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            activeTab === 'analysis'
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-emerald-500'
          }`}
        >
          <FiActivity size={14} />
          Analysis Result
        </Button>

        <Button
          type="button"
          size="sm"
          onClick={() => {
            if (hasScans) onTabChange('history');
          }}
          disabled={!hasScans}
          title={hasScans ? 'View diagnostic scan history' : 'Perform an image scan to see history'}
          className={`h-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${getHistoryTabClass()}`}
        >
          <FiClock size={14} />
          See History
        </Button>
      </div>
    </div>
  );
};

export default DashboardTabs;
