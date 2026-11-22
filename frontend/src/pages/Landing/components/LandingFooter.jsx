import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Container from '../../../components/ui/Container';

export const LandingFooter = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-[#1f1f1f] bg-white dark:bg-[#121212] py-10">
      <Container className="flex flex-col sm:flex-row justify-between items-center flex-wrap gap-4 text-center sm:text-left">
        <div>
          <div className="font-bold text-base text-slate-900 dark:text-slate-100">
            AI Skin Lesion Classification System
          </div>
          <div className="text-[0.825rem] text-slate-500 dark:text-slate-400 mt-1">
            Deep Learning Ensemble (ResNet-101 + DenseNet-121 + EfficientNet-B3) on HAM10000.
          </div>
        </div>

        <div className="flex items-center gap-4 text-[0.825rem] text-slate-500 dark:text-slate-400">
          <span>Educational ML Project</span>
          <span>•</span>
          <a
            href="https://github.com/Purvesh-PJ/ai-skin-lesion-classification-system"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-green-600 dark:text-green-500 font-semibold hover:underline"
          >
            GitHub Repository
            <FiExternalLink size={12} />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default LandingFooter;
