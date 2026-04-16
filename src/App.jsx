import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AudioProvider } from './context/AudioContext';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import BookingPage from './pages/BookingPage';

function App() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <AudioProvider>
      <Router>
        <div className="app-container">
          <CustomCursor />
          <div className="scanlines"></div>
          <div className="noise"></div>
          
          <AnimatePresence mode="wait">
            {!isBooted ? (
              <SplashScreen key="splash" onComplete={() => setIsBooted(true)} />
            ) : (
              <MainLayout key="main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/book" element={<BookingPage />} />
                </Routes>
              </MainLayout>
            )}
          </AnimatePresence>
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
