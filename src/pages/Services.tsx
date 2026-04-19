
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sd_servicesData } from '../data/sd_services';
import { SdBreadcrumbs } from '../components/ui/SdBreadcrumbs';
import { ArrowRight } from 'lucide-react';

export const Services = () => {
  return (
    <div className="sd_services_page w-full min-h-screen bg-transparent">
      {/* Wrapper to enforce grid */}
      <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] pt-32 pb-24 relative z-10">
        <SdBreadcrumbs items={[{ label: 'Услуги' }]} />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="sd-mobile-text-glow text-5xl md:text-7xl font-medium text-[#002f6c] mb-8 tracking-tighter leading-[1] uppercase">
            Наши <span className="text-[#0055ff]">направления</span>
          </h1>
          <p className="sd-mobile-text-glow-soft text-slate-500 text-xl max-w-[800px] font-medium leading-relaxed">
            Мы предлагаем инновационные решения в области эстетической и функциональной стоматологии, 
            гарантируя премиум-качество и максимальный комфорт.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {sd_servicesData.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <Link to={`/services/${category.id}`} className="block h-full">
                <div className="sd_category_card sd-mobile-glass h-full min-h-[400px] p-10 rounded-[40px] bg-white/[0.08] backdrop-blur-[24px] border border-white/18 hover:border-[#0055ff]/20 hover:shadow-[0_40px_100px_-20px_rgba(0,47,108,0.1)] transition-all duration-700 flex flex-col justify-between relative overflow-hidden group">
                  {/* Subtle BG Pattern */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#0055ff]/5 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[#0055ff]/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div className="text-[12px] font-black text-[#0055ff]/40 tracking-[0.3em] uppercase">
                        Section 0{idx + 1}
                      </div>
                      <div className="w-14 h-14 rounded-full bg-white/[0.16] backdrop-blur-xl border border-white/20 shadow-sm flex items-center justify-center group-hover:bg-[#002f6c] group-hover:text-white transition-all duration-500 transform group-hover:rotate-45">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                    
                    <h2 className="text-[2rem] md:text-3xl font-bold text-[#002f6c] tracking-tight mb-6 leading-[1.1]">
                      {category.title}
                    </h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-10">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.services.slice(0, 4).map((service) => (
                      <span 
                        key={service.id} 
                        className="px-5 py-2.5 rounded-full bg-white/[0.12] backdrop-blur-xl text-[#002f6c] text-[13px] font-bold border border-white/18 shadow-sm"
                      >
                        {service.title}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

