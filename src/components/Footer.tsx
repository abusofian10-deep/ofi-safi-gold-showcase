import React from 'react';
import { Language, translations } from '../i18n/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language].footer;

  return (
    <footer className="w-full border-t border-[#D4AF37]/25 bg-[#080D1D]/95 backdrop-blur-md py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Omni Turnkey Branding with Animated Motion Logo */}
        <div className="flex items-center gap-3 text-center sm:text-start">
          <div className="relative h-9 md:h-11 w-9 md:w-11 flex items-center justify-center rounded-lg overflow-hidden shrink-0">
            <video
              src="./assets/omni_logo_anim.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="./assets/omni_logo.png"
              className="h-full w-full object-contain mix-blend-screen brightness-115 drop-shadow-[0_2px_10px_rgba(212,175,55,0.35)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold gold-gradient-text text-xs md:text-sm tracking-wider uppercase">
              OMNI TURNKEY
            </span>
            <span className="text-[10px] md:text-xs text-slate-400 font-medium">
              {t.tagline}
            </span>
          </div>
        </div>

        {/* Client Logos: Noticeably Larger (~45% bigger) with high-contrast containers */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* OFI Logo Container */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 border border-[#D4AF37]/50 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            <img
              src="./assets/ofi_logo.png"
              alt="OFI Logo"
              className="h-9 sm:h-10 w-auto object-contain drop-shadow-sm"
            />
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 hidden sm:inline">
              {t.clientName}
            </span>
          </div>

          {/* Made in Oman Logo Container */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 border border-[#D4AF37]/50 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            <img
              src="./assets/made_in_oman.png"
              alt="Made in Oman"
              className="h-9 sm:h-10 w-auto object-contain drop-shadow-sm"
            />
            <span className="text-[11px] sm:text-xs font-bold text-[#AA820A]">
              {t.madeInOman}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
