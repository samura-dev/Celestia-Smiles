import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SdPrimaryButton } from '../ui/sd_primary_button';
import { sd_servicesData } from '../../data/sd_services';

import card0 from '../../assets/hero-block-3/card0.png';
import card1 from '../../assets/hero-block-3/card1.png';
import card2 from '../../assets/hero-block-3/card2.png';
import card3 from '../../assets/hero-block-3/card3.png';
import card4 from '../../assets/hero-block-3/card4.png';

const sd_images = [card0, card1, card2, card3, card4, card1]; // 6 images for 6 categories

export const SdServices = () => {
  return (
    <section className="sd_services_section w-full relative z-20 pt-32 pb-24 md:pt-48 md:pb-32 px-[15px] md:px-[40px] pointer-events-auto" id="services">
      <div className="sd_services_container max-w-[1920px] mx-auto w-full flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}
          className="sd_services_header flex flex-col items-center text-center gap-4 mb-24 relative z-30"
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight text-[#002f6c] leading-[1.1] uppercase">
            Ювелирная работа <br /> с каждой улыбкой
          </h2>
          <p className="text-slate-500 font-medium max-w-[700px] mt-2 leading-relaxed text-sm md:text-xl uppercase tracking-tight">
            Мы предлагаем полный спектр процедур — каждая подобрана для улучшения вашего здоровья, уверенности и естественной красоты.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="sd_services_grid w-full flex gap-4 md:gap-6 xl:gap-8 overflow-visible hide-scrollbar pb-16 justify-start xl:justify-center px-4 md:px-0 relative z-30" style={{ perspective: "1000px" }}>
          {sd_servicesData.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 80, rotateX: 15, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 1, delay: idx * 0.1, type: 'spring', bounce: 0.3 }}
              className="shrink-0 relative z-20"
            >
              <Link to={`/services/${category.id}`}>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  className="sd_service_card group w-[200px] md:w-[280px] aspect-[4/5] rounded-[48px] overflow-hidden flex flex-col justify-end items-center relative cursor-pointer bg-white/[0.08] backdrop-blur-[24px] border border-white/18 transition-all duration-700 hover:border-[#0055ff]/40 hover:shadow-[0_40px_80px_-20px_rgba(0,47,108,0.2)]"
                >
                  {/* Image Container - Full Card */}
                  <div className="sd_image_wrap absolute inset-0 w-full h-full">
                     <img 
                       src={sd_images[idx] || card0} 
                       alt={category.title}
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
                     />
                  </div>

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Title */}
                  <div className="relative z-20 w-full px-8 pb-10 flex flex-col items-center">
                    <h3 className="text-[#002f6c] text-center text-lg md:text-xl font-black leading-[1.1] uppercase tracking-tighter group-hover:text-[#0055ff] transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="sd_action_button mt-8 flex justify-center w-full relative z-40"
        >
          <div className="w-full max-w-sm">
            <SdPrimaryButton text="Все услуги" link="/services" icon={ArrowRight} />
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

