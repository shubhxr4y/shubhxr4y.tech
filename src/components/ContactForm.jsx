import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import useWindowWidth from '../hooks/useWindowWidth';

const ContactForm = () => {
  const { playSound } = useAudio();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'INTERFACE_DESIGN',
    message: ''
  });
  const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR

  const handleSubmit = (e) => {
    e.preventDefault();
    playSound('click');
    setStatus('SENDING');
    
    // Simulate system transmission
    setTimeout(() => {
      setStatus('SUCCESS');
      playSound('boot');
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    playSound('terminal');
  };

  return (
    <section style={{ padding: isMobile ? '5rem 4%' : '10rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', border: '1px solid #ff2d2d', padding: isMobile ? '1.5rem' : '3rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-1rem', left: '2rem', background: '#000', padding: '0 1rem' }}>
          <span className="terminal-text" style={{ color: '#ff2d2d' }}>// SECURE_ENQUIRY_PANEL</span>
        </div>

        <div style={{ marginBottom: '3rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', opacity: 0.7 }}>
          WARNING: ALL TRANSMISSIONS ARE ENCRYPTED. <br/>
          CONNECTION_TYPE: TLS.1.3_AEAD
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div className="input-field">
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#ff2d2d', marginBottom: '0.5rem' }}>ENTER NAME</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(245,245,245,0.2)',
                  color: '#f5f5f5',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.5rem 0',
                  outline: 'none'
                }}
              />
            </div>
            <div className="input-field">
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#ff2d2d', marginBottom: '0.5rem' }}>ENTER EMAIL</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(245,245,245,0.2)',
                  color: '#f5f5f5',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.5rem 0',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: '#ff2d2d', marginBottom: '0.5rem' }}>PROJECT TYPE</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid rgba(245,245,245,0.2)',
                color: '#f5f5f5',
                padding: '0.8rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none'
              }}
            >
              <option value="INTERFACE_DESIGN">INTERFACE_DESIGN</option>
              <option value="NEURAL_ARCHITECTURE">NEURAL_ARCHITECTURE</option>
              <option value="TECHWEAR_IDENTITY">TECHWEAR_IDENTITY</option>
            </select>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: '#ff2d2d', marginBottom: '0.5rem' }}>MESSAGE LOG</label>
            <textarea 
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid rgba(245,245,245,0.2)',
                color: '#f5f5f5',
                fontFamily: 'var(--font-mono)',
                padding: '1rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#ff2d2d', color: '#000' }}
            whileTap={{ scale: 0.98 }}
            className="interactive"
            disabled={status !== 'IDLE'}
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid #ff2d2d',
              color: '#ff2d2d',
              padding: '1.5rem',
              fontFamily: 'var(--font-header)',
              fontSize: '1rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '5px'
            }}
          >
            {status === 'IDLE' ? 'TRANSMIT REQUEST' : status === 'SENDING' ? 'TRANSMITTING...' : 'DATA_RECEIVED'}
          </motion.button>
        </form>

        <AnimatePresence>
          {status === 'SUCCESS' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.9)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <h2 style={{ fontFamily: 'var(--font-header)', color: '#ff2d2d', marginBottom: '1rem' }}>MESSAGE SENT</h2>
              <p className="terminal-text" style={{ textAlign: 'center' }}>WE WILL CONTACT YOU SHORTLY // END_OF_LINE</p>
              <button 
                onClick={() => setStatus('IDLE')}
                style={{ marginTop: '2rem', background: '#ff2d2d', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}
              >
                RETURN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactForm;
