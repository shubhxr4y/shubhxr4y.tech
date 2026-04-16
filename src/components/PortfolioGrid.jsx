import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import neuralImg from '../assets/images/neural_os.png';
import nexusImg from '../assets/images/nexus_dash.png';
import luminaImg from '../assets/images/lumina_crm.png';
import hotelImg from '../assets/images/hotel_new_asian.png';
import goldenImg from '../assets/images/golden_crusts.png';
import useWindowWidth from '../hooks/useWindowWidth';

const projects = [
  {
    id: "01",
    title: "HOTEL NEW ASIAN",
    category: "HOSPITALITY // FULL-STACK WEB",
    desc: "Premium hotel website with room booking, dining, gallery & guest review systems. Dark luxury aesthetic with smooth animations.",
    tags: ["React", "Node.js", "MongoDB"],
    url: "https://hotelnewasian.com",
    image: hotelImg,
    size: "large",
    live: true,
  },
  {
    id: "02",
    title: "GOLDEN CRUST",
    category: "E-COMMERCE // BAKERY PLATFORM",
    desc: "Full-stack bakery platform with online ordering, cart system, home delivery routing across Kolkata zones.",
    tags: ["React", "Express", "Razorpay"],
    url: "https://goldencrusts.co.in",
    image: goldenImg,
    size: "small",
    live: true,
  },
  {
    id: "03",
    title: "NEURAL OS",
    category: "SaaS OPERATING SYSTEM [CP2077_CORE]",
    desc: "Futuristic SaaS dashboard with real-time data feeds, module architecture, and cinematic UI system.",
    tags: ["React", "Framer Motion", "WebSocket"],
    url: null,
    image: neuralImg,
    size: "medium",
    live: false,
  },
  {
    id: "04",
    title: "NEXUS DASHBOARD",
    category: "ANALYTICS PLATFORM [NETWATCH_V3]",
    desc: "Enterprise analytics platform with multi-source data ingestion, live chart rendering, and role-based access.",
    tags: ["Next.js", "D3.js", "PostgreSQL"],
    url: null,
    image: nexusImg,
    size: "large",
    live: false,
  },
  {
    id: "05",
    title: "LUMINA CRM",
    category: "ENTERPRISE SaaS [NIGHT_CORP]",
    desc: "High-conversion CRM with pipeline management, AI lead scoring, and automated outreach sequences.",
    tags: ["React", "Python", "Supabase"],
    url: null,
    image: luminaImg,
    size: "medium",
    live: false,
  },
];

// Responsive grid layout per card
const getGridStyle = (id, isMobile, isTablet) => {
  if (isMobile) return { gridColumn: '1 / -1' };
  if (isTablet) {
    const tabletMap = {
      '01': { gridColumn: '1 / -1' },
      '02': { gridColumn: '1 / -1' },
      '03': { gridColumn: '1 / 7' },
      '04': { gridColumn: '7 / -1' },
      '05': { gridColumn: '1 / -1' },
    };
    return tabletMap[id] || { gridColumn: '1 / -1' };
  }
  const map = {
    '01': { gridColumn: '1 / 8' },
    '02': { gridColumn: '8 / 13', marginTop: '8rem' },
    '03': { gridColumn: '1 / 6', marginTop: '4rem' },
    '04': { gridColumn: '6 / 13', marginTop: '2rem' },
    '05': { gridColumn: '3 / 11', marginTop: '4rem' },
  };
  return map[id] || {};
};

const ProjectCard = ({ project, playSound, isMobile, isTablet }) => {
  const isLive = project.live && project.url;

  const handleClick = () => {
    if (isLive) {
      playSound('click');
      window.open(project.url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <motion.div
      onMouseEnter={() => playSound('hover')}
      onClick={handleClick}
      className="interactive"
      style={{
        ...getGridStyle(project.id, isMobile, isTablet),
        position: 'relative',
        border: '1px solid rgba(245,245,245,0.1)',
        overflow: 'hidden',
        cursor: isLive ? 'pointer' : 'default',
      }}
      whileHover={{ borderColor: '#ff2d2d' }}
    >
      {/* Image */}
      <div style={{
        aspectRatio: ['01','04'].includes(project.id) ? '16/9' : '4/3',
        backgroundColor: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: 0.75, display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(45deg, #111, #1a1a1a)'
          }}>
            <span className="terminal-text" style={{ opacity: 0.2 }}>IMAGE_NOT_AVAILABLE // CLASS: {project.id}</span>
          </div>
        )}

        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%',
          padding: '1rem 1.2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            padding: '2px 8px', background: '#ff2d2d', color: '#000',
          }}>
            {project.id}
          </span>

          {isLive && (
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="terminal-text"
              style={{ fontSize: '0.5rem', color: '#ff2d2d', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff2d2d', display: 'inline-block', boxShadow: '0 0 6px #ff2d2d' }} />
              LIVE
            </motion.span>
          )}
        </div>

        {/* Bottom title overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%',
          padding: '1.5rem 1.2rem 1rem',
          zIndex: 2,
        }}>
          <h3 style={{
            fontFamily: 'var(--font-header)',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            marginBottom: '0.3rem',
            letterSpacing: '1px',
          }}>
            {project.title}
          </h3>
          <span className="terminal-text" style={{ opacity: 0.55, fontSize: '0.58rem' }}>{project.category}</span>
        </div>
      </div>

      {/* Description + tags bar — slides up on hover */}
      <motion.div
        initial={{ height: 0 }}
        whileHover={{ height: 'auto' }}
        style={{ overflow: 'hidden', background: '#0d0d0d', borderTop: '1px solid rgba(255,45,45,0.25)' }}
      >
        <div style={{ padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', opacity: 0.6, maxWidth: '65%', lineHeight: 1.5 }}>
            {project.desc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                  padding: '2px 8px', border: '1px solid rgba(255,45,45,0.35)', color: '#ff2d2d',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {isLive && (
              <span className="terminal-text" style={{ fontSize: '0.55rem', color: '#ff2d2d', opacity: 0.8 }}>
                → OPEN LIVE SITE
              </span>
            )}
            {!isLive && (
              <span className="terminal-text" style={{ fontSize: '0.55rem', opacity: 0.3 }}>
                CONCEPT // NDA
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioGrid = () => {
  const { playSound } = useAudio();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  return (
    <section style={{ padding: isMobile ? '5rem 4%' : '10rem 5%', backgroundColor: '#000' }}>
      <div style={{ marginBottom: isMobile ? '2rem' : '5rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: '1rem' }}>
        <div>
          <span className="terminal-text" style={{ color: '#ff2d2d' }}>// WORK_LOG</span>
          <h2 style={{ fontFamily: 'var(--font-header)', fontSize: isMobile ? '2.5rem' : '4rem', marginTop: '1rem' }}>SELECTED DEPLOYMENTS</h2>
        </div>
        <div style={{ textAlign: isMobile ? 'left' : 'right', opacity: 0.5, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          TOTAL_RECORDS: 05<br/>
          FILTER: HIGH_PRIORITY<br/>
          <span style={{ color: '#ff2d2d', opacity: 1 }}>LIVE: 02</span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(12, 1fr)' : 'repeat(12, 1fr)',
        gap: isMobile ? '1.5rem' : '2rem',
        alignItems: 'start',
      }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} playSound={playSound} isMobile={isMobile} isTablet={isTablet} />
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;
