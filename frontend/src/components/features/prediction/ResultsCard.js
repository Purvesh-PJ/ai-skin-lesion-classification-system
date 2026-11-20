import React from 'react';
import { useBackendStatus } from '../../../context';
import {
  ConfidenceGauge,
  EnsembleBadges,
  ConditionSummary,
  PredictionEmptyState,
  PredictionLoadingState,
  PredictionErrorState,
} from './components';

export const ResultsCard = ({ predictionResult, loading, error }) => {
  const { isWakingUp } = useBackendStatus();

  if (loading) {
    return <PredictionLoadingState isWakingUp={isWakingUp} />;
  }

  if (error) {
    return <PredictionErrorState error={error} />;
  }

  if (predictionResult) {
    const diseaseName = predictionResult.disease_details?.name || predictionResult.predicted_disease;
    const description = predictionResult.disease_details?.description || null;
    const confidenceValue = parseInt(predictionResult.confidence || '0', 10);

    return (
      <div className="bg-neutral-50 dark:bg-[#181818] border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-6 flex-1 overflow-y-auto flex flex-col gap-4 animate-in fade-in duration-300">
        <ConfidenceGauge diseaseName={diseaseName} confidenceValue={confidenceValue} />

        <ConditionSummary description={description} />

        <EnsembleBadges />

        {/* Scan Details */}
        {predictionResult.filename && (
          <div className="p-3 bg-white dark:bg-[#121212] rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between text-xs">
            <span className="font-medium text-neutral-400 dark:text-neutral-500">
              Analyzed Scan
            </span>
            <span className="font-semibold text-neutral-700 dark:text-neutral-300 truncate max-w-[200px]">
              {predictionResult.filename}
            </span>
          </div>
        )}
      </div>
    );
  }

  return <PredictionEmptyState />;
};

export default ResultsCard;
