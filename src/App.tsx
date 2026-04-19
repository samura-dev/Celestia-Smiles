import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { SdLayout } from './components/layout/sd_layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { CategoryDetail } from './pages/CategoryDetail';
import { ServiceDetail } from './pages/ServiceDetail';
import { Specialists } from './pages/Specialists';
import { SpecialistDetail } from './pages/SpecialistDetail';
import { Privacy } from './pages/Privacy';
import { Sitemap } from './pages/Sitemap';
import { Legal } from './pages/Legal';
import { CabinetPlaceholder } from './pages/CabinetPlaceholder';
import { SdTooth } from './gl/models/sd_Tooth';

function App() {
  return (
    <BrowserRouter>
      {/* Global 3D background */}
      <div className="fixed inset-0 w-full h-full z-0 bg-transparent pointer-events-none">
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

      <div className="relative z-10 w-full min-h-screen pointer-events-auto">
        <Routes>
          <Route path="/" element={<SdLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:categoryId" element={<CategoryDetail />} />
            <Route path="services/:categoryId/:serviceId" element={<ServiceDetail />} />
            <Route path="doctors" element={<Specialists />} />
            <Route path="doctors/:specialistId" element={<SpecialistDetail />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="legal" element={<Legal />} />
            <Route path="cabinet" element={<CabinetPlaceholder />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
