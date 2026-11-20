import React from 'react';
import { FiDatabase } from 'react-icons/fi';
import SectionHeading from '../../../components/ui/SectionHeading';
import Container from '../../../components/ui/Container';
import {
  DATASET_STATS,
  DATASET_DISTRIBUTION,
  DATASET_METHODOLOGY,
} from '../constants/landingData';

export const DatasetSection = () => {
  return (
    <section id="dataset" className="py-12 sm:py-16 bg-white dark:bg-[#121212]">
      <Container>
        <SectionHeading
          badge="Training Corpus & Preprocessing"
          badgeIcon={FiDatabase}
          title="Trained on Kaggle's HAM10000 Dataset"
          description="10,015 multi-source dermatoscopic images processed through patient-isolated partitioning, dynamic balancing, and CLAHE normalization."
        />

        {/* Minimalist Floating Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-6 border-y border-slate-200 dark:border-[#222222] mb-8">
          {DATASET_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="text-[2rem] font-extrabold text-green-600 dark:text-green-400 tracking-tight leading-none">
                {stat.value}
              </div>
              <div className="text-[0.8125rem] text-slate-500 dark:text-slate-400 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Full-Width Class Distribution Spectrum */}
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex justify-between items-center text-[0.825rem] font-semibold text-slate-500 dark:text-slate-400">
            <span>Dataset Class Distribution (10,015 Images)</span>
            <span className="hidden sm:inline">Balanced via Dynamic Class Weighting & Augmentation</span>
          </div>
          <div className="flex h-3 rounded-md overflow-hidden bg-slate-200 dark:bg-[#262626]">
            {DATASET_DISTRIBUTION.map((item) => (
              <div
                key={item.code}
                style={{ width: item.share, background: item.color }}
                title={item.tooltip}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[0.775rem] text-slate-500 dark:text-slate-400">
            {DATASET_DISTRIBUTION.map((item) => (
              <div key={item.code} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: item.color }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connected 3-Step Milestone Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {DATASET_METHODOLOGY.map((m) => (
            <div key={m.step} className="flex flex-col gap-2">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 dark:bg-green-500/15 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 text-[0.8rem] font-extrabold mb-1">
                {m.step}
              </div>
              <h4 className="text-[1.05rem] font-bold m-0 text-slate-900 dark:text-slate-100">{m.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-[1.6] m-0">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DatasetSection;
