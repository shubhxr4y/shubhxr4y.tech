import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { Volume2, VolumeX, Calendar } from 'lucide-react';
import useWindowWidth from '../hooks/useWindowWidth';
import logoImg from '../assets/images/logo.webp';

const MainLayout = ({ children }) => {
  const { isMuted, toggleMute, playSound } = useAudio();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="main-interface"
      style={{ position: 'relative', width: '100%', minHeight: '100vh' }}
    >
      {/* Global Noise Overlay */}
      <div className="noise-overlay"></div>

      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: isMobile ? '1rem 1.2rem' : '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'linear-gradient(to bottom, #000 0%, transparent 100%)'
      }}>
        <Link 
          to="/" 
          onClick={() => playSound('click')}
          className="interactive"
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}
        >
          <img
            src={logoImg}
            alt="Engineer's Workshop Logo"
            style={{
              height: isMobile ? '30px' : '38px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              mixBlendMode: 'screen', // This removes the black background
            }}
          />
          <span className="impact-text" style={{ 
            letterSpacing: '2px', 
            fontSize: isMobile ? '1rem' : '1.5rem',
          }}>
            ENGINEER'S {!isMobile && 'WORKSHOP'}
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', marginRight: isMobile ? '0.5rem' : '2rem' }}>
            {['ABOUT', 'SERVICES', 'WORK'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="interactive terminal-text"
                style={{ 
                  textDecoration: 'none', 
                  color: 'var(--white)', 
                  fontSize: isMobile ? '0.6rem' : '0.7rem',
                  opacity: 0.7
                }}
              >
                {item}
              </Link>
            ))}
          </div>

          {!isTablet && (
            <div className="terminal-text" style={{ marginRight: '2rem', opacity: 0.5, fontSize: '0.6rem' }}>
              [ {time} ] // LOC: GLOBAL_GRID_01
            </div>
          )}

          <button 
            onClick={() => {
              toggleMute();
              playSound('click');
            }}
            className="interactive"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--white)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </nav>
      </header>

      <main>{children}</main>

      <motion.button
        className="fab-booking interactive"
        onClick={() => {
          playSound('click');
          navigate('/book');
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Calendar size={18} style={{ marginRight: '10px' }} /> BOOK SYNC
      </motion.button>

      <footer style={{
        padding: isMobile ? '2rem 1.2rem' : '4rem 2rem',
        borderTop: '1px solid rgba(245,245,245,0.1)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        gap: isMobile ? '1rem' : '0',
        fontFamily: 'var(--font-mono)',
        fontSize: isMobile ? '0.55rem' : '0.7rem',
        color: 'rgba(245,245,245,0.5)'
      }}>
        <div>
           <span>© 2026 ENGINEER'S WORKSHOP // SaaS_CORE_V2.0</span><br/>
           <span style={{ color: '#ff2d2d' }}>TRANSFORMING COMPLEXITY INTO CONVERSION.</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span>LATENCY: 12MS // STATUS: CONNECTED</span><br/>
          <span>ENCRYPTION: AES-256-GCM</span>
        </div>
      </footer>
    </motion.div>
  );
};

export default MainLayout;
