"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AboutHero from "./AboutHero";
import OurStory from "./OurStory";
import WhyChooseUs from "./WhyChooseUs";
import TeamSection from "./TeamSection";
import QualityStandards from "./QualityStandards";
import Title from "../../components/Title";
import Location from "./Location";

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-white">
      <Header />
      <AboutHero />
      <OurStory />
      <Title heading="Our Location" />
      <Location/>
      <WhyChooseUs />
      <QualityStandards />
      <TeamSection />
      
      <Footer />
    </div>
  );
}
