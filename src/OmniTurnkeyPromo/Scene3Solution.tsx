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

export const Scene3Solution: React.FC = () => {
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

  // Central Hub Scale & Pulse
  const hubSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 90 },
  });
  const hubScale = interpolate(hubSpring, [0, 1], [0.6, 1]);

  // Diagram rotation
  const orbitRotation = (frame * 0.35) % 360;

  // 4 Pillars connected to center
  const pillars = [
    {
      id: "gov",
      title: "الحوكمة وإدارة المخاطر",
      en: "Governance & Risk",
      angle: -45, // Top-right in standard canvas
      xOffset: 340,
      yOffset: -160,
      icon: (
        <svg className="w-7 h-7 text-[#F3DC9B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      id: "restruct",
      title: "إعادة الهيكلة والتطوير",
      en: "Restructuring & Ops",
      angle: 45, // Bottom-right
      xOffset: 340,
      yOffset: 160,
      icon: (
        <svg className="w-7 h-7 text-[#F3DC9B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
      ),
    },
    {
      id: "erp",
      title: "تخطيط الموارد والأتمتة",
      en: "ERP & IT Systems",
      angle: 135, // Bottom-left
      xOffset: -340,
      yOffset: 160,
      icon: (
        <svg className="w-7 h-7 text-[#F3DC9B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.7 7.2A3 3 0 018.1 6h7.8a3 3 0 012.4 1.2l2.55 3.4c.6.8.9 1.7.9 2.7m-16.5 0h16.5" />
        </svg>
      ),
    },
    {
      id: "ai",
      title: "دمج الذكاء الاصطناعي",
      en: "AI & Smart Insights",
      angle: -135, // Top-left
      xOffset: -340,
      yOffset: -160,
      icon: (
        <svg className="w-7 h-7 text-[#F3DC9B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ),
    },
  ];

  // Exit transition (Frames 375 to 400)
  const exitOpacity = interpolate(frame, [375, 400], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [375, 400], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="flex flex-col items-center justify-center font-cairo select-none overflow-hidden"
      style={{
        opacity: enterOpacity * exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Audio: Scene Transition Whoosh */}
      <Audio src={staticFile("audio/whoosh.wav")} volume={0.25} />

      {/* Audio: Voiceover for Scene 3 */}
      <Sequence from={5}>
        <Audio src={staticFile("voiceover/scene3.mp3")} volume={1.0} />
      </Sequence>

      {/* Audio: Node Appear Ticks */}
      <Sequence from={45}>
        <Audio src={staticFile("audio/tick.wav")} volume={0.2} />
      </Sequence>
      <Sequence from={57}>
        <Audio src={staticFile("audio/tick.wav")} volume={0.2} />
      </Sequence>
      <Sequence from={69}>
        <Audio src={staticFile("audio/tick.wav")} volume={0.2} />
      </Sequence>
      <Sequence from={81}>
        <Audio src={staticFile("audio/tick.wav")} volume={0.2} />
      </Sequence>

      {/* Category Pill Tag */}
      <div
        style={{
          transform: `translateY(${headerY * 0.5}px)`,
          opacity: interpolate(frame, [5, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
        className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(197,160,89,0.35)] bg-[rgba(197,160,89,0.08)] backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
        <span className="text-sm font-semibold text-[#F3DC9B] tracking-wider uppercase font-inter">
          المنظومة المتكاملة | Integrated Value
        </span>
      </div>

      {/* Main Title */}
      <div
        dir="rtl"
        style={{
          transform: `translateY(${headerY}px)`,
          opacity: interpolate(frame, [10, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
        className="text-center mb-10"
      >
        <h2 className="text-5xl font-black text-white">
          الحل المتكامل <span className="text-[#F3DC9B]">في مكان واحد</span>
        </h2>
      </div>

      {/* Interactive Diagram Canvas Area */}
      <div className="relative w-[1100px] h-[520px] flex items-center justify-center">
        {/* SVG Connection Lines & Orbit Rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="-550 -260 1100 520"
        >
          {/* Outer Orbital Ring with dashed style */}
          <circle
            cx="0"
            cy="0"
            r="230"
            fill="none"
            stroke="rgba(197, 160, 89, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            style={{
              transform: `rotate(${orbitRotation}deg)`,
              transformOrigin: "center",
            }}
          />

          <circle
            cx="0"
            cy="0"
            r="160"
            fill="none"
            stroke="rgba(197, 160, 89, 0.15)"
            strokeWidth="1"
          />

          {/* Connection Lines from Center (0,0) to 4 Nodes */}
          {pillars.map((p, idx) => {
            const lineProgress = interpolate(
              frame,
              [35 + idx * 10, 60 + idx * 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const targetX = p.xOffset > 0 ? p.xOffset - 70 : p.xOffset + 70;
            const targetY = p.yOffset;

            return (
              <g key={p.id}>
                <line
                  x1="0"
                  y1="0"
                  x2={targetX * lineProgress}
                  y2={targetY * lineProgress}
                  stroke="#C5A059"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  opacity={0.65}
                />
                {/* Glowing Pulse moving along line */}
                {lineProgress === 1 && (
                  <circle
                    cx={targetX * ((frame * 0.02 + idx * 0.25) % 1)}
                    cy={targetY * ((frame * 0.02 + idx * 0.25) % 1)}
                    r="4"
                    fill="#F3DC9B"
                    filter="drop-shadow(0 0 6px #F3DC9B)"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Hub Node: OMNI TURNKEY */}
        <div
          style={{
            transform: `scale(${hubScale})`,
            boxShadow: "0 0 60px rgba(197, 160, 89, 0.35), inset 0 0 30px rgba(197, 160, 89, 0.2)",
          }}
          className="relative z-20 w-44 h-44 rounded-full border-2 border-[#C5A059] bg-[#0E172E] flex flex-col items-center justify-center p-4 text-center"
        >
          {/* Subtle spinning dashed border */}
          <div
            className="absolute inset-1 rounded-full border border-dashed border-[#F3DC9B]/40"
            style={{
              transform: `rotate(${orbitRotation * -1}deg)`,
            }}
          />

          <span className="text-xs font-semibold text-[#F3DC9B] uppercase tracking-widest font-inter mb-1">
            CORE PLATFORM
          </span>
          <h3 className="text-xl font-black text-white font-inter tracking-wider leading-tight">
            OMNI
            <br />
            TURNKEY
          </h3>
          <div className="w-8 h-0.5 bg-[#C5A059] my-1 rounded" />
          <span className="text-[11px] text-[#CBD5E1] font-medium font-cairo">
            منظومة متكاملة
          </span>
        </div>

        {/* 4 Outer Connected Pillar Cards */}
        {pillars.map((p, idx) => {
          const nodeDelay = 45 + idx * 12;
          const nodeSpring = spring({
            frame: frame - nodeDelay,
            fps,
            config: { damping: 14, mass: 0.85, stiffness: 85 },
          });

          const nodeOpacity = interpolate(
            frame,
            [nodeDelay, nodeDelay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const nodeScale = interpolate(nodeSpring, [0, 1], [0.8, 1]);

          return (
            <div
              key={p.id}
              style={{
                opacity: nodeOpacity,
                transform: `translate(${p.xOffset}px, ${p.yOffset}px) scale(${nodeScale})`,
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(197, 160, 89, 0.3)",
              }}
              dir="rtl"
              className="absolute z-20 w-72 p-5 rounded-2xl bg-[rgba(14,23,46,0.88)] border border-[rgba(197,160,89,0.35)] backdrop-blur-xl flex items-center gap-4"
            >
              {/* Pillar Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-[rgba(197,160,89,0.15)] border border-[rgba(197,160,89,0.4)] flex-shrink-0 flex items-center justify-center shadow-md shadow-[rgba(197,160,89,0.15)]">
                {p.icon}
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-right">
                <span className="text-lg font-bold text-white leading-tight font-cairo mb-1">
                  {p.title}
                </span>
                <span className="text-xs text-[#CBD5E1] font-medium font-inter tracking-wider">
                  {p.en}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
