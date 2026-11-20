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
      <LandingNavbar />
      <HeroSection ctaRoute={ctaRoute} ctaText={ctaText} />
      <HowItWorksSection />
      <ArchitecturesSection />
      <DatasetSection />
      <ConditionsSection />
      <LimitationsSection />
      <LiveDemoCtaSection ctaRoute={ctaRoute} ctaText={ctaText} />
      <LandingFooter />
    </div>
  );
};

export default Landing;
