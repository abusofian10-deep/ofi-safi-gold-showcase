import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Milk, Sparkles, MoveHorizontal } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface BeforeAfterSliderProps {
  language: Language;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'milk' | 'mozzarella'>('milk');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const t = translations[language].screen1;

  // Distinct Image Mapping:
  // Tab 1 (Milk): strictly loads /assets/before_milk.jpg vs /assets/after_milk.jpg
  // Tab 2 (Mozzarella): strictly loads /assets/before_mozzarella.jpg vs /assets/after_mozzarella.jpg
  const currentConfig = activeTab === 'milk'
    ? {
        id: 'milk',
        title: t.tabMilk,
        beforeSrc: './assets/before_milk.jpg',
        afterSrc: './assets/after_milk.jpg',
        beforeLabel: t.beforeLabelMilk,
        afterLabel: t.afterLabelMilk,
        tagline: t.taglineMilk,
      }
    : {
        id: 'mozzarella',
        title: t.tabMozzarella,
        beforeSrc: './assets/before_mozzarella.jpg',
        afterSrc: './assets/after_mozzarella.jpg',
        beforeLabel: t.beforeLabelMozzarella,
        afterLabel: t.afterLabelMozzarella,
        tagline: t.taglineMozzarella,
      };

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const onMouseUp = () => {
      setIsDragging(false);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    };
    const onTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Sleek Toggle Tabs directly above slider */}
      <div className="w-full flex items-center justify-center mb-3">
        <div className="p-1 rounded-2xl bg-[#0E1838]/90 border border-[#D4AF37]/35 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
          <button
            onClick={() => {
              setActiveTab('milk');
              setSliderPosition(50);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === 'milk'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3D578] text-[#080D1D] shadow-[0_2px_12px_rgba(212,175,55,0.35)] scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Milk className="w-4 h-4" />
            <span>{t.tabMilk}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('mozzarella');
              setSliderPosition(50);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeTab === 'mozzarella'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3D578] text-[#080D1D] shadow-[0_2px_12px_rgba(212,175,55,0.35)] scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.tabMozzarella}</span>
          </button>
        </div>
      </div>

      {/* Fixed aspect-[4/5] Comparison Container with Zero-Zoom Clipping */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative w-full max-w-[480px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.75),0_0_35px_rgba(212,175,55,0.18)] border-2 border-[#D4AF37]/40 select-none cursor-ew-resize group bg-[#090E20]"
      >
        {/* Layer 1 (Bottom): "After" Image (Commercial 3D Showcase) */}
        <img
          src={currentConfig.afterSrc}
          alt={currentConfig.afterLabel}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />

        {/* Layer 2 (Top): "Before" Image (Current Flat / Photo) clipped strictly via clip-path (ZERO ZOOM BUG FIX) */}
        <img
          src={currentConfig.beforeSrc}
          alt={currentConfig.beforeLabel}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
          draggable={false}
        />

        {/* "Before" Label Badge (Top Left - reveals with top layer) */}
        <div
          className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-red-950/85 border border-red-400/50 backdrop-blur-md flex items-center gap-1.5 shadow-md pointer-events-none transition-opacity"
          style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
        >
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-xs sm:text-sm font-bold text-red-200">
            {currentConfig.beforeLabel} {language === 'ar' ? '(قبل)' : '(Before)'}
          </span>
        </div>

        {/* "After" Label Badge (Top Right - reveals with bottom layer) */}
        <div
          className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-emerald-950/85 border border-emerald-400/50 backdrop-blur-md flex items-center gap-1.5 shadow-md pointer-events-none transition-opacity"
          style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-emerald-200">
            {currentConfig.afterLabel} {language === 'ar' ? '(بعد)' : '(After)'}
          </span>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#FFF0B8] via-[#D4AF37] to-[#AA820A] shadow-[0_0_12px_rgba(212,175,55,0.9)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0E1838] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.7)] flex items-center justify-center text-[#F3D578] group-hover:scale-110 transition-transform">
            <MoveHorizontal className="w-5 h-5 text-[#F3D578]" />
          </div>
        </div>

        {/* Bottom Hint Banner */}
        <div className="absolute bottom-2 inset-x-4 py-1.5 px-3 rounded-lg bg-black/70 backdrop-blur-sm z-10 flex items-center justify-between text-[11px] text-slate-300 pointer-events-none">
          <span>{t.sliderHint}</span>
          <span className="font-mono text-[#F3D578]">{Math.round(sliderPosition)}%</span>
        </div>
      </div>

      {/* Explanatory subtitle */}
      <p className="mt-2.5 text-xs text-center text-slate-400 max-w-lg leading-relaxed">
        {currentConfig.tagline}
      </p>
    </div>
  );
};
