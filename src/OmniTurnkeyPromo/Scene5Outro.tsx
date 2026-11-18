import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 1. Logo entrance (Starts at frame 5)
  const logoSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 85 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.8, 1]);
  const logoY = interpolate(logoSpring, [0, 1], [25, 0]);

  // 2. Slogan entrance (Starts at frame 25)
  const sloganSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 85 },
  });
  const sloganOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sloganY = interpolate(sloganSpring, [0, 1], [20, 0]);

  // 3. CTA Banner entrance (Starts at frame 50)
  const ctaSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 13, mass: 0.8, stiffness: 90 },
  });
  const ctaOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(ctaSpring, [0, 1], [30, 0]);
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.92, 1]);

  // Master Fade out in the last second (Frames 280 to 310)
  const masterFadeOut = interpolate(frame, [280, 310], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="flex flex-col items-center justify-center font-cairo select-none overflow-hidden"
      style={{
        opacity: enterOpacity * masterFadeOut,
      }}
    >
      {/* Audio: Scene Transition Whoosh */}
      <Audio src={staticFile("audio/whoosh.wav")} volume={0.25} />

      {/* Audio: Voiceover for Scene 5 */}
      <Sequence from={5}>
        <Audio src={staticFile("voiceover/scene5.mp3")} volume={1.0} />
      </Sequence>

      {/* Audio: CTA Pop/Tick */}
      <Sequence from={50}>
        <Audio src={staticFile("audio/tick.wav")} volume={0.25} />
      </Sequence>

      <div className="relative flex flex-col items-center justify-center z-10 text-center">
        {/* Soft Central Radial Glow behind logo */}
        <div
          className="absolute -inset-36 rounded-full pointer-events-none blur-3xl opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(197, 160, 89, 0.28) 0%, transparent 70%)",
          }}
        />

        {/* 1. Transparent Cropped Logo */}
        <div
          style={{
            transform: `translateY(${logoY}px) scale(${logoScale})`,
          }}
          className="mb-6 flex items-center justify-center"
        >
          <Img
            src={staticFile("logo.png")}
            alt="Omni Turnkey Logo"
            className="h-28 w-auto object-contain"
            style={{
              filter:
                "drop-shadow(0 10px 35px rgba(197, 160, 89, 0.4)) drop-shadow(0 2px 10px rgba(0,0,0,0.7))",
            }}
          />
        </div>

        {/* Brand Name */}
        <div className="mb-4">
          <h2 className="text-4xl font-black text-white uppercase tracking-[0.22em] font-inter">
            OMNI TURNKEY
          </h2>
        </div>

        {/* 2. Formal Arabic Slogan */}
        <div
          dir="rtl"
          style={{
            opacity: sloganOpacity,
            transform: `translateY(${sloganY}px)`,
          }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-4xl font-bold text-[#F3DC9B] leading-normal font-cairo mb-2">
            نبني معك مؤسسات مستدامة.. جاهزة للمستقبل
          </p>
          <p className="text-sm font-medium text-[#CBD5E1] tracking-widest font-inter uppercase">
            Building Sustainable, Future-Ready Enterprises
          </p>
        </div>

        {/* 3. Call to Action (CTA) Banner */}
        <div
          dir="rtl"
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px) scale(${ctaScale})`,
            boxShadow:
              "0 15px 40px rgba(197, 160, 89, 0.35), 0 0 20px rgba(197, 160, 89, 0.2)",
          }}
          className="px-10 py-5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E6C875] to-[#C5A059] text-[#0B132B] font-bold text-2xl flex items-center gap-4 cursor-default border border-[#FFF0B8]"
        >
          <span className="font-cairo">
            تواصل معنا اليوم لبدء رحلة التحول
          </span>
          <span className="text-[#0B132B]/50 font-normal">|</span>
          <span className="font-inter font-black tracking-wider text-xl">
            Omni Turnkey
          </span>
          <svg
            className="w-7 h-7 text-[#0B132B] transform rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>

        {/* Secondary Details */}
        <div
          style={{
            opacity: ctaOpacity,
          }}
          className="mt-6 flex items-center gap-4 text-xs text-[#CBD5E1]/70 font-inter tracking-widest uppercase"
        >
          <span>GOVERNANCE</span>
          <span>•</span>
          <span>RESTRUCTURING</span>
          <span>•</span>
          <span>DIGITAL TRANSFORMATION</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
