
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AboutHero from './AboutHero';
import OurStory from './OurStory';
import WhyChooseUs from './WhyChooseUs';
import TeamSection from './TeamSection';
import QualityStandards from './QualityStandards';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AboutHero />
      <OurStory />
      <WhyChooseUs />
      <QualityStandards />
      <TeamSection />
      <Footer />
    </div>
  );
}
