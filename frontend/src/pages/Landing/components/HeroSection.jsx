import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { CORE_PILLARS } from '../constants/landingData';

export const HeroSection = ({ ctaRoute, ctaText }) => {
  return (
    <section className="relative px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12 max-w-[1240px] mx-auto flex flex-col items-center text-center">
      {/* Hero glow ambient overlay */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[480px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0) 75%)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center w-full max-w-[1240px] relative z-10 mb-8 text-center lg:text-left">
        {/* Left Column: Hero Content */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-[#181818] border border-green-200 dark:border-green-500/30 rounded-full text-green-700 dark:text-green-400 text-[0.8125rem] font-semibold mb-5 shadow-sm relative z-10">
            <img src="/logo.svg" alt="Skin Lesion AI Logo" className="w-4 h-4 object-contain" />
            <span>Dermatological AI Research • Ensemble Deep Learning</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[3.15rem] font-extrabold leading-[1.15] tracking-tight max-w-[680px] mb-4 text-slate-900 dark:text-slate-50 relative z-10">
            Skin Disease Classification via{' '}
            <span className="text-green-600 dark:text-green-400">Ensemble Deep Learning</span>
          </h1>

          <p className="text-[1.1rem] leading-[1.65] text-slate-600 dark:text-slate-400 max-w-[620px] mb-6 relative z-10">
            An academic machine learning project designed to assist in early skin disease screening.
            Trained on 10,015 dermatoscopic images from Kaggle's HAM10000 benchmark, our system combines three
            distinct deep CNN topologies with a logistic stacking layer to detect and categorize 7 skin conditions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto relative z-10">
            <Button asChild variant="brand" size="lg" className="w-full sm:w-auto">
              <Link to={ctaRoute}>
                {ctaText}
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
        </div>

        {/* Right Column: Disease + AI Dermoscopy Scanner Visual SVG */}
        <div className="flex justify-center items-center w-full relative">
          <div className="w-full max-w-[500px]">
            <svg viewBox="0 0 460 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
              <defs>
                <linearGradient id="aiPulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>

                <linearGradient id="lesionMelanomaGrad" x1="20%" y1="20%" x2="80%" y2="80%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                  <stop offset="45%" stopColor="#991b1b" />
                  <stop offset="100%" stopColor="#450a0a" />
                </linearGradient>

                <radialGradient id="reticleRadar" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* HUD Tech Corner Brackets */}
              <path d="M 18 36 L 18 18 L 36 18" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
              <path d="M 424 18 L 442 18 L 442 36" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
              <path d="M 18 335 L 18 353 L 36 353" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
              <path d="M 424 353 L 442 353 L 442 335" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />

              {/* Header HUD Status Bar */}
              <circle cx="34" cy="30" r="4" fill="#22c55e" />
              <circle cx="34" cy="30" r="7" stroke="#22c55e" strokeWidth="1" opacity="0.4" />
              <text x="48" y="34" fill="currentColor" fontSize="10" fontWeight="700" letterSpacing="0.06em">
                DERMOSCOPIC AI SCANNER
              </text>
              <rect x="336" y="20" width="88" height="20" rx="4" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.35)" strokeWidth="1" />
              <text x="380" y="33" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="800">
                HAM10000 AI
              </text>

              {/* Background Tech Grid Lines */}
              <line x1="40" y1="85" x2="420" y2="85" stroke="rgba(34,197,94,0.08)" strokeDasharray="3 3" />
              <line x1="40" y1="145" x2="420" y2="145" stroke="rgba(34,197,94,0.08)" strokeDasharray="3 3" />
              <line x1="40" y1="205" x2="420" y2="205" stroke="rgba(34,197,94,0.08)" strokeDasharray="3 3" />
              <line x1="40" y1="265" x2="420" y2="265" stroke="rgba(34,197,94,0.08)" strokeDasharray="3 3" />

              {/* Main Dermatoscope Inspection Reticle Circle (Centered at (230, 175)) */}
              <circle cx="230" cy="175" r="92" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.75" />
              <circle cx="230" cy="175" r="78" stroke="rgba(34,197,94,0.2)" strokeWidth="1" />
              <circle cx="230" cy="175" r="92" fill="url(#reticleRadar)" />

              {/* Reticle Crosshairs with Degree Marks */}
              <line x1="125" y1="175" x2="335" y2="175" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
              <line x1="230" y1="70" x2="230" y2="280" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
              <text x="230" y="78" textAnchor="middle" fill="#4ade80" fontSize="7" fontWeight="700">0°</text>
              <text x="328" y="178" textAnchor="middle" fill="#4ade80" fontSize="7" fontWeight="700">90°</text>
              <text x="230" y="274" textAnchor="middle" fill="#4ade80" fontSize="7" fontWeight="700">180°</text>
              <text x="132" y="178" textAnchor="middle" fill="#4ade80" fontSize="7" fontWeight="700">270°</text>

              {/* Organic Skin Lesion (Disease Feature) */}
              <path
                d="M 212 144 C 236 130, 258 140, 265 158 C 273 178, 256 204, 238 210 C 216 216, 194 202, 198 178 C 200 158, 198 152, 212 144 Z"
                fill="url(#lesionMelanomaGrad)"
                stroke="#991b1b"
                strokeWidth="1.5"
              />
              {/* Granular Pigment Micro-structures */}
              <circle cx="225" cy="164" r="2" fill="#450a0a" />
              <circle cx="244" cy="172" r="2.5" fill="#450a0a" />
              <circle cx="232" cy="187" r="2" fill="#450a0a" />
              <circle cx="216" cy="180" r="2" fill="#7f1d1d" />

              {/* AI Boundary Segmentation / Computer Vision Tracking Polygon */}
              <polygon
                points="206,138 238,128 264,138 272,160 266,198 238,216 208,212 190,190 192,160"
                fill="rgba(34,197,94,0.06)"
                stroke="#22c55e"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Active Tracking Vertices */}
              <rect x="204" y="136" width="4" height="4" fill="#4ade80" />
              <rect x="236" y="126" width="4" height="4" fill="#4ade80" />
              <rect x="262" y="136" width="4" height="4" fill="#4ade80" />
              <rect x="270" y="158" width="4" height="4" fill="#4ade80" />
              <rect x="264" y="196" width="4" height="4" fill="#4ade80" />
              <rect x="236" y="214" width="4" height="4" fill="#4ade80" />
              <rect x="206" y="210" width="4" height="4" fill="#4ade80" />
              <rect x="188" y="188" width="4" height="4" fill="#4ade80" />

              {/* Multi-CNN Neural Nodes Overlay */}
              {/* ResNet-101 Node */}
              <g transform="translate(28, 75)">
                <rect width="98" height="32" rx="7" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="10" y="16" fill="currentColor" fontSize="10" fontWeight="700">ResNet-101</text>
                <text x="10" y="26" fill="#4ade80" fontSize="8" fontWeight="600">Skip Highway</text>
              </g>
              <path d="M 126 91 C 156 91, 185 134, 206 138" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="3 3" />

              {/* DenseNet-121 Node */}
              <g transform="translate(28, 245)">
                <rect width="102" height="32" rx="7" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="10" y="16" fill="currentColor" fontSize="10" fontWeight="700">DenseNet-121</text>
                <text x="10" y="26" fill="#4ade80" fontSize="8" fontWeight="600">Feature Reuse</text>
              </g>
              <path d="M 130 261 C 158 261, 185 216, 206 210" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="3 3" />

              {/* EfficientNet-B3 Node */}
              <g transform="translate(325, 75)">
                <rect width="105" height="32" rx="7" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="10" y="16" fill="currentColor" fontSize="10" fontWeight="700">EfficientNet-B3</text>
                <text x="10" y="26" fill="#4ade80" fontSize="8" fontWeight="600">Compound Scale</text>
              </g>
              <path d="M 325 91 C 295 91, 280 134, 264 138" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="3 3" />

              {/* Meta-Classifier Stacking Node */}
              <g transform="translate(310, 235)">
                <rect width="120" height="42" rx="9" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1.5" />
                <text x="10" y="17" fill="#4ade80" fontSize="10" fontWeight="800">Logistic Stacking</text>
                <text x="10" y="30" fill="currentColor" fontSize="9" fontWeight="600">7-Class Softmax</text>
                <circle cx="104" cy="21" r="7" fill="rgba(34,197,94,0.25)" />
                <text x="104" y="25" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="800">∑</text>
              </g>
              <path d="M 266 198 C 282 210, 292 235, 310 255" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Bottom Diagnostic HUD Status Strip */}
              <g transform="translate(26, 312)">
                <rect width="408" height="28" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(34,197,94,0.25)" strokeWidth="1" />
                <text x="12" y="18" fill="#888888" fontSize="9">Diagnostic Scope:</text>
                <text x="106" y="18" fill="#4ade80" fontSize="9" fontWeight="700">7 Disease Classes • Stacking Consensus</text>
                <text x="396" y="18" textAnchor="end" fill="#22c55e" fontSize="9" fontWeight="700">✓ READY</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of the Project */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-[1040px] mt-4 relative z-10">
        {CORE_PILLARS.map((pillar) => {
          const PillarIcon = pillar.icon;
          return (
            <div key={pillar.title} className="flex items-center gap-3 py-2 text-left">
              <div className="text-green-600 dark:text-green-400 text-xl shrink-0">
                <PillarIcon />
              </div>
              <div className="flex flex-col">
                <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">{pillar.title}</strong>
                <span className="text-[0.75rem] text-slate-500 dark:text-slate-400">{pillar.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
