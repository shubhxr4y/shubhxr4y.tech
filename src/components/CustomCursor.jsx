import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      if (e.target.closest('button, a, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 45 : 0,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      style={{
        position: 'fixed',
        top: -15,
        left: -15,
        width: 30,
        height: 30,
        border: `2px solid ${isHovering ? '#ff2d2d' : '#f5f5f5'}`,
        zIndex: 10000,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        width: 2,
        height: '100%',
        background: isHovering ? '#ff2d2d' : 'rgba(245, 245, 245, 0.3)',
        position: 'absolute'
      }} />
      <div style={{
        height: 2,
        width: '100%',
        background: isHovering ? '#ff2d2d' : 'rgba(245, 245, 245, 0.3)',
        position: 'absolute'
      }} />
    </motion.div>
  );
};

export default CustomCursor;
