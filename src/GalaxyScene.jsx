import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function StarsField() {
  const pointsRef = useRef();

  const stars = useMemo(() => {
    const positions = new Float32Array(3000 * 3);

    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }

    return positions;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0008;
      pointsRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={stars.length / 3}
          array={stars}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.6} color="white" sizeAttenuation />
    </points>
  );
}

function GalaxyScene() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "black",
      }}
    >
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <StarsField />
      </Canvas>
    </div>
  );
}

export default GalaxyScene;