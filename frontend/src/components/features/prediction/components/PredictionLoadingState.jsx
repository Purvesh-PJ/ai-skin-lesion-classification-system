import React from 'react';
import { Spinner } from '../../../ui';

export const PredictionLoadingState = ({ isWakingUp }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 animate-in fade-in">
      <Spinner size="lg" />
      <h4 className="mt-5 font-semibold text-neutral-800 dark:text-neutral-200 text-base m-0">
        {isWakingUp ? 'Warming Up Cloud ML Engine...' : 'Analyzing Skin Lesion...'}
      </h4>
      <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500 m-0 leading-relaxed">
        {isWakingUp
          ? 'Cloud container is spinning up from idle (~15-20s). Your diagnosis will appear automatically.'
          : 'Running ensemble deep neural network inference'}
      </p>
    </div>
  );
};

export default PredictionLoadingState;
