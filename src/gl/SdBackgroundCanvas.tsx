import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei/core/Environment';
import { Lightformer } from '@react-three/drei/core/Lightformer';
import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { SdTooth } from './models/sd_Tooth';

export const SdBackgroundCanvas = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-transparent">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }} dpr={[1, 2]}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <color attach="background" args={['#eef4ff']} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} />
        <directionalLight position={[-10, 0, -5]} intensity={0.5} color="#e6f0ff" />

        <Suspense fallback={null}>
          <SdTooth position={[0, 0, 0]} />
          <Environment preset="city" resolution={512} background={false}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
              <Lightformer intensity={0.5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
              <Lightformer intensity={0.2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
            </group>
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
};