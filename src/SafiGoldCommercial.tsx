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

// --- Lower Third Badge Component ---
interface LowerThirdProps {
  title: string;
  subtitle: string;
  showFrame: number;
  hideFrame: number;
  categoryTag?: string;
}

const LowerThirdBadge: React.FC<LowerThirdProps> = ({
  title,
  subtitle,
  showFrame,
  hideFrame,
  categoryTag = "جودة استثنائية • طعم أصيل",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring (starting at showFrame)
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

  // Exit interpolation (at hideFrame)
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
      {/* Sleek Glassmorphism Lower-Third Card */}
      <div
        className="w-full max-w-[960px] p-6 rounded-3xl border border-[rgba(230,200,117,0.45)] backdrop-blur-2xl flex flex-col items-center text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(16, 21, 35, 0.90) 0%, rgba(28, 22, 14, 0.94) 100%)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 235, 175, 0.4)",
        }}
      >
        {/* Subtle Golden Shimmer Accent at Top */}
        <div
          className="absolute top-0 right-10 left-10 h-[2.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #C5A059 25%, #FFF0B8 50%, #C5A059 75%, transparent 100%)",
            boxShadow: "0 0 12px rgba(243, 220, 155, 0.85)",
          }}
        />

        {/* Category Pill Tag */}
        <div className="mb-2.5 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[rgba(197,160,89,0.35)] bg-[rgba(197,160,89,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse" />
          <span className="text-sm font-semibold text-[#F3DC9B] tracking-wider uppercase font-tajawal">
            {categoryTag}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-4xl font-black text-white mb-2 tracking-wide font-cairo"
          style={{
            textShadow:
              "0 3px 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 160, 89, 0.35)",
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-2xl font-bold text-[#F3DC9B] font-cairo tracking-wide flex items-center gap-2">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// --- Main Commercial Video Component ---
// Total duration: 720 frames (24.0s @ 30 FPS)
// Voiceover speech runs from 0s to ~21.8s, followed by hold on End Card until 24s.
export const SafiGoldCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 1: Frames 0 to 225 (0s to 7.5s)
  // Fade in from black in first 0.4s (12 frames)
  const scene1FadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2 Crossfade (starts at frame 216 to 230)
  const scene2Crossfade = interpolate(frame, [216, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3 Crossfade (starts at frame 465 to 480)
  const scene3Crossfade = interpolate(frame, [465, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Premium End Card Overlay: Starts at frame 530 (00:17.6) through frame 720 (00:24.0)
  const endCardSpring = spring({
    frame: frame - 530,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 80 },
  });

  const endCardOpacity = interpolate(frame, [530, 550], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endCardTranslateY = interpolate(endCardSpring, [0, 1], [35, 0]);
  const endCardScale = interpolate(endCardSpring, [0, 1], [0.92, 1]);

  // Subtle continuous zoom on endcard background
  const endCardBgScale = interpolate(frame, [530, 720], [1, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Master Outro Fade to Black (last 15 frames: 705 to 720)
  const finalFadeOut = interpolate(frame, [705, 720], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-black overflow-hidden font-cairo select-none"
      style={{ opacity: finalFadeOut }}
    >
      {/* 1. Master Audio Layer: Full 22.3s voiceover plays unhindered */}
      <Audio
        src={staticFile("assets/voiceover.mp3")}
        volume={1.0}
      />

      {/* 2. Video & Visuals Track Layer */}
      <div className="absolute inset-0 w-full h-full">
        {/* Scene 1: Milk (00:00 to 00:07.5 -> frames 0 to 230) */}
        <Sequence durationInFrames={230}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene1FadeIn }}
          >
            <Video
              src={staticFile("assets/scene1_milk.mp4")}
              muted
              playbackRate={0.92}
              style={{
                width: "100%",
                height: "100%",
                // eslint-disable-next-line @remotion/no-object-fit-on-media-video
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>

        {/* Scene 2: Mozzarella (00:07.2 to 00:15.8 -> frames 216 to 480) */}
        <Sequence from={216} durationInFrames={264}>
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ opacity: scene2Crossfade }}
          >
            <Video
              src={staticFile("assets/pizza_fixed.mp4")}
              muted
              playbackRate={0.80}
              style={{
                width: "100%",
                height: "100%",
                // eslint-disable-next-line @remotion/no-object-fit-on-media-video
                objectFit: "cover",
              }}
            />
          </div>
        </Sequence>

        {/* Scene 3: Hypermarket Shelf (00:15.5 to 00:24.0 -> frames 465 to 720) */}
        <Sequence from={465} durationInFrames={255}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene3Crossfade }}
          >
            <Video
              src={staticFile("assets/scene3_shelf.mp4")}
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

      {/* 4. Animated Lower-Third Badges */}
      {/* Scene 1: Milk Powder Badge (Frames 25 to 210) */}
      <LowerThirdBadge
        title="حليب صافي الذهبي"
        subtitle="سريع الذوبان • غني بالفيتامينات"
        showFrame={25}
        hideFrame={210}
        categoryTag="حليب مجفف سريع الذوبان"
      />

      {/* Scene 2: Mozzarella Cheese Badge (Frames 245 to 455) */}
      <LowerThirdBadge
        title="موزاريلا صافي الذهبي"
        subtitle="دهون حيوانية طبيعية 100%"
        showFrame={245}
        hideFrame={455}
        categoryTag="جبنة موزاريلا فاخرة مبشورة"
      />

      {/* 5. Scene 3: Premium End Card Overlay (Frames 530 to 720) */}
      {frame >= 525 && (
        <div
          dir="rtl"
          className="absolute inset-0 z-40 flex flex-col items-center justify-center p-8 select-none"
          style={{
            opacity: endCardOpacity,
          }}
        >
          {/* Backdrop Blur with Sleek Warm Dark-Gold Gradient */}
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              background:
                "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(20, 24, 38, 0.90) 0%, rgba(12, 14, 22, 0.95) 70%, rgba(6, 7, 12, 0.98) 100%)",
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
            {/* Top / Center Logos Container (Significantly Enlarged & Prominent) */}
            <div
              className="px-8 py-8 rounded-[36px] border-2 border-[rgba(230,200,117,0.7)] backdrop-blur-2xl flex items-center justify-center gap-10 mb-10 w-full max-w-[940px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 250, 252, 0.97) 100%)",
                boxShadow:
                  "0 35px 80px -15px rgba(0, 0, 0, 0.85), 0 0 45px rgba(197, 160, 89, 0.45)",
              }}
            >
              {/* OFI Factory Logo - Extra Large & Crisp */}
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

              {/* Clean Vertical Divider */}
              <div className="w-[2.5px] h-28 bg-gradient-to-b from-transparent via-[#C5A059] to-transparent" />

              {/* Made in Oman Logo - Extra Large & Crisp */}
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

            {/* Brand Accent Shimmer Line */}
            <div
              className="w-56 h-[2.5px] mb-8"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #C5A059 25%, #FFF0B8 50%, #C5A059 75%, transparent 100%)",
                boxShadow: "0 0 14px rgba(230, 200, 117, 0.8)",
              }}
            />

            {/* Bold Arabic Headline */}
            <h1
              className="text-5xl font-black text-white leading-tight mb-6 font-cairo"
              style={{
                textShadow:
                  "0 4px 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(197, 160, 89, 0.35)",
              }}
            >
              <span className="text-[#F3DC9B] block mb-2 font-tajawal">صافي الذهبي..</span>
              <span>الاختيار الأول على الرف</span>
            </h1>

            {/* Sub-Brand Pill Badge */}
            <div className="mt-2 inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[rgba(230,200,117,0.45)] bg-[rgba(197,160,89,0.14)]">
              <span className="w-3 h-3 rounded-full bg-[#E6C875] animate-pulse" />
              <span className="text-2xl font-bold text-[#F3DC9B] tracking-wider font-cairo">
                شركة الصناعات الغذائية لما وراء البحار (OFI)
              </span>
            </div>

            {/* Quality Guarantee Seal Text */}
            <p className="mt-6 text-xl text-[#CBD5E1]/90 font-medium font-tajawal tracking-wide">
              جودة فائقة ومذاق لا يُعلى عليه لجميع أفراد العائلة
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
