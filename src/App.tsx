import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Screen1Diagnosis } from './screens/Screen1Diagnosis';
import { Screen2B2CPull } from './screens/Screen2B2CPull';
import { Screen3B2BShelf } from './screens/Screen3B2BShelf';
import { Screen4Governance } from './screens/Screen4Governance';
import { Screen5Roadmap } from './screens/Screen5Roadmap';
import { Language } from './i18n/translations';

const TOTAL_SCREENS = 5;

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [language, setLanguage] = useState<Language>('ar');

  // Synchronize document dir and lang attributes
  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleNext = useCallback(() => {
    setCurrentScreen((prev) => {
      if (prev < TOTAL_SCREENS) {
        setDirection(1);
        return prev + 1;
      }
      return prev;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentScreen((prev) => {
      if (prev > 1) {
        setDirection(-1);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleSelectScreen = (screenIndex: number) => {
    setDirection(screenIndex > currentScreen ? 1 : -1);
    setCurrentScreen(screenIndex);
  };

  // Keyboard navigation for live presentation:
  // In Arabic (RTL): ArrowLeft goes forward, ArrowRight goes backward.
  // In English (LTR): ArrowRight goes forward, ArrowLeft goes backward.
  // Space / PageDown always goes forward, PageUp goes backward.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      const isRtl = language === 'ar';

      if (e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (isRtl) {
          handleNext();
        } else {
          handlePrev();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (isRtl) {
          handlePrev();
        } else {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, language]);

  // Page Transition variants
  const pageVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? (language === 'ar' ? -35 : 35) : (language === 'ar' ? 35 : -35),
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? (language === 'ar' ? 35 : -35) : (language === 'ar' ? -35 : 35),
      transition: {
        duration: 0.22,
      },
    }),
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#080D1D] text-white flex flex-col justify-between relative selection:bg-[#D4AF37]/30 selection:text-[#F3D578]"
    >
      {/* Background Ambient Glows & Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#1A2E66]/20 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#D4AF37]/8 blur-[150px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-[#0E1A3D]/40 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.6) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Fixed Top Header (Omni Turnkey Logo + Title + 5 Links + Language Toggle) */}
      <Header
        currentScreen={currentScreen}
        totalScreens={TOTAL_SCREENS}
        language={language}
        onToggleLanguage={toggleLanguage}
        onSelectScreen={handleSelectScreen}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-20 pb-8 relative z-10 flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${currentScreen}-${language}`}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {currentScreen === 1 && <Screen1Diagnosis language={language} />}
            {currentScreen === 2 && (
              <Screen2B2CPull isActive={currentScreen === 2} language={language} />
            )}
            {currentScreen === 3 && (
              <Screen3B2BShelf isActive={currentScreen === 3} language={language} />
            )}
            {currentScreen === 4 && (
              <Screen4Governance isActive={currentScreen === 4} language={language} />
            )}
            {currentScreen === 5 && <Screen5Roadmap language={language} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Executive Footer (Omni Turnkey Logo + Enlarged Client Logos) */}
      <Footer language={language} />
    </div>
  );
};
