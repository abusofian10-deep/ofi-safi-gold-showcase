import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Audio,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { AdvisorCharacter, PersonData } from "./AdvisorCharacter";

// Exact team data (1 Managing Director + 7 AI Advisors)
const TEAM_MEMBERS: PersonData[] = [
  // 0. The Human Managing Director
  {
    id: 0,
    title: "Managing Director — Omni Turnkey",
    name: "Strategy & Governance Lead",
    shortRole: "EXECUTIVE LEADERSHIP",
    valueProp: "Directing integrated executive strategy, cross-functional synergy, and turnkey governance.",
    metric: "Executive Alignment: 100%",
    position: [0.0, 0, -5.2],
    rotationY: 0, // Strictly facing +Z towards table & advisors
    hairStyle: "director",
    hairColor: "#1E293B",
    suitColor: "#0F172A", // Deep Navy
    accentColor: "#F59E0B", // Warm gold tie
    isStanding: true,
  },
  // 1. Governance & Risk Advisor (Left side, Z = -2.4)
  {
    id: 1,
    title: "Governance & Risk Advisor",
    name: "Enterprise Compliance Node",
    shortRole: "GOVERNANCE & RISK",
    valueProp: "Ensuring regulatory compliance, corporate integrity, and robust enterprise risk mitigation.",
    metric: "Risk Coverage: 99.8%",
    position: [-2.25, 0, -2.4],
    rotationY: Math.PI / 2, // Strictly facing +X towards table
    hairStyle: "part",
    hairColor: "#475569",
    suitColor: "#1E293B",
    accentColor: "#F59E0B",
  },
  // 2. HR & Org Dev Advisor (Left side, Z = 0.0)
  {
    id: 2,
    title: "HR & Org Dev Advisor",
    name: "Talent Architecture Node",
    shortRole: "TALENT & ORG DEV",
    valueProp: "Optimizing talent architecture, leadership culture, and organizational scalability.",
    metric: "Org Scalability: +42%",
    position: [-2.25, 0, 0.0],
    rotationY: Math.PI / 2, // Strictly facing +X
    hairStyle: "bob",
    hairColor: "#B45309",
    suitColor: "#0F172A",
    accentColor: "#3F4E4F",
  },
  // 3. IT & ERP Systems Advisor (Left side, Z = 2.4)
  {
    id: 3,
    title: "IT & ERP Systems Advisor",
    name: "Infrastructure & Systems Node",
    shortRole: "IT & ENTERPRISE ERP",
    valueProp: "Architecting agile enterprise cloud infrastructure and seamless systems integration.",
    metric: "System Uptime: 99.99%",
    position: [-2.25, 0, 2.4],
    rotationY: Math.PI / 2, // Strictly facing +X
    hairStyle: "tech",
    hairColor: "#1E293B",
    suitColor: "#1E293B",
    accentColor: "#0284C7",
  },
  // 4. Finance & Feasibility Advisor (Foot of the table, Z = +5.1)
  {
    id: 4,
    title: "Finance & Feasibility Advisor",
    name: "Capital & ROI Modeling Node",
    shortRole: "CAPITAL & FEASIBILITY",
    valueProp: "Driving capital efficiency, rigorous feasibility models, and high-confidence ROI forecasting.",
    metric: "Forecast Accuracy: 98.4%",
    position: [0.0, 0, 5.1],
    rotationY: Math.PI, // Strictly facing -Z forward toward table and Director
    hairStyle: "part",
    hairColor: "#334155",
    suitColor: "#0F172A",
    accentColor: "#F59E0B",
  },
  // 5. Operations & Supply Chain (Right side, Z = 2.4)
  {
    id: 5,
    title: "Operations & Supply Chain",
    name: "Supply & Logistics Node",
    shortRole: "OPERATIONS & LOGISTICS",
    valueProp: "Streamlining global logistics, procurement resiliency, and operational lean flow.",
    metric: "Cycle Time: -38%",
    position: [2.25, 0, 2.4],
    rotationY: -Math.PI / 2, // Strictly facing -X towards table
    hairStyle: "bun",
    hairColor: "#1E293B",
    suitColor: "#1E293B",
    accentColor: "#3F4E4F",
  },
  // 6. Branding & Market Positioning (Right side, Z = 0.0)
  {
    id: 6,
    title: "Branding & Market Positioning",
    name: "Commercial Brand Node",
    shortRole: "STRATEGIC BRANDING",
    valueProp: "Crafting distinctive market narratives, defensible brand equity, and commercial growth.",
    metric: "Market Reach: 3.5x",
    position: [2.25, 0, 0.0],
    rotationY: -Math.PI / 2, // Strictly facing -X
    hairStyle: "wavy",
    hairColor: "#78350F",
    suitColor: "#0F172A",
    accentColor: "#F59E0B",
  },
  // 7. AI & Emerging Tech Advisor (Right side, Z = -2.4)
  {
    id: 7,
    title: "AI & Emerging Tech Advisor",
    name: "Agentic Intelligence Node",
    shortRole: "AUTONOMOUS INTELLIGENCE",
    valueProp: "Deploying autonomous enterprise intelligence, agentic workflows, and frontier tech.",
    metric: "Process Autonomy: 94%",
    position: [2.25, 0, -2.4],
    rotationY: -Math.PI / 2, // Strictly facing -X
    hairStyle: "crop",
    hairColor: "#1E293B",
    suitColor: "#1E293B",
    accentColor: "#10B981",
  },
];

