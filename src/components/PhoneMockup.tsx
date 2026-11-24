import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2 } from 'lucide-react';

interface PhoneMockupProps {
  videoSrc: string;
  caption: string;
  isActiveScreen: boolean;
  onOpenFullscreen?: () => void;
  accentTitle?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  videoSrc,
  caption,
  isActiveScreen,
  onOpenFullscreen,
  accentTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Automatically pause video when navigating away from this screen
  useEffect(() => {
    if (!isActiveScreen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActiveScreen]);

  // Handle play / pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback prevented:', err);
      });
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Handle restart
  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    });
  };

  // Video time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(curr);
    setDuration(dur);
    setProgress(dur > 0 ? (curr / dur) * 100 : 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    // In RTL, the bar flows according to direction, but coordinates are left-to-right
    videoRef.current.currentTime = pos * duration;
  };

  // Auto-hide controls during playback
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-[340px] sm:max-w-[360px] md:max-w-[380px] mx-auto">
      {/* Upper Badge */}
      {accentTitle && (
        <div className="mb-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/10 text-[#F3D578] border border-[#D4AF37]/30 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span>{accentTitle}</span>
        </div>
      )}

      {/* Realistic Phone Shell (iPhone Titanium styling) */}
      <div
        className="relative w-full aspect-[9/19.5] rounded-[48px] p-[10px] bg-gradient-to-b from-[#2E3B5B] via-[#1E2842] to-[#12192B] shadow-[0_24px_60px_-10px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.18)] border-[2.5px] border-[#D4AF37]/40 ring-1 ring-white/10"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Antenna bands / side buttons highlights */}
        <div className="absolute -left-[5px] top-28 w-[3px] h-12 bg-[#D4AF37]/40 rounded-l" />
        <div className="absolute -left-[5px] top-44 w-[3px] h-12 bg-[#D4AF37]/40 rounded-l" />
        <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-[#D4AF37]/40 rounded-r" />

        {/* Screen Bezel Area */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black flex flex-col justify-between">
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-between px-2.5 border border-white/5 shadow-md pointer-events-none">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-white/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1a2d54]" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#080808]" />
          </div>

          {/* Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            preload="metadata"
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Central Play Pulse Overlay when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              aria-label="تشغيل الفيديو"
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#0B132B]/85 border-2 border-[#D4AF37] text-[#F3D578] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-110 active:scale-95 transition-all z-20 group"
            >
              <Play className="w-7 h-7 fill-[#F3D578] translate-x-0.5 group-hover:scale-110 transition-transform" />
            </button>
          )}

          {/* Bottom Custom Control Overlay */}
          <div
            className={`absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 z-20 flex flex-col gap-2 ${
              showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Progress Bar */}
            <div
              onClick={handleSeek}
              className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative overflow-hidden transition-all group"
            >
              <div
                className="h-full bg-gradient-to-r from-[#AA820A] via-[#D4AF37] to-[#F3D578] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs text-white/90 px-0.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-1 rounded hover:bg-white/10 text-[#F3D578] transition-colors"
                  title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={handleRestart}
                  className="p-1 rounded hover:bg-white/10 text-slate-300 transition-colors"
                  title="إعادة من البداية"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1 rounded hover:bg-white/10 text-slate-300 transition-colors"
                  title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#F3D578]" />}
                </button>
                <span className="text-[11px] font-tajawal text-slate-300 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Fullscreen Button */}
              {onOpenFullscreen && (
                <button
                  onClick={onOpenFullscreen}
                  className="p-1.5 rounded-md bg-[#D4AF37]/20 hover:bg-[#D4AF37]/35 text-[#F3D578] transition-colors flex items-center gap-1 text-[11px] border border-[#D4AF37]/30"
                  title="عرض ملء الشاشة"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">تكبير</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-10 pointer-events-none" />
        </div>
      </div>

      {/* Caption beneath Mockup */}
      <div className="mt-3 text-center">
        <p className="text-xs md:text-sm font-semibold text-slate-300 font-tajawal flex items-center justify-center gap-1.5">
          <span className="text-[#D4AF37]">◀</span>
          <span>{caption}</span>
        </p>
      </div>
    </div>
  );
};
