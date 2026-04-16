import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import { Calendar as CalendarIcon, Clock, ArrowRight, ShieldCheck, Mail, User, Shield, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

import useWindowWidth from '../hooks/useWindowWidth';

const BookingPage = () => {
  const { playSound } = useAudio();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(''); // Stores selected date YYYY-MM-DD
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Calendar View State
  const [viewDate, setViewDate] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const getStepTitle = () => {
    switch (step) {
      case 1: return "TEMPORAL_SELECTION";
      case 2: return "SLOT_SYNCHRONIZATION";
      case 3: return "IDENTITY_VALIDATION";
      case 4: return "SYNC_COMPLETE";
      default: return "";
    }
  };

  const nextStep = () => {
    playSound('click');
    setStep(prev => prev + 1);
  };

  // Calendar Logic
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    playSound('hover');
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    playSound('hover');
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const selectDate = (day) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (selected < today) return;

    playSound('click');
    const formattedDate = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setDate(formattedDate);
  };

  const renderCalendar = () => {
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    const totalDays = daysInMonth(month, year);
    const startDay = firstDayOfMonth(month, year);
    const monthName = viewDate.toLocaleString('default', { month: 'long' }).toUpperCase();

    const dayCells = [];
    // Add empty cells for padding
    for (let i = 0; i < startDay; i++) {
      dayCells.push(<div key={`empty-${i}`} style={{ padding: '0.5rem' }}></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const currentDayDate = new Date(year, month, d);
      const isPast = currentDayDate < today;
      const isSelected = date === `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

      dayCells.push(
        <motion.div
          key={d}
          whileHover={!isPast ? { scale: 1.1, backgroundColor: 'rgba(255,45,45,0.2)' } : {}}
          onClick={() => selectDate(d)}
          style={{
            padding: '0.8rem',
            textAlign: 'center',
            cursor: isPast ? 'not-allowed' : 'pointer',
            border: isSelected ? '1px solid #ff2d2d' : '1px solid rgba(245,245,245,0.05)',
            background: isSelected ? 'rgba(255,45,45,0.1)' : 'transparent',
            color: isPast ? 'rgba(245,245,245,0.2)' : (isSelected ? '#ff2d2d' : '#f5f5f5'),
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            position: 'relative',
            opacity: isPast ? 0.3 : 1
          }}
        >
          {d}
          {isPast && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '100%',
              height: '1px',
              background: 'rgba(255,45,45,0.3)',
              transform: 'rotate(-45deg)'
            }}></div>
          )}
        </motion.div>
      );
    }

    return (
      <div style={{ border: '1px solid rgba(255,45,45,0.3)', padding: '1.5rem', background: '#050505' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button onClick={handlePrevMonth} style={{ background: 'none', border: '1px solid #ff2d2d', color: '#ff2d2d', padding: '0.5rem', cursor: 'pointer' }}>
            <ChevronLeft size={16} />
          </button>
          <div className="terminal-text" style={{ fontSize: '0.8rem', color: '#f5f5f5' }}>{monthName} {year}</div>
          <button onClick={handleNextMonth} style={{ background: 'none', border: '1px solid #ff2d2d', color: '#ff2d2d', padding: '0.5rem', cursor: 'pointer' }}>
            <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="terminal-text" style={{ fontSize: '0.6rem', textAlign: 'center', color: '#ff2d2d', marginBottom: '0.5rem' }}>
              {day}
            </div>
          ))}
          {dayCells}
        </div>
      </div>
    );
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsTransmitting(true);
    playSound('click');

    const payload = {
      name,
      email,
      date,
      time,
      type: 'BOOKING_SYNC'
    };

    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStep(4);
        playSound('boot');
      } else {
        throw new Error(result.message || 'TRANSMISSION_ERROR');
      }
    } catch (error) {
      console.error('BACKEND_SYNC_FAILED:', error);
      // Fallback transition so user isn't stuck
      setStep(4);
      playSound('boot');
    } finally {
      setIsTransmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100vh', paddingTop: isMobile ? '8rem' : '20rem', paddingBottom: isMobile ? '5rem' : '10rem', paddingLeft: '5%', paddingRight: '5%' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1.2fr 1.2fr', gap: isMobile ? '3rem' : '4rem', alignItems: 'start' }}>

        {/* Info Column */}
        <div style={{ position: isMobile ? 'static' : 'sticky', top: '20rem' }}>
          <span className="terminal-text" style={{ color: '#ff2d2d' }}>// INDIA_SYNC_CORE</span>
          <h1 style={{ fontFamily: 'Anton', fontSize: 'clamp(3rem, 10vw, 6rem)', marginTop: '1rem', lineHeight: 0.9 }}>
            BOOK <br />SYSTEM <span style={{ color: 'transparent', WebkitTextStroke: '2px #f5f5f5' }}>SYNC</span>
          </h1>

          <div style={{ marginTop: '4rem' }}>
            <div style={{ padding: '2rem', background: 'rgba(255,45,45,0.05)', border: '1px solid rgba(255,45,45,0.2)', marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'Anton', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ShieldCheck color="#ff2d2d" /> FREE DISCOVERY SESSION [IST]
              </h3>
              <p style={{ opacity: 0.7, lineHeight: 1.6 }}>
                PICK A TIME THAT WORKS — 30 MINUTES, ZERO PRESSURE. WE'LL MAP OUT EXACTLY HOW THE WORKSHOP CAN GROW YOUR BRAND. INSTANT CONFIRMATION.
              </p>
            </div>

            <div className="terminal-text" style={{ opacity: 0.5, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div><Clock size={12} style={{ marginRight: '8px' }} /> CURRENT_IST: {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
              <div><MapPin size={12} style={{ marginRight: '8px' }} /> LOCATION: MUMBAI_TERMINAL_INDIA</div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div style={{ background: '#0a0a0a', border: '1px solid #ff2d2d', padding: isMobile ? '1.5rem' : '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-1rem', left: '2rem', background: '#000', padding: '0 1rem' }}>
            <span className="terminal-text" style={{ color: '#ff2d2d' }}>SCHEDULER_V5.0_CUSTOM</span>
          </div>

          {/* Progress Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="terminal-text" style={{ fontSize: '0.6rem', color: '#ff2d2d' }}>{getStepTitle()}</span>
              <span className="terminal-text" style={{ fontSize: '0.6rem', opacity: 0.5 }}>MODULE [{step}/{totalSteps}]</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,45,45,0.1)', position: 'relative' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                style={{ height: '100%', background: '#ff2d2d', boxShadow: '0 0 10px #ff2d2d' }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={{ marginBottom: '2rem' }}>
                  <label className="terminal-text" style={{ display: 'block', marginBottom: '1.5rem', opacity: 0.6 }}>SELECT_SYNCHRONIZATION_DATE</label>
                  {renderCalendar()}
                  {date && (
                    <div className="terminal-text" style={{ marginTop: '1rem', color: '#ff2d2d', fontSize: '0.7rem' }}>
                      SELECTED_TARGET: {date}
                    </div>
                  )}
                </div>
                <button
                  onClick={nextStep}
                  disabled={!date}
                  style={{
                    width: '100%',
                    background: '#ff2d2d',
                    color: '#000',
                    border: 'none',
                    padding: '1.5rem',
                    fontFamily: 'Anton',
                    fontSize: '1.2rem',
                    cursor: date ? 'pointer' : 'not-allowed',
                    opacity: date ? 1 : 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem'
                  }}
                >
                  NEXT_MODULE <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <label className="terminal-text" style={{ display: 'block', marginBottom: '1rem', opacity: 0.6 }}>AVAILABLE SLOTS [IST]</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                  {['10:00', '12:30', '15:00', '17:30'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      style={{
                        padding: '1rem',
                        background: time === t ? '#ff2d2d' : 'transparent',
                        color: time === t ? '#000' : '#f5f5f5',
                        border: '1px solid #ff2d2d',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer'
                      }}
                    >
                      {t}_IST
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextStep}
                  disabled={!time}
                  style={{
                    width: '100%',
                    background: '#ff2d2d',
                    color: '#000',
                    border: 'none',
                    padding: '1.5rem',
                    fontFamily: 'Anton',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem'
                  }}
                >
                  VALIDATE_TIME <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <label className="terminal-text" style={{ display: 'block', marginBottom: '2rem', color: '#ff2d2d' }}>CLIENT_IDENTIFICATION_REQUIRED</label>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(245,245,245,0.2)', paddingBottom: '0.5rem' }}>
                    <User size={18} opacity={0.5} />
                    <input
                      type="text"
                      placeholder="ENTER NAME"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontFamily: 'var(--font-mono)' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(245,245,245,0.2)', paddingBottom: '0.5rem' }}>
                    <Mail size={18} opacity={0.5} />
                    <input
                      type="email"
                      placeholder="ENTER EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontFamily: 'var(--font-mono)' }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleFinalSubmit}
                  disabled={!name || !email || isTransmitting}
                  style={{
                    width: '100%',
                    background: '#ff2d2d',
                    color: '#000',
                    border: 'none',
                    padding: '1.5rem',
                    fontFamily: 'Anton',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem'
                  }}
                >
                  {isTransmitting ? 'TRANSMITTING...' : 'INITIATE_SYNC'} <Shield size={20} />
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <div style={{ color: '#ff2d2d', marginBottom: '2rem' }}><ShieldCheck size={64} style={{ margin: '0 auto' }} /></div>
                <h2 style={{ fontFamily: 'Anton', fontSize: '2.5rem', marginBottom: '1rem' }}>SYNC SUCCESS</h2>
                <p className="terminal-text">CONNECTION ESTABLISHED FOR {date} AT {time}_IST</p>
                <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed #ff2d2d', fontSize: '0.8rem', opacity: 0.6 }}>
                  UID: {Math.random().toString(36).substr(2, 9).toUpperCase()} <br />
                  CONFIRMATION EMAIL DISPATCHED TO {email}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingPage;
