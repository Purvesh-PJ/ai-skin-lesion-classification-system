import React, { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import SectionHeading from '../../../components/ui/SectionHeading';
import Container from '../../../components/ui/Container';
import { ALL_CONDITIONS } from '../constants/landingData';

export const ConditionsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredConditions =
    selectedFilter === 'all'
      ? ALL_CONDITIONS
      : ALL_CONDITIONS.filter((c) => c.category === selectedFilter);

  const filterTabs = [
    { id: 'all', label: 'All Conditions (7)' },
    { id: 'malignant', label: 'Malignant (2)', bulletColor: 'text-red-500' },
    { id: 'precancer', label: 'Pre-Cancerous (1)', bulletColor: 'text-amber-500' },
    { id: 'benign', label: 'Benign (4)', bulletColor: 'text-green-500' },
  ];

  return (
    <section id="conditions" className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          badge="Diagnostic Scope"
          badgeIcon={FiCheckCircle}
          title="7 Supported Skin Disease Conditions"
          description="Classified across 3 clinical risk tiers from high-priority malignant tumors to harmless benign growths."
        />

        {/* Minimalist Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-[0.825rem] font-semibold transition-colors flex items-center gap-1.5 border ${
                selectedFilter === tab.id
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#262626] hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {tab.bulletColor && <span className={tab.bulletColor}>●</span>}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Condition Rows */}
        <div className="flex flex-col">
          {filteredConditions.map((cond) => (
            <div
              key={cond.code}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-2 md:gap-6 items-center py-4 border-b border-slate-200 dark:border-[#222222] first:border-t"
            >
              <div className="flex items-center justify-start">
                <span
                  className="text-[0.775rem] font-extrabold px-2.5 py-1 rounded-full uppercase"
                  style={{
                    backgroundColor: `${cond.riskColor}15`,
                    color: cond.riskColor,
                    border: `1px solid ${cond.riskColor}35`,
                  }}
                >
                  {cond.code}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="text-base font-bold m-0 text-slate-900 dark:text-slate-100">{cond.name}</h4>
                <p className="text-[0.85rem] text-slate-600 dark:text-slate-400 leading-[1.5] m-0">{cond.description}</p>
              </div>
              <div className="flex items-center justify-start md:justify-end">
                <span
                  className="text-[0.75rem] font-bold px-3 py-1 rounded-full whitespace-nowrap"
                  style={{
                    backgroundColor: `${cond.riskColor}12`,
                    color: cond.riskColor,
                    border: `1px solid ${cond.riskColor}30`,
                  }}
                >
                  {cond.riskText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ConditionsSection;
