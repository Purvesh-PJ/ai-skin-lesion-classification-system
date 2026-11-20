import React from 'react';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import { formatDate, getCategoryClass } from '../utils/formatters';

const CATEGORY_BADGE_CLASSES = {
  malignant: 'bg-red-500/15 text-red-500 border-red-500/30',
  precancerous: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
  benign: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
};

export const HistoryItem = ({ item, onDelete }) => {
  const category = getCategoryClass(item.predicted_disease);
  const badgeClass = CATEGORY_BADGE_CLASSES[category] || CATEGORY_BADGE_CLASSES.benign;

  return (
    <div
      className="bg-neutral-50 dark:bg-[#181818] border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl p-3 flex items-center justify-between gap-3 hover:border-emerald-500/80 hover:bg-white dark:hover:bg-[#1c1c1c] transition-all duration-150"
    >
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100 capitalize">
            {item.disease_details?.name || item.predicted_disease}
          </span>
          <span
            className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${badgeClass}`}
          >
            {category}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
          <span className="flex items-center gap-1">
            <FiClock size={11} />
            {formatDate(item.created_at)}
          </span>
          {item.filename && (
            <span className="truncate max-w-[140px]" title={item.filename}>
              • {item.filename}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
          {item.confidence}%
        </span>
        <span className="text-[0.65rem] uppercase text-neutral-400 tracking-wider">
          Confidence
        </span>
      </div>

      <button
        onClick={(e) => onDelete(item._id, e)}
        title="Delete scan record"
        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors bg-transparent border-none cursor-pointer"
      >
        <FiTrash2 size={15} />
      </button>
    </div>
  );
};

export default HistoryItem;
