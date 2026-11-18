import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { PromoBackground } from "./Background";
import { Scene1Intro } from "./Scene1Intro";
import { Scene2Problem } from "./Scene2Problem";
import { Scene3Solution } from "./Scene3Solution";
import { Scene4WhyUs } from "./Scene4WhyUs";
import { Scene5Outro } from "./Scene5Outro";

export const OmniTurnkeyPromo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#0B132B]">
      {/* 1. Subtle Corporate Ambient Background Music (looped/continuous) */}
      <Audio
        src={staticFile("audio/ambient-bg.wav")}
        volume={0.12}
        loop
      />

      {/* 2. Persistent Visual Background with Grid & Particles */}
      <PromoBackground />

      {/* 3. 5 Sequential Scenes with Audio-Visual Synchronization */}
      <Series>
        {/* Scene 1: Introduction & Identity (180 frames = 6.0s) */}
        <Series.Sequence durationInFrames={180}>
          <Scene1Intro />
        </Series.Sequence>

        {/* Scene 2: The Challenge & Corporate Reality (300 frames = 10.0s) */}
        <Series.Sequence durationInFrames={300}>
          <Scene2Problem />
        </Series.Sequence>

        {/* Scene 3: The Integrated Solution Diagram (400 frames = 13.33s) */}
        <Series.Sequence durationInFrames={400}>
          <Scene3Solution />
        </Series.Sequence>

        {/* Scene 4: Proven Impact & Numeric Counters (300 frames = 10.0s) */}
        <Series.Sequence durationInFrames={300}>
          <Scene4WhyUs />
        </Series.Sequence>

        {/* Scene 5: Outro & Call to Action (310 frames = 10.33s) */}
        <Series.Sequence durationInFrames={310}>
          <Scene5Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
