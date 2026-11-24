import React from "react";
import { useGLTF } from "@react-three/drei";

export interface PersonData {
  id: number;
  title: string;
  name: string;
  shortRole: string;
  valueProp: string;
  metric: string;
  position: [number, number, number];
  rotationY: number;
  hairStyle: "director" | "crop" | "bob" | "part" | "bun" | "wavy" | "tech";
  hairColor: string;
  suitColor: string;
  accentColor: string;
  isStanding?: boolean;
  glbModel?: string; // Optional path to custom .glb model in public/models/
}

interface AdvisorCharacterProps {
  data: PersonData;
  frame: number;
  isActive: boolean;
}

// Optional .glb loader component when custom business avatars are placed in public/models/
const GLBModelView: React.FC<{ modelPath: string; isStanding: boolean }> = ({
  modelPath,
  isStanding,
}) => {
  try {
    const gltf = useGLTF(modelPath);
    return (
      <primitive
        object={gltf.scene.clone()}
        scale={isStanding ? [1, 1, 1] : [0.95, 0.95, 0.95]}
        position={[0, 0, 0]}
      />
    );
  } catch {
    return null;
  }
};

export const AdvisorCharacter: React.FC<AdvisorCharacterProps> = ({
  data,
  frame,
  isActive,
}) => {
  const seed = data.id * 2.1;
  const isStanding = !!data.isStanding;

  // Gentle procedural breathing and listening animations
  const breath = Math.sin(frame * 0.08 + seed) * 0.012;
  const headNod = Math.cos(frame * 0.05 + seed) * 0.015;
  const headTurn = Math.sin(frame * 0.035 + seed) * (isStanding ? 0.06 : 0.03);

  // Director gesturing right arm (smooth pointing toward presentation screen)
  const directorArmAngle = isStanding ? -0.45 + Math.sin(frame * 0.04) * 0.08 : 0;
  const directorArmTilt = isStanding ? 0.35 + Math.cos(frame * 0.05) * 0.05 : 0;

  // Subtle hand movements
  const handRest = !isStanding ? Math.sin(frame * 0.2 + seed) * 0.005 : 0;

  // Clean skin tones
  const skinColor = "#FCE7D6";
  const skinShadow = "#EABEA0";

  return (
    <group position={data.position} rotation={[0, data.rotationY, 0]}>
      {/* If an external GLB is configured and available, load it */}
      {data.glbModel ? (
        <React.Suspense fallback={null}>
          <GLBModelView modelPath={data.glbModel} isStanding={isStanding} />
        </React.Suspense>
      ) : null}

      {/* ============================================================ */}
      {/* 1. SEATED EXECUTIVE CHAIR (Only for seated advisors)         */}
      {/* ============================================================ */}
      {!isStanding && (
        <group position={[0, 0, 0.38]}>
          {/* Chrome Star Base at Floor */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.28, 0.3, 0.03, 16]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Central Support Stem */}
          <mesh position={[0, 0.23, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 0.32, 12]} />
            <meshStandardMaterial color="#64748B" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Executive Navy/Charcoal Upholstered Cushion */}
          <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.54, 0.08, 0.52]} />
            <meshStandardMaterial color="#1E293B" roughness={0.65} />
          </mesh>
          {/* Ergonomic Curved Backrest */}
          <mesh position={[0, 0.86, 0.24]} rotation={[-0.06, 0, 0]} castShadow>
            <boxGeometry args={[0.48, 0.72, 0.05]} />
            <meshStandardMaterial color="#0F172A" roughness={0.6} />
          </mesh>
          {/* Chrome Armrests */}
          <mesh position={[-0.28, 0.62, 0.05]}>
            <boxGeometry args={[0.035, 0.025, 0.32]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0.28, 0.62, 0.05]}>
            <boxGeometry args={[0.035, 0.025, 0.32]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      )}

      {/* ============================================================ */}
      {/* 2. WELL-PROPORTIONED HUMANOID BUSINESS EXECUTIVE             */}
      {/* ============================================================ */}
      <group position={[0, isStanding ? 0 : 0.44, isStanding ? 0 : 0.28]}>
        {/* Legs / Trousers */}
        {isStanding ? (
          <group position={[0, 0.5, 0]}>
            {/* Left Leg */}
            <mesh position={[-0.12, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.062, 0.94, 16]} />
              <meshStandardMaterial color="#0F172A" roughness={0.7} />
            </mesh>
            {/* Right Leg */}
            <mesh position={[0.12, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.062, 0.94, 16]} />
              <meshStandardMaterial color="#0F172A" roughness={0.7} />
            </mesh>
            {/* Polished Oxford Shoes */}
            <mesh position={[-0.12, -0.47, 0.04]}>
              <boxGeometry args={[0.085, 0.065, 0.2]} />
              <meshStandardMaterial color="#090D16" roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh position={[0.12, -0.47, 0.04]}>
              <boxGeometry args={[0.085, 0.065, 0.2]} />
              <meshStandardMaterial color="#090D16" roughness={0.3} metalness={0.5} />
            </mesh>
          </group>
        ) : (
          /* Seated thighs extending forward towards table */
          <group position={[0, 0.08, -0.16]}>
            <mesh position={[-0.11, 0, 0]}>
              <boxGeometry args={[0.14, 0.12, 0.44]} />
              <meshStandardMaterial color="#0F172A" roughness={0.7} />
            </mesh>
            <mesh position={[0.11, 0, 0]}>
              <boxGeometry args={[0.14, 0.12, 0.44]} />
              <meshStandardMaterial color="#0F172A" roughness={0.7} />
            </mesh>
          </group>
        )}

        {/* Tailored Executive Blazer Torso */}
        <group position={[0, isStanding ? 1.25 : 0.44, 0]} scale={[1, 1 + breath, 1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.18, 0.52, 20]} />
            <meshStandardMaterial color={data.suitColor} roughness={0.65} metalness={0.1} />
          </mesh>

          {/* Crisp White Shirt Collar & Placket */}
          <mesh position={[0, 0.12, -0.13]}>
            <planeGeometry args={[0.14, 0.28]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>

          {/* Business Tie / Silk Scarf */}
          <mesh position={[0, 0.04, -0.135]}>
            <planeGeometry args={[0.045, 0.26]} />
            <meshStandardMaterial color={data.accentColor} roughness={0.5} />
          </mesh>

          {/* Left Lapel */}
          <mesh position={[-0.08, 0.1, -0.132]} rotation={[0, 0, -0.14]}>
            <planeGeometry args={[0.06, 0.28]} />
            <meshStandardMaterial color={data.suitColor} roughness={0.65} />
          </mesh>
          {/* Right Lapel */}
          <mesh position={[0.08, 0.1, -0.132]} rotation={[0, 0, 0.14]}>
            <planeGeometry args={[0.06, 0.28]} />
            <meshStandardMaterial color={data.suitColor} roughness={0.65} />
          </mesh>
        </group>

        {/* Realistic Proportionate Neck */}
        <mesh position={[0, isStanding ? 1.56 : 0.75, 0]}>
          <cylinderGeometry args={[0.058, 0.066, 0.12, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.5} />
        </mesh>

        {/* Sculpted Head & Contoured Professional Hair */}
        <group
          position={[0, isStanding ? 1.72 : 0.91, 0]}
          rotation={[headNod, headTurn, 0]}
        >
          {/* Smooth Head Cranium */}
          <mesh castShadow>
            <sphereGeometry args={[0.155, 24, 24]} />
            <meshStandardMaterial color={skinColor} roughness={0.4} />
          </mesh>

          {/* Facial Features */}
          {/* Left Eye */}
          <mesh position={[-0.048, 0.02, -0.142]}>
            <sphereGeometry args={[0.013, 12, 12]} />
            <meshBasicMaterial color="#1E293B" />
          </mesh>
          {/* Right Eye */}
          <mesh position={[0.048, 0.02, -0.142]}>
            <sphereGeometry args={[0.013, 12, 12]} />
            <meshBasicMaterial color="#1E293B" />
          </mesh>
          {/* Left Eyebrow */}
          <mesh position={[-0.048, 0.046, -0.144]} rotation={[0, 0, 0.05]}>
            <boxGeometry args={[0.034, 0.006, 0.008]} />
            <meshBasicMaterial color={data.hairColor} />
          </mesh>
          {/* Right Eyebrow */}
          <mesh position={[0.048, 0.046, -0.144]} rotation={[0, 0, -0.05]}>
            <boxGeometry args={[0.034, 0.006, 0.008]} />
            <meshBasicMaterial color={data.hairColor} />
          </mesh>
          {/* Subtle Professional Smile */}
          <mesh position={[0, -0.04, -0.142]}>
            <boxGeometry args={[0.042, 0.006, 0.008]} />
            <meshBasicMaterial color={skinShadow} />
          </mesh>

          {/* Fitted Professional Hairstyles (Contoured, NO oversized domes) */}
          {data.hairStyle === "director" && (
            <group position={[0, 0.05, 0.01]}>
              <mesh position={[0, 0.045, 0]}>
                <sphereGeometry args={[0.16, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.44]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.8} />
              </mesh>
              <mesh position={[0.06, 0.04, -0.05]} rotation={[0, 0.3, -0.2]}>
                <boxGeometry args={[0.1, 0.03, 0.14]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.8} />
              </mesh>
            </group>
          )}

          {data.hairStyle === "part" && (
            <group position={[0, 0.05, 0.01]}>
              <mesh position={[0, 0.042, 0]}>
                <sphereGeometry args={[0.16, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.43]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.8} />
              </mesh>
              <mesh position={[-0.06, 0.04, -0.05]} rotation={[0, -0.3, 0.2]}>
                <boxGeometry args={[0.09, 0.028, 0.13]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.8} />
              </mesh>
            </group>
          )}

          {data.hairStyle === "bob" && (
            <group position={[0, 0.04, 0.01]}>
              <mesh position={[0, 0.046, 0]}>
                <sphereGeometry args={[0.162, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.7} />
              </mesh>
              <mesh position={[-0.13, -0.02, 0]}>
                <boxGeometry args={[0.035, 0.14, 0.16]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.7} />
              </mesh>
              <mesh position={[0.13, -0.02, 0]}>
                <boxGeometry args={[0.035, 0.14, 0.16]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.7} />
              </mesh>
            </group>
          )}

          {data.hairStyle === "bun" && (
            <group position={[0, 0.05, 0.01]}>
              <mesh position={[0, 0.045, 0]}>
                <sphereGeometry args={[0.16, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.44]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.8} />
              </mesh>
              <mesh position={[0, 0.12, 0.07]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.8} />
              </mesh>
            </group>
          )}

          {data.hairStyle === "crop" && (
            <mesh position={[0, 0.09, 0]}>
              <sphereGeometry args={[0.158, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
              <meshStandardMaterial color={data.hairColor} roughness={0.85} />
            </mesh>
          )}

          {data.hairStyle === "wavy" && (
            <mesh position={[0, 0.09, 0]}>
              <sphereGeometry args={[0.162, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.46]} />
              <meshStandardMaterial color={data.hairColor} roughness={0.75} />
            </mesh>
          )}

          {data.hairStyle === "tech" && (
            <group position={[0, 0.09, 0]}>
              <mesh>
                <sphereGeometry args={[0.158, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
                <meshStandardMaterial color={data.hairColor} roughness={0.85} />
              </mesh>
              {/* Minimalist Tech Glasses */}
              <mesh position={[0, -0.068, -0.145]}>
                <boxGeometry args={[0.18, 0.038, 0.015]} />
                <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          )}
        </group>

        {/* Arms & Hands */}
        {isStanding ? (
          /* Director Standing: clean hands, NO floating black cylinders */
          <group position={[0, 1.25, 0]}>
            {/* Left Arm: Relaxed executive posture at side */}
            <group position={[-0.26, 0, 0]} rotation={[0.08, 0, 0.12]}>
              <mesh position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.042, 0.036, 0.42, 12]} />
                <meshStandardMaterial color={data.suitColor} roughness={0.65} />
              </mesh>
              <mesh position={[0, -0.45, 0]}>
                <sphereGeometry args={[0.036, 12, 12]} />
                <meshStandardMaterial color={skinColor} roughness={0.4} />
              </mesh>
            </group>

            {/* Right Arm: Articulated gesturing toward presentation board */}
            <group
              position={[0.26, 0, 0]}
              rotation={[directorArmAngle, directorArmTilt, -0.28]}
            >
              <mesh position={[0, -0.18, 0]}>
                <cylinderGeometry args={[0.042, 0.038, 0.36, 12]} />
                <meshStandardMaterial color={data.suitColor} roughness={0.65} />
              </mesh>
              {/* Forearm extended pointing */}
              <group position={[0, -0.34, 0]} rotation={[-0.35, 0, 0.15]}>
                <mesh position={[0, -0.15, 0]}>
                  <cylinderGeometry args={[0.036, 0.032, 0.3, 12]} />
                  <meshStandardMaterial color={data.suitColor} roughness={0.65} />
                </mesh>
                {/* Clean Hand */}
                <mesh position={[0, -0.31, 0.01]}>
                  <sphereGeometry args={[0.036, 12, 12]} />
                  <meshStandardMaterial color={skinColor} roughness={0.4} />
                </mesh>
              </group>
            </group>
          </group>
        ) : (
          /* Seated Advisors: forearms resting neatly on table surface (Y = 0.78) */
          <group position={[0, 0.44, 0]}>
            {/* Left Arm */}
            <group position={[-0.24, 0, 0]} rotation={[0.55, 0, 0.22]}>
              <mesh position={[0, -0.16, 0]}>
                <cylinderGeometry args={[0.042, 0.038, 0.32, 12]} />
                <meshStandardMaterial color={data.suitColor} roughness={0.65} />
              </mesh>
              {/* Forearm extending forward onto table */}
              <group position={[0, -0.29, 0]} rotation={[0.42 + handRest, 0, -0.18]}>
                <mesh position={[0, -0.15, 0]}>
                  <cylinderGeometry args={[0.036, 0.032, 0.28, 12]} />
                  <meshStandardMaterial color={data.suitColor} roughness={0.65} />
                </mesh>
                {/* Hand resting neatly on table */}
                <mesh position={[0, -0.28, 0.01]}>
                  <sphereGeometry args={[0.034, 12, 12]} />
                  <meshStandardMaterial color={skinColor} roughness={0.4} />
                </mesh>
              </group>
            </group>

            {/* Right Arm */}
            <group position={[0.24, 0, 0]} rotation={[0.55, 0, -0.22]}>
              <mesh position={[0, -0.16, 0]}>
                <cylinderGeometry args={[0.042, 0.038, 0.32, 12]} />
                <meshStandardMaterial color={data.suitColor} roughness={0.65} />
              </mesh>
              {/* Forearm extending forward onto table */}
              <group position={[0, -0.29, 0]} rotation={[0.42 + handRest, 0, 0.18]}>
                <mesh position={[0, -0.15, 0]}>
                  <cylinderGeometry args={[0.036, 0.032, 0.28, 12]} />
                  <meshStandardMaterial color={data.suitColor} roughness={0.65} />
                </mesh>
                {/* Hand resting neatly on table */}
                <mesh position={[0, -0.28, 0.01]}>
                  <sphereGeometry args={[0.034, 12, 12]} />
                  <meshStandardMaterial color={skinColor} roughness={0.4} />
                </mesh>
              </group>
            </group>
          </group>
        )}
      </group>
    </group>
  );
};
