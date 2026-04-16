import React from 'react';
import { motion } from 'framer-motion';

const items = [
  "SaaS_INTERFACE_DESIGN",
  "NEURAL_UX_SYSTEMS",
  "FULL_STACK_DEPLOYMENT",
  "CLOUD_PLATFORM_BUILD",
  "GROWTH_MARKETING_LOGIC",
  "CONVERSION_OPTIMIZED_UI"
];

const ServicesTicker = () => {
  return (
    <div className="ticker-container" style={{ margin: '4rem 0' }}>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ display: 'flex' }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="ticker-item">
            <span style={{ color: '#ff2d2d' }}>//</span> {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ServicesTicker;
