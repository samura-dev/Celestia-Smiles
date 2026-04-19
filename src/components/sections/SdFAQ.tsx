import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface SdFaqItemData {
  id: number;
  question: string;
  answer: string;
}

const sd_faq_items: SdFaqItemData[] = [
  {
    id: 1,
    question: "Сколько времени занимает установка элайнеров?",
    answer: "Процесс начинается с цифрового сканирования, которое занимает около 30 минут. Сами элайнеры изготавливаются в течение 2-3 недель. План лечения составляется индивидуально и может длиться от 6 до 18 месяцев."
  },
  {
    id: 2,
    question: "Болезненно ли проходит лечение?",
    answer: "Современные методы анестезии и микроинвазивные технологии сводят дискомфорт к минимуму. После установки элайнеров или брекетов может ощущаться небольшое давление в первые 2-3 дня, что является нормой."
  },
  {
    id: 3,
    question: "Какие гарантии предоставляет клиника?",
    answer: "Мы предоставляем пожизненную гарантию на установленные импланты и до 5 лет на эстетические реставрации. Мы уверены в качестве наших материалов и профессионализме врачей."
  },
  {
    id: 4,
    question: "Работаете ли вы со сложными случаями?",
    answer: "Да, наша клиника специализируется на комплексном восстановлении. Мы проводим междисциплинарные консилиумы, объединяя ортодонтов, хирургов и эстетистов для решения самых сложных задач."
  },
  {
    id: 5,
    question: "Нужно ли удалять зубы мудрости перед лечением?",
    answer: "Это зависит от клинической картины. Если зубы мудрости мешают перемещению остальных зубов или создают скученность, мы рекомендуем удаление. Решение принимается на основе КЛКТ-диагностики."
  },
  {
    id: 6,
    question: "Можно ли заниматься спортом в элайнерах?",
    answer: "Конечно! Элайнеры плотно прилегают к зубам и не имеют острых краев, что делает их безопасными для активного образа жизни. Для контактных видов спорта мы можем изготовить специальную защитную капу."
  }
];

export const SdFAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full relative z-20 py-24 md:py-32 px-[15px] md:px-[40px] pointer-events-auto bg-transparent overflow-hidden">
      <div className="max-w-[1920px] mx-auto w-full">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16 gap-4 relative z-30"
        >
          <h2 
            className="text-3xl md:text-5xl font-medium tracking-tight text-[#002f6c] leading-[1.1]"
            style={{ 
              textShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)',
            }}
          >
            Ответы на популярные вопросы
          </h2>
          <p 
            className="text-slate-600 font-bold max-w-[500px] text-sm md:text-base"
            style={{ 
              textShadow: '0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.8)',
            }}
          >
            Всё, что вы хотели знать о лечении, технологиях и гарантиях.
          </p>
        </motion.div>

        {/* FAQ List - 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 relative z-30">
          {/* Left Column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {sd_faq_items.slice(0, 3).map((item, idx) => (
              <SdFaqItem key={item.id} item={item} isOpen={openId === item.id} onToggle={() => setOpenId(openId === item.id ? null : item.id)} idx={idx} />
            ))}
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {sd_faq_items.slice(3).map((item, idx) => (
              <SdFaqItem key={item.id} item={item} isOpen={openId === item.id} onToggle={() => setOpenId(openId === item.id ? null : item.id)} idx={idx + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SdFaqItem = ({ item, isOpen, onToggle, idx }: { item: SdFaqItemData; isOpen: boolean; onToggle: () => void; idx: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.1, duration: 0.6 }}
    className={`group sd-mobile-glass overflow-hidden rounded-[40px] border transition-all duration-700 relative ${
      isOpen 
        ? 'bg-white/20 border-white/30 shadow-2xl backdrop-blur-2xl' 
        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-xl shadow-xl'
    }`}
  >
    {/* Decorative blur inside card */}
    <div className={`absolute top-0 left-0 w-32 h-32 bg-[#0055ff]/5 blur-[60px] rounded-full transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-8 md:p-10 text-left relative overflow-hidden"
    >
      <span className={`text-xl md:text-2xl font-bold tracking-tight uppercase transition-all duration-300 ${
        isOpen ? 'text-[#0055ff]' : 'text-[#002f6c]'
      }`}>
        {item.question}
      </span>
      <div className={`shrink-0 ml-4 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
        isOpen ? 'bg-[#002f6c] border-[#002f6c] text-white rotate-180' : 'bg-transparent border-slate-100 text-[#002f6c]'
      }`}>
        <Plus className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
      </div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="px-8 pb-10 md:px-10 md:pb-12 border-t border-slate-50 pt-8 mt-1">
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
              {item.answer}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);


