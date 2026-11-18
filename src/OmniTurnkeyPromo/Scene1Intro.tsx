import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance Springs
  // Logo entrance (Starts at frame 8)
  const logoSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 85 },
  });
  const logoOpacity = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.82, 1]);
  const logoY = interpolate(logoSpring, [0, 1], [25, 0]);

  // Line Expansion (Starts at frame 25)
  const lineSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 80 },
  });
  const lineWidth = interpolate(lineSpring, [0, 1], [0, 720]);
  const lineOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title Entrance (Starts at frame 40)
  const titleSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 13, mass: 0.8, stiffness: 90 },
  });
  const titleOpacity = interpolate(frame, [40, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(titleSpring, [0, 1], [28, 0]);
  const titleLetterSpacing = interpolate(titleSpring, [0, 1], [0.36, 0.26]);

  // Arabic Subtitle Entrance (Starts at frame 60)
  const subSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 85 },
  });
  const subOpacity = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(subSpring, [0, 1], [-18, 0]);

  // Transition Out (Frames 160 to 180)
  const exitOpacity = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [160, 180], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="flex items-center justify-center font-sans overflow-hidden select-none"
      style={{
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Voiceover for Scene 1 (starts at frame 10) */}
      <Audio
        src={staticFile("voiceover/scene1.mp3")}
        volume={1.0}
        startFrom={0}
      />

      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Soft Central Radial Glow */}
        <div
          className="absolute -inset-32 rounded-full pointer-events-none blur-3xl opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, transparent 70%)",
          }}
        />

        {/* 1. Transparent Cropped Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoY}px) scale(${logoScale})`,
          }}
          className="mb-5 flex items-center justify-center"
        >
          <Img
            src={staticFile("logo.png")}
            alt="Omni Turnkey Logo"
            className="h-28 w-auto object-contain"
            style={{
              filter:
                "drop-shadow(0 8px 30px rgba(197, 160, 89, 0.35)) drop-shadow(0 2px 10px rgba(0,0,0,0.7))",
            }}
          />
        </div>

        {/* 2. English Title: OMNI TURNKEY */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            letterSpacing: `${titleLetterSpacing}em`,
          }}
          className="mb-4 text-center"
        >
          <h1
            className="text-6xl font-black text-white uppercase tracking-[0.26em] font-inter"
            style={{
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.7), 0 0 45px rgba(197, 160, 89, 0.25)",
            }}
          >
            OMNI TURNKEY
          </h1>
        </div>

        {/* 3. Central Geometric Dividing Line */}
        <div
          className="relative flex items-center justify-center my-2"
          style={{
            opacity: lineOpacity,
            width: `${lineWidth}px`,
            height: "2px",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #C5A059 20%, #F3DC9B 50%, #C5A059 80%, transparent 100%)",
              boxShadow: "0 0 14px rgba(197, 160, 89, 0.6)",
            }}
          />
          <div
            className="absolute w-2.5 h-2.5 rotate-45"
            style={{
              backgroundColor: "#F3DC9B",
              boxShadow: "0 0 12px #F3DC9B",
            }}
          />
        </div>

        {/* 4. Arabic Subtitle in Formal MSA */}
        <div
          dir="rtl"
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
          className="mt-5 text-center"
        >
          <div className="inline-block px-6 py-2 rounded-full border border-[rgba(197,160,89,0.3)] bg-[rgba(14,23,46,0.6)] backdrop-blur-md">
            <p className="text-xl font-bold text-[#CBD5E1] tracking-wide font-cairo">
              أومني تيرنكي — <span className="text-[#C5A059]">للاستشارات الإدارية المتكاملة</span>
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
