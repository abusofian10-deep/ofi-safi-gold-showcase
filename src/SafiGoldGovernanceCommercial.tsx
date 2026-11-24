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

// --- Institutional Lower-Third Badge Component ---
interface GovernanceBadgeProps {
  headline: string;
  tag?: string;
  showFrame: number;
  hideFrame: number;
}

const GovernanceBadge: React.FC<GovernanceBadgeProps> = ({
  headline,
  tag = "حوكمة وتشغيل مؤسسي",
  showFrame,
  hideFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame: frame - showFrame,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 85 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [40, 0]);
  const opacityIn = interpolate(
    frame,
    [showFrame, showFrame + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Exit interpolation
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
      dir="rtl"
      className="absolute bottom-[300px] right-8 left-8 flex flex-col items-center pointer-events-none select-none z-30 font-cairo"
      style={{
        opacity: totalOpacity,
        transform: `translateY(${currentTranslateY}px)`,
      }}
    >
      {/* Sleek Dark-Glass Corporate Card */}
      <div
        className="w-full max-w-[960px] p-7 rounded-3xl border border-[rgba(230,200,117,0.45)] backdrop-blur-2xl flex flex-col items-center text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(16, 21, 35, 0.92) 0%, rgba(26, 22, 14, 0.95) 100%)",
          boxShadow:
            "0 30px 60px -12px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 235, 175, 0.4)",
        }}
      >
        {/* Golden Shimmer Accent at Top */}
        <div
          className="absolute top-0 right-10 left-10 h-[2.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #C5A059 25%, #FFF0B8 50%, #C5A059 75%, transparent 100%)",
            boxShadow: "0 0 12px rgba(243, 220, 155, 0.85)",
          }}
        />

        {/* Governance Pill Tag */}
        <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(197,160,89,0.35)] bg-[rgba(197,160,89,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse" />
          <span className="text-sm font-semibold text-[#F3DC9B] tracking-wider font-tajawal">
            {tag}
          </span>
        </div>

        {/* Headline */}
        <h2
          className="text-4xl font-black text-white tracking-wide font-cairo leading-relaxed"
          style={{
            textShadow:
              "0 3px 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 160, 89, 0.35)",
          }}
        >
          {headline}
        </h2>
      </div>
    </div>
  );
};

