import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneMockup } from '../components/PhoneMockup';
import { FullscreenVideoModal } from '../components/FullscreenVideoModal';
import { ShieldCheck, Snowflake, Layers, Building2, Lock } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface Screen4Props {
  isActive: boolean;
  language: Language;
}

export const Screen4Governance: React.FC<Screen4Props> = ({ isActive, language }) => {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const t = translations[language].screen4;

  // Video switcher based on selected language
  const videoSrc = language === 'en'
    ? './assets/sample3_governance_en.mp4'
    : './assets/sample3_governance.mp4';

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
          <Building2 className="w-3.5 h-3.5 text-[#F3D578]" />
          <span className="text-xs md:text-sm font-bold text-[#F3D578]">
            {t.sectionTag}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-[1.35] text-white mb-3 tracking-tight">
          {t.headlinePrefix}{' '}
          <span className="gold-gradient-text">{t.headlineHighlight}</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          {t.subheadline}
        </p>
      </motion.div>

      {/* Main Split Layout: 9:16 Phone Mockup + Strategic Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full">
        {/* Visual Phone Mockup Side (9:16) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 flex justify-center order-2 lg:order-1"
        >
          <PhoneMockup
            key={videoSrc} // Reload player when language video source switches
            videoSrc={videoSrc}
            caption={t.phoneCaption}
            accentTitle={t.phoneBadge}
            isActiveScreen={isActive}
            onOpenFullscreen={() => setIsFullscreenOpen(true)}
          />
        </motion.div>

        {/* Strategic Talking Points (3 clean animated cards) */}
        <motion.div
          initial={{ opacity: 0, x: language === 'ar' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2"
        >
          {/* Card 1 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 border-r-4 border-r-teal-400">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center shrink-0 text-teal-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                    {t.card1Title}
                    <span className="text-[11px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                      {t.card1Tag}
                    </span>
                  </h3>
                  <Lock className="w-4 h-4 text-teal-400" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {t.card1Text}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 border-r-4 border-r-cyan-400">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-400">
                <Snowflake className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                    {t.card2Title}
                    <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                      {t.card2Tag}
                    </span>
                  </h3>
                  <Lock className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {t.card2Text}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-5 border-r-4 border-r-[#D4AF37]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#F3D578]">
                <Layers className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                    {t.card3Title}
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#F3D578] font-bold">
                      {t.card3Tag}
                    </span>
                  </h3>
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {t.card3Text}
                </p>
              </div>
            </div>
          </div>

          {/* Trust Metric Box */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#0E1838] to-[#142646] border border-[#D4AF37]/30 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="font-semibold text-slate-400">{t.summaryLabel}</span>
              <span className="text-[#F3D578] font-bold">
                {t.summaryText}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <FullscreenVideoModal
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        videoSrc={videoSrc}
        title={t.modalTitle}
      />
    </div>
  );
};
