import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const PromoBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle continuous grid movement
  const gridOffsetY = (frame * 0.4) % 60;
  const gridOffsetX = (frame * 0.15) % 60;

  // 12 subtle floating ambient particles
  const particles = [
    { x: 15, y: 20, size: 4, speed: 0.6, delay: 0 },
    { x: 80, y: 35, size: 6, speed: 0.8, delay: 20 },
    { x: 30, y: 70, size: 3, speed: 0.5, delay: 40 },
    { x: 70, y: 80, size: 5, speed: 0.7, delay: 60 },
    { x: 50, y: 25, size: 4, speed: 0.9, delay: 80 },
    { x: 20, y: 45, size: 5, speed: 0.6, delay: 100 },
    { x: 85, y: 65, size: 4, speed: 0.7, delay: 120 },
    { x: 40, y: 85, size: 6, speed: 0.5, delay: 140 },
    { x: 60, y: 15, size: 3, speed: 0.8, delay: 160 },
    { x: 10, y: 80, size: 4, speed: 0.6, delay: 180 },
    { x: 90, y: 20, size: 5, speed: 0.7, delay: 200 },
    { x: 50, y: 60, size: 4, speed: 0.5, delay: 220 },
  ];

  return (
    <AbsoluteFill className="overflow-hidden pointer-events-none select-none">
      {/* 1. Deep Luxury Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #1C2541 0%, #0E172E 55%, #0B132B 85%, #060A17 100%)",
        }}
      />

      {/* 2. Institutional Geometric Subtle Grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(197, 160, 89, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: `${gridOffsetX}px ${gridOffsetY}px`,
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
        }}
      />

      {/* 3. Ambient Soft Radial Light Wells */}
      <div
        className="absolute top-1/4 left-1/3 w-[700px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C5A059 0%, transparent 70%)",
          transform: `translate(${Math.sin(frame * 0.02) * 20}px, ${Math.cos(frame * 0.02) * 15}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2A3B66 0%, transparent 70%)",
        }}
      />

      {/* 4. Floating Luminous Light Particles */}
      {particles.map((p, index) => {
        const floatY = Math.sin((frame + p.delay) * 0.03 * p.speed) * 25;
        const floatX = Math.cos((frame + p.delay) * 0.02 * p.speed) * 15;
        const opacity = interpolate(
          Math.sin((frame + p.delay) * 0.04),
          [-1, 1],
          [0.15, 0.65]
        );

        return (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: "#C5A059",
              boxShadow: `0 0 ${p.size * 3}px rgba(197, 160, 89, 0.8)`,
              opacity,
              transform: `translate(${floatX}px, ${floatY}px)`,
            }}
          />
        );
      })}

      {/* 5. Minimalist Corner Brackets / Crop Marks */}
      <div className="absolute inset-12 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C5A059]" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C5A059]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C5A059]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C5A059]" />
      </div>
    </AbsoluteFill>
  );
};
