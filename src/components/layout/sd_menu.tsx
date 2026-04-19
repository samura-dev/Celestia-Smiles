import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

export const SdMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { name: 'Услуги', href: '/services' },
    { name: 'Команда', href: '/doctors' },
    { name: 'О клинике', href: '/about' },
    { name: 'Контакты', href: '/contacts' }
  ];

  // Clip-path animation for Awwwards-style fullscreen reveal
  const menuVariants: Variants = {
    closed: { 
      clipPath: 'circle(0% at calc(100% - 4rem) 4rem)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    },
    open: { 
      clipPath: 'circle(150% at calc(100% - 4rem) 4rem)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  const linkVariants: Variants = {
    closed: { y: 100, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] as const }
    })
  };

  return (
    <>
      <button 
        className="relative z-50 p-4 -mr-4 flex flex-col justify-center items-end gap-2 group mix-blend-difference"
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: 'white' }}
      >
        <span className="sr-only">Toggle Menu</span>
        <motion.span 
          animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
          className="w-10 h-[2px] bg-current block transition-colors group-hover:bg-white/70" 
        />
        <motion.span 
          animate={isOpen ? { width: 0, opacity: 0 } : { width: '2rem', opacity: 1 }}
          className="w-8 h-[2px] bg-current block transition-all group-hover:bg-white/70 group-hover:w-10" 
        />
        <motion.span 
          animate={isOpen ? { rotate: -45, y: -10, width: '2.5rem' } : { rotate: 0, y: 0, width: '1.5rem' }}
          className="h-[2px] bg-current block transition-all group-hover:bg-white/70 group-hover:w-10" 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 w-full h-full bg-zinc-950 z-40 flex flex-col justify-center px-12 md:px-24 md:py-24"
          >
            <div className="absolute top-12 left-12 text-white/30 text-sm uppercase tracking-widest font-bold">
              Меню
            </div>
            
            <nav className="flex flex-col gap-4 md:gap-8 mt-12">
              {menuLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.a 
                    custom={i}
                    variants={linkVariants}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); setIsOpen(false); /* Router navigation logic here */ }}
                    className="text-5xl md:text-8xl font-black text-white hover:text-zinc-400 transition-colors uppercase tracking-tighter block"
                  >
                    {link.name}
                  </motion.a>
                </div>
              ))}
            </nav>
            
            <div className="absolute bottom-12 left-12 text-white/50 text-sm flex gap-8">
               <a href="mailto:hello@zub.clinik" className="hover:text-white transition-colors">hello@zub.clinik</a>
               <span>+7 (999) 000-00-00</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

