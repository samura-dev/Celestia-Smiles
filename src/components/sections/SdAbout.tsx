import { motion } from 'framer-motion';
import { Stars, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SdIconAward = ({ className = '' }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path 
      d="M12 15L13.633 16.279L12.995 14.282L14.658 13.021H12.625L12 11L11.375 13.021H9.342L11.005 14.282L10.367 16.279L12 15Z" 
      fill="#0055ff"
      animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle 
      cx="12" cy="14" r="7" stroke="#0055ff" strokeWidth="1.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    />
    <motion.path 
      d="M8.21 13.89L7 21L12 18L17 21L15.79 13.88" 
      stroke="#0055ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      animate={{ y: [0, 1.5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
);

const SdIconHeart = ({ className = '' }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path 
      d="M12 21L10.55 19.705C5.4 15.03 2 11.95 2 8.125C2 5.0125 4.4125 2.6 7.525 2.6C9.2875 2.6 10.975 3.425 12 4.7125C13.025 3.425 14.7125 2.6 16.475 2.6C19.5875 2.6 22 5.0125 22 8.125C22 11.95 18.6 15.03 13.45 19.7125L12 21Z" 
      fill="#0055ff"
      initial={{ scale: 0.95 }}
      animate={{ scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle 
      cx="16" cy="7" r="2" fill="white" fillOpacity="0.5"
      animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
    />
  </svg>
);

const SdIconShield = ({ className = '' }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <motion.path 
      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" 
      stroke="#0055ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    />
    <motion.path 
      d="M9 12L11 14L15 10" 
      stroke="#0055ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
    />
  </svg>
);

export const SdAbout = () => {
  const sd_stats = [
    { id: 1, value: '12+', label: 'Лет опыта', icon: SdIconAward },
    { id: 2, value: '15к+', label: 'Счастливых улыбок', icon: SdIconHeart },
    { id: 3, value: '24/7', label: 'Забота о вас', icon: SdIconShield },
  ];

  return (
    <section id="about-clinic" className="w-full relative z-20 pt-24 pb-32 md:pt-32 md:pb-48 px-[15px] md:px-[40px] pointer-events-auto overflow-hidden">
      <div className="max-w-[1920px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-[#0055ff]">
                О клинике
              </span>
              <div className="h-[1px] w-12 bg-[#0055ff]/30" />
            </div>

            <h2 className="sd-mobile-text-glow text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#002f6c] leading-[1.1]">
              Где стоматология <br /> 
              <span className="text-[#0055ff]">встречает искусство</span>
            </h2>

            <p className="sd-mobile-text-glow-soft text-slate-500 font-medium max-w-[600px] leading-relaxed text-base md:text-lg">
              Celestia Smiles — это не просто стоматология. Это пространство, где высокие технологии и экспертный подход объединяются для создания совершенной эстетики. Мы верим, что каждая улыбка уникальна, и наша миссия — раскрыть её истинный потенциал.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sd_stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="sd-mobile-glass bg-[#245bb5]/5 border border-[#245bb5]/10 rounded-3xl p-6 flex flex-col gap-4 group transition-colors hover:bg-[#245bb5]/10 relative overflow-hidden"
              >
                {/* Animated Background Accent */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 180] 
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-[#0055ff]/5 rounded-full blur-xl pointer-events-none"
                />

                <div className="relative w-12 h-12 rounded-2xl bg-[#0055ff]/10 flex items-center justify-center group-hover:bg-[#0055ff]/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-[#0055ff] relative z-10" />
                  
                  {/* Rotating SVG Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <motion.circle
                      cx="24"
                      cy="24"
                      r="22"
                      stroke="#0055ff"
                      strokeWidth="1.5"
                      fill="transparent"
                      strokeDasharray="138"
                      initial={{ strokeDashoffset: 138 }}
                      whileInView={{ strokeDashoffset: 30 }}
                      transition={{ duration: 1.5, delay: 0.5 + idx * 0.2 }}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#002f6c] tabular-nums">{stat.value}</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/about" className="sd-mobile-center-cta inline-flex items-center gap-4 group">
              <span className="text-sm font-bold uppercase tracking-widest text-[#002f6c] group-hover:text-[#0055ff] transition-colors">Узнать наши ценности</span>
              <div className="w-10 h-10 rounded-full bg-[#002f6c] flex items-center justify-center group-hover:bg-[#0055ff] transition-all duration-300 transform group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Image Placeholder Section */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
            className="relative z-10 aspect-video md:aspect-[16/10] lg:aspect-video rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/10 group"
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#002f6c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
            
            {/* Placeholder for Clinic Image */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_55%,transparent_80%)] backdrop-blur-[12px] border border-white/15 flex items-center justify-center">
               <Stars className="w-12 h-12 text-[#0055ff]/20" />
               <span className="absolute bottom-10 text-slate-400 font-bold uppercase tracking-widest text-xs">Фото клиники</span>
            </div>
            
            {/* Floating Decorative Elements */}
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-[#0055ff]/10 blur-[60px] rounded-full"
            />
          </motion.div>

          {/* Floating Feature Tag */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="sd_hero_award sd-mobile-glass relative lg:absolute -mt-16 lg:mt-0 ml-6 lg:ml-0 lg:-bottom-8 lg:-left-12 z-20 bg-white/[0.14] backdrop-blur-3xl border border-white/20 p-6 md:p-8 rounded-[32px] shadow-2xl flex flex-col gap-2 max-w-[280px] lg:max-w-[240px] transition-transform hover:scale-105"
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Stars key={i} className="w-4 h-4 text-[#ffc107] fill-[#ffc107]" />
              ))}
            </div>
            <p className="text-[#002f6c] font-bold text-sm leading-tight italic">
              «Лучшая клиника эстетической стоматологии 2024»
            </p>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
              Forbes Health
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};