// --- Main Safi Gold Governance Commercial Video Component (Sample 3) ---
// Duration: 1200 frames (40.0s @ 30 FPS)
// Voiceover runs from 00:00 to ~38.4s, ending cleanly ~1.6s after the last spoken word.
export const SafiGoldGovernanceCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 1: Frames 0 to 240 (00:00 to 00:08)
  // Fade in from black in first 0.3s (9 frames)
  const scene1FadeIn = interpolate(frame, [0, 9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2 Crossfade: 12 frames (0.4s) from frame 228 to 240
  const scene2Crossfade = interpolate(frame, [228, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3 Crossfade: 12 frames (0.4s) from frame 468 to 480
  const scene3Crossfade = interpolate(frame, [468, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4 Crossfade: 12 frames (0.4s) from frame 678 to 690
  const scene4Crossfade = interpolate(frame, [678, 690], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Corporate End Card Overlay: Starts at frame 795 (00:26.5) through frame 1200 (00:40.0)
  const endCardSpring = spring({
    frame: frame - 795,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 80 },
  });

  const endCardOpacity = interpolate(frame, [795, 815], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endCardTranslateY = interpolate(endCardSpring, [0, 1], [35, 0]);
  const endCardScale = interpolate(endCardSpring, [0, 1], [0.92, 1]);

  // Subtle continuous zoom on endcard background
  const endCardBgScale = interpolate(frame, [795, 1200], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Master Outro Fade to Black (last 15 frames: 1185 to 1200)
  const finalFadeOut = interpolate(frame, [1185, 1200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-black overflow-hidden font-cairo select-none"
      style={{ opacity: finalFadeOut }}
    >
      {/* 1. Master Audio Layer: voiceover audio across full duration */}
      <Audio
        src={staticFile("assets/Sample 3/voiceover.mp3")}
        volume={1.0}
      />

      {/* 2. Video Track Layer (All 4 clips in exact order) */}
      <div className="absolute inset-0 w-full h-full">
        {/* Clip 1: Automated Factory Production Line (00:00 to 00:08 -> frames 0 to 240) */}
        <Sequence durationInFrames={240}>
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
                // eslint-disable-next-line @remotion/no-object-fit-on-media-video
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>

        {/* Clip 2: Quality Control Lab & Omani QC Engineer (00:07.6 to 00:16.0 -> frames 228 to 480) */}
        <Sequence from={228} durationInFrames={252}>
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
                // eslint-disable-next-line @remotion/no-object-fit-on-media-video
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>

        {/* Clip 3: Cold-Chain Logistics & Warehouse (-18°C) (00:15.6 to 00:23.0 -> frames 468 to 690) */}
        <Sequence from={468} durationInFrames={222}>
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
                // eslint-disable-next-line @remotion/no-object-fit-on-media-video
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>

        {/* Clip 4: Hypermarket Shelf & Corporate Closing (00:22.6 to 00:40.0 -> frames 678 to 1200) */}
        <Sequence from={678} durationInFrames={522}>
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
                // eslint-disable-next-line @remotion/no-object-fit-on-media-video
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>
      </div>

      {/* 3. Subtle Readability Dark Gradient at Bottom (Mobile UI Protection) */}
      <div
        className="absolute inset-x-0 bottom-0 h-[480px] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Subtle Top Gradient for Mobile Status Bar Protection */}
      <div
        className="absolute inset-x-0 top-0 h-[220px] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* 4. Animated Executive Badges */}
      {/* Clip 1 Badge (00:01 to 00:07.5 -> frames 30 to 225) */}
      <GovernanceBadge
        headline="خطوط إنتاج حديثة ومعايير تصنيع دقيقة"
        tag="بنية تحتية صناعية متطورة"
        showFrame={30}
        hideFrame={225}
      />

      {/* Clip 2 Badge (00:09 to 00:15.5 -> frames 270 to 465) */}
      <GovernanceBadge
        headline="حوكمة جودة وفحص مخبري في كل مرحلة"
        tag="رقابة معملية صارمة"
        showFrame={270}
        hideFrame={465}
      />

      {/* Clip 3 Badge (00:17 to 00:22.5 -> frames 510 to 675) */}
      <GovernanceBadge
        headline="سلسلة تبريد (-18°م) وتوريد منتظم بدون انقطاع"
        tag="سلسلة إمداد ولوجستيات معتمدة"
        showFrame={510}
        hideFrame={675}
      />

      {/* 5. Corporate End Card Overlay (Starts 00:26.5 -> frames 795 to 1200) */}
      {frame >= 790 && (
        <div
          dir="rtl"
          className="absolute inset-0 z-40 flex flex-col items-center justify-center p-8 select-none"
          style={{
            opacity: endCardOpacity,
          }}
        >
          {/* Backdrop Blur with Sleek Warm Dark-Gold Gradient leveraging shelf bokeh */}
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              background:
                "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(16, 20, 32, 0.90) 0%, rgba(8, 11, 18, 0.95) 70%, rgba(4, 5, 8, 0.98) 100%)",
              transform: `scale(${endCardBgScale})`,
            }}
          />

          {/* Golden Ambient Glow in center */}
          <div
            className="absolute w-[680px] h-[680px] rounded-full blur-[140px] pointer-events-none opacity-35"
            style={{
              background:
                "radial-gradient(circle, #C5A059 0%, rgba(197, 160, 89, 0.12) 60%, transparent 80%)",
            }}
          />

          {/* End Card Content Container */}
          <div
            className="relative z-10 flex flex-col items-center justify-center text-center max-w-[960px] w-full"
            style={{
              transform: `translateY(${endCardTranslateY}px) scale(${endCardScale})`,
            }}
          >
            {/* Top / Center Logos Container (Seamless White Pill Card) */}
            <div
              className="px-8 py-8 rounded-[36px] border-2 border-[rgba(230,200,117,0.7)] backdrop-blur-2xl flex items-center justify-center gap-10 mb-10 w-full max-w-[940px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 250, 252, 0.97) 100%)",
                boxShadow:
                  "0 35px 80px -15px rgba(0, 0, 0, 0.85), 0 0 45px rgba(197, 160, 89, 0.45)",
              }}
            >
              {/* OFI Factory Logo */}
              <div className="flex-1 flex items-center justify-center h-36">
                <Img
                  src={staticFile("assets/Sample 3/ofi_logo.png")}
                  alt="Overseas Food Industries Logo"
                  className="h-36 max-w-[420px] w-auto object-contain"
                  style={{
                    filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.18))",
                  }}
                />
              </div>

              {/* Clean Vertical Divider */}
              <div className="w-[2.5px] h-28 bg-gradient-to-b from-transparent via-[#C5A059] to-transparent" />

              {/* Made in Oman Logo */}
              <div className="flex-1 flex items-center justify-center h-36">
                <Img
                  src={staticFile("assets/Sample 3/made_in_oman.png")}
                  alt="Made in Oman"
                  className="h-32 max-w-[420px] w-auto object-contain"
                  style={{
                    filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15))",
                  }}
                />
              </div>
            </div>

            {/* Brand Accent Shimmer Line */}
            <div
              className="w-56 h-[2.5px] mb-8"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #C5A059 25%, #FFF0B8 50%, #C5A059 75%, transparent 100%)",
                boxShadow: "0 0 14px rgba(230, 200, 117, 0.8)",
              }}
            />

            {/* Corporate Title Below Logos */}
            <h2
              className="text-4xl font-black text-[#F3DC9B] mb-4 font-cairo tracking-wide"
              style={{
                textShadow:
                  "0 3px 25px rgba(0, 0, 0, 0.8), 0 0 35px rgba(197, 160, 89, 0.4)",
              }}
            >
              عبر البحار للصناعات الغذائية (OFI)
            </h2>

            {/* Bold Gold/White Headline */}
            <h1
              className="text-5xl font-black text-white leading-tight mb-7 font-cairo"
              style={{
                textShadow:
                  "0 4px 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(197, 160, 89, 0.35)",
              }}
            >
              <span className="text-[#E6C875] block mb-2 font-tajawal">جودة محوكمة..</span>
              <span>وثقة مستدامة على كل رف</span>
            </h1>

            {/* Sub-Brand Pill Badge */}
            <div className="mt-1 inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[rgba(230,200,117,0.45)] bg-[rgba(197,160,89,0.14)]">
              <span className="w-3 h-3 rounded-full bg-[#E6C875] animate-pulse" />
              <span className="text-2xl font-bold text-[#F3DC9B] tracking-wider font-cairo">
                صافي الذهبي (Safi GOLD)
              </span>
            </div>

            {/* Corporate Governance Seal Text */}
            <p className="mt-6 text-xl text-[#CBD5E1]/90 font-medium font-tajawal tracking-wide">
              التزام راسخ بأعلى معايير سلامة الغذاء والصناعة الوطنية
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
