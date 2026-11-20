import React from 'react';
import { FiLayers } from 'react-icons/fi';
import SectionHeading from '../../../components/ui/SectionHeading';
import Container from '../../../components/ui/Container';

export const ArchitecturesSection = () => {
  return (
    <section id="architecture" className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          badge="Multi-Model Topologies"
          badgeIcon={FiLayers}
          title="Why Ensemble Stacking?"
          description="A single convolutional neural network often exhibits inductive bias and can struggle with diverse skin phototypes. By stacking three architecturally distinct CNN backbones, our model achieves superior generalizability and consensus calibration."
        />

        <div className="flex flex-col gap-10">
          {/* Model 1: ResNet-101 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-10 items-center pb-10 border-b border-slate-200 dark:border-[#222222]">
            <div className="flex flex-col gap-3">
              <div className="flex items-center flex-wrap gap-3">
                <h3 className="text-[1.35rem] font-extrabold m-0 text-slate-900 dark:text-slate-100">ResNet-101</h3>
                <span className="inline-block px-2.5 py-0.5 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/25 rounded-full text-xs font-bold">
                  44.5M Params • Structural Specialist
                </span>
              </div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                Identity Skip Highways for Lesion Borders & Asymmetry
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-[0.925rem] leading-[1.65] m-0">
                <strong>How it works:</strong> Standard deep networks suffer from signal loss as layers get deeper.
                ResNet-101 solves this with <em>shortcut connections</em> (<code>F(x) + x</code>) that let gradients
                travel directly across 101 layers without vanishing.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-[1.6] m-0">
                <strong>Clinical Role:</strong> Melanoma and malignant tumors often have jagged, asymmetrical borders.
                ResNet’s ultra-deep receptive field is specifically tuned to detect these macro-structural contour anomalies.
              </p>
            </div>

            <div className="w-full max-w-[440px] mx-auto flex items-center justify-center">
              <svg viewBox="0 0 360 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] block">
                {/* Skip Highway Arc */}
                <path d="M 42 40 C 42 12, 277 12, 277 43" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                <rect x="110" y="4" width="100" height="16" rx="8" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
                <text x="160" y="15" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontWeight="700">Residual Skip Highway</text>

                {/* Nodes & Conv Layers */}
                <rect x="15" y="40" width="55" height="30" rx="6" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="42" y="58" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700">Input X</text>

                <path d="M 70 55 L 95 55" stroke="#16a34a" strokeWidth="1.2" />

                <rect x="95" y="40" width="60" height="30" rx="6" fill="rgba(255,255,255,0.02)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="125" y="58" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700">Conv 1</text>

                <path d="M 155 55 L 180 55" stroke="#16a34a" strokeWidth="1.2" />

                <rect x="180" y="40" width="60" height="30" rx="6" fill="rgba(255,255,255,0.02)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="210" y="58" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700">Conv 2</text>

                <path d="M 240 55 L 265 55" stroke="#16a34a" strokeWidth="1.2" />

                <circle cx="277" cy="55" r="12" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1.5" />
                <text x="277" y="60" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="800">+</text>

                <path d="M 289 55 L 310 55" stroke="#16a34a" strokeWidth="1.2" />

                <rect x="310" y="40" width="40" height="30" rx="6" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1.2" />
                <text x="330" y="58" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="800">F(x)+x</text>

                <text x="180" y="98" textAnchor="middle" fill="#888888" fontSize="8.5">
                  101 layers • Zero degradation signal propagation
                </text>
              </svg>
            </div>
          </div>

          {/* Model 2: DenseNet-121 */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-10 items-center pb-10 border-b border-slate-200 dark:border-[#222222]">
            <div className="order-2 lg:order-1 w-full max-w-[440px] mx-auto flex items-center justify-center">
              <svg viewBox="0 0 360 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] block">
                {/* Dense Links */}
                <path d="M 47 40 C 47 14, 247 14, 247 40" stroke="#4ade80" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
                <path d="M 47 70 C 47 92, 330 92, 330 72" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
                <path d="M 147 40 C 147 22, 330 22, 330 38" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                <text x="147" y="11" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontWeight="700">Dense Cross-Layer Feature Reuse</text>

                {/* Layers */}
                <rect x="20" y="40" width="55" height="30" rx="6" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="47" y="58" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700">Layer 1</text>

                <path d="M 75 55 L 120 55" stroke="#16a34a" strokeWidth="1.2" />

                <rect x="120" y="40" width="55" height="30" rx="6" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="147" y="58" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700">Layer 2</text>

                <path d="M 175 55 L 220 55" stroke="#16a34a" strokeWidth="1.2" />

                <rect x="220" y="40" width="55" height="30" rx="6" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="247" y="58" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700">Layer 3</text>

                <path d="M 275 55 L 310 55" stroke="#16a34a" strokeWidth="1.2" />

                <rect x="310" y="38" width="40" height="34" rx="6" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1.2" />
                <text x="330" y="53" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="800">[x0..x2]</text>
                <text x="330" y="64" textAnchor="middle" fill="#888888" fontSize="7">Concat</text>

                <text x="180" y="104" textAnchor="middle" fill="#888888" fontSize="8.5">
                  High parameter efficiency with direct cross-layer gradient flow
                </text>
              </svg>
            </div>

            <div className="order-1 lg:order-2 flex flex-col gap-3">
              <div className="flex items-center flex-wrap gap-3">
                <h3 className="text-[1.35rem] font-extrabold m-0 text-slate-900 dark:text-slate-100">DenseNet-121</h3>
                <span className="inline-block px-2.5 py-0.5 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/25 rounded-full text-xs font-bold">
                  8.0M Params • Texture Specialist
                </span>
              </div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                Cross-Layer Concatenation for Micro-Pigment Patterns
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-[0.925rem] leading-[1.65] m-0">
                <strong>How it works:</strong> Instead of summing outputs, every layer in DenseNet directly connects to
                <em>all subsequent layers</em> in the network. This maximizes gradient reuse and ensures no subtle details
                get lost in transit.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-[1.6] m-0">
                <strong>Clinical Role:</strong> Benign keratoses and subtle vascular spots are differentiated by tiny cellular
                pigment granules. DenseNet excels at recognizing these fine dermatoscopic texture patterns.
              </p>
            </div>
          </div>

          {/* Model 3: EfficientNet-B3 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-10 items-center pb-10 border-b border-slate-200 dark:border-[#222222]">
            <div className="flex flex-col gap-3">
              <div className="flex items-center flex-wrap gap-3">
                <h3 className="text-[1.35rem] font-extrabold m-0 text-slate-900 dark:text-slate-100">EfficientNet-B3</h3>
                <span className="inline-block px-2.5 py-0.5 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/25 rounded-full text-xs font-bold">
                  12.2M Params • Scale Specialist
                </span>
              </div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                Compound Scaling across Depth, Width & Image Resolution
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-[0.925rem] leading-[1.65] m-0">
                <strong>How it works:</strong> Rather than arbitrarily making the network deeper or wider, EfficientNet scales
                <em>Depth (d)</em>, <em>Width (w)</em>, and <em>Resolution (r)</em> simultaneously using a mathematically principled
                compound scaling coefficient.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-[1.6] m-0">
                <strong>Clinical Role:</strong> Dermatological images vary widely in zoom and lesion size. EfficientNet balances
                both macro lesion overview and micro zoom details with supreme computational speed.
              </p>
            </div>

            <div className="w-full max-w-[440px] mx-auto flex items-center justify-center">
              <svg viewBox="0 0 360 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] block">
                <text x="180" y="10" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontWeight="700">
                  Compound Coefficient Principle: α · β² · γ² ≈ 2
                </text>

                {/* Depth */}
                <rect x="25" y="30" width="48" height="42" rx="6" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="49" y="49" textAnchor="middle" fill="currentColor" fontSize="8.5" fontWeight="700">Depth</text>
                <text x="49" y="61" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontWeight="700">d = αᵠ</text>

                <path d="M 73 51 L 110 51" stroke="#16a34a" strokeWidth="1.2" />

                {/* Width */}
                <rect x="110" y="24" width="60" height="54" rx="6" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="140" y="48" textAnchor="middle" fill="currentColor" fontSize="8.5" fontWeight="700">Width</text>
                <text x="140" y="60" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontWeight="700">w = βᵠ</text>

                <path d="M 170 51 L 205 51" stroke="#16a34a" strokeWidth="1.2" />

                {/* Resolution */}
                <rect x="205" y="18" width="70" height="66" rx="6" fill="rgba(34,197,94,0.08)" stroke="#16a34a" strokeWidth="1.2" />
                <text x="240" y="48" textAnchor="middle" fill="currentColor" fontSize="8.5" fontWeight="700">Resolution</text>
                <text x="240" y="60" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontWeight="700">r = γᵠ (224px)</text>

                <path d="M 275 51 L 305 51" stroke="#16a34a" strokeWidth="1.2" />

                {/* Optimal Output */}
                <rect x="305" y="30" width="45" height="42" rx="6" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1.2" />
                <text x="327" y="49" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="800">Optimal</text>
                <text x="327" y="60" textAnchor="middle" fill="currentColor" fontSize="7.5" fontWeight="600">FLOPs</text>

                <text x="180" y="104" textAnchor="middle" fill="#888888" fontSize="8.5">
                  Unified multi-dimension scaling yields maximum feature efficiency
                </text>
              </svg>
            </div>
          </div>

          {/* Model 4: Meta-Classifier */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-10 items-center">
            <div className="order-2 lg:order-1 w-full max-w-[440px] mx-auto flex items-center justify-center">
              <svg viewBox="0 0 360 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[140px] block">
                <text x="190" y="14" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontWeight="700">
                  Supervised 2nd-Stage Logistic Consensus
                </text>

                {/* 3 CNN Inputs */}
                <rect x="15" y="16" width="76" height="20" rx="4" fill="rgba(255,255,255,0.02)" stroke="#525252" strokeWidth="1" />
                <text x="53" y="29" textAnchor="middle" fill="currentColor" fontSize="7.5">P(ResNet-101)</text>

                <rect x="15" y="45" width="76" height="20" rx="4" fill="rgba(255,255,255,0.02)" stroke="#525252" strokeWidth="1" />
                <text x="53" y="58" textAnchor="middle" fill="currentColor" fontSize="7.5">P(DenseNet-121)</text>

                <rect x="15" y="74" width="76" height="20" rx="4" fill="rgba(255,255,255,0.02)" stroke="#525252" strokeWidth="1" />
                <text x="53" y="87" textAnchor="middle" fill="currentColor" fontSize="7.5">P(EfficientNet)</text>

                {/* Weighted Synapse Arcs */}
                <path d="M 91 26 L 140 55" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M 91 55 L 140 55" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M 91 84 L 140 55" stroke="#16a34a" strokeWidth="1.5" />
                <text x="110" y="34" fill="#4ade80" fontSize="7" fontWeight="700">w₁</text>
                <text x="115" y="50" fill="#4ade80" fontSize="7" fontWeight="700">w₂</text>
                <text x="110" y="78" fill="#4ade80" fontSize="7" fontWeight="700">w₃</text>

                {/* Meta-Learner Hub */}
                <rect x="140" y="30" width="105" height="50" rx="10" fill="rgba(34,197,94,0.12)" stroke="#22c55e" strokeWidth="1.5" />
                <text x="192" y="52" textAnchor="middle" fill="#4ade80" fontSize="9.5" fontWeight="800">Meta-Learner</text>
                <text x="192" y="65" textAnchor="middle" fill="#888888" fontSize="7.5">Learned Softmax Fusion</text>

                {/* Output */}
                <path d="M 245 55 L 280 55" stroke="#22c55e" strokeWidth="1.5" />

                <rect x="280" y="35" width="65" height="40" rx="8" fill="rgba(34,197,94,0.18)" stroke="#22c55e" strokeWidth="1.2" />
                <text x="312" y="52" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="800">7 Classes</text>
                <text x="312" y="64" textAnchor="middle" fill="currentColor" fontSize="7.5" fontWeight="600">Calibrated %</text>

                <text x="180" y="104" textAnchor="middle" fill="#888888" fontSize="8.5">
                  Weighs individual model reliability per class for verified consensus
                </text>
              </svg>
            </div>

            <div className="order-1 lg:order-2 flex flex-col gap-3">
              <div className="flex items-center flex-wrap gap-3">
                <h3 className="text-[1.35rem] font-extrabold m-0 text-slate-900 dark:text-slate-100">Logistic Meta-Learner</h3>
                <span className="inline-block px-2.5 py-0.5 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/25 rounded-full text-xs font-bold">
                  Stacking Arbiter • Softmax Consensus
                </span>
              </div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                Learned Probability Weighting for Calibrated Diagnoses
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-[0.925rem] leading-[1.65] m-0">
                <strong>How it works:</strong> Rather than taking a simple unweighted average, a second-stage Logistic Regression
                meta-model learns the individual reliability and accuracy weights ($w_1, w_2, w_3$) of each CNN on validation data.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-[1.6] m-0">
                <strong>Clinical Role:</strong> In healthcare, confidence calibration is essential. The meta-learner ensures that
                when a high risk prediction like Melanoma is flagged, it is backed by calibrated multi-model consensus.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ArchitecturesSection;
