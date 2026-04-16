import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../hooks/useWindowWidth';

// ── subtle noise-pattern canvas for the bg texture ──────────────────────────
const NoiseCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const draw = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i]     = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = Math.random() * 18; // very subtle
      }
      ctx.putImageData(imageData, 0, 0);
    };
    draw();
    const id = setInterval(draw, 80);
    return () => clearInterval(id);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
};

// ── animated glitch stripe ───────────────────────────────────────────────────
const GlitchStripe = () => (
  <motion.div
    animate={{ scaleX: [1, 1.02, 0.98, 1], opacity: [0, 0.35, 0, 0.35, 0] }}
    transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 4.5 }}
    style={{
      position: 'absolute', left: 0, width: '100%', height: '3px',
      top: '48%', background: 'rgba(255,45,45,0.6)',
      zIndex: 20, pointerEvents: 'none',
    }}
  />
);

// ── scanline sweep ───────────────────────────────────────────────────────────
const ScanSweep = () => (
  <motion.div
    animate={{ top: ['-2%', '102%'] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
    style={{
      position: 'absolute', left: 0, width: '100%', height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(255,45,45,0.25), transparent)',
      zIndex: 20, pointerEvents: 'none',
    }}
  />
);

// ── corner HUD bracket ───────────────────────────────────────────────────────
const Corner = ({ pos }) => {
  const s = {
    tl: { top: 0, left: 0 }, tr: { top: 0, right: 0 },
    bl: { bottom: 0, left: 0 }, br: { bottom: 0, right: 0 },
  }[pos];
  const isRight = pos.includes('r');
  const isBottom = pos.includes('b');
  return (
    <div style={{ position: 'absolute', ...s, width: 20, height: 20 }}>
      <div style={{ position: 'absolute', top: isBottom ? 'auto' : 0, bottom: isBottom ? 0 : 'auto',
        left: isRight ? 'auto' : 0, right: isRight ? 0 : 'auto',
        width: 20, height: 2, background: '#ff2d2d' }} />
      <div style={{ position: 'absolute', top: isBottom ? 'auto' : 0, bottom: isBottom ? 0 : 'auto',
        left: isRight ? 'auto' : 0, right: isRight ? 0 : 'auto',
        width: 2, height: 20, background: '#ff2d2d' }} />
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
const Hero = () => {
  const { playSound } = useAudio();
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const BIG_TEXT_STYLE = {
    fontFamily: "'Anton', sans-serif",
    fontSize: 'clamp(7rem, 17vw, 17rem)',
    lineHeight: 0.88,
    textTransform: 'uppercase',
    letterSpacing: '-0.01em',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  return (
    <section
      id="hero"
      style={{
        height: '100vh', minHeight: 600,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* ── Background texture ── */}
      <NoiseCanvas />

      {/* ── Subtle radial red glow behind character ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '80vh',
        background: 'radial-gradient(ellipse at center, rgba(255,45,45,0.09) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* ── Animated effects ── */}
      <GlitchStripe />
      <ScanSweep />

      {/* ══════════════════════════════════════════════════
           BIG BACKGROUND TYPOGRAPHY — truly centered, clips both sides
      ══════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2, pointerEvents: 'none',
        overflow: 'hidden',
        gap: '0.5rem',
      }}>
        {/* Row 1: "ENGINEER" — red fill */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'circOut', delay: 0.1 }}
          style={{ lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '100vw' }}
        >
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(4rem, 20vw, 20rem)',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: '#ff2d2d',
            display: 'block',
          }}>
            ENGINEER'S
          </span>
        </motion.div>

        {/* Row 2: outlined "WORKSHOP" */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'circOut', delay: 0.25 }}
          style={{ lineHeight: 1, whiteSpace: 'nowrap' }}
        >
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(3rem, 15vw, 15rem)',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(245,245,245,0.75)',
            display: 'block',
          }}>
            WORKSHOP
          </span>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
           CENTER ABSTRACT — animated geometric accent
      ══════════════════════════════════════════════════ */}
      <motion.div
        animate={{ opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '38vw', height: '38vw',
          border: '1px solid rgba(255,45,45,0.4)',
          borderRadius: '50%',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '28vw', height: '28vw',
          border: '1px solid rgba(255,45,45,0.15)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '18vw', height: '18vw',
          border: '1px solid rgba(255,45,45,0.25)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* ══════════════════════════════════════════════════
           UI OVERLAY LAYER  (z-index 4)
      ══════════════════════════════════════════════════ */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>

        {/* ── TOP LEFT: Name badge — offset below navbar ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ position: 'absolute', top: isMobile ? '14%' : '20%', left: '5%' }}
        >
          <div className="terminal-text" style={{ color: '#ff2d2d', fontSize: '0.6rem', marginBottom: '0.3rem', letterSpacing: 4 }}>
            // SYS_ID: S_SHUBH_01
          </div>
          <div style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#f5f5f5',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}>
            Shubh
          </div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(0.65rem, 1.2vw, 0.9rem)',
            color: 'rgba(245,245,245,0.45)',
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginTop: '0.2rem',
          }}>
            Full-Stack Developer
          </div>
        </motion.div>

        {/* ── TOP RIGHT: Level / Status badge — offset below navbar ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            position: 'absolute', top: isMobile ? '14%' : '20%', right: '5%',
            textAlign: 'right',
          }}
        >
          <div style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
            color: '#f5f5f5',
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}>
            <span style={{ color: '#ff2d2d' }}>LVL-</span>04
          </div>
          <div className="terminal-text" style={{ fontSize: '0.5rem', color: 'rgba(245,245,245,0.4)', marginTop: '0.3rem' }}>
            STATUS: ACTIVE
          </div>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{
              width: 6, height: 6,
              borderRadius: '50%',
              background: '#ff2d2d',
              marginLeft: 'auto',
              marginTop: '0.4rem',
              boxShadow: '0 0 8px #ff2d2d',
            }}
          />
        </motion.div>

        {/* ── BOTTOM LEFT: Info card with CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.7 }}
          style={{
            position: 'absolute', bottom: '8%', left: '5%',
            pointerEvents: 'all',
          }}
        >
          {/* Card */}
          <div style={{
            position: 'relative',
            background: 'rgba(10,10,10,0.85)',
            border: '1px solid rgba(255,45,45,0.3)',
            padding: isMobile ? '0.9rem 1.1rem' : '1.2rem 1.5rem',
            maxWidth: isMobile ? 200 : 280,
            backdropFilter: 'blur(6px)',
          }}>
            <Corner pos="tl" /> <Corner pos="br" />

            <div style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: '1.05rem',
              color: '#ff2d2d',
              marginBottom: '0.4rem',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              shubh.exe
            </div>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '0.85rem',
              color: 'rgba(245,245,245,0.65)',
              lineHeight: 1.5,
            }}>
              Dev. Designer.<br />Architect of digital systems.
            </div>

            {/* CTA Arrow Button */}
            <motion.button
              onMouseEnter={() => playSound('hover')}
              onClick={() => navigate('/book')}
              whileHover={{ scale: 1.1, backgroundColor: '#ff2d2d' }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                top: '-18px', right: '-18px',
                width: 38, height: 38,
                borderRadius: '50%',
                background: '#ff2d2d',
                border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(255,45,45,0.4)',
                pointerEvents: 'all',
              }}
            >
              <ArrowUpRight size={18} color="#000" strokeWidth={2.5} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── BOTTOM RIGHT: Tagline + quote — hidden on mobile ── */}
        {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.75 }}
          style={{
            position: 'absolute', bottom: '8%', right: '5%',
            textAlign: 'right', maxWidth: isTablet ? 200 : 280,
          }}
        >
          <div style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(0.7rem, 1.4vw, 1rem)',
            color: 'rgba(245,245,245,0.35)',
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: '0.7rem',
          }}>
            コードで未来を構築する。
          </div>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
            fontSize: '0.78rem',
            color: 'rgba(245,245,245,0.5)',
            lineHeight: 1.65,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            "THE SYSTEM IS COMPLEX.<br />
            I'LL ARCHITECT THE SOLUTION..."
          </div>
        </motion.div>
        )}

        {/* ── Horizontal rule lines top & bottom ── */}
        <div style={{
          position: 'absolute', top: '7%', left: '5%', right: '5%',
          height: '1px',
          background: 'linear-gradient(90deg, #ff2d2d, rgba(245,245,245,0.08), transparent)',
        }} />
        <div style={{
          position: 'absolute', bottom: '6%', left: '5%', right: '5%',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(245,245,245,0.08), #ff2d2d, transparent)',
        }} />
      </div>

      {/* ── Bottom vignette ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: '100%', height: '18%',
        background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
      }} />

      {/* ── Left / right edge fades ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '15%', height: '100%',
        background: 'linear-gradient(to right, #000 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '15%', height: '100%',
        background: 'linear-gradient(to left, #000 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
      }} />
    </section>
  );
};

export default Hero;
