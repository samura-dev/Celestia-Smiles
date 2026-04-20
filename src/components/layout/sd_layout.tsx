import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight, LogOut } from 'lucide-react';

import { sd_servicesData } from '../../data/sd_services';
import { useSdCabinetStore } from '../../store/sd_cabinetStore';

const SdFooter = lazy(() => import('./sd_footer').then((module) => ({ default: module.SdFooter })));
const SdFAQ = lazy(() => import('../sections/SdFAQ').then((module) => ({ default: module.SdFAQ })));
const SdBrands = lazy(() => import('../sections/SdBrands').then((module) => ({ default: module.SdBrands })));
const SdSpecialists = lazy(() =>
  import('../sections/SdSpecialists').then((module) => ({ default: module.SdSpecialists })),
);
const SdReviews = lazy(() => import('../sections/SdReviews').then((module) => ({ default: module.SdReviews })));
const SdAppointmentModal = lazy(() =>
  import('../modals/SdAppointmentModal').then((module) => ({ default: module.SdAppointmentModal })),
);

export const SdLayout = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const sd_navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sd_isAppointmentOpen = searchParams.get('modal') === 'appointment';
  const sd_modalDirection = searchParams.get('direction');
  const sd_modalDoctor = Number(searchParams.get('doctor') ?? 0) || null;
  const { sd_session, sd_hydrateCabinet, sd_logout } = useSdCabinetStore();
  const sd_cabinetPath = sd_session ? '/cabinet?section=dashboard' : '/cabinet?mode=login';

  const sd_closeAppointmentModal = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    next.delete('modal');
    next.delete('direction');
    next.delete('doctor');
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const sd_window = window as unknown as Window & { sdLenis?: Lenis };
    const lenis = sd_window.sdLenis;
    const hash = window.location.hash;

    if (lenis) {
      if (hash) {
        setTimeout(() => {
          lenis.scrollTo(hash, { offset: -50, duration: 1.5 });
        }, 100);
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
    } else if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const sd_lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    const sd_window = window as unknown as Window & { sdLenis?: Lenis };
    sd_window.sdLenis = sd_lenis;
    let sd_rafId = 0;

    function raf(time: number) {
      sd_lenis.raf(time);
      sd_rafId = requestAnimationFrame(raf);
    }

    sd_rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(sd_rafId);
      sd_lenis.destroy();
      sd_window.sdLenis = undefined;
    };
  }, []);

  useEffect(() => {
    sd_hydrateCabinet();
  }, [sd_hydrateCabinet]);

  useEffect(() => {
    if (!sd_isAppointmentOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        sd_closeAppointmentModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [sd_closeAppointmentModal, sd_isAppointmentOpen]);

  const sd_scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname !== '/') {
      return;
    }

    e.preventDefault();
    setIsMobileMenuOpen(false);
    const sd_window = window as unknown as Window & { sdLenis?: Lenis };
    const lenis = sd_window.sdLenis;
    if (lenis) {
      lenis.scrollTo(id, { offset: -50, duration: 1.5 });
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sd_handleLogout = () => {
    sd_logout();
    setIsMobileMenuOpen(false);
    sd_navigate(pathname.startsWith('/cabinet') ? '/cabinet?mode=login' : '/', { replace: true });
  };

  return (
    <div className="sd-app-wrapper relative min-h-screen w-full">
      <header className="pointer-events-auto fixed left-0 top-0 z-[100] w-full">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between whitespace-nowrap px-[20px] py-6 md:items-start md:px-[40px] md:py-8">
          <Link to="/" className="relative z-[110] flex items-center gap-3 outline-none">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0055ff]">
              <path d="M12 22C12 22 17 19.5 19 14.5C21 9.5 19 3 14.5 3C12.5 3 12 5.5 12 5.5C12 5.5 11.5 3 9.5 3C5 3 3 9.5 5 14.5C7 19.5 12 22 12 22Z" fill="currentColor" fillOpacity="0.8" />
              <path d="M12 11V22M8 12L8 18M16 12L16 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            </svg>
            <div className={`flex flex-col text-[15px] font-semibold uppercase leading-none tracking-tighter transition-colors duration-500 ${isMobileMenuOpen ? 'text-white' : 'text-[#002f6c]'}`}>
              <span>Celestia</span>
              <span className="text-[#0055ff]">Smiles</span>
            </div>
          </Link>

          <div className="hidden items-center rounded-full border border-white/10 bg-[#071324]/85 p-2 shadow-[0_32px_64px_-12px_rgba(0,15,40,0.3)] ring-1 ring-white/5 backdrop-blur-2xl lg:flex">
            <nav className="flex items-center text-[10.5px] font-bold uppercase tracking-[0.15em] text-white/70">
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link
                  to="/services"
                  className="group flex cursor-pointer items-center gap-1.5 px-6 py-3 uppercase outline-none transition-colors duration-300 hover:text-white"
                  onMouseEnter={() => setIsServicesOpen(true)}
                >
                  Услуги
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isServicesOpen ? 'rotate-180 text-white' : 'text-white/40 group-hover:text-white'
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98, rotateX: 10 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98, rotateX: 5 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformPerspective: 1000 }}
                      className="absolute left-1/2 top-[calc(100%+12px)] grid w-[600px] -translate-x-1/2 grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-[#071324]/95 p-5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/5 backdrop-blur-3xl"
                    >
                      {sd_servicesData.map((category) => (
                        <Link
                          key={category.id}
                          to={`/services/${category.id}`}
                          onClick={() => setIsServicesOpen(false)}
                          className="group flex flex-col justify-center rounded-2xl border border-transparent px-5 py-4 transition-all duration-400 hover:border-white/5 hover:bg-white/5"
                        >
                          <span className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white transition-colors group-hover:text-[#4da6ff]">
                            {category.title}
                            <ArrowUpRight className="h-3.5 w-3.5 translate-y-2 -translate-x-2 opacity-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                          </span>
                          <span className="mt-2 line-clamp-1 text-[12px] font-normal leading-relaxed tracking-wide text-white/40 normal-case">
                            {category.description}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/about" className="px-6 py-3 transition-colors duration-300 hover:text-white">О клинике</Link>
              <Link to="/doctors" className="px-6 py-3 transition-colors duration-300 hover:text-white">Специалисты</Link>
              <a href={pathname === '/' ? '#faq' : '/#faq'} onClick={(e) => sd_scrollToSection(e, '#faq')} className="px-6 py-3 transition-colors duration-300 hover:text-white">FAQ</a>
              <a href={pathname === '/' ? '#calculator' : '/#calculator'} onClick={(e) => sd_scrollToSection(e, '#calculator')} className="px-6 py-3 transition-colors duration-300 hover:text-white">Калькулятор</a>
            </nav>

            <div className="flex items-center gap-2 border-l border-white/10 pl-4 pr-1">
              <Link
                to={sd_cabinetPath}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white/25 bg-white/[0.16] px-7 py-3 text-white transition-all duration-400 hover:bg-[#0055ff] hover:text-white backdrop-blur-xl"
              >
                <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-600 to-blue-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative z-10 text-[10.5px] font-bold uppercase tracking-[0.15em]">{sd_session ? 'Кабинет' : 'Войти'}</span>
              </Link>
              {sd_session ? (
                <button
                  type="button"
                  onClick={sd_handleLogout}
                  className="rounded-full border border-white/18 bg-white/[0.08] p-3 text-white/78 transition-colors duration-300 hover:bg-white/[0.14] hover:text-white"
                  aria-label="Выйти из кабинета"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-[110] flex h-12 w-12 flex-col items-center justify-center gap-[6px] focus:outline-none lg:hidden"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className={`h-[2px] w-6 rounded-full transition-colors duration-500 ${isMobileMenuOpen ? 'bg-white' : 'bg-[#002f6c]'}`}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
              className={`h-[2px] w-6 rounded-full transition-colors duration-500 ${isMobileMenuOpen ? 'bg-white' : 'bg-[#002f6c]'}`}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={`h-[2px] w-6 rounded-full transition-colors duration-500 ${isMobileMenuOpen ? 'bg-white' : 'bg-[#002f6c]'}`}
            />
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#071324] px-[30px] pb-8 pt-24"
              >
                <div className="pointer-events-none absolute bottom-4 right-4 select-none text-[12vw] font-black leading-none text-white/[0.02]">CELESTIA</div>

                <div className="mx-auto flex h-full w-full max-w-[1920px] flex-col justify-between">
                  <nav className="flex flex-col gap-2">
                    {[
                      { title: 'Наши услуги', path: '/services', num: '01' },
                      { title: 'О клинике', path: '/about', num: '02' },
                      { title: 'Специалисты', path: '/doctors', num: '03' },
                      { title: 'Вопросы / FAQ', id: '#faq', num: '04' },
                      { title: 'Калькулятор', id: '#calculator', num: '05' },
                      { title: sd_session ? 'Личный кабинет' : 'Войти в кабинет', path: sd_cabinetPath, num: '06' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.num}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                      >
                        <Link
                          to={item.path || (pathname === '/' ? item.id! : `/${item.id}`)}
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            setIsMobileMenuOpen(false);
                            if (!item.path) sd_scrollToSection(e, item.id!);
                          }}
                          className="group flex flex-col gap-0.5 border-b border-white/5 py-2 transition-all duration-300 last:border-0 hover:pl-2"
                        >
                          <span className="text-[9px] font-black tracking-widest text-[#0055ff] opacity-60">{item.num}</span>
                          <span className="text-2xl font-medium tracking-tight text-white transition-colors group-hover:text-[#0055ff]">{item.title}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 flex flex-col gap-5 border-t border-white/10 pt-6"
                  >
                    {sd_session ? (
                      <button
                        type="button"
                        onClick={sd_handleLogout}
                        className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-4 text-left text-white transition-colors hover:bg-white/[0.08]"
                      >
                        <span className="text-sm font-semibold tracking-wide">Выйти из кабинета</span>
                        <LogOut className="h-4 w-4 text-[#4488ff]" />
                      </button>
                    ) : null}

                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4488ff]">Консультация</p>
                      <a href="tel:+70000000000" className="text-xl font-medium leading-none tracking-tight text-white transition-colors hover:text-[#0055ff]">+7 (000) 000-00-00</a>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4488ff]">Адрес</p>
                      <p className="text-sm leading-none text-white/60">ул. Прогрессивная, 12, Москва</p>
                    </div>

                    <div className="mt-1 flex gap-6">
                      {['TG', 'WA', 'VK'].map((social) => (
                        <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white">{social}</a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative z-10 w-full">
        <Outlet />
      </main>

      <Suspense fallback={null}>
        {pathname !== '/doctors' && !pathname.startsWith('/doctors/') && <SdSpecialists />}
        <SdReviews />
        <SdBrands />
        <SdFAQ />
        <SdFooter />
      </Suspense>

      <Suspense fallback={null}>
        {sd_isAppointmentOpen && (
          <SdAppointmentModal
            sd_initialDirectionId={sd_modalDirection}
            sd_initialDoctorId={sd_modalDoctor}
            sd_onClose={sd_closeAppointmentModal}
          />
        )}
      </Suspense>
    </div>
  );
};