import React from 'react';
import { FiFileText } from 'react-icons/fi';

export const ConditionSummary = ({ description }) => {
  if (!description) return null;

  return (
    <div className="p-4 bg-white dark:bg-[#121212] rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        <FiFileText size={16} className="text-emerald-600 dark:text-emerald-400" />
        <span>Condition Summary & Guidance</span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed m-0">
        {description}
      </p>
    </div>
  );
};

export default ConditionSummary;
