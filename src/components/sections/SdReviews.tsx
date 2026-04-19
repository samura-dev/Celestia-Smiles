
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Quote } from 'lucide-react';
import { sd_reviewsData } from '../../data/sd_reviews';
import { SdPrimaryButton } from '../ui/sd_primary_button';

export const SdReviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -450, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 450, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      setIsAtStart(scrollRef.current.scrollLeft <= 20);
    };

    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const leftFade = isAtStart ? 'black 0%, black 5%' : 'transparent 0%, black 5%';
  const dynamicMask = `linear-gradient(to right, ${leftFade}, black 90%, transparent 100%)`;

  return (
    <section className="w-full relative z-20 bg-transparent py-24 md:py-32 px-[15px] md:px-[40px] pointer-events-auto overflow-hidden">
      <div className="max-w-[1920px] mx-auto w-full relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-[700px]"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#0055ff]" />
              <span className="sd-mobile-text-glow text-[#0055ff] font-black uppercase tracking-[0.3em] text-[11px]">Отзывы пациентов</span>
            </div>
            <h2 className="sd-mobile-text-glow text-4xl md:text-6xl font-medium text-[#002f6c] tracking-tighter leading-[0.95] uppercase">
              Результат, <br /> <span className="text-[#0055ff]">которым гордятся</span>
            </h2>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button onClick={scrollLeft} className="sd-mobile-glass w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-xl flex items-center justify-center hover:bg-white/[0.14] transition-all group">
              <ArrowLeft className="w-6 h-6 text-[#002f6c] group-hover:text-[#0055ff] transition-colors" />
            </button>
            <button onClick={scrollRight} className="sd-mobile-glass w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-xl flex items-center justify-center hover:bg-white/[0.14] transition-all group">
              <ArrowRight className="w-6 h-6 text-[#002f6c] group-hover:text-[#0055ff] transition-colors" />
            </button>
          </div>
        </div>

        {/* Reviews Slider */}
        <div className="relative overflow-visible">
          <div 
            className="overflow-hidden"
            style={{ maskImage: dynamicMask, WebkitMaskImage: dynamicMask }}
          >
            <div 
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 pt-4 pr-[200px]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {sd_reviewsData.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="shrink-0 w-[350px] md:w-[450px] snap-start"
                >
                  <div className="sd-mobile-glass h-full p-6 md:p-10 rounded-[48px] border border-white/18 bg-white/[0.08] backdrop-blur-[24px] flex flex-col justify-between group hover:border-[#0055ff]/20 transition-all duration-700 relative overflow-hidden shadow-xl">
                    {/* Glass Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#0055ff]/5 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-10">
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, star) => (
                            <Star key={star} className="w-5 h-5 fill-[#0055ff] text-[#0055ff]" />
                          ))}
                        </div>
                        <Quote className="w-10 h-10 text-[#002f6c]/5 group-hover:text-[#0055ff]/10 transition-colors" />
                      </div>

                      <p className="text-xl md:text-2xl text-[#002f6c] font-medium leading-relaxed mb-12 tracking-tight">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="relative z-10">
                      <div className="h-px w-full bg-white/12 mb-8" />
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="text-xl font-black text-[#002f6c] uppercase mb-1">{review.author}</h4>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{review.doctor || 'Клиника Celestia'}</p>
                        </div>
                        <span className="text-xs font-black text-[#0055ff]/40 tracking-widest uppercase">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="w-full max-w-[220px] md:max-w-sm">
            <SdPrimaryButton text="Оставить отзыв" icon={ArrowRight} />
          </div>
        </motion.div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};


