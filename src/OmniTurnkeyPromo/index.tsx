import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { PromoBackground } from "./Background";
import { Scene1Intro } from "./Scene1Intro";
import { Scene2Problem } from "./Scene2Problem";
import { Scene3Solution } from "./Scene3Solution";
import { Scene4WhyUs } from "./Scene4WhyUs";
import { Scene5Outro } from "./Scene5Outro";

export const OmniTurnkeyPromo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#0B132B]">
      {/* Persistent Animated Background */}
      <PromoBackground />

      {/* 5 Sequential Scenes */}
      <Series>
        {/* Scene 1: 0 - 5s (150 frames) */}
        <Series.Sequence durationInFrames={150}>
          <Scene1Intro />
        </Series.Sequence>

        {/* Scene 2: 5 - 11s (180 frames) */}
        <Series.Sequence durationInFrames={180}>
          <Scene2Problem />
        </Series.Sequence>

        {/* Scene 3: 11 - 18s (210 frames) */}
        <Series.Sequence durationInFrames={210}>
          <Scene3Solution />
        </Series.Sequence>

        {/* Scene 4: 18 - 24s (180 frames) */}
        <Series.Sequence durationInFrames={180}>
          <Scene4WhyUs />
        </Series.Sequence>

        {/* Scene 5: 24 - 30s (180 frames) */}
        <Series.Sequence durationInFrames={180}>
          <Scene5Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
