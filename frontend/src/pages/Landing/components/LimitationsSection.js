import React from 'react';
import { FiShield } from 'react-icons/fi';
import SectionHeading from '../../../components/ui/SectionHeading';
import Container from '../../../components/ui/Container';
import { PROJECT_LIMITATIONS } from '../constants/landingData';

export const LimitationsSection = () => {
  return (
    <section id="transparency" className="py-12 sm:py-16 bg-white dark:bg-[#121212]">
      <Container>
        <SectionHeading
          badge="Project Transparency"
          badgeIcon={FiShield}
          title="Project Scope & AI Limitations"
          description="Technical considerations regarding how this deep learning tool was engineered and how its outputs should be interpreted."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 py-6 border-t border-slate-200 dark:border-[#222222]">
          {PROJECT_LIMITATIONS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col gap-2">
                <div className={`${item.iconColorClass} flex items-center gap-2`}>
                  <Icon size={18} />
                  <h4 className="text-base font-bold m-0 text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-[1.6] m-0">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default LimitationsSection;
