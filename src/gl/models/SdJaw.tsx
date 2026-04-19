import type { ThreeElements } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type SdJawNode = { geometry?: THREE.BufferGeometry; isMesh?: boolean };

export function SdJaw(props: ThreeElements['group']) {
  const { nodes } = useGLTF('/models/teeth-transformed.glb') as { nodes: Record<string, SdJawNode> };
  const geometry = nodes.Object_2?.geometry || Object.values(nodes).find((node) => node.isMesh)?.geometry;

  if (!geometry) return null;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.1, 0.1, 0.1]} // Typically these raw GLBs are huge, starting with 0.1 scale
      >
        <meshStandardMaterial
          color="#1a8aff"
          emissive="#002266"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.4}
          transparent={true}
          opacity={0.4}
          envMapIntensity={2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/teeth-transformed.glb');
