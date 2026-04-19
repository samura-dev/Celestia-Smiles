
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sd_specialistsData } from '../data/sd_specialists';
import { SdBreadcrumbs } from '../components/ui/SdBreadcrumbs';
import { useState } from 'react';

const categories = ['Все', 'Ортодонтия', 'Терапия', 'Хирургия', 'Имплантация', 'Эстетика', 'Детская'];

const sd_categoryMatchers: Record<string, string[]> = {
  'Ортодонтия': ['ортодонт'],
  'Терапия': ['терапевт', 'эндодонт'],
  'Хирургия': ['хирург'],
  'Имплантация': ['имплант'],
  'Эстетика': ['эстетист', 'ортопед', 'гигиенист'],
  'Детская': ['детский'],
};

export const Specialists = () => {
  const [activeCategory, setActiveCategory] = useState('Все');

  const filteredDoctors = sd_specialistsData.filter(doc => {
    if (activeCategory === 'Все') return true;
    const sd_role = doc.role.toLowerCase();
    return sd_categoryMatchers[activeCategory].some((item) => sd_role.includes(item));
  });

  return (
    <div className="sd_specialists_page w-full min-h-screen bg-transparent">
      <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] pt-32 pb-24 relative z-10">
        <SdBreadcrumbs items={[{ label: 'Наши специалисты' }]} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="sd-mobile-text-glow text-4xl md:text-8xl font-medium text-[#002f6c] mb-8 tracking-tighter leading-[0.9] uppercase">
            Команда <br /> <span className="text-[#0055ff]">профессионалов</span>
          </h1>
          <p className="sd-mobile-text-glow-soft text-slate-500 text-lg md:text-xl max-w-[800px] font-medium leading-relaxed">
            Наши врачи — это признанные эксперты с многолетним опытом, 
            которые объединяют передовые технологии и индивидуальный подход 
            для создания вашей идеальной улыбки.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 md:px-8 md:py-4 rounded-full text-[11px] md:text-sm font-black uppercase tracking-[0.24em] md:tracking-widest transition-all duration-500 border ${
                activeCategory === cat 
                  ? 'bg-[#002f6c] border-[#002f6c] text-white' 
                  : 'bg-transparent border-slate-100 text-[#002f6c] hover:border-[#0055ff]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Doctors Grid - No solid background, each card is glassy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredDoctors.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group cursor-pointer"
              >
                <Link to={`/doctors/${doc.id}`} className="block">
                  <div className="sd_doc_card sd-mobile-glass flex flex-col p-2 rounded-[40px] bg-white/[0.03] backdrop-blur-[32px] border border-white/10 hover:border-[#0055ff]/40 hover:bg-white/[0.08] hover:shadow-[0_40px_80px_-20px_rgba(0,47,108,0.2)] transition-all duration-700">
                    {/* Image Wrap */}
                    <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-5 bg-white/5">
                      <img 
                        src={doc.img} 
                        alt={doc.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000" 
                      />
                      
                      {/* Glass Overlay for Role */}
                      <div className="absolute top-4 left-4 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 text-white md:text-[#002f6c] text-[9px] font-black uppercase tracking-widest z-10 shadow-xl">
                        {doc.role}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 pb-8 flex flex-col">
                      <h3 className="text-lg md:text-2xl font-black text-[#002f6c] mb-1.5 uppercase tracking-tighter group-hover:text-[#0055ff] transition-colors leading-[1.1]">
                        {doc.name}
                      </h3>
                      <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.1em] mb-4">
                        Стаж — {doc.experience || 'от 10 лет'}
                      </p>
                      <p className="text-[#002f6c]/60 text-[12px] md:text-[13px] leading-relaxed mb-8 line-clamp-3 md:line-clamp-2 font-medium">
                        {doc.description}
                      </p>
                      
                      <div className="w-full py-4 rounded-2xl border border-[#0055ff]/10 bg-white/5 backdrop-blur-md text-[#002f6c] text-[10px] font-black uppercase tracking-widest text-center group-hover:bg-[#0055ff] group-hover:text-white transition-all">
                        Подробнее
                      </div>
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

