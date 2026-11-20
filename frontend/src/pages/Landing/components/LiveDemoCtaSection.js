import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Container from '../../../components/ui/Container';

export const LiveDemoCtaSection = ({ ctaRoute, ctaText }) => {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="bg-[#171717] dark:bg-[#181818] border border-neutral-800 dark:border-green-500/30 rounded-2xl px-6 sm:px-8 py-12 text-white text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-[2.25rem] font-extrabold m-0 mb-2.5 tracking-tight text-white">
            Ready to test the Ensemble Model?
          </h2>
          <p className="text-[1.05rem] text-neutral-400 max-w-[600px] m-0 mb-6 leading-[1.6]">
            Upload any skin lesion photo to view the predicted condition and probability breakdown across all 7 categories.
          </p>
          <Button asChild variant="brand" size="lg">
            <Link to={ctaRoute}>
              {ctaText}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default LiveDemoCtaSection;
