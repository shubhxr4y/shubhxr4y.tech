import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

const logs = [
  "INITIALIZING BOOT SEQUENCE...",
  "LOADING INTERFACE MODULES...",
  "AUTHENTICATING USER...",
  "ESTABLISHING SECURE CONNECTION...",
  "DECRYPTING CORE ASSETS...",
  "SYSTEM STATUS: OPTIMAL",
  "ACCESS GRANTED"
];

const SplashScreen = ({ onComplete }) => {
  const [currentLog, setCurrentLog] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const { playSound } = useAudio();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentLog < logs.length) {
      playSound('terminal');
      const timer = setTimeout(() => {
        setCurrentLog(prev => prev + 1);
        setProgress((prev) => (currentLog + 1) * (100 / logs.length));
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setShowEnter(true);
        playSound('boot');
      }, 500);
    }
  }, [currentLog, playSound]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5, ease: "circIn" }}
    >
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <div style={{ marginBottom: '2rem' }}>
          {logs.slice(0, currentLog + 1).map((log, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="terminal-text"
              style={{ color: index === logs.length - 1 ? '#ff2d2d' : '#f5f5f5', marginBottom: '0.5rem' }}
            >
              <span style={{ color: '#ff2d2d' }}>[ {index.toString().padStart(2, '0')} ]</span> {log}
            </motion.p>
          ))}
        </div>

        <div style={{ width: '100%', height: '2px', background: 'rgba(245,245,245,0.1)', marginBottom: '4rem' }}>
          <motion.div
            style={{ height: '100%', background: '#ff2d2d' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence>
          {showEnter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center' }}
            >
              <motion.h1 
                style={{ 
                  fontFamily: 'var(--font-header)', 
                  fontSize: '3rem', 
                  marginBottom: '2rem',
                  letterSpacing: '10px'
                }}
                animate={{ skewX: [0, -10, 10, 0], x: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 2 }}
              >
                ENGINEER'S<br/>WORKSHOP
              </motion.h1>
              
              <motion.button
                onClick={() => {
                  playSound('click');
                  onComplete();
                }}
                className="interactive"
                whileHover={{ scale: 1.05, backgroundColor: '#ff2d2d', color: '#000' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'transparent',
                  border: '2px solid #ff2d2d',
                  color: '#ff2d2d',
                  padding: '1rem 3rem',
                  fontFamily: 'var(--font-header)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontWeight: 'bold'
                }}
              >
                ENTER SYSTEM
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background UI Grid for Splash */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(circle, rgba(255,45,45,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
};

export default SplashScreen;
