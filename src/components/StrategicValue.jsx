import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Target } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const items = [
  {
    icon: <Cpu size={32} />,
    title: "CINEMATIC FIDELITY",
    desc: "SaaS INTERFACES ENGINEERED WITH 4K MOTION GRAPHICS AND ORIGINAL SOUND DESIGN. WORLD-CLASS AESTHETICS BAKED IN FROM DAY ONE."
  },
  {
    icon: <Zap size={32} />,
    title: "5-DAY DEPLOYMENT",
    desc: "THE FIRST SYSTEM MODULE DEPLOYED IN 5 BUSINESS DAYS. RAPID PROTOTYPING CYCLES ON ALL RETAINER PLANS."
  },
  {
    icon: <Target size={32} />,
    title: "KPI OPTIMIZED",
    desc: "UI SYSTEMS ARCHITECTED BY CONVERSION STRATEGISTS. EVERY INTERACTION IS DESIGNED TO HIT MEASURABLE GROWTH OBJECTIVES."
  }
];

const StrategicValue = () => {
  const { playSound } = useAudio();

  return (
    <section style={{ padding: '10rem 5%', background: '#000' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => playSound('hover')}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            style={{ border: '1px solid rgba(255,45,45,0.2)', padding: '3rem', position: 'relative' }}
          >
            <div style={{ color: '#ff2d2d', marginBottom: '2rem' }}>{item.icon}</div>
            <h3 style={{ fontFamily: 'Anton', fontSize: '2rem', marginBottom: '1.5rem', letterSpacing: '2px' }}>{item.title}</h3>
            <p style={{ opacity: 0.7, lineHeight: 1.6, fontSize: '1rem', borderLeft: '1px solid #ff2d2d', paddingLeft: '1.5rem' }}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StrategicValue;
