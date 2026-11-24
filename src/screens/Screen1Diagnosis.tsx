import React from 'react';
import { motion } from 'framer-motion';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ShieldCheck, AlertTriangle, TrendingUp, Sparkles, Award } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface Screen1Props {
  language: Language;
}

export const Screen1Diagnosis: React.FC<Screen1Props> = ({ language }) => {
  const t = translations[language].screen1;
  const isRtl = language === 'ar';

  return (
    <div className="w-full flex flex-col justify-center py-4 md:py-8">
      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto mb-6 md:mb-10 px-2"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1838] border border-[#D4AF37]/35 shadow-[0_0_20px_rgba(212,175,55,0.15)] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#F3D578]" />
          <span className="text-xs md:text-sm font-bold text-[#F3D578]">
            {t.badge}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-xs text-slate-300 font-medium">Safi GOLD</span>
        </div>

        {/* Main Headline - Carefully spaced, elegant & spacious (Zero letter-spacing clash, No wavy line) */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white mb-4 ${
            isRtl ? 'leading-[1.55] tracking-normal' : 'leading-[1.28] tracking-normal'
          }`}
        >
          <span>{t.headlinePart1}</span>{' '}
          <span className="gold-gradient-text px-1 font-black inline-block">
            {t.headlineHighlight}
          </span>{' '}
          <span>{t.headlinePart2}</span>
        </h1>

        {/* Subheadline with clear line height and balanced contrast */}
        <p
          className={`text-sm sm:text-base md:text-lg text-slate-300 font-normal max-w-3xl mx-auto ${
            isRtl ? 'leading-[1.7]' : 'leading-relaxed'
          }`}
        >
          <span>{t.subheadline}</span>{' '}
          <span className="text-[#F3D578] font-bold px-0.5">
            {t.subheadlineProduct}
          </span>{' '}
          <span>{t.subheadlineRest}</span>
        </p>
      </motion.div>

      {/* Interactive Centerpiece (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-7xl mx-auto w-full">
        {/* Visual Side (Draggable Comparison Slider with Zero-Zoom Fix) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 flex flex-col items-center"
        >
          <BeforeAfterSlider language={language} />
        </motion.div>

        {/* Insight Side (3 Concise Executive Cards) */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-base sm:text-lg font-extrabold text-[#F3D578]">
              {t.diagnosisTitle}
            </h3>
          </div>

          {/* Card 1: Genuine Product Strength */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 flex items-start gap-4 border-r-4 border-r-emerald-400">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-sm sm:text-base text-white">
                  {t.card1Title}
                </h4>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  {t.card1Tag}
                </span>
              </div>
              <p
                className={`text-xs sm:text-sm text-slate-300 font-normal ${
                  isRtl ? 'leading-[1.65]' : 'leading-relaxed'
                }`}
              >
                {t.card1Text}
              </p>
            </div>
          </div>

          {/* Card 2: Identity Fragmentation */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 flex items-start gap-4 border-r-4 border-r-amber-400">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-sm sm:text-base text-white">
                  {t.card2Title}
                </h4>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  {t.card2Tag}
                </span>
              </div>
              <p
                className={`text-xs sm:text-sm text-slate-300 font-normal ${
                  isRtl ? 'leading-[1.65]' : 'leading-relaxed'
                }`}
              >
                {t.card2Text}
              </p>
            </div>
          </div>

          {/* Card 3: Growth Formula */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 flex items-start gap-4 border-r-4 border-r-[#D4AF37]">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#F3D578]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-sm sm:text-base text-white">
                  {t.card3Title}
                </h4>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#F3D578] font-bold">
                  {t.card3Tag}
                </span>
              </div>
              <p
                className={`text-xs sm:text-sm text-slate-300 font-normal ${
                  isRtl ? 'leading-[1.65]' : 'leading-relaxed'
                }`}
              >
                {t.card3Text}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
