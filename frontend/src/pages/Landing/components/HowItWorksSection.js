import React from 'react';
import { FiActivity } from 'react-icons/fi';
import SectionHeading from '../../../components/ui/SectionHeading';
import Container from '../../../components/ui/Container';
import { PIPELINE_STEPS } from '../constants/landingData';

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-white dark:bg-[#121212]">
      <Container>
        <SectionHeading
          badge="Step-by-Step Workflow"
          badgeIcon={FiActivity}
          title="How the Detection Pipeline Works"
          description="From raw dermatoscopic image ingestion to calibrated probability estimation, here is the sequential process executed by the backend on every scan."
        />

        {/* 4-Step Process Walkthrough */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
          {PIPELINE_STEPS.map((item) => (
            <div key={item.step} className="flex flex-col gap-2.5">
              <div className="text-[0.8125rem] font-extrabold tracking-wider text-green-600 dark:text-green-400 flex items-center gap-2 after:content-[''] after:flex-1 after:h-[1px] after:bg-slate-200 dark:after:bg-[#262626]">
                {item.step}
              </div>
              <h3 className="text-[1.15rem] font-bold m-0 text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-[1.6] m-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Clean Outlined Pipeline Blueprint Diagram */}
        <div className="w-full bg-[#fafafa] dark:bg-[#141414] border border-slate-200 dark:border-[#262626] rounded-2xl p-4 sm:p-6 lg:p-8 mt-8 overflow-x-auto">
          <svg viewBox="0 0 1020 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full min-w-[900px] h-auto block">
            <path d="M 130 160 L 900 160" stroke="#2a2a2a" strokeWidth="1.5" strokeDasharray="4 4" />

            <path d="M 170 160 L 220 160" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M 370 160 L 420 160" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M 420 160 L 460 90" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M 420 160 L 460 160" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M 420 160 L 460 230" stroke="#16a34a" strokeWidth="1.5" />

            <path d="M 640 90 L 680 160" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M 640 160 L 680 160" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M 640 230 L 680 160" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M 820 160 L 860 160" stroke="#16a34a" strokeWidth="1.5" />

            {/* Stage 01 */}
            <g transform="translate(30, 90)">
              <rect width="140" height="140" rx="16" fill="rgba(255,255,255,0.02)" stroke="#16a34a" strokeWidth="1.5" />
              <rect x="12" y="12" width="40" height="18" rx="9" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
              <text x="32" y="24" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="800">01</text>
              <circle cx="70" cy="65" r="22" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="70" cy="65" r="10" stroke="#4ade80" strokeWidth="1.5" />
              <text x="70" y="108" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="700">Dermoscopy Photo</text>
              <text x="70" y="124" textAnchor="middle" fill="#888888" fontSize="10">Raw RGB Image</text>
            </g>

            {/* Stage 02 */}
            <g transform="translate(230, 90)">
              <rect width="140" height="140" rx="16" fill="rgba(255,255,255,0.02)" stroke="#16a34a" strokeWidth="1.5" />
              <rect x="12" y="12" width="40" height="18" rx="9" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
              <text x="32" y="24" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="800">02</text>
              <rect x="50" y="45" width="40" height="40" rx="6" stroke="#4ade80" strokeWidth="1.5" />
              <path d="M 50 65 L 90 65" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M 70 45 L 70 85" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 2" />
              <text x="70" y="108" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="700">CLAHE & Scaling</text>
              <text x="70" y="124" textAnchor="middle" fill="#888888" fontSize="10">224 × 224 Normalization</text>
            </g>

            {/* Stage 03 */}
            <g transform="translate(460, 55)">
              <rect width="180" height="68" rx="12" fill="rgba(255,255,255,0.02)" stroke="#16a34a" strokeWidth="1.5" />
              <text x="16" y="28" fill="currentColor" fontSize="13" fontWeight="700">ResNet-101</text>
              <text x="16" y="44" fill="#888888" fontSize="10">Residual Skip Highway</text>
              <rect x="16" y="50" width="70" height="12" rx="6" fill="rgba(34,197,94,0.1)" />
              <text x="51" y="59" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">44.5M PARAMS</text>
            </g>

            <g transform="translate(460, 130)">
              <rect width="180" height="68" rx="12" fill="rgba(255,255,255,0.02)" stroke="#16a34a" strokeWidth="1.5" />
              <text x="16" y="28" fill="currentColor" fontSize="13" fontWeight="700">DenseNet-121</text>
              <text x="16" y="44" fill="#888888" fontSize="10">Dense Feature Reuse</text>
              <rect x="16" y="50" width="65" height="12" rx="6" fill="rgba(34,197,94,0.1)" />
              <text x="48" y="59" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">8.0M PARAMS</text>
            </g>

            <g transform="translate(460, 205)">
              <rect width="180" height="68" rx="12" fill="rgba(255,255,255,0.02)" stroke="#16a34a" strokeWidth="1.5" />
              <text x="16" y="28" fill="currentColor" fontSize="13" fontWeight="700">EfficientNet-B3</text>
              <text x="16" y="44" fill="#888888" fontSize="10">Compound Scaling</text>
              <rect x="16" y="50" width="70" height="12" rx="6" fill="rgba(34,197,94,0.1)" />
              <text x="51" y="59" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700">12.2M PARAMS</text>
            </g>

            {/* Stage 04 */}
            <g transform="translate(680, 90)">
              <rect width="140" height="140" rx="16" fill="rgba(255,255,255,0.02)" stroke="#16a34a" strokeWidth="1.5" />
              <rect x="12" y="12" width="40" height="18" rx="9" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
              <text x="32" y="24" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="800">04</text>
              <circle cx="70" cy="65" r="18" stroke="#4ade80" strokeWidth="1.5" />
              <text x="70" y="70" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="800">∑</text>
              <text x="70" y="108" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="700">Meta-Classifier</text>
              <text x="70" y="124" textAnchor="middle" fill="#888888" fontSize="10">Softmax Fusion</text>
            </g>

            {/* Output */}
            <g transform="translate(860, 90)">
              <rect width="130" height="140" rx="16" fill="rgba(34,197,94,0.06)" stroke="#16a34a" strokeWidth="1.5" />
              <rect x="12" y="12" width="40" height="18" rx="9" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
              <text x="32" y="24" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="800">05</text>
              <circle cx="65" cy="65" r="16" fill="rgba(34,197,94,0.2)" stroke="#16a34a" strokeWidth="1.5" />
              <text x="65" y="70" textAnchor="middle" fill="#4ade80" fontSize="13">✓</text>
              <text x="65" y="108" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="700">Diagnosis</text>
              <text x="65" y="124" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="600">7 Classes + Prob %</text>
            </g>
          </svg>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
