import { motion } from 'framer-motion';
import { Search, Scan, MessageCircle, PenTool, Sparkles } from 'lucide-react';

const sd_steps = [
  {
    num: '01',
    title: 'Консультация',
    desc: 'Детальный осмотр, фотопротокол и обсуждение ваших пожеланий по эстетике.',
    icon: MessageCircle,
    color: '#0055ff'
  },
  {
    num: '02',
    title: '3D-Диагностика',
    desc: 'Высокоточное сканирование и КТ для получения полной цифровой копии челюсти.',
    icon: Scan,
    color: '#4488ff'
  },
  {
    num: '03',
    title: 'План лечения',
    desc: 'Создание виртуальной модели результата. Вы увидите свою улыбку еще до начала.',
    icon: Search,
    color: '#0055ff'
  },
  {
    num: '04',
    title: 'Реализация',
    desc: 'Установка конструкций или систем с использованием хирургических навигационных шаблонов.',
    icon: PenTool,
    color: '#4488ff'
  },
  {
    num: '05',
    title: 'Результат',
    desc: 'Финальный контроль и ваша новая уверенная улыбка на долгие годы.',
    icon: Sparkles,
    color: '#0055ff'
  }
];

export const SdProcess = () => {
  return (
    <section id="process" className="w-full relative z-20 py-24 md:py-32 px-[15px] md:px-[40px] pointer-events-auto overflow-hidden">
      <div className="max-w-[1920px] mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col mb-20 text-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-[#0055ff]/30" />
            <span 
              className="sd-mobile-text-glow text-[12px] font-black uppercase tracking-[0.4em] text-[#0055ff] whitespace-nowrap"
              style={{ textShadow: '0 0 20px rgba(0, 85, 255, 0.2)' }}
            >
              Путь к мечте
            </span>
            <div className="h-[1px] w-12 bg-[#0055ff]/30" />
          </motion.div>
          
          <h2 className="sd-mobile-text-glow text-4xl md:text-7xl font-bold tracking-tighter text-[#002f6c] mb-6">
            Этапы <span className="text-[#0055ff] italic">лечения</span>
          </h2>
          <p className="sd-mobile-text-glow-soft text-base md:text-xl text-[#002f6c]/60 max-w-2xl leading-relaxed">
            Мы сделали процесс преображения прозрачным и понятным на каждом шаге. 
            Никаких сюрпризов — только предсказуемый результат.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[50%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0055ff]/20 to-transparent -translate-y-[50%]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {sd_steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="sd-mobile-glass h-full bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 hover:border-[#0055ff]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-[#002f6c] text-white flex items-center justify-center font-black text-sm shadow-xl shadow-blue-900/20 group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>

                  {/* Icon Wrapper */}
                  <div className="w-16 h-16 rounded-3xl bg-[#0055ff]/5 flex items-center justify-center mb-8 group-hover:bg-[#0055ff] transition-colors duration-500">
                    <step.icon className="w-7 h-7 text-[#0055ff] group-hover:text-white transition-colors duration-500" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-[#002f6c] mb-4 tracking-tight leading-none group-hover:text-[#0055ff] transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-[#002f6c]/60 leading-relaxed font-medium">
                    {step.desc}
                  </p>

                  {/* Bottom Highlight */}
                  <div className="absolute bottom-6 left-8 right-8 h-1 bg-[#0055ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <button className="sd-mobile-center-cta bg-[#002f6c] text-white px-7 py-3 md:px-12 md:py-5 rounded-full text-[11px] md:text-sm font-black uppercase tracking-[0.24em] md:tracking-widest hover:bg-[#0055ff] transition-all duration-300 shadow-2xl shadow-blue-900/20 flex items-center gap-3 group">
            <span>Начать преображение</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

