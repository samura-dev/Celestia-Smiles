import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Microscope, HeartHandshake } from 'lucide-react';
import { SdBreadcrumbs } from '../components/ui/SdBreadcrumbs';
import sd_aboutImg1 from '../assets/hero-block-4/About _ Omni Sculpt MD 1.jpg';
import sd_aboutImg2 from '../assets/hero-block-4/About _ Omni Sculpt MD 2.jpg';
import sd_aboutImg3 from '../assets/hero-block-4/About _ Omni Sculpt MD 3.jpg';
import sd_aboutImg4 from '../assets/hero-block-4/About _ Omni Sculpt MD 4.jpg';

const sd_values = [
  {
    icon: Microscope,
    title: 'Точность',
    description: 'Работаем по цифровым протоколам, чтобы каждый этап лечения был предсказуем и прозрачен.',
  },
  {
    icon: Sparkles,
    title: 'Эстетика',
    description: 'Создаем естественные улыбки, где функциональность и визуальная гармония идут вместе.',
  },
  {
    icon: HeartHandshake,
    title: 'Забота',
    description: 'Персональные планы и внимательный сервис: от первой консультации до финального результата.',
  },
  {
    icon: ShieldCheck,
    title: 'Надежность',
    description: 'Используем проверенные материалы и протоколы, соответствующие международным стандартам.',
  },
];

const sd_gallery = [sd_aboutImg1, sd_aboutImg2, sd_aboutImg3, sd_aboutImg4];

export const About = () => {
  return (
    <div className="sd_about_page w-full min-h-screen bg-transparent">
      <div className="max-w-[1920px] mx-auto px-[15px] md:px-[40px] pt-32 pb-24 relative z-10 overflow-x-clip">
        <SdBreadcrumbs items={[{ label: 'О клинике' }]} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <p className="text-[11px] font-black tracking-[0.22em] uppercase text-[#0055ff] mb-5">Celestia Smiles</p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-[#002f6c] leading-[0.95] uppercase mb-8">
              Где точность
              <br />
              встречает эстетику
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-[820px] leading-relaxed font-medium">
              Мы строим стоматологию нового уровня: объединяем цифровую диагностику, опыт сильной команды и премиальный
              сервис. Наша цель не просто лечить зубы, а создавать уверенную улыбку, которая работает на вас каждый день.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 sd-mobile-glass rounded-[32px] p-6 md:p-8 border border-white/20 bg-white/[0.12] backdrop-blur-[24px]"
          >
            <p className="text-[11px] font-black tracking-[0.22em] uppercase text-[#0055ff] mb-5">Наша миссия</p>
            <p className="text-[#002f6c] text-lg leading-relaxed font-medium mb-8">
              Раскрывать потенциал каждой улыбки через персонализированную медицину, комфорт и внимание к деталям.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/[0.35] border border-white/30 p-4">
                <div className="text-2xl font-black text-[#002f6c]">12+</div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500 font-bold mt-1">Лет опыта</div>
              </div>
              <div className="rounded-2xl bg-white/[0.35] border border-white/30 p-4">
                <div className="text-2xl font-black text-[#002f6c]">15к+</div>
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500 font-bold mt-1">Улыбок</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-20">
          <div className="sd-mobile-glass rounded-[32px] md:rounded-[40px] border border-white/20 bg-white/[0.12] backdrop-blur-[24px] p-6 md:p-10 lg:p-12">
            <p className="text-[11px] font-black tracking-[0.22em] uppercase text-[#0055ff] mb-5">О клинике</p>
            <h2 className="text-3xl md:text-5xl text-[#002f6c] font-medium tracking-tight leading-[1] uppercase mb-6">
              История и подход
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                Celestia Smiles выросла из идеи объединить клиническую дисциплину и высокий дизайн сервиса. Мы выстраиваем
                лечение как понятный маршрут: диагностика, прозрачный план, поэтапная реализация и сопровождение пациента.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                Для нас важно не только качество результата, но и то, как человек чувствует себя на каждом визите. Поэтому
                мы проектируем весь опыт пациента: от коммуникации до финальной адаптации после лечения.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl md:text-5xl text-[#002f6c] font-medium tracking-tight uppercase mb-10">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {sd_values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="sd-mobile-glass rounded-[28px] p-6 border border-white/22 bg-white/[0.14] backdrop-blur-[24px]"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#0055ff]/10 border border-[#0055ff]/15 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-[#0055ff]" />
                </div>
                <h3 className="text-[#002f6c] text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-5xl text-[#002f6c] font-medium tracking-tight uppercase mb-10">Галерея клиники</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sd_gallery.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative overflow-hidden rounded-[30px] border border-white/20 shadow-[0_24px_60px_-26px_rgba(0,47,108,0.25)]"
              >
                <img src={image} alt={`Интерьер клиники ${index + 1}`} className="w-full h-[320px] object-cover" />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
