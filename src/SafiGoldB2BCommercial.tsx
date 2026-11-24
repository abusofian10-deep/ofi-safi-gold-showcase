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

// --- Executive B2B Badge Component ---
interface B2BBadgeProps {
  headline: string;
  subtext?: string;
  highlightTag?: string;
  showFrame: number;
  hideFrame: number;
  tag?: string;
}

const B2BExecutiveBadge: React.FC<B2BBadgeProps> = ({
  headline,
  subtext,
  highlightTag,
  showFrame,
  hideFrame,
  tag = "شريكك في النمو والربحية",
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

        {/* Executive Pill Tag */}
        <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(197,160,89,0.35)] bg-[rgba(197,160,89,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#E6C875] animate-pulse" />
          <span className="text-sm font-semibold text-[#F3DC9B] tracking-wider font-tajawal">
            {tag}
          </span>
        </div>

        {/* Headline */}
        <h2
          className="text-4xl font-black text-white mb-2.5 tracking-wide font-cairo"
          style={{
            textShadow:
              "0 3px 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 160, 89, 0.35)",
          }}
        >
          {headline}
        </h2>

        {/* Subtext */}
        {subtext && (
          <p className="text-2xl font-bold text-[#F3DC9B] font-cairo tracking-wide">
            {subtext}
          </p>
        )}

        {/* Highlighted Gold Tag (e.g. Scene 3) */}
        {highlightTag && (
          <div
            className="mt-3 px-6 py-2 rounded-2xl border border-[rgba(230,200,117,0.8)] shadow-lg inline-flex items-center"
            style={{
              background:
                "linear-gradient(90deg, rgba(197,160,89,0.35) 0%, rgba(243,220,155,0.45) 50%, rgba(197,160,89,0.35) 100%)",
              boxShadow: "0 0 20px rgba(230, 200, 117, 0.4)",
            }}
          >
            <span className="text-2xl font-black text-white font-tajawal tracking-wide">
              {highlightTag}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Safi Gold B2B Commercial Video Component ---
// Duration: 960 frames (32.0s @ 30 FPS)
// Voiceover runs from 00:00 to ~30.6s, with 1.4s hold on the Executive End Card before smooth fade.
export const SafiGoldB2BCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 1: Frames 0 to 186 (00:00 to 00:06.2)
  // Fade in from black in first 0.3s (9 frames)
  const scene1FadeIn = interpolate(frame, [0, 9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2 Crossfade: 12 frames (0.4s) from frame 174 to 186
  const scene2Crossfade = interpolate(frame, [174, 186], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 3 Crossfade: 12 frames (0.4s) from frame 354 to 366
  const scene3Crossfade = interpolate(frame, [354, 366], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4 Crossfade: 12 frames (0.4s) from frame 564 to 576
  const scene4Crossfade = interpolate(frame, [564, 576], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Executive End Card Overlay: Starts at frame 660 (00:22.0) through frame 960 (00:32.0)
  const endCardSpring = spring({
    frame: frame - 660,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 80 },
  });

  const endCardOpacity = interpolate(frame, [660, 680], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endCardTranslateY = interpolate(endCardSpring, [0, 1], [35, 0]);
  const endCardScale = interpolate(endCardSpring, [0, 1], [0.92, 1]);

  // Subtle continuous zoom on endcard background
  const endCardBgScale = interpolate(frame, [660, 960], [1, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Master Outro Fade to Black (last 15 frames: 945 to 960)
  const finalFadeOut = interpolate(frame, [945, 960], [1, 0], {
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
        src={staticFile("assets/Sample 2/voiceover.mp3")}
        volume={1.0}
      />

      {/* 2. Video Track Layer (All 4 clips in order) */}
      <div className="absolute inset-0 w-full h-full">
        {/* Scene 1: Shelf Crowding & Eye-Catching Identity (00:00 to 00:06.2 -> frames 0 to 186) */}
        <Sequence durationInFrames={186}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene1FadeIn }}
          >
            <Video
              src={staticFile("assets/Sample 2/v2-1_99379bdb.mp4")}
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

        {/* Scene 2: Integrated Product Family (00:05.8 to 00:12.2 -> frames 174 to 366) */}
        <Sequence from={174} durationInFrames={192}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene2Crossfade }}
          >
            <Video
              src={staticFile("assets/Sample 2/V2-2_2f5e3d16.mp4")}
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

        {/* Scene 3: Marketing Support & Fast Turnover (00:11.8 to 00:19.2 -> frames 354 to 576) */}
        <Sequence from={354} durationInFrames={222}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene3Crossfade }}
          >
            <Video
              src={staticFile("assets/Sample 2/V2-3_65d97cf6.mp4")}
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

        {/* Scene 4: Premium Hypermarket Shelving & Growth Partnership (00:18.8 to 00:32.0 -> frames 564 to 960) */}
        <Sequence from={564} durationInFrames={396}>
          <div
            className="absolute inset-0 w-full h-full"
            style={{ opacity: scene4Crossfade }}
          >
            <Video
              src={staticFile("assets/Sample 2/V2-4_98727b37.mp4")}
              muted
              playbackRate={0.65}
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
      {/* Scene 1 Badge (00:00.8 to 00:05.5 -> frames 24 to 165) */}
      <B2BExecutiveBadge
        headline="في زحمة الرف.."
        subtext="الهوية القوية هي اللي بتخطف العين"
        showFrame={24}
        hideFrame={165}
        tag="التميز على الرف"
      />

      {/* Scene 2 Badge (00:06.8 to 00:11.5 -> frames 204 to 345) */}
      <B2BExecutiveBadge
        headline="عائلة منتجات متكاملة"
        subtext="حليب وموزاريلا بهوية موحّدة"
        showFrame={204}
        hideFrame={345}
        tag="قوة التشكيلة الاستهلاكية"
      />

      {/* Scene 3 Highlight Bar (00:12.8 to 00:18.5 -> frames 384 to 555) */}
      <B2BExecutiveBadge
        headline="دعم تسويقي مستمر"
        highlightTag="= دوران أسرع على الرف"
        showFrame={384}
        hideFrame={555}
        tag="عائد ربحي استثنائي"
      />

      {/* 5. Executive End Card Overlay (Starts 00:22.0 -> frames 660 to 960) */}
      {frame >= 655 && (
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
                "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(18, 22, 34, 0.92) 0%, rgba(10, 13, 20, 0.96) 70%, rgba(5, 6, 10, 0.99) 100%)",
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
                  src={staticFile("assets/Sample 2/ofi_logo.png")}
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
                  src={staticFile("assets/Sample 2/made_in_oman.png")}
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

            {/* Bold Arabic B2B Headline */}
            <h1
              className="text-5xl font-black text-white leading-tight mb-6 font-cairo"
              style={{
                textShadow:
                  "0 4px 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(197, 160, 89, 0.35)",
              }}
            >
              <span className="text-[#F3DC9B] block mb-2 font-tajawal">صافي الذهبي..</span>
              <span>شريكك التجاري لنمو المبيعات</span>
            </h1>

            {/* Sub-Brand Pill Badge */}
            <div className="mt-2 inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[rgba(230,200,117,0.45)] bg-[rgba(197,160,89,0.14)]">
              <span className="w-3 h-3 rounded-full bg-[#E6C875] animate-pulse" />
              <span className="text-2xl font-bold text-[#F3DC9B] tracking-wider font-cairo">
                شركة الصناعات الغذائية لما وراء البحار (OFI)
              </span>
            </div>

            {/* B2B Partnership Promise Text */}
            <p className="mt-6 text-xl text-[#CBD5E1]/90 font-medium font-tajawal tracking-wide">
              توريد موثوق • أسعار تنافسية • جودة استثنائية تُعزز مبيعاتكم
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
