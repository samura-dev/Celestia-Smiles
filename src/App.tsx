import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const SdLayout = lazy(() => import('./components/layout/sd_layout').then((module) => ({ default: module.SdLayout })));
const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Services = lazy(() => import('./pages/Services').then((module) => ({ default: module.Services })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const CategoryDetail = lazy(() => import('./pages/CategoryDetail').then((module) => ({ default: module.CategoryDetail })));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then((module) => ({ default: module.ServiceDetail })));
const Specialists = lazy(() => import('./pages/Specialists').then((module) => ({ default: module.Specialists })));
const SpecialistDetail = lazy(() => import('./pages/SpecialistDetail').then((module) => ({ default: module.SpecialistDetail })));
const Privacy = lazy(() => import('./pages/Privacy').then((module) => ({ default: module.Privacy })));
const Sitemap = lazy(() => import('./pages/Sitemap').then((module) => ({ default: module.Sitemap })));
const Legal = lazy(() => import('./pages/Legal').then((module) => ({ default: module.Legal })));
const CabinetPlaceholder = lazy(() => import('./pages/CabinetPlaceholder').then((module) => ({ default: module.CabinetPlaceholder })));
const SdBackgroundCanvas = lazy(() =>
  import('./gl/SdBackgroundCanvas').then((module) => ({ default: module.SdBackgroundCanvas })),
);

const SdRouteFallback = () => (
  <div className="w-full min-h-screen px-[15px] md:px-[40px] pt-28 md:pt-36 pb-24">
    <div className="mx-auto max-w-[1920px]">
      <div className="rounded-[34px] border border-white/20 bg-white/55 p-8 text-[#002f6c] backdrop-blur-[24px] shadow-[0_24px_70px_-38px_rgba(0,47,108,0.22)]">
        Загружаем страницу...
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <SdBackgroundCanvas />
      </Suspense>

      <div className="relative z-10 min-h-screen w-full pointer-events-auto">
        <Suspense fallback={<SdRouteFallback />}>
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;