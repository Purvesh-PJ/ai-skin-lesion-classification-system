import React from 'react';
import { ROUTES } from '../../constants';
import LandingNavbar from '../../components/layout/LandingNavbar';
import {
  HeroSection,
  HowItWorksSection,
  ArchitecturesSection,
  DatasetSection,
  ConditionsSection,
  LimitationsSection,
  LiveDemoCtaSection,
  LandingFooter,
} from './components';

const Landing = () => {
  const ctaRoute = ROUTES.DASHBOARD;
  const ctaText = 'Try Image Detection';

  return (
    <div id="overview" className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Top Navigation */}
      <LandingNavbar />

      {/* SECTION 1: HERO & PROJECT INTRODUCTION */}
      <HeroSection ctaRoute={ctaRoute} ctaText={ctaText} />

      {/* SECTION 2: HOW IT WORKS (END-TO-END DATA FLOW) */}
      <HowItWorksSection />

      {/* SECTION 3: DEEP ENSEMBLE AI ARCHITECTURES */}
      <ArchitecturesSection />

      {/* SECTION 4: DATASET & TRAINING METHODOLOGY */}
      <DatasetSection />

      {/* SECTION 5: 7 SUPPORTED SKIN CONDITIONS */}
      <ConditionsSection />

      {/* SECTION 6: PROJECT SCOPE & AI LIMITATIONS */}
      <LimitationsSection />

      {/* SECTION 7: LIVE DEMO CTA */}
      <LiveDemoCtaSection ctaRoute={ctaRoute} ctaText={ctaText} />

      {/* Minimalist Clean Footer */}
      <LandingFooter />
    </div>
  );
};

export default Landing;
