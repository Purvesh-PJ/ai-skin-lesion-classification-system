import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

export const PredictionErrorState = ({ error }) => {
  const isNetworkError =
    error.message === 'Network Error' ||
    error.code === 'ERR_NETWORK' ||
    error.code === 'ECONNABORTED';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm border ${
          isNetworkError
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400'
            : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
        }`}
      >
        {isNetworkError ? <FiRefreshCw size={28} className="animate-spin" /> : <FiAlertCircle size={32} />}
      </div>
      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg m-0">
        {isNetworkError ? 'AI Server Starting Up' : 'Analysis Failed'}
      </h4>
      <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 max-w-xs m-0 leading-relaxed">
        {isNetworkError
          ? 'The cloud ML container is initializing from sleep mode. Please try submitting again in 10-15 seconds.'
          : error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            'Unable to process image. Please verify backend connectivity and try again.'}
      </p>
    </div>
  );
};

export default PredictionErrorState;
