import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface OmniTurnkeyIntroProps {
  title?: string;
  tagline?: string;
  goldColor?: string;
  logoSrc?: string;
}

export const OmniTurnkeyIntro: React.FC<OmniTurnkeyIntroProps> = ({
  title = "OMNI TURNKEY",
  tagline = "Strategic Governance & Integrated Management Consulting",
  goldColor = "#C5A059",
  logoSrc = staticFile("logo.png"),
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Line Animation (Seconds 0 to 1.5 -> frames 0 to 45)
  const lineSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
      mass: 0.9,
      stiffness: 75,
    },
  });

  const lineWidth = interpolate(lineSpring, [0, 1], [0, 680]);
  const lineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Logo Animation (Starts at 0.5s -> frame 15, half a second before the title)
  const logoSpring = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 80,
    },
  });

  const logoOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.85, 1]);
  const logoTranslateY = interpolate(logoSpring, [0, 1], [22, 0]);

  // 3. Title Animation (Seconds 1 to 3 -> frames 30 to 90)
  const titleSpring = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 13,
      mass: 0.8,
      stiffness: 85,
    },
  });

  const titleOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleTranslateY = interpolate(titleSpring, [0, 1], [30, 0]);
  const titleLetterSpacing = interpolate(titleSpring, [0, 1], [0.36, 0.28]);

  // 4. Tagline Animation (Seconds 2.5 to 4.5 -> frames 75 to 135)
  const taglineSpring = spring({
    frame: frame - 75,
    fps,
    config: {
      damping: 15,
      mass: 0.9,
      stiffness: 80,
    },
  });

  const taglineOpacity = interpolate(frame, [75, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineTranslateY = interpolate(taglineSpring, [0, 1], [-18, 0]);

  // 5. Subtle Breathing Scale (Seconds 0 to 6)
  const subtleScale = interpolate(frame, [0, 180], [0.985, 1.025], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 6. Final Fade Out (Seconds 5.5 to 6 -> frames 165 to 180)
  const masterFadeOut = interpolate(frame, [165, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background Grid movement / parallax
  const gridTranslate = interpolate(frame, [0, 180], [0, 15]);

  return (
    <AbsoluteFill
      style={{
        opacity: masterFadeOut,
        background: "radial-gradient(ellipse at 50% 50%, #1C2541 0%, #0E172E 60%, #0B132B 100%)",
      }}
      className="flex items-center justify-center font-sans overflow-hidden select-none"
    >
      {/* Subtle Geometric Governance Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${gridTranslate * 0.5}px)`,
          backgroundImage: `
            linear-gradient(to right, rgba(197, 160, 89, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: "center center",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Subtle Geometric Institutional Accents in the 4 corners of the viewport */}
      <div className="absolute inset-16 pointer-events-none opacity-25">
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#C5A059]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C5A059]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#C5A059]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#C5A059]" />
      </div>

      {/* Main Container with subtle breathing scale */}
      <div
        className="relative flex flex-col items-center justify-center z-10"
        style={{
          transform: `scale(${subtleScale})`,
        }}
      >
        {/* Soft Central Radial Glow behind logo and typography */}
        <div
          className="absolute -inset-28 rounded-full pointer-events-none blur-3xl opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, rgba(28, 37, 65, 0) 70%)",
          }}
        />

        {/* Brand Logo: Appears at 0.5s with Fade-in & Scale */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoTranslateY}px) scale(${logoScale})`,
          }}
          className="mb-5 flex items-center justify-center"
        >
          <Img
            src={logoSrc}
            alt="Omni Turnkey Logo"
            className="w-28 h-28 object-contain"
            style={{
              filter:
                "drop-shadow(0 6px 28px rgba(197, 160, 89, 0.32)) drop-shadow(0 2px 12px rgba(0, 0, 0, 0.6))",
            }}
          />
        </div>

        {/* Title: OMNI TURNKEY */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            letterSpacing: `${titleLetterSpacing}em`,
          }}
          className="mb-6 text-center"
        >
          <h1
            className="text-6xl font-black text-white tracking-[0.28em] uppercase"
            style={{
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(197, 160, 89, 0.18)",
              fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Central Geometric Line Container */}
        <div
          className="relative flex items-center justify-center my-1"
          style={{
            opacity: lineOpacity,
            width: `${lineWidth}px`,
            height: "2px",
          }}
        >
          {/* Main Horizontal Gradient Line */}
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${goldColor} 20%, #E6C875 50%, ${goldColor} 80%, transparent 100%)`,
              boxShadow: `0 0 12px ${goldColor}66`,
            }}
          />

          {/* Central Diamond Accent Node */}
          <div
            className="absolute w-2 h-2 rotate-45"
            style={{
              backgroundColor: "#E6C875",
              boxShadow: `0 0 10px #E6C875`,
              opacity: interpolate(lineSpring, [0.4, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        </div>

        {/* Subtitle / Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineTranslateY}px)`,
          }}
          className="mt-6 text-center max-w-3xl"
        >
          <p
            className="text-lg font-medium text-[#CBD5E1] tracking-[0.24em] uppercase"
            style={{
              letterSpacing: "0.22em",
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.7)",
            }}
          >
            {tagline}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
