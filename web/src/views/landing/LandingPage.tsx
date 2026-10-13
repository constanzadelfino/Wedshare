import { useEffect } from 'react';

import { ExtrasSection } from './ExtrasSection';
import { FaqSection } from './FaqSection';
import { FeaturesSection } from './FeaturesSection';
import { FinalCtaSection } from './FinalCtaSection';
import { GuestsSection } from './GuestsSection';
import { HeroSection } from './HeroSection';
import { HowItWorksSection } from './HowItWorksSection';
import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';
import { ProposalSection } from './ProposalSection';
import { TemplatesSection } from './TemplatesSection';
import './landing.css';

// Landing de Wedshare (/), según el diseño. No carga datos: es solo presentación.
export function LandingPage() {
  useEffect(() => {
    document.title = 'Wedshare · Invitaciones digitales para casamientos';
  }, []);

  return (
    <div
      className="landing"
      style={{ width: '100%', background: '#F7F1E6', color: '#2E2418', fontFamily: "'Figtree', sans-serif" }}
    >
      <LandingHeader />
      <main>
        <HeroSection />
        <ProposalSection />
        <FeaturesSection />
        <ExtrasSection />
        <HowItWorksSection />
        <TemplatesSection />
        <GuestsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
