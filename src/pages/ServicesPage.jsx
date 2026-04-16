import React from 'react';
import { motion } from 'framer-motion';
import Services from '../components/Services';

const ServicesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: '8rem' }}
    >
      <div style={{ padding: '0 5%', marginBottom: '4rem', maxWidth: '800px' }}>
        <span className="terminal-text" style={{ color: '#ff2d2d' }}>// MODULE_SPECS</span>
        <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2.2rem, 8vw, 5rem)', marginTop: '1rem' }}>SaaS SOLUTIONS</h1>
        <p style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.7, lineHeight: 1.6 }}>
          WE PROVIDE END-TO-END DESIGN SOLUTIONS FOR THE NEXT GENERATION OF SaaS PLATFORMS. OUR MODULES ARE ENGINEERED FOR SCALE, PERFORMANCE, AND SUPREME USER EXPERIENCE.
        </p>
      </div>
      <Services />
    </motion.div>
  );
};

export default ServicesPage;
