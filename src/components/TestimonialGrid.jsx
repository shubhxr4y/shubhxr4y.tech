import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const testimonials = [
  {
    name: "ARJUN KAPOOR",
    role: "FOUNDER, FLOWDESK SaaS",
    content: "ENGINEER WORKSHOP COMPLETELY TRANSFORMED HOW OUR PRODUCT IS PERCEIVED. THE UI ANIMATIONS INCREASED OUR DEMO-TO-CLOSE RATE BY 40% IN JUST TWO MONTHS.",
    metrics: "DEMO_CONVERSION: +40%"
  },
  {
    name: "PRIYA SHAH",
    role: "CEO, LUMARY WELLNESS",
    content: "OUR PLATFORM LAUNCH HIT 2M+ USERS ORGANICALLY. THE TEAM UNDERSTOOD OUR VISION IMMEDIATELY AND DELIVERED BEYOND WHAT WE EVEN IMAGINED.",
    metrics: "REACH: 2M+ NODES"
  },
  {
    name: "ROHAN NAIK",
    role: "BUSINESS COACH & SPEAKER",
    content: "I WENT FROM 500 TO 50K DASHBOARD LICENSES IN 3 MONTHS WITH THEIR PERSONAL BRANDING SERIES. GENUINELY GAME-CHANGING.",
    metrics: "GROWTH: 500 -> 50K"
  },
  {
    name: "MEERA VERMA",
    role: "CMO, HEALTHSTACK APP",
    content: "THE DESIGN SYSTEM BUILT BY THE WORKSHOP CUT OUR CPL IN HALF. THEY'RE NOT JUST DESIGNERS — THEY'RE PERFORMANCE ENGINEERS.",
    metrics: "CPL: -50%"
  }
];

const TestimonialGrid = () => {
  return (
    <section style={{ padding: '10rem 5%', background: '#000' }}>
      <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <span className="terminal-text" style={{ color: '#ff2d2d' }}>// PUBLIC_SENTIMENT</span>
        <h2 style={{ fontFamily: 'Anton', fontSize: '5rem', marginTop: '1rem' }}>SAY PUBLICLY</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(245,245,245,0.1)',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.3 }}>
              <MessageSquare size={20} color="#ff2d2d" />
            </div>
            
            <div className="terminal-text" style={{ fontSize: '0.6rem', color: '#ff2d2d', marginBottom: '1.5rem' }}>
              SOURCE: VERIFIED_ENCRYPTED
            </div>

            <p style={{ 
              fontFamily: 'var(--font-header)', 
              fontSize: '1.1rem', 
              lineHeight: 1.4, 
              color: '#f5f5f5',
              marginBottom: '2rem'
            }}>
              "{t.content}"
            </p>

            <div style={{ borderTop: '1px solid rgba(255,45,45,0.2)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontFamily: 'Anton', fontSize: '1.2rem', color: '#ff2d2d' }}>{t.name}</h4>
                  <span className="terminal-text" style={{ fontSize: '0.6rem', opacity: 0.5 }}>{t.role}</span>
                </div>
                <div style={{ 
                  background: 'rgba(255,45,45,0.1)', 
                  padding: '4px 10px', 
                  fontFamily: 'var(--font-mono)', 
                  color: '#ff2d2d',
                  fontSize: '0.7rem'
                }}>
                  {t.metrics}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialGrid;
