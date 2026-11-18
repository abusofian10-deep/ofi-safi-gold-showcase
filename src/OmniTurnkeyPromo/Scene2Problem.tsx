import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title entrance
  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 85 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  // Cards definitions
  const challenges = [
    {
      num: "01",
      title: "تشتت العمليات التشغيلية",
      desc: "غياب التنسيق المحكم بين الإدارات وازدواجية المهام وتضارب القرارات التنفيذية اليومية.",
      icon: (
        <svg
          className="w-10 h-10 text-[#C5A059]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>
      ),
    },
    {
      num: "02",
      title: "غياب الرقابة وإدارة المخاطر",
      desc: "ضعف آليات الامتثال المؤسسي وغياب مصفوفة الصلاحيات والحوكمة التي تحمي أصول الشركة.",
      icon: (
        <svg
          className="w-10 h-10 text-[#C5A059]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
    },
    {
      num: "03",
      title: "بطء التحول الرقمي والأتمتة",
      desc: "الاعتماد المرهق على الأنظمة اليدوية والتقليدية وتأخر دمج برمجيات ERP والذكاء الاصطناعي.",
      icon: (
        <svg
          className="w-10 h-10 text-[#C5A059]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
    },
  ];

  // Exit transition (Frames 275 to 300)
  const exitOpacity = interpolate(frame, [275, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [275, 300], [0, -30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      dir="rtl"
      className="flex flex-col items-center justify-center px-16 font-cairo select-none"
      style={{
        opacity: enterOpacity * exitOpacity,
        transform: `translateY(${exitY}px)`,
      }}
    >
      {/* Audio: Scene Transition Whoosh */}
      <Audio src={staticFile("audio/whoosh.wav")} volume={0.25} />

      {/* Audio: Voiceover for Scene 2 */}
      <Sequence from={5}>
        <Audio src={staticFile("voiceover/scene2.mp3")} volume={1.0} />
      </Sequence>

      {/* Audio: Card Pops/Ticks */}
      <Sequence from={35}>
        <Audio src={staticFile("audio/tick.wav")} volume={0.2} />
      </Sequence>
      <Sequence from={53}>
        <Audio src={staticFile("audio/tick.wav")} volume={0.2} />
      </Sequence>
      <Sequence from={71}>
        <Audio src={staticFile("audio/tick.wav")} volume={0.2} />
      </Sequence>

      {/* Category Pill Tag */}
      <div
        style={{
          transform: `translateY(${titleY * 0.5}px)`,
          opacity: interpolate(frame, [10, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
        className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(197,160,89,0.35)] bg-[rgba(197,160,89,0.08)] backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
        <span className="text-sm font-semibold text-[#F3DC9B] tracking-wider uppercase font-inter">
          واقع الأعمال | Corporate Challenges
        </span>
      </div>

      {/* Main Question Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: interpolate(frame, [15, 35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
        className="text-center mb-14 max-w-4xl"
      >
        <h2 className="text-5xl font-black text-white leading-tight">
          هل تواجه مؤسستك <span className="text-[#F3DC9B] underline decoration-[#C5A059]/40 decoration-wavy underline-offset-8">تحديات حقيقية</span> في النمو أو الحوكمة؟
        </h2>
      </div>

      {/* 3 Staggered Glassmorphic Cards */}
      <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
        {challenges.map((c, i) => {
          const cardDelay = 35 + i * 18;
          const cardSpring = spring({
            frame: frame - cardDelay,
            fps,
            config: { damping: 14, mass: 0.85, stiffness: 85 },
          });

          const cardY = interpolate(cardSpring, [0, 1], [50, 0]);
          const cardOpacity = interpolate(
            frame,
            [cardDelay, cardDelay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Subtle float
          const float = Math.sin((frame + i * 30) * 0.05) * 4;

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY + float}px)`,
                background:
                  "linear-gradient(145deg, rgba(28, 37, 65, 0.75) 0%, rgba(14, 23, 46, 0.85) 100%)",
                boxShadow: "0 20px 45px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(197, 160, 89, 0.25)",
              }}
              className="relative rounded-2xl p-8 border border-[rgba(197,160,89,0.22)] backdrop-blur-xl flex flex-col justify-between"
            >
              {/* Card Number Watermark */}
              <div className="absolute top-4 left-5 text-4xl font-black text-[rgba(197,160,89,0.12)] font-inter select-none">
                {c.num}
              </div>

              <div>
                {/* Icon with illuminated circle */}
                <div className="w-16 h-16 rounded-xl bg-[rgba(197,160,89,0.12)] border border-[rgba(197,160,89,0.3)] flex items-center justify-center mb-6 shadow-lg shadow-[rgba(197,160,89,0.1)]">
                  {c.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
                  {c.title}
                </h3>

                {/* Card Description */}
                <p className="text-base text-[#CBD5E1] leading-relaxed font-normal">
                  {c.desc}
                </p>
              </div>

              {/* Bottom Subtle Accent Bar */}
              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs text-[#C5A059] font-medium font-inter">
                <span>IMPACT FACTOR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
