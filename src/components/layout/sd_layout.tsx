import { useCallback, useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useSearchParams } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { SdFooter } from './sd_footer';
import { SdFAQ } from '../sections/SdFAQ';
import { SdBrands } from '../sections/SdBrands';
import { SdSpecialists } from '../sections/SdSpecialists';
import { SdReviews } from '../sections/SdReviews';
import { SdAppointmentModal } from '../modals/SdAppointmentModal';

import { sd_servicesData } from '../../data/sd_services';

export const SdLayout = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sd_isAppointmentOpen = searchParams.get('modal') === 'appointment';
  const sd_modalDirection = searchParams.get('direction');
  const sd_modalDoctor = Number(searchParams.get('doctor') ?? 0) || null;

  const sd_closeAppointmentModal = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    next.delete('modal');
    next.delete('direction');
    next.delete('doctor');
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  // Scroll to top or to hash on route change
  useEffect(() => {
    const sd_window = window as unknown as Window & { sdLenis?: Lenis };
    const lenis = sd_window.sdLenis;
    const hash = window.location.hash;

    if (lenis) {
      if (hash) {
        // Small delay to ensure elements are rendered
        setTimeout(() => {
          lenis.scrollTo(hash, { offset: -50, duration: 1.5 });
        }, 100);
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
    } else {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  // Initialize Smooth Scrolling
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
      // If we are not on home, let the default anchor behavior or a manual navigation handle it
      // But actually, we want to go home AND scroll.
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

  return (
    <div className="sd-app-wrapper relative w-full min-h-screen">
      {/* Global Header */}
      <header className="fixed top-0 left-0 w-full z-[100] pointer-events-auto">
        <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] py-6 md:py-8 flex justify-between items-center md:items-start whitespace-nowrap">
        
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 relative z-[110] outline-none">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0055ff]">
            <path d="M12 22C12 22 17 19.5 19 14.5C21 9.5 19 3 14.5 3C12.5 3 12 5.5 12 5.5C12 5.5 11.5 3 9.5 3C5 3 3 9.5 5 14.5C7 19.5 12 22 12 22Z" fill="currentColor" fillOpacity="0.8"/>
            <path d="M12 11V22M8 12L8 18M16 12L16 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          </svg>
          <div className={`font-semibold tracking-tighter leading-none flex flex-col uppercase text-[15px] transition-colors duration-500 ${isMobileMenuOpen ? 'text-white' : 'text-[#002f6c]'}`}>
            <span>Celestia</span>
            <span className="text-[#0055ff]">Smiles</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center bg-[#071324]/85 backdrop-blur-2xl border border-white/10 rounded-full p-2 shadow-[0_32px_64px_-12px_rgba(0,15,40,0.3)] ring-1 ring-white/5">
          <nav className="flex items-center text-[10.5px] font-bold uppercase tracking-[0.15em] text-white/70">
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link 
                to="/services"
                className="flex items-center gap-1.5 px-6 py-3 hover:text-white transition-colors duration-300 outline-none group cursor-pointer uppercase"
                onMouseEnter={() => setIsServicesOpen(true)}
              >
                УСЛУГИ 
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isServicesOpen ? 'rotate-180 text-white' : 'text-white/40 group-hover:text-white'}`} />
              </Link>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.98, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98, rotateX: 5 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformPerspective: 1000 }}
                    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[600px] bg-[#071324]/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-5 grid grid-cols-2 gap-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
                  >
                    {sd_servicesData.map(category => (
                      <Link 
                        key={category.id} 
                        to={`/services/${category.id}`}
                        onClick={() => setIsServicesOpen(false)}
                        className="group flex flex-col justify-center px-5 py-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-400"
                      >
                        <span className="font-bold text-[11px] tracking-widest uppercase text-white group-hover:text-[#4da6ff] transition-colors flex justify-between items-center">
                          {category.title}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                        </span>
                        <span className="text-[12px] leading-relaxed text-white/40 mt-2 font-normal tracking-wide normal-case line-clamp-1">
                          {category.description}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/about" className="px-6 py-3 hover:text-white transition-colors duration-300">О клинике</Link>
            <Link to="/doctors" className="px-6 py-3 hover:text-white transition-colors duration-300">Специалисты</Link>
            <a href={pathname === '/' ? "#faq" : "/#faq"} onClick={(e) => sd_scrollToSection(e, '#faq')} className="px-6 py-3 hover:text-white transition-colors duration-300">FAQ</a>
            <a href={pathname === '/' ? "#calculator" : "/#calculator"} onClick={(e) => sd_scrollToSection(e, '#calculator')} className="px-6 py-3 hover:text-white transition-colors duration-300">Калькулятор</a>
          </nav>

          <div className="pl-4 pr-1 border-l border-white/10 flex items-center">
            <Link to="/cabinet" className="bg-white/[0.16] backdrop-blur-xl text-white px-7 py-3 rounded-full flex items-center gap-2 hover:bg-[#0055ff] hover:text-white transition-all duration-400 group overflow-hidden relative border border-white/25">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10 text-[10.5px] font-bold uppercase tracking-[0.15em]">Кабинет</span>
            </Link>
          </div>
        </div>

        {/* Mobile Burger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative z-[110] w-12 h-12 flex flex-col items-center justify-center gap-[6px] focus:outline-none"
        >
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className={`w-6 h-[2px] rounded-full transition-colors duration-500 ${isMobileMenuOpen ? 'bg-white' : 'bg-[#002f6c]'}`} 
          />
          <motion.span 
            animate={isMobileMenuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
            className={`w-6 h-[2px] rounded-full transition-colors duration-500 ${isMobileMenuOpen ? 'bg-white' : 'bg-[#002f6c]'}`} 
          />
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className={`w-6 h-[2px] rounded-full transition-colors duration-500 ${isMobileMenuOpen ? 'bg-white' : 'bg-[#002f6c]'}`} 
          />
        </button>

        {/* Improved Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-[#071324] z-[100] flex flex-col pt-24 pb-8 px-[30px] overflow-hidden"
            >
              {/* Background watermark */}
              <div className="absolute bottom-4 right-4 text-[12vw] font-black text-white/[0.02] leading-none pointer-events-none select-none">
                CELESTIA
              </div>
              
              <div className="max-w-[1920px] mx-auto w-full flex flex-col h-full justify-between">
                <nav className="flex flex-col gap-2">
                  {[
                    { title: 'Наши услуги', path: '/services', num: '01' },
                    { title: 'О клинике', path: '/about', num: '02' },
                    { title: 'Специалисты', path: '/doctors', num: '03' },
                    { title: 'Вопросы / FAQ', id: '#faq', num: '04' },
                    { title: 'Калькулятор', id: '#calculator', num: '05' },
                    { title: 'Личный кабинет', path: '/cabinet', num: '06' }
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
                        className="group flex flex-col gap-0.5 py-2 border-b border-white/5 last:border-0 hover:pl-2 transition-all duration-300"
                      >
                        <span className="text-[9px] font-black text-[#0055ff] tracking-widest opacity-60">{item.num}</span>
                        <span className="text-2xl text-white font-medium tracking-tight group-hover:text-[#0055ff] transition-colors">
                          {item.title}
                        </span>
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
                  <div className="flex flex-col gap-1">
                    <p className="text-[#4488ff] text-[9px] font-black uppercase tracking-[0.3em]">Консультация</p>
                    <a href="tel:+70000000000" className="text-white text-xl font-medium tracking-tight hover:text-[#0055ff] transition-colors leading-none">+7 (000) 000-00-00</a>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="text-[#4488ff] text-[9px] font-black uppercase tracking-[0.3em]">Адрес</p>
                    <p className="text-white/60 text-sm leading-none">ул. Прогрессивная, 12, Москва</p>
                  </div>

                  <div className="flex gap-6 mt-1">
                    {['TG', 'WA', 'VK'].map((social) => (
                      <a key={social} href="#" className="text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">{social}</a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </header>

      {/* Pages render here */}
      <main className="w-full relative z-10">
        <Outlet />
      </main>
      
      {pathname !== '/doctors' && !pathname.startsWith('/doctors/') && <SdSpecialists />}
      <SdReviews />
      <SdBrands />
      <SdFAQ />
      <SdFooter />

      {sd_isAppointmentOpen && (
        <SdAppointmentModal
          sd_initialDirectionId={sd_modalDirection}
          sd_initialDoctorId={sd_modalDoctor}
          sd_onClose={sd_closeAppointmentModal}
        />
      )}

      {/* Global 3D Canvas handled in App.tsx */}
    </div>
  );
};


