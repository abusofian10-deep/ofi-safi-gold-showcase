import React from 'react';
import { ChevronRight, ChevronLeft, Maximize, Minimize, Globe } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface HeaderProps {
  currentScreen: number;
  totalScreens: number;
  language: Language;
  onToggleLanguage: () => void;
  onSelectScreen: (screenIndex: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  totalScreens,
  language,
  onToggleLanguage,
  onSelectScreen,
  onPrev,
  onNext,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const t = translations[language].header;

  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((e) => console.warn(e));
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((e) => console.warn(e));
    }
  };

  const isRtl = language === 'ar';

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#080D1D]/92 backdrop-blur-xl border-b border-[#D4AF37]/25 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-3 md:gap-6">
        
        {/* Omni Turnkey Branding ONLY (OFI and Made in Oman completely removed from Header) */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="./assets/omni_logo.png"
            alt="Omni Turnkey Logo"
            className="h-9 md:h-11 w-auto object-contain brightness-110 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]"
          />
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-xs md:text-sm gold-gradient-text uppercase">
              OMNI TURNKEY
            </span>
            <span className="text-[10px] md:text-xs text-slate-300 font-medium">
              {t.brandTitle}
            </span>
          </div>
        </div>

        {/* Center: 5 Screen Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[#0E1838]/80 border border-[#D4AF37]/25">
          {t.screens.map((screenTitle, idx) => {
            const screenId = idx + 1;
            const isActive = currentScreen === screenId;
            return (
              <button
                key={screenId}
                onClick={() => onSelectScreen(screenId)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3D578] text-[#080D1D] shadow-[0_2px_10px_rgba(212,175,55,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    isActive ? 'bg-[#080D1D] text-[#F3D578]' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {screenId}
                </span>
                <span>{screenTitle}</span>
              </button>
            );
          })}
        </nav>

        {/* Opposite Side: Language Toggle + Counter + Prev/Next + Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sleek Language Toggle Button (EN / عربي) */}
          <button
            onClick={onToggleLanguage}
            className="px-3 py-1.5 rounded-lg bg-[#0E1838] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-bold text-[#F3D578] transition-all duration-200 flex items-center gap-1.5 shadow-[0_2px_10px_rgba(212,175,55,0.15)] active:scale-95"
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-mono tracking-wider">
              {language === 'ar' ? 'EN' : 'عربي'}
            </span>
          </button>

          {/* Slide Indicator Badge */}
          <div className="px-2.5 py-1 rounded-lg bg-[#0E1838] border border-[#D4AF37]/30 text-xs font-mono text-[#F3D578] flex items-center gap-1">
            <span className="font-bold">0{currentScreen}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">0{totalScreens}</span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1 bg-[#0E1838]/80 rounded-lg p-0.5 border border-[#D4AF37]/25">
            <button
              onClick={isRtl ? onPrev : onNext}
              disabled={isRtl ? currentScreen === 1 : currentScreen === totalScreens}
              className="p-1.5 rounded hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title={isRtl ? t.prevTooltip : t.nextTooltip}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={isRtl ? onNext : onPrev}
              disabled={isRtl ? currentScreen === totalScreens : currentScreen === 1}
              className="p-1.5 rounded hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title={isRtl ? t.nextTooltip : t.prevTooltip}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Projection Fullscreen */}
          <button
            onClick={toggleBrowserFullscreen}
            className="p-2 rounded-lg bg-[#0E1838] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#F3D578] transition-colors hidden sm:flex items-center justify-center"
            title={isFullscreen ? t.exitFullscreenTooltip : t.fullscreenTooltip}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Screen Navigation Bar (below header on small screens) */}
      <div className="lg:hidden flex items-center justify-between px-3 py-1.5 bg-[#0A1227] border-t border-white/5 text-[11px] overflow-x-auto gap-1">
        {t.screens.map((screenTitle, idx) => {
          const screenId = idx + 1;
          return (
            <button
              key={screenId}
              onClick={() => onSelectScreen(screenId)}
              className={`px-2 py-1 rounded whitespace-nowrap transition-colors ${
                currentScreen === screenId
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {screenId}. {screenTitle}
            </button>
          );
        })}
      </div>
    </header>
  );
};