// Laptops on tabletop at Y = 0.78, positioned 0.55 units inward from table edges
const LAPTOP_POSITIONS = [
  // Left side laptops (Table edge X = -1.6, inward 0.55 -> X = -1.05)
  { pos: [-1.05, 0.78, -2.4] as [number, number, number], rotY: -Math.PI / 2 },
  { pos: [-1.05, 0.78, 0.0] as [number, number, number], rotY: -Math.PI / 2 },
  { pos: [-1.05, 0.78, 2.4] as [number, number, number], rotY: -Math.PI / 2 },
  // Foot laptop (Table edge Z = +4.25, inward 0.55 -> Z = +3.70)
  { pos: [0.0, 0.78, 3.70] as [number, number, number], rotY: 0 },
  // Right side laptops (Table edge X = +1.6, inward 0.55 -> X = +1.05)
  { pos: [1.05, 0.78, 2.4] as [number, number, number], rotY: Math.PI / 2 },
  { pos: [1.05, 0.78, 0.0] as [number, number, number], rotY: Math.PI / 2 },
  { pos: [1.05, 0.78, -2.4] as [number, number, number], rotY: Math.PI / 2 },
];

// Front / Three-Quarter Camera Coordinates (Never behind an advisor's head)
const MEMBER_CAMERA_POINTS = [
  // 0. Managing Director (Standing at head of table Z = -5.2)
  // Camera placed down the table looking towards Director
  { cam: [1.8, 2.15, -2.4], look: [0.0, 1.65, -5.2] },

  // 1. Governance & Risk Advisor (Sitting at X = -2.25, Z = -2.4, facing +X)
  // Camera placed across the table on the right side looking at him
  { cam: [1.0, 1.85, -1.6], look: [-2.25, 1.25, -2.4] },

  // 2. HR & Org Dev Advisor (Sitting at X = -2.25, Z = 0.0, facing +X)
  // Camera across table looking at her
  { cam: [1.0, 1.85, 0.8], look: [-2.25, 1.25, 0.0] },

  // 3. IT & ERP Systems Advisor (Sitting at X = -2.25, Z = 2.4, facing +X)
  // Camera across table looking at him
  { cam: [1.0, 1.85, 3.2], look: [-2.25, 1.25, 2.4] },

  // 4. Finance & Feasibility Advisor (Sitting at foot X = 0, Z = +5.1, facing -Z)
  // Camera placed up the table looking forward at him
  { cam: [0.8, 1.95, 2.2], look: [0.0, 1.25, 5.1] },

  // 5. Operations & Supply Chain (Sitting at X = +2.25, Z = 2.4, facing -X)
  // Camera across table on left side looking at her
  { cam: [-1.0, 1.85, 3.2], look: [2.25, 1.25, 2.4] },

  // 6. Branding & Market Positioning (Sitting at X = +2.25, Z = 0.0, facing -X)
  // Camera across table on left side looking at her
  { cam: [-1.0, 1.85, 0.8], look: [2.25, 1.25, 0.0] },

  // 7. AI & Emerging Tech Advisor (Sitting at X = +2.25, Z = -2.4, facing -X)
  // Camera across table on left side looking at him
  { cam: [-1.0, 1.85, -1.6], look: [2.25, 1.25, -2.4] },
];

