import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import useWindowWidth from '../hooks/useWindowWidth';

const services = [
  { id: '01', title: 'UI/UX SYNTHESIS', depth: 'ARCHITECTURE', lore: '[NETRUNNER_PROTOCOL]', desc: 'SaaS DESIGN SYSTEMS BUILT FOR HIGH-CONVERSION USER FLOWS.' },
  { id: '02', title: 'FULL-STACK DEVELOPMENT', depth: 'SYSTEM_BUILD', lore: '[CYBERDECK_V9]', desc: 'MODERN REACT ARCHITECTURES WITH SCALABLE BACKEND CORES.' },
  { id: '03', title: 'CLOUD DEPLOYMENT', depth: 'INFRASTRUCTURE', lore: '[MILITECH_GRID]', desc: 'AUTOMATED PIPELINES AND ZERO-DOWNTIME GLOBAL DEPLOYMENTS.' },
  { id: '04', title: 'GROWTH MARKETING', depth: 'CONVERSION_ENGINE', lore: '[ARASAKA_COMMS]', desc: 'DATA-DRIVEN STRATEGIES TO SCALE YOUR SaaS TO MILLIONS.' }
];

const Services = () => {
  const { playSound } = useAudio();
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <section style={{ padding: isMobile ? '5rem 4%' : '10rem 5%', borderTop: '1px solid rgba(245,245,245,0.1)', position: 'relative', overflow: 'hidden' }}>

      {/* CSS-only atmospheric background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          width: '100%', height: '100%',
          backgroundImage: 'radial-gradient(circle, rgba(255,45,45,0.07) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          opacity: 0.8,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #000 0%, transparent 30%, transparent 70%, #000 100%)' }} />
      </div>

      {/* Circuit Video */}
      <video autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.05, filter: 'hue-rotate(180deg)', zIndex: 0, pointerEvents: 'none' }}>
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-blue-lines-4122-preview.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '5rem' }}>
          <span className="terminal-text" style={{ color: '#ff2d2d' }}>// CAPABILITIES</span>
          <h2 style={{ fontFamily: 'Anton', fontSize: '5rem', marginTop: '1rem' }}>SYSTEM MODULES</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {services.map((service) => (
            <motion.div
              key={service.id}
              onMouseEnter={() => playSound('hover')}
              className="interactive"
              whileHover={{ borderColor: '#ff2d2d' }}
              style={{
                background: '#0a0a0a',
                padding: '4rem 2rem',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(245,245,245,0.1)'
              }}
            >
              <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.1, fontFamily: 'Anton', fontSize: '8rem' }}>
                {service.id}
              </div>

              <span className="terminal-text" style={{ color: '#ff2d2d', fontSize: '0.7rem' }}>MOD_TYPE: {service.depth}</span>
              <div className="terminal-text" style={{ fontSize: '0.5rem', opacity: 0.35, marginTop: '0.3rem' }}>{service.lore}</div>
              <h3 style={{
                fontFamily: 'Anton',
                fontSize: '2.5rem',
                marginTop: '1.5rem',
                letterSpacing: '2px'
              }}>
                {service.title}
              </h3>

              <p style={{ marginTop: '1rem', opacity: 0.6, maxWidth: '80%' }}>
                {service.desc}
              </p>

              <motion.div
                style={{
                  width: '0%',
                  height: '2px',
                  background: '#ff2d2d',
                  marginTop: '2rem'
                }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
