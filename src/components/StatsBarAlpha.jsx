import React from 'react';
import { motion } from 'framer-motion';
import useWindowWidth from '../hooks/useWindowWidth';

const stats = [
  { label: 'PLATFORMS_DEPLOYED', value: '142+' },
  { label: 'SYSTEM_UPTIME', value: '99.9%' },
  { label: 'USER_NODES', value: '2M+' },
  { label: 'CONVERSION_LIFT', value: '40%' }
];

const StatsBarAlpha = () => {
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
      gap: isMobile ? '2rem' : '0',
      padding: isMobile ? '3rem 5%' : '4rem 5%',
      borderBottom: '1px solid rgba(245,245,245,0.1)',
      backgroundColor: '#000'
    }}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ 
            fontFamily: 'Anton', 
            fontSize: isMobile ? '2.5rem' : '4rem', 
            color: '#f5f5f5',
            lineHeight: 1
          }}>
            {stat.value}
          </div>
          <div className="terminal-text" style={{ 
            marginTop: '0.5rem', 
            color: '#ff2d2d',
            opacity: 0.8,
            fontSize: isMobile ? '0.5rem' : undefined
          }}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsBarAlpha;
