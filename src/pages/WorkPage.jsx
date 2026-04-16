import React from 'react';
import { motion } from 'framer-motion';
import PortfolioGrid from '../components/PortfolioGrid';

const WorkPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: '8rem' }}
    >
      <div style={{ padding: '0 5%', marginBottom: '4rem' }}>
        <span className="terminal-text" style={{ color: '#ff2d2d' }}>// DEPLOYMENT_LOG</span>
        <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(2.2rem, 8vw, 5rem)', marginTop: '1rem' }}>ALL PROJECTS</h1>
      </div>
      <PortfolioGrid />
    </motion.div>
  );
};

export default WorkPage;
