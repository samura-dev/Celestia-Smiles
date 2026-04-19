import { motion } from 'framer-motion';

const sd_brands = [
  'Invisalign', 'Straumann', 'Nobel Biocare', 'Dentsply Sirona', '3M Oral Care', 'Ivoclar Vivadent'
];

export const SdBrands = () => {
  return (
    <section className="w-full relative z-20 py-12 md:py-16 px-[15px] md:px-[40px] pointer-events-auto overflow-hidden">
      <div className="max-w-[1920px] mx-auto w-full">
        <div className="sd-mobile-glass bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10 p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0055ff]/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="shrink-0 text-center md:text-left">
              <h4 
                className="text-xs font-black uppercase tracking-[0.3em] text-[#4488ff] mb-2"
                style={{ textShadow: '0 0 20px rgba(68, 136, 255, 0.3)' }}
              >
                Технологии
              </h4>
              <p className="text-[#002f6c] text-lg font-bold leading-none">Наши партнеры</p>
            </div>

            <div className="flex-grow flex flex-wrap items-center justify-center md:justify-end gap-x-12 gap-y-8 md:gap-x-20">
              {sd_brands.map((brand, i) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 0.4, y: 0 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-xl md:text-3xl font-black text-[#002f6c] tracking-tighter select-none cursor-default"
                >
                  {brand}
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};


