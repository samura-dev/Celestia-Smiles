import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SdPrimaryButton } from '../components/ui/sd_primary_button';
import { SdServices } from '../components/sections/SdServices';
import { SdCalculator } from '../components/sections/SdCalculator';
import { SdAbout } from '../components/sections/SdAbout';
import { SdProcess } from '../components/sections/SdProcess';

export const Home = () => {
  return (
    <div className="w-full flex flex-col relative z-10 pointer-events-auto">
      
      {/* Hero Section */}
      <section className="sd_hero_section relative w-full min-h-[100dvh] lg:h-[100dvh] overflow-hidden flex flex-col lg:flex-row items-center justify-center lg:justify-between px-[15px] md:px-[40px] py-16 lg:py-0 pointer-events-none z-10 max-w-[1920px] mx-auto gap-10 lg:gap-0">
        
        {/* Left Text Block */}
        <motion.div 
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.2, delay: 0.1 }}
          className="sd_hero_left w-full lg:w-auto lg:max-w-[50vw] flex flex-col gap-6 md:gap-12 pointer-events-auto z-20 shrink-0 lg:-translate-y-[50px] items-center lg:items-start text-center lg:text-left"
        >
          <h1 className="sd_hero_title sd-mobile-text-glow text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-medium leading-[1.15] lg:leading-[1.05] tracking-tight text-[#002f6c] flex flex-col items-center lg:items-start group">
            <span className="block lg:ml-[18%] transition-transform duration-500 group-hover:translate-x-2">Не каждой улыбке</span>
            <span className="block">нужно исправление,</span>
            <span className="block">некоторым нужно видение</span>
          </h1>
          <p className="sd_hero_desc sd-mobile-text-glow-soft text-sm md:text-base text-slate-500 font-medium max-w-[400px] leading-relaxed lg:ml-[5%]">
            Мы — клиника премиальной ортодонтии и эстетики, создающая уверенные улыбки для тех, кто не согласен на меньшее.
          </p>
        </motion.div>

        {/* Right Text Block & Button */}
        <motion.div 
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.2, delay: 0.3 }}
          className="sd_hero_right w-full lg:w-auto flex flex-col items-center lg:items-start gap-8 md:gap-16 pointer-events-auto z-20 lg:mt-32 shrink-0 lg:-translate-y-[50px] text-center lg:text-left"
        >
          <h2 className="sd_hero_subtitle sd-mobile-text-glow text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-medium leading-[1.1] tracking-tight text-[#002f6c] lg:whitespace-nowrap lg:-ml-12">
            Роскошный уход,<br className="hidden lg:block" /> ставший персональным
          </h2>
          <div className="sd_button_wrapper sd-mobile-center-cta lg:-ml-12 w-full max-w-[280px] lg:max-w-[220px]">
            <SdPrimaryButton text="ЗАПИСАТЬСЯ" icon={ArrowRight} link="?modal=appointment" />
          </div>
        </motion.div>

        {/* Watermark Text - Re-imagined for Mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="sd_hero_watermark absolute bottom-[40px] left-0 w-full text-center z-10 pointer-events-none px-[15px]"
        >
          <h1 
            className="font-bold text-[#d1e8ff]/70 lg:text-[#d1e8ff] whitespace-nowrap tracking-tighter m-0 p-0 leading-none select-none"
            style={{ fontSize: '9vw', textTransform: 'uppercase' }}
          >
            Улыбка на миллион
          </h1>
        </motion.div>
        
      </section>

      {/* About Section */}
      <SdAbout />

      {/* Calculator Section */}
      <SdCalculator />

      {/* Services Section */}
      <SdServices />
      <SdProcess />

    </div>
  );
};

