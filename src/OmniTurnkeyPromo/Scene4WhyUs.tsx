import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene4WhyUs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Header Animation
  const headerSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 85 },
  });
  const headerY = interpolate(headerSpring, [0, 1], [30, 0]);

  // Counter 1: 0 to 17
  const count1Progress = interpolate(frame, [25, 75], [0, 17], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const count1 = Math.floor(count1Progress);

  // Counter 2: 0 to 360
  const count2Progress = interpolate(frame, [40, 95], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const count2 = Math.floor(count2Progress);

  // Counter 3: 0 to 100
  const count3Progress = interpolate(frame, [55, 105], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const count3 = Math.floor(count3Progress);

  const metrics = [
    {
      value: `+${count1}`,
      unit: "عاماً",
      title: "خبرة تنفيذية واستشارية",
      desc: "في قيادة التحول وتطوير كبرى المؤسسات والشركات الرائدة في مصر والخليج العربي.",
      icon: (
        <svg className="w-9 h-9 text-[#F3DC9B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004 0V5.625c0-.621-.504-1.125-1.125-1.125H9.375c-.621 0-1.125.504-1.125 1.125v8.625m5.004 0h-5.004" />
        </svg>
      ),
    },
    {
      value: `${count2}°`,
      unit: "شاملة",
      title: "تغطية مؤسسية متكاملة",
      desc: "رؤية تغطي كافة جوانب المنشأة: الاستراتيجية، الحوكمة، العمليات، والأتمتة الذكية.",
      icon: (
        <svg className="w-9 h-9 text-[#F3DC9B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      value: `${count3}%`,
      unit: "عملية",
      title: "حلول قابلة للتنفيذ الفوري",
      desc: "خطط تطبيقية تفصيلية ومؤشرات قياس أداء واضحة (KPIs) تضمن تحقيق النتائج الملموسة.",
      icon: (
        <svg className="w-9 h-9 text-[#F3DC9B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    },
  ];

  // Exit transition (Frames 155 to 180)
  const exitOpacity = interpolate(frame, [155, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [155, 180], [0, -30], {
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
      {/* Category Tag */}
      <div
        style={{
          transform: `translateY(${headerY * 0.5}px)`,
          opacity: interpolate(frame, [10, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
        className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(197,160,89,0.35)] bg-[rgba(197,160,89,0.08)] backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
        <span className="text-sm font-semibold text-[#F3DC9B] tracking-wider uppercase font-inter">
          الريادة والتميز | Why Omni Turnkey
        </span>
      </div>

      {/* Main Title */}
      <div
        style={{
          transform: `translateY(${headerY}px)`,
          opacity: interpolate(frame, [15, 35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
        className="text-center mb-14"
      >
        <h2 className="text-5xl font-black text-white">
          لماذا تختار <span className="text-[#F3DC9B]">أومني تيرنكي</span> شريكاً لمستقبلك؟
        </h2>
      </div>

      {/* 3 Metric Cards with Animated Counters */}
      <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
        {metrics.map((m, idx) => {
          const cardDelay = 25 + idx * 15;
          const cardSpring = spring({
            frame: frame - cardDelay,
            fps,
            config: { damping: 14, mass: 0.85, stiffness: 85 },
          });

          const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
          const cardOpacity = interpolate(
            frame,
            [cardDelay, cardDelay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={idx}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                background:
                  "linear-gradient(160deg, rgba(28, 37, 65, 0.75) 0%, rgba(14, 23, 46, 0.88) 100%)",
                boxShadow:
                  "0 20px 45px -10px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(197, 160, 89, 0.3)",
              }}
              className="relative rounded-2xl p-8 border border-[rgba(197,160,89,0.25)] backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                {/* Header of card: Icon + Unit */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[rgba(197,160,89,0.12)] border border-[rgba(197,160,89,0.35)] flex items-center justify-center shadow-lg shadow-[rgba(197,160,89,0.12)]">
                    {m.icon}
                  </div>
                  <span className="text-sm font-bold text-[#C5A059] bg-[rgba(197,160,89,0.1)] px-3 py-1 rounded-full border border-[rgba(197,160,89,0.25)]">
                    {m.unit}
                  </span>
                </div>

                {/* Big Animated Number */}
                <div className="mb-4">
                  <span
                    className="text-6xl font-black text-[#F3DC9B] font-inter tracking-tight"
                    style={{
                      textShadow: "0 0 35px rgba(197, 160, 89, 0.4)",
                    }}
                  >
                    {m.value}
                  </span>
                </div>

                {/* Metric Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {m.title}
                </h3>

                {/* Metric Description */}
                <p className="text-base text-[#CBD5E1] leading-relaxed">
                  {m.desc}
                </p>
              </div>

              {/* Bottom Progress Accent */}
              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-2">
                <div className="h-1 flex-1 bg-[rgba(197,160,89,0.15)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C5A059] to-[#F3DC9B] rounded-full"
                    style={{
                      width: `${interpolate(cardSpring, [0, 1], [0, 100])}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
