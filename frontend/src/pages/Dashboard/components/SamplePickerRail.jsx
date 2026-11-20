import React from 'react';
import { FiZap } from 'react-icons/fi';
import { SAMPLE_IMAGES } from '../../../constants';

export const SamplePickerRail = ({ activeSample, onSelectSample }) => {
  return (
    <div className="w-full border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-[#0a0a0a] px-6 py-2.5 flex items-center gap-4 max-sm:px-3 max-sm:py-2">
      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
        <FiZap className="text-amber-500" size={14} />
        <span>Demo Samples:</span>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto w-full py-1 scrollbar-thin">
        {SAMPLE_IMAGES.map((sample) => {
          const isSelected = activeSample?.id === sample.id;
          return (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              type="button"
              title={`${sample.name} (${sample.code})`}
              className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border text-left shrink-0 transition-all duration-150 active:scale-[0.98] ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 shadow-sm'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] hover:border-emerald-400/80 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50'
              }`}
            >
              <img
                src={sample.imagePath}
                alt={sample.code}
                className="w-11 h-11 rounded-md object-cover"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {sample.code}
                </span>
                <span className="text-[0.65rem] text-neutral-400 dark:text-neutral-500">
                  {sample.typeLabel || sample.type}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SamplePickerRail;
