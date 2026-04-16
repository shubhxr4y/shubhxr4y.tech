import React from 'react';
import Hero from '../components/Hero';
import StatsBarAlpha from '../components/StatsBarAlpha';
import ServicesTicker from '../components/ServicesTicker';
import StrategicValue from '../components/StrategicValue';
import PortfolioGrid from '../components/PortfolioGrid';
import TestimonialGrid from '../components/TestimonialGrid';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  return (
    <>
      <Hero />
      <StatsBarAlpha />
      <StrategicValue />
      <ServicesTicker />
      <PortfolioGrid />
      <TestimonialGrid />
      <Services />
      <ContactForm />
    </>
  );
};

export default HomePage;
