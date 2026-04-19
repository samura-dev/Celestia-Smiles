import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowRight as ArrowUpRight } from 'lucide-react';
import { SdPrimaryButton } from '../ui/sd_primary_button';

import { sd_specialistsData } from '../../data/sd_specialists';

export const SdSpecialists = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(1);
  const [isAtStart, setIsAtStart] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -374, behavior: 'smooth' }); // 350w + 24gap
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 374, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 374; 
      const newIdx = Math.round(scrollLeft / cardWidth) + 1;
      setCurrentIdx(Math.min(Math.max(newIdx, 1), sd_specialistsData.length));
      setIsAtStart(scrollLeft <= 20);
    };

    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const leftFade = isAtStart ? 'black 0%, black 10%' : 'transparent 0%, black 10%';
  const dynamicMask = `linear-gradient(to right, ${leftFade}, black 85%, transparent 100%)`;

  return (
    <section className="w-full relative z-20 bg-transparent py-24 md:py-32 px-[15px] md:px-[40px] pointer-events-auto overflow-hidden" id="specialists">
      <div className="max-w-[1920px] mx-auto w-full flex flex-col xl:flex-row gap-16 xl:gap-8 items-stretch relative">
          
          {/* Left Info Column */}
          <div className="xl:w-1/3 flex flex-col justify-between shrink-0 relative z-10 w-full xl:sticky xl:top-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center w-full relative">
              <span className="sd-mobile-text-glow-soft text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 xl:absolute xl:top-0 xl:right-0">
                Специалисты
              </span>
            </div>

            <h2 className="sd-mobile-text-glow text-[2.6rem] md:text-5xl lg:text-5xl 2xl:text-6xl tracking-tight text-[#002f6c] leading-[1.05] font-medium mr-4 mt-2">
              Познакомьтесь с <br className="hidden md:block xl:hidden 2xl:block" />умами,{' '}
              <span className="inline-flex items-center gap-3">
                стоящими за 
                <span className="flex -space-x-3 2xl:-space-x-4 ml-1">
                  <img src={sd_specialistsData[0].img} className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                  <img src={sd_specialistsData[1].img} className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                  <img src={sd_specialistsData[2].img} className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                  <span className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-full border-2 border-white bg-[#e0ecff] text-[#0055ff] flex items-center justify-center text-xs font-bold z-10 shadow-sm">+{sd_specialistsData.length - 3}</span>
                </span>
              </span>
              ВАШЕЙ УЛЫБКОЙ
            </h2>

            <p className="sd-mobile-text-glow-soft text-slate-500 text-base lg:text-lg font-medium max-w-[550px] mt-2 leading-relaxed">
              Наша команда преданных своему делу профессионалов привносит точность, эмпатию и артистизм в каждое лечение — объединяя годы опыта со страстью к по-настоящему персонализированной заботе.
            </p>
          </motion.div>

          {/* Controls - Desktop */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hidden xl:flex items-center gap-6 mt-auto pb-4"
          >
            <button onClick={scrollLeft} className="sd-mobile-glass w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-xl flex items-center justify-center hover:bg-white/[0.14] transition-colors group">
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-[#0055ff] transition-colors" />
            </button>
            <div className="text-[#0055ff] font-bold text-lg tabular-nums tracking-widest min-w-[70px] text-center">
              {currentIdx.toString().padStart(2, '0')} <span className="text-slate-300 font-normal">/ {sd_specialistsData.length.toString().padStart(2, '0')}</span>
            </div>
            <button onClick={scrollRight} className="sd-mobile-glass w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-xl flex items-center justify-center hover:bg-white/[0.14] transition-colors group">
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#0055ff] transition-colors" />
            </button>
          </motion.div>
        </div>

        {/* Right Slider Column */}
        <div className="xl:w-2/3 w-full ml-auto relative flex flex-col justify-between">
          <div className="overflow-hidden w-full transition-mask duration-500 -mt-8" style={{ maskImage: dynamicMask, WebkitMaskImage: dynamicMask }}>
            <div 
               ref={scrollRef} 
               className="flex gap-6 overflow-x-auto snap-x snap-mandatory pt-8 pb-8 hide-scrollbar pr-[200px]"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
             >
               {sd_specialistsData.map((doc, i) => (
                  <motion.div 
                    key={doc.id}
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "50px" }}
                    transition={{ duration: 1, delay: i * 0.1, type: 'spring', bounce: 0.3 }}
                    className="sd-mobile-glass shrink-0 w-[250px] md:w-[330px] bg-white/[0.08] backdrop-blur-[24px] rounded-[32px] p-2 snap-start group hover:-translate-y-3 transition-transform duration-500 cursor-pointer border border-white/18 hover:border-[#0055ff]/20 shadow-xl"
                  >
                   <Link to={`/doctors/${doc.id}`}>
                    <div className="bg-white/[0.05] rounded-[24px] overflow-hidden relative aspect-[4/5]">
                      <span 
                        className="absolute top-5 left-5 text-[10px] uppercase font-bold tracking-[0.1em] text-[#002f6c] z-20 px-3 py-1 bg-white/40 backdrop-blur-md rounded-lg"
                      >
                        {doc.role}
                      </span>
                      <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                    </div>

                    <div className="p-6 text-[#002f6c] text-left">
                      <h3 className="text-lg md:text-xl font-black mb-2 group-hover:text-[#0055ff] transition-colors uppercase tracking-tight">{doc.name}</h3>
                      <p className="text-[12px] md:text-sm text-slate-500 leading-relaxed font-bold uppercase tracking-tight line-clamp-2">{doc.description}</p>
                    </div>
                   </Link>
                </motion.div>
             ))}
             </div>
          </div>
          
          {/* Button below slider on right */}
          <div className="hidden xl:flex justify-end mt-4 pr-[50px]">
             <SdPrimaryButton text="Все специалисты" link="/doctors" icon={ArrowUpRight} />
          </div>
        </div>

        {/* Controls and Button - Mobile */}
        <div className="xl:hidden flex flex-col items-center justify-center gap-4 mt-6 w-full px-4">
          <div className="flex items-center justify-center gap-6">
            <button onClick={scrollLeft} className="sd-mobile-glass w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-xl flex items-center justify-center hover:bg-white/[0.14] transition-colors group">
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-[#0055ff] transition-colors" />
            </button>
            <div className="text-[#0055ff] font-bold text-lg tabular-nums tracking-widest min-w-[70px] text-center">
              {currentIdx.toString().padStart(2, '0')} <span className="text-slate-300 font-normal">/ {sd_specialistsData.length.toString().padStart(2, '0')}</span>
            </div>
            <button onClick={scrollRight} className="sd-mobile-glass w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-xl flex items-center justify-center hover:bg-white/[0.14] transition-colors group">
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#0055ff] transition-colors" />
            </button>
          </div>
          <div className="w-full max-w-[220px] md:max-w-sm">
            <SdPrimaryButton text="Все специалисты" link="/doctors" icon={ArrowUpRight} />
          </div>
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};


