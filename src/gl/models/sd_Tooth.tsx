import { useRef } from 'react';
import type { ThreeElements } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type SdToothNode = { geometry?: THREE.BufferGeometry; isMesh?: boolean };

export function SdTooth(props: ThreeElements['group']) {
  const { nodes } = useGLTF('/models/tooth-transformed.glb') as { nodes: Record<string, SdToothNode> };
  const meshRef = useRef<THREE.Mesh>(null);

  // Spring physics state
  const velocity = useRef(0);
  const internalY = useRef(15); // Start very high out of view

  // Noticeable rotation and bouncy falling animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Constant visible spin
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15 + 0.1; // Pronounced pitch tilt
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1 - 0.1; // Gentle roll
      
      // Target floating position (oscillates gently around Y=0.5)
      const targetY = Math.sin(state.clock.elapsedTime * 1.5) * 0.2 + 0.5;
      
      // Premium Spring Physics (Underdamped for 1-2 smooth bounces)
      const safeDelta = Math.min(delta, 0.05); // Prevent explosion on lag/tab-switch
      const stiffness = 60; // How fast it snaps
      const damping = 6;    // How fast it stops bouncing (Zeta ~0.38)

      const springForce = (targetY - internalY.current) * stiffness;
      const damperForce = -velocity.current * damping;
      
      velocity.current += (springForce + damperForce) * safeDelta;
      internalY.current += velocity.current * safeDelta;

      meshRef.current.position.y = internalY.current;
    }
  });

  // Try to find the correct geometry
  const geometry = nodes.Object_4?.geometry
    || Object.values(nodes).find((node) => node.isMesh)?.geometry;

  if (!geometry) return null;

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        // Much bigger scale as requested
        scale={[1.4, 1.4, 1.5]} 
      >
        <meshStandardMaterial
          color="#1a8aff"
          emissive="#002266"
          emissiveIntensity={0.9}
          roughness={0.08}
          metalness={0.45}
          transparent={true}
          opacity={0.48}
          envMapIntensity={2.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/tooth-transformed.glb');