// Single Sleek Ultrabook Component
const TableLaptop: React.FC<{
  position: [number, number, number];
  rotationY: number;
}> = ({ position, rotationY }) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Laptop Base resting flush on tabletop */}
      <mesh position={[0, 0.006, 0]}>
        <boxGeometry args={[0.38, 0.012, 0.26]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Dark Keyboard Inlay */}
      <mesh position={[0, 0.013, -0.02]}>
        <boxGeometry args={[0.33, 0.002, 0.15]} />
        <meshStandardMaterial color="#1E293B" roughness={0.5} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.013, 0.075]}>
        <boxGeometry args={[0.12, 0.002, 0.07]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Display Lid angled open toward the advisor */}
      <group position={[0, 0.012, -0.13]} rotation={[-0.35, 0, 0]}>
        <mesh position={[0, 0.125, 0]}>
          <boxGeometry args={[0.38, 0.25, 0.008]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Glowing Screen */}
        <mesh position={[0, 0.125, 0.005]}>
          <planeGeometry args={[0.35, 0.22]} />
          <meshBasicMaterial color="#0284C7" />
        </mesh>
      </group>
    </group>
  );
};

// Camera Rig to synchronize Three.js camera position & lookAt target
const CameraRig: React.FC<{
  position: [number, number, number];
  target: [number, number, number];
}> = ({ position, target }) => {
  const { camera } = useThree();
  camera.position.set(position[0], position[1], position[2]);
  camera.lookAt(target[0], target[1], target[2]);
  camera.updateProjectionMatrix();
  return null;
};

// Generate wall presentation screen texture
function createPresentationScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 864;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, canvas.width, 140);

    ctx.fillStyle = "#F59E0B";
    ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("OMNI TURNKEY", 60, 85);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "600 24px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("EXECUTIVE STRATEGY BOARD • 2026", 460, 85);

    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 52px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Omni Turnkey — Executive Strategy Meeting", 60, 230);

    const cards = [
      { title: "Strategic Governance", val: "99.8%", color: "#F59E0B", sub: "Risk & Compliance Index" },
      { title: "Organizational Velocity", val: "+42%", color: "#3F4E4F", sub: "Talent & Systems Scalability" },
      { title: "Autonomous Intelligence", val: "24/7", color: "#10B981", sub: "7 AI Advisory Nodes Online" },
    ];

    cards.forEach((c, idx) => {
      const x = 60 + idx * 470;
      const y = 290;
      const w = 440;
      const h = 260;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = c.color;
      ctx.fillRect(x, y, w, 8);

      ctx.fillStyle = "#64748B";
      ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(c.title.toUpperCase(), x + 24, y + 54);

      ctx.fillStyle = "#0F172A";
      ctx.font = "900 68px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(c.val, x + 24, y + 145);

      ctx.fillStyle = "#94A3B8";
      ctx.font = "500 18px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(c.sub, x + 24, y + 205);
    });

    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(60, 720);
    ctx.lineTo(canvas.width - 60, 720);
    ctx.stroke();

    ctx.fillStyle = "#0F172A";
    ctx.font = "600 24px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Autonomous Executive Governance: Active Strategy Session", 60, 780);

    ctx.beginPath();
    ctx.arc(canvas.width - 120, 770, 12, 0, Math.PI * 2);
    ctx.fillStyle = "#10B981";
    ctx.fill();
    ctx.fillStyle = "#10B981";
    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("SYNCHRONIZED", canvas.width - 300, 777);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 3D Bright Executive Boardroom Architecture with Unified Conference Table
