import React from 'react';
import { motion } from 'framer-motion';
import useWindowWidth from '../hooks/useWindowWidth';

const AboutPage = () => {
  const width = useWindowWidth();
  const isMobile = width < 768;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      {/* CSS-only grid background */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '100%', height: '100%',
          backgroundImage:
            'linear-gradient(rgba(255,45,45,0.04) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(255,45,45,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Dark overlay so text is legible */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 60%, #000 100%)'
        }} />
      </div>

      {/* Video Layer */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: 0.06,
          zIndex: 0,
          filter: 'hue-rotate(310deg) contrast(150%)',
          pointerEvents: 'none'
        }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-blue-lines-4122-preview.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: isMobile ? '7rem 5% 4rem' : '12rem 5% 8rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '1100px', margin: '0 auto' }}
        >
          <span className="terminal-text" style={{ color: '#ff2d2d' }}>// SYSTEM_INTEL // LOCATION: INDIA_NODE</span>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 'clamp(3rem, 8vw, 7rem)', marginTop: '1rem', marginBottom: '1rem', lineHeight: 0.9 }}>
            ENGINEER'S<br />WORKSHOP
          </h1>
          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, #ff2d2d, transparent)', marginBottom: '4rem' }} />
        </motion.div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '6rem', maxWidth: '1100px', margin: '0 auto', alignItems: 'start' }}>

          {/* Left / Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{ fontSize: '1.3rem', lineHeight: 1.6, color: 'rgba(245,245,245,0.85)', marginBottom: '2rem', borderLeft: '3px solid #ff2d2d', paddingLeft: '1.5rem' }}>
              WE ARE A SPECIALIZED SaaS DESIGN AGENCY ARCHITECTING HIGH-PERFORMANCE INTERFACES FOR THE GLOBAL TECH LANDSCAPE.
            </p>
            <p style={{ opacity: 0.6, lineHeight: 1.9, marginBottom: '2rem' }}>
              BASED IN INDIA, OUR MISSION IS TO TRANSFORM COMPLEX DATA INTO SEAMLESS DIGITAL EXPERIENCES. FROM NEURAL OPERATING SYSTEMS TO MASSIVE CLOUD DASHBOARDS, WE BUILD THE SYSTEMS THAT POWER THE FUTURE.
            </p>
            <p style={{ opacity: 0.6, lineHeight: 1.9 }}>
              WE TAKE ON 3–4 SELECT PROJECTS PER QUARTER — RAW AMBITION ONLY. ZERO COMPROMISE ON EXECUTION.
            </p>
          </motion.div>

          {/* Right / Specs Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div style={{ border: '1px solid rgba(255,45,45,0.3)', padding: '2.5rem', background: 'rgba(10,10,10,0.8)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1rem', left: '1.5rem', background: '#000', padding: '0 0.8rem' }}>
                <span className="terminal-text" style={{ color: '#ff2d2d', fontSize: '0.6rem' }}>AGENCY_SPECS_V2.0</span>
              </div>

              {[
                { label: 'NODE', value: 'MUMBAI_TERMINAL_INDIA' },
                { label: 'ENCRYPTION', value: 'AES-256-GCM' },
                { label: 'UPTIME', value: '99.98%' },
                { label: 'PROJECTS_LIVE', value: '03_DEPLOYED' },
                { label: 'RESPONSE_SLA', value: 'SUB_24H' },
                { label: 'STATUS', value: 'ACTIVE_DEPLOYMENT' },
              ].map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', borderBottom: '1px solid rgba(245,245,245,0.05)', paddingBottom: '1rem' }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', opacity: 0.4 }}>{spec.label}</span>
                  <span className="terminal-text" style={{ fontSize: '0.7rem', color: '#ff2d2d' }}>{spec.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Terminal readout panel — replaces the car thumbnail */}
            <div style={{ marginTop: '2rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,45,45,0.2)', background: '#050505', padding: '1.5rem' }}>
              <div style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,45,45,0.06) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                position: 'absolute', inset: 0,
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                {['UPLINK: ACTIVE', 'GRID_NODE: INDIA_01', 'PING: 12MS', 'BANDWIDTH: UNLIMITED'].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="terminal-text"
                    style={{ fontSize: '0.55rem', color: i % 2 === 0 ? '#ff2d2d' : 'rgba(245,245,245,0.4)', marginBottom: '0.6rem' }}
                  >
                    <span style={{ color: 'rgba(255,45,45,0.4)', marginRight: '0.5rem' }}>[{String(i).padStart(2, '0')}]</span>{line}
                  </motion.div>
                ))}
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.6rem 1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                <span className="terminal-text" style={{ fontSize: '0.55rem', color: '#ff2d2d' }}>FIELD_OF_OPERATION: INDIA_GRID_01 // GLOBAL_UPLINK</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
