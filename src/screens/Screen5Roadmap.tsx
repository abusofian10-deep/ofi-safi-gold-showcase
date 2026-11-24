import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Target, Calendar, Rocket, CheckCircle, Sparkles, Handshake, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface Screen5Props {
  language: Language;
}

const STEP_ICONS = [Target, Calendar, Rocket];
const STEP_ACCENTS = ['#D4AF37', '#38BDF8', '#34D399'];

export const Screen5Roadmap: React.FC<Screen5Props> = ({ language }) => {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);
  const t = translations[language].screen5;

  const triggerCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F3D578', '#FFFFFF', '#0E1838'],
    });
    setHasCelebrated(true);
  };

  const isRtl = language === 'ar';

  return (
    <div className="w-full flex flex-col justify-center py-4 md:py-8">
      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto mb-6 md:mb-8"
      >
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1838] border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(212,175,55,0.15)] mb-3">
          <Handshake className="w-3.5 h-3.5 text-[#F3D578]" />
          <span className="text-xs md:text-sm font-bold text-[#F3D578]">
            {t.sectionTag}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-[1.35] text-white mb-3 tracking-tight">
          {t.headlinePrefix}{' '}
          <span className="gold-gradient-text">{t.headlineHighlight}</span>{' '}
          {t.headlineSuffix}
        </h2>

        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
          {t.subheadline}
        </p>
      </motion.div>

      {/* 3 Stepper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto w-full mb-8">
        {t.steps.map((step, idx) => {
          const isSelected = selectedStep === idx;
          const Icon = STEP_ICONS[idx];
          const accent = STEP_ACCENTS[idx];

          return (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * idx }}
              onClick={() => setSelectedStep(idx)}
              className={`glass-panel cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'border-2 border-[#D4AF37] shadow-[0_16px_40px_rgba(212,175,55,0.2)] bg-[#101C42]'
                  : 'hover:border-[#D4AF37]/50 hover:bg-[#0E1838]'
              }`}
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 inset-x-0 h-1 transition-opacity"
                style={{
                  backgroundColor: accent,
                  opacity: isSelected ? 1 : 0.4,
                }}
              />

              <div>
                {/* Header Row: Step Number & Timeline */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-mono transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${accent}20`,
                      color: accent,
                      border: `1px solid ${accent}40`,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {step.timeline}
                  </span>
                </div>

                {/* Phase Tag & Title */}
                <span className="text-xs font-bold text-[#F3D578] block mb-1">
                  {step.phase}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#F3D578] transition-colors leading-snug">
                  {step.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-normal">
                  {step.summary}
                </p>
              </div>

              {/* Strategic Deliverables List */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <span className="text-[11px] font-bold text-[#D4AF37]">
                  {t.deliverablesLabel}
                </span>
                {step.deliverables.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-4xl mx-auto w-full p-6 rounded-2xl bg-gradient-to-r from-[#0E1838] via-[#15234D] to-[#0E1838] border-2 border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4 text-center sm:text-start">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#F3D578] shadow-inner hidden sm:flex">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              {t.ctaTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.ctaSubtitle}
            </p>
          </div>
        </div>

        <button
          onClick={triggerCelebration}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3D578] to-[#AA820A] text-[#080D1D] font-extrabold text-sm sm:text-base shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4 text-[#080D1D]" />
          <span>{hasCelebrated ? t.ctaButtonCelebrated : t.ctaButton}</span>
          {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </motion.div>
    </div>
  );
};