const BrightExecutiveBoardroom: React.FC = () => {
  const presentationTexture = useMemo(() => createPresentationScreenTexture(), []);

  return (
    <group>
      {/* 1. Light Ivory Boardroom Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[36, 32]} />
        <meshStandardMaterial color="#EFE8DA" roughness={0.25} metalness={0.15} />
      </mesh>

      {/* 2. Bright Off-White Boardroom Walls */}
      {/* Back Wall with Large Presentation Display Screen behind Director at Z = -6.2 */}
      <group position={[0, 3.5, -6.6]}>
        <mesh receiveShadow>
          <boxGeometry args={[26, 7.0, 0.3]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
        </mesh>

        {/* Large Wall Presentation Display Screen (Screen center at Z = -6.2) */}
        <group position={[0, 0.2, 0.25]}>
          <mesh castShadow>
            <boxGeometry args={[4.9, 2.85, 0.08]} />
            <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[4.76, 2.71]} />
            <meshBasicMaterial map={presentationTexture} />
          </mesh>
          <pointLight position={[0, 0, -0.1]} intensity={0.4} color="#FEF3C7" distance={6} />
        </group>
      </group>

      {/* Left Wall */}
      <group position={[-12.5, 3.5, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.3, 7.0, 24]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
        </mesh>
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={`slat-l-${i}`} position={[0.16, 0, -8 + i * 1.3]}>
            <boxGeometry args={[0.04, 6.6, 0.25]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#D8C29D" : "#E2E8F0"} roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Right Wall: Floor-to-Ceiling Panoramic Glass Windows */}
      <group position={[12.5, 3.5, 0]}>
        <mesh>
          <boxGeometry args={[0.08, 6.8, 24]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.92}
            opacity={0.3}
            transparent
            roughness={0.05}
            ior={1.45}
          />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`mullion-r-${i}`} position={[0.05, 0, -9 + i * 2.6]}>
            <boxGeometry args={[0.15, 6.8, 0.12]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.7} roughness={0.2} />
          </mesh>
        ))}
        <mesh position={[0.05, 0, 0]}>
          <boxGeometry args={[0.12, 0.12, 24]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* Daylight Sky & City Silhouette */}
      <group position={[18, 0, 0]}>
        <mesh position={[0, 6, 0]}>
          <planeGeometry args={[36, 18]} />
          <meshBasicMaterial color="#E0F2FE" />
        </mesh>
        {[
          { z: -8, w: 4, h: 14 },
          { z: -3, w: 3.5, h: 18 },
          { z: 2, w: 4.8, h: 15 },
          { z: 7, w: 3.8, h: 12 },
        ].map((b, i) => (
          <mesh key={`bldg-${i}`} position={[0, b.h / 2, b.z]}>
            <boxGeometry args={[2, b.h, b.w]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* ============================================================ */}
      {/* 3. UNIFIED RECTANGULAR EXECUTIVE CONFERENCE TABLE            */}
      {/* Centered at [0, 0, 0], Width: 3.2, Length: 8.5, Top Y = 0.78  */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Table Top: Center Y = 0.75, Thickness = 0.06 -> Top Surface Y = 0.78 */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.06, 8.5]} />
          <meshStandardMaterial color="#D8C29D" roughness={0.3} metalness={0.05} />
        </mesh>

        {/* Rounded Corner Insets (Smooth edges) */}
        <mesh position={[0, 0.75, -4.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 3.2, 16]} />
          <meshStandardMaterial color="#D8C29D" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.75, 4.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 3.2, 16]} />
          <meshStandardMaterial color="#D8C29D" roughness={0.3} />
        </mesh>

        {/* Center Recessed Aluminum Wire Channel on Tabletop */}
        <mesh position={[0, 0.781, 0]}>
          <boxGeometry args={[0.32, 0.002, 6.8]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* 2 Heavy Architectural Boardroom Pedestals */}
        <mesh position={[0, 0.36, -2.5]} castShadow>
          <cylinderGeometry args={[0.55, 0.65, 0.72, 24]} />
          <meshStandardMaterial color="#1E293B" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.36, 2.5]} castShadow>
          <cylinderGeometry args={[0.55, 0.65, 0.72, 24]} />
          <meshStandardMaterial color="#1E293B" metalness={0.4} roughness={0.5} />
        </mesh>
      </group>

      {/* 4. Ceiling & Overhead Linear Fixture */}
      <mesh position={[0, 6.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>
      <group position={[0, 6.78, 0]}>
        <mesh>
          <boxGeometry args={[2.2, 0.04, 7.8]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <pointLight position={[0, -0.4, 0]} intensity={0.9} color="#FFFBEB" distance={10} />
      </group>
    </group>
  );
};

export const OfficeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Timeline Structure (900 frames @ 30fps = 30 seconds):
  // 0 - 90: Wide establishing sweep (Director leading meeting + 7 seated advisors)
  // 90 - 175: Focus 0 (Managing Director)
  // 175 - 260: Focus 1 (Governance & Risk Advisor)
  // 260 - 345: Focus 2 (HR & Org Dev Advisor)
  // 345 - 430: Focus 3 (IT & ERP Systems Advisor)
  // 430 - 515: Focus 4 (Finance & Feasibility Advisor)
  // 515 - 600: Focus 5 (Operations & Supply Chain)
  // 600 - 685: Focus 6 (Branding & Market Positioning)
  // 685 - 770: Focus 7 (AI & Emerging Tech Advisor)
  // 770 - 900: Smooth pullback overview & closing call-to-action
  const focusRanges = [
    { start: 90, end: 175 }, // 0: Director
    { start: 175, end: 260 }, // 1: Governance
    { start: 260, end: 345 }, // 2: HR
    { start: 345, end: 430 }, // 3: IT
    { start: 430, end: 515 }, // 4: Finance
    { start: 515, end: 600 }, // 5: Operations
    { start: 600, end: 685 }, // 6: Branding
    { start: 685, end: 770 }, // 7: AI & Emerging Tech
  ];

  // Camera positioning & active speaker calculation (Front / Three-Quarter views only)
  const { cameraPos, cameraTarget, activeMemberIndex, activeProgress } = useMemo(() => {
    let pos: [number, number, number] = [0, 4.6, 9.4];
    let look: [number, number, number] = [0, 1.25, -0.6];
    let activeIdx = -1;
    let progress = 0;

    if (frame < 90) {
      // Phase 1: Wide cinematic establishing shot
      const t = frame / 90;
      const ease = Easing.inOut(Easing.cubic)(t);

      const startPos: [number, number, number] = [0.6, 4.8, 9.4];
      const endPos: [number, number, number] = [-0.4, 3.8, 8.2];

      pos = [
        interpolate(ease, [0, 1], [startPos[0], endPos[0]]),
        interpolate(ease, [0, 1], [startPos[1], endPos[1]]),
        interpolate(ease, [0, 1], [startPos[2], endPos[2]]),
      ];
      look = [0, 1.25, -0.6];
    } else if (frame >= 90 && frame < 770) {
      // Phase 2: Sequential Focus through Director (0) + 7 Advisors (1 to 7)
      for (let i = 0; i < focusRanges.length; i++) {
        const { start, end } = focusRanges[i];
        if (frame >= start && frame < end) {
          activeIdx = i;
          const duration = end - start;
          const localT = (frame - start) / duration;

          progress = interpolate(
            localT,
            [0, 0.2, 0.85, 1],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const prevPoint = i === 0
            ? { cam: [-0.4, 3.8, 8.2], look: [0, 1.25, -0.6] }
            : MEMBER_CAMERA_POINTS[i - 1];
          const currPoint = MEMBER_CAMERA_POINTS[i];

          const moveEase = Easing.inOut(Easing.cubic)(
            interpolate(localT, [0, 0.28], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          );

          // Subtle ambient floating drift
          const driftX = Math.sin(frame * 0.04) * 0.03;
          const driftY = Math.cos(frame * 0.035) * 0.02;

          pos = [
            interpolate(moveEase, [0, 1], [prevPoint.cam[0], currPoint.cam[0]]) + driftX,
            interpolate(moveEase, [0, 1], [prevPoint.cam[1], currPoint.cam[1]]) + driftY,
            interpolate(moveEase, [0, 1], [prevPoint.cam[2], currPoint.cam[2]]),
          ];

          look = [
            interpolate(moveEase, [0, 1], [prevPoint.look[0], currPoint.look[0]]),
            interpolate(moveEase, [0, 1], [prevPoint.look[1], currPoint.look[1]]),
            interpolate(moveEase, [0, 1], [prevPoint.look[2], currPoint.look[2]]),
          ];
          break;
        }
      }
    } else {
      // Phase 3: Final Pullback to Executive Overview (770 to 900)
      const t = (frame - 770) / 130;
      const ease = Easing.inOut(Easing.cubic)(t);

      const lastPoint = MEMBER_CAMERA_POINTS[7];
      const finalCam: [number, number, number] = [0.0, 5.2, 10.4];
      const finalLook: [number, number, number] = [0.0, 1.2, -0.6];

      pos = [
        interpolate(ease, [0, 1], [lastPoint.cam[0], finalCam[0]]),
        interpolate(ease, [0, 1], [lastPoint.cam[1], finalCam[1]]),
        interpolate(ease, [0, 1], [lastPoint.cam[2], finalCam[2]]),
      ];
      look = [
        interpolate(ease, [0, 1], [lastPoint.look[0], finalLook[0]]),
        interpolate(ease, [0, 1], [lastPoint.look[1], finalLook[1]]),
        interpolate(ease, [0, 1], [lastPoint.look[2], finalLook[2]]),
      ];
    }

    return {
      cameraPos: pos,
      cameraTarget: look,
      activeMemberIndex: activeIdx,
      activeProgress: progress,
    };
  }, [frame]);

  const activePerson = activeMemberIndex >= 0 ? TEAM_MEMBERS[activeMemberIndex] : null;

  // Title Card Opacity (0 to 90)
  const titleOpacity = interpolate(
    frame,
    [0, 15, 75, 90],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Closing CTA Opacity (770 to 900)
  const ctaOpacity = interpolate(
    frame,
    [770, 795, 885, 900],
    [0, 1, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC", overflow: "hidden" }}>
      {/* Background Corporate Music with 1.5s fade-in & fade-out */}
      <Audio
        src={staticFile("audio/corporate-music.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [0, 45, 855, 900],
            [0, 0.35, 0.35, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          )
        }
      />

      {/* ============================================================ */}
      {/* 3D VIRTUAL EXECUTIVE BOARDROOM SCENE CANVAS                  */}
      {/* ============================================================ */}
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: cameraPos, fov: 40, near: 0.1, far: 100 }}
      >
        {/* Synchronize camera */}
        <CameraRig position={cameraPos} target={cameraTarget} />

        {/* Bright Corporate Lighting */}
        <ambientLight color="#FFFFFF" intensity={1.35} />
        <hemisphereLight args={["#F0F9FF", "#E2E8F0", 1.2]} />
        <directionalLight
          position={[10, 16, -6]}
          intensity={2.1}
          color="#FFFBEB"
          castShadow
        />
        <directionalLight
          position={[-8, 12, 8]}
          intensity={0.8}
          color="#E0F2FE"
        />

        {/* 3D Modern Boardroom Architecture & Unified Conference Table */}
        <BrightExecutiveBoardroom />

        {/* 7 Sleek Laptops positioned strictly on tabletop at Y = 0.78 */}
        {LAPTOP_POSITIONS.map((lp, i) => (
          <TableLaptop
            key={`table-laptop-${i}`}
            position={lp.pos}
            rotationY={lp.rotY}
          />
        ))}

        {/* Managing Director + 7 AI Advisors (Zero 3D text nameplates) */}
        {TEAM_MEMBERS.map((member, idx) => {
          const isActive = idx === activeMemberIndex;
          return (
            <AdvisorCharacter
              key={`member-${member.id}`}
              data={member}
              frame={frame}
              isActive={isActive}
            />
          );
        })}
      </ThreeCanvas>

      {/* ============================================================ */}
      {/* 2D HUD OVERLAYS & TYPOGRAPHY (Zero 3D Text Overlaps)         */}
      {/* ============================================================ */}

      {/* Top Header Banner */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Inter', -apple-system, sans-serif",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: "#0F172A",
              border: "2px solid #F59E0B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 18px rgba(15, 23, 42, 0.25)",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 3,
                background: "#F59E0B",
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.12em",
                color: "#0F172A",
                textTransform: "uppercase",
              }}
            >
              Omni Turnkey
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#64748B",
                textTransform: "uppercase",
              }}
            >
              Executive Strategy Board • Active Consultation
            </div>
          </div>
        </div>

        {/* Live Synchronized Status Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 20px",
            background: "rgba(255, 255, 255, 0.94)",
            border: "1px solid rgba(15, 23, 42, 0.12)",
            borderRadius: 30,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 10px #10B981",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#0F172A",
              textTransform: "uppercase",
            }}
          >
            {activeMemberIndex === 0
              ? "Managing Director Presenting"
              : activeMemberIndex > 0
              ? `Advisory Node 0${activeMemberIndex} Active`
              : "Executive Suite Synchronized"}
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* OPENING TITLE BANNER (Frames 0 to 90)                        */}
      {/* Top-center sleek frosted-glass banner, 100% contrast         */}
      {/* ------------------------------------------------------------ */}
      {titleOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 130,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: titleOpacity,
            fontFamily: "'Inter', -apple-system, sans-serif",
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(245, 158, 11, 0.5)",
              borderRadius: 40,
              padding: "20px 48px",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.3)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.24em",
                color: "#F59E0B",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Omni Turnkey
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
              }}
            >
              Executive AI Consulting Board
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#CBD5E1",
                marginTop: 6,
              }}
            >
              One Managing Director • Seven Autonomous AI Advisors • Full Strategic Governance
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------ */}
      {/* SEQUENTIAL ADVISOR LOWER-THIRD CARD (Bottom-Left Safe Area)  */}
      {/* ------------------------------------------------------------ */}
      {activePerson && activeProgress > 0.05 && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            width: 780,
            opacity: activeProgress,
            transform: `translateY(${interpolate(activeProgress, [0, 1], [24, 0])}px)`,
            fontFamily: "'Inter', -apple-system, sans-serif",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(245, 158, 11, 0.5)",
              borderLeft: "6px solid #F59E0B",
              borderRadius: "14px",
              padding: "26px 36px",
              boxShadow: "0 24px 60px rgba(15, 23, 42, 0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#F59E0B",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                <span>
                  {activePerson.id === 0
                    ? "LEADERSHIP • HUMAN DIRECTOR"
                    : `AI ADVISOR 0${activePerson.id} / 07`}
                </span>
                <span style={{ color: "#64748B" }}>•</span>
                <span style={{ color: "#38BDF8" }}>{activePerson.shortRole}</span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#10B981",
                  background: "rgba(16, 185, 129, 0.16)",
                  padding: "4px 14px",
                  borderRadius: 20,
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                }}
              >
                {activePerson.metric}
              </div>
            </div>

            {/* Exact Speaker Title */}
            <h2
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: "#FFFFFF",
                margin: "0 0 10px 0",
                letterSpacing: "-0.01em",
              }}
            >
              {activePerson.title}
            </h2>

            {/* 1-Line Value Proposition */}
            <p
              style={{
                fontSize: 17,
                color: "#CBD5E1",
                lineHeight: 1.55,
                margin: 0,
                fontWeight: 400,
              }}
            >
              {activePerson.valueProp}
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------ */}
      {/* CLOSING OVERVIEW & CALL TO ACTION (Frames 770 to 900)        */}
      {/* ------------------------------------------------------------ */}
      {ctaOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle at center, rgba(248, 250, 252, 0.72) 0%, rgba(241, 245, 249, 0.95) 100%)",
            opacity: ctaOpacity,
            fontFamily: "'Inter', -apple-system, sans-serif",
            pointerEvents: "none",
            zIndex: 40,
          }}
        >
          <div
            style={{
              padding: "8px 26px",
              background: "#0F172A",
              border: "1.5px solid #F59E0B",
              borderRadius: 30,
              color: "#F59E0B",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 18,
              boxShadow: "0 6px 20px rgba(15, 23, 42, 0.15)",
            }}
          >
            Omni Turnkey Enterprise Suite
          </div>

          <h2
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: "#0F172A",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.15,
            }}
          >
            One Integrated Executive Board.
            <span
              style={{
                display: "block",
                fontSize: 44,
                fontWeight: 700,
                color: "#3F4E4F",
                marginTop: 8,
              }}
            >
              Seven Disciplines. Unmatched Execution.
            </span>
          </h2>

          <p
            style={{
              fontSize: 22,
              color: "#475569",
              marginTop: 18,
              maxWidth: 820,
              textAlign: "center",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Accelerate your organization with 24/7 autonomous intelligence across Governance, Org Dev, Systems, Finance, Operations, Branding, and AI.
          </p>

          <div
            style={{
              marginTop: 38,
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                padding: "18px 44px",
                background: "linear-gradient(135deg, #0F172A, #1E293B)",
                border: "2px solid #F59E0B",
                borderRadius: 12,
                color: "#F59E0B",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "0.06em",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.25)",
              }}
            >
              Deploy Your Turnkey Board
            </div>
            <div
              style={{
                padding: "18px 34px",
                background: "#FFFFFF",
                border: "1.5px solid #CBD5E1",
                borderRadius: 12,
                color: "#0F172A",
                fontSize: 18,
                fontWeight: 800,
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
              }}
            >
              omniturnkey.ai
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
