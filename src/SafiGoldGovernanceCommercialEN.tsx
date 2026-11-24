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
  Video,
} from "remotion";

interface GovernanceBadgeProps {
  title: string;
  subtitle: string;
  showFrame: number;
  hideFrame: number;
  badgeTag?: string;
  accentColor?: string;
}

const GovernanceBadgeEN: React.FC<GovernanceBadgeProps> = ({
  title,
  subtitle,
  showFrame,
  hideFrame,
  badgeTag = "Institutional Governance",
  accentColor = "#E6C875",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: frame - showFrame,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 85 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacityIn = interpolate(
    frame,
    [showFrame, showFrame + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacityOut = interpolate(
    frame,
    [hideFrame, hideFrame + 14],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitTranslateY = interpolate(
    frame,
    [hideFrame, hideFrame + 14],
    [0, 20],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const totalOpacity = opacityIn * opacityOut;
  const currentTranslateY = translateY + exitTranslateY;

  if (frame < showFrame || frame > hideFrame + 16) {
    return null;
  }

  return (
    <div
      dir="ltr"
      className="absolute bottom-[280px] right-8 left-8 flex flex-col items-center pointer-events-none select-none z-30 font-sans"
      style={{
        opacity: totalOpacity,
        transform: `translateY(${currentTranslateY}px)`,
      }}
    >
      <div
        className="w-full max-w-[980px] p-6 rounded-3xl border border-[rgba(230,200,117,0.45)] backdrop-blur-2xl flex flex-col items-center text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(14, 20, 36, 0.92) 0%, rgba(20, 32, 54, 0.95) 100%)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 235, 175, 0.35)",
        }}
      >
        <div
          className="absolute top-0 right-10 left-10 h-[2.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #C5A059 25%, #FFF0B8 50%, #C5A059 75%, transparent 100%)",
            boxShadow: "0 0 12px rgba(243, 220, 155, 0.85)",
          }}
        />

        <div className="mb-2.5 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[rgba(197,160,89,0.35)] bg-[rgba(197,160,89,0.15)]">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-sm font-semibold text-[#F3DC9B] tracking-wider uppercase">
            {badgeTag}
          </span>
        </div>

        <h2
          className="text-3xl font-black text-white mb-2 tracking-wide"
          style={{
            textShadow:
              "0 3px 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 160, 89, 0.35)",
          }}
        >
          {title}
        </h2>

        <p className="text-xl font-bold text-[#F3DC9B] tracking-wide flex items-center gap-2">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export const SafiGoldGovernanceCommercialEN: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scene1FadeIn = interpolate(frame, [0, 9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene2Crossfade = interpolate(frame, [150, 165], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene3Crossfade = interpolate(frame, [300, 315], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene4Crossfade = interpolate(frame, [450, 465], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const endCardSpring = spring({
    frame: frame - 570,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 80 },
  });

  const endCardOpacity = interpolate(frame, [570, 585], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const endCardScale = interpolate(endCardSpring, [0, 1], [0.94, 1.0]);
  const endCardTranslateY = interpolate(endCardSpring, [0, 1], [30, 0]);

  return (
    <AbsoluteFill className="bg-[#05070c] overflow-hidden">
      <Audio
        src={staticFile("assets/s3_en.wav")}
        volume={1.0}
      />

      <div className="absolute inset-0 w-full h-full">
        <Sequence durationInFrames={165}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene1FadeIn }}
          >
            <Video
              src={staticFile("assets/Sample 3/V3-1_cc640e99.mp4")}
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>

        <Sequence from={150} durationInFrames={165}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene2Crossfade }}
          >
            <Video
              src={staticFile("assets/Sample 3/V3-2_891dbbfd.mp4")}
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>

        <Sequence from={300} durationInFrames={165}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene3Crossfade }}
          >
            <Video
              src={staticFile("assets/Sample 3/V3-3_7258ff1c.mp4")}
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>

        <Sequence from={450} durationInFrames={300}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene4Crossfade }}
          >
            <Video
              src={staticFile("assets/Sample 3/V3-4_0dd48793.mp4")}
              muted
              playbackRate={0.42}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-[480px] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 100%)",
        }}
      />

      <GovernanceBadgeEN
        title="Modern Production Lines & Precision Standards"
        subtitle="Automated Industrial Consistency & Hygiene"
        showFrame={15}
        hideFrame={140}
        badgeTag="Industrial Excellence"
        accentColor="#2DD4BF"
      />

      <GovernanceBadgeEN
        title="Quality Governance & Lab Testing at Every Stage"
        subtitle="Rigorous GSO Standards & Chemical Safety"
        showFrame={155}
        hideFrame={290}
        badgeTag="Quality Assurance"
        accentColor="#38BDF8"
      />

      <GovernanceBadgeEN
        title="Cold Chain (-18°C) & Uninterrupted Supply"
        subtitle="Protecting Shelf Integrity & Zero Out-of-Stock"
        showFrame={305}
        hideFrame={440}
        badgeTag="Logistics Reliability"
        accentColor="#818CF8"
      />

      {frame >= 570 && (
        <div
          dir="ltr"
          className="absolute inset-0 z-40 flex flex-col items-center justify-center p-8 select-none font-sans"
          style={{
            opacity: endCardOpacity,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              background:
                "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(14, 20, 36, 0.94) 0%, rgba(8, 12, 22, 0.98) 70%, rgba(4, 6, 12, 1.0) 100%)",
            }}
          />

          <div
            className="relative z-10 flex flex-col items-center justify-center text-center max-w-[960px] w-full"
            style={{
              transform: `translateY(${endCardTranslateY}px) scale(${endCardScale})`,
            }}
          >
            <div
              className="px-8 py-8 rounded-[36px] border-2 border-[rgba(230,200,117,0.7)] backdrop-blur-2xl flex items-center justify-center gap-10 mb-10 w-full max-w-[940px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 250, 252, 0.97) 100%)",
                boxShadow:
                  "0 35px 80px -15px rgba(0, 0, 0, 0.85), 0 0 45px rgba(197, 160, 89, 0.45)",
              }}
            >
              <div className="flex-1 flex items-center justify-center h-36">
                <Img
                  src={staticFile("assets/ofi_logo.png")}
                  alt="Overseas Food Industries Logo"
                  className="h-36 max-w-[420px] w-auto object-contain"
                  style={{
                    filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.18))",
                  }}
                />
              </div>

              <div className="w-[2.5px] h-28 bg-gradient-to-b from-transparent via-[#C5A059] to-transparent" />

              <div className="flex-1 flex items-center justify-center h-36">
                <Img
                  src={staticFile("assets/made_in_oman.png")}
                  alt="Made in Oman"
                  className="h-32 max-w-[420px] w-auto object-contain"
                  style={{
                    filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15))",
                  }}
                />
              </div>
            </div>

            <div
              className="w-56 h-[2.5px] mb-8"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #C5A059 25%, #FFF0B8 50%, #C5A059 75%, transparent 100%)",
                boxShadow: "0 0 14px rgba(230, 200, 117, 0.8)",
              }}
            />

            <h1
              className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4"
              style={{
                textShadow:
                  "0 4px 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(197, 160, 89, 0.35)",
              }}
            >
              <span className="text-[#F3DC9B] block mb-2 font-bold">Overseas Food Industries (OFI)</span>
              <span>Governed Quality. Sustainable Shelf Trust.</span>
            </h1>

            <div className="mt-2 inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[rgba(230,200,117,0.45)] bg-[rgba(197,160,89,0.14)]">
              <span className="w-3 h-3 rounded-full bg-[#E6C875] animate-pulse" />
              <span className="text-xl font-bold text-[#F3DC9B] tracking-wider">
                Safi GOLD — Backed by Industrial Governance
              </span>
            </div>

            <p className="mt-6 text-xl text-[#CBD5E1]/90 font-medium tracking-wide">
              Ensuring Long-Term Commercial Contracts with Strategic Retail Chains
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
