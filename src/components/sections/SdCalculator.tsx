import { useMemo, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { SdJaw } from '../../gl/models/SdJaw';
import { sd_specialistsData, type SdCategoryId } from '../../data/sd_specialists';

type Goal = 'Выровнять зубы' | 'Восстановить зуб' | 'Отбелить зубы' | 'Полное преображение';
type Method = string;

const methodsMap: Record<Goal, string[]> = {
  'Выровнять зубы': ['Элайнеры', 'Брекеты', 'Ретейнеры'],
  'Восстановить зуб': ['Коронка', 'Имплант', 'Вкладка'],
  'Отбелить зубы': ['Лазерное', 'Домашнее', 'ZOOM 4'],
  'Полное преображение': ['Виниры', 'Все-на-4/6', 'Комплекс'],
};

const sd_goalCategoryMap: Record<Goal, SdCategoryId> = {
  'Выровнять зубы': 'orthodontics',
  'Восстановить зуб': 'implants',
  'Отбелить зубы': 'hygiene',
  'Полное преображение': 'esthetics',
};

export const SdCalculator = () => {
  const [goal, setGoal] = useState<Goal>('Выровнять зубы');
  const [method, setMethod] = useState<Method>('Элайнеры');
  const [loyalty, setLoyalty] = useState(false);

  const sd_handleGoalChange = (nextGoal: Goal) => {
    setGoal(nextGoal);
    setMethod(methodsMap[nextGoal][0]);
  };

  const data = useMemo(() => {
    let complexity = 45;
    let time = '12 месяцев';
    let cost = '250 000 ₽ - 500 000 ₽';
    let plan = ['Консультация', 'Лечение', 'Наблюдение'];

    const categoryId = sd_goalCategoryMap[goal];
    const doctors = sd_specialistsData.filter((doctor) => doctor.categoryIds.includes(categoryId));
    let recommendedDoctor = doctors[0] ?? sd_specialistsData[0];

    if (['Элайнеры', 'Брекеты', 'Ретейнеры'].includes(method)) {
      complexity = 45;
      time = '12 - 18 месяцев';
      cost = '150 000 ₽ - 450 000 ₽';
      plan = ['Снимки, 3D сканирование', 'Установка системы', 'Регулярная коррекция'];
      recommendedDoctor = doctors.find((doctor) => doctor.role.toLowerCase().includes('ортодонт')) ?? recommendedDoctor;
    } else if (['Коронка', 'Имплант', 'Все-на-4/6', 'Вкладка'].includes(method)) {
      complexity = 85;
      time = '3 - 6 месяцев';
      cost = '50 000 ₽ - 700 000 ₽';
      plan = ['Удаление / снимки', 'Хирургический этап', 'Снятие слепков / коронка'];
      recommendedDoctor =
        doctors.find((doctor) => doctor.role.toLowerCase().includes('имплант')) ??
        doctors.find((doctor) => doctor.role.toLowerCase().includes('хирург')) ??
        recommendedDoctor;
    } else if (['Виниры', 'Комплекс'].includes(method)) {
      complexity = 70;
      time = '3 - 6 недель';
      cost = '400 000 ₽ - 1 500 000 ₽';
      plan = ['Цифровой дизайн', 'Подготовка эмали', 'Фиксация керамики'];
      recommendedDoctor =
        doctors.find((doctor) => doctor.role.toLowerCase().includes('эстет')) ??
        doctors.find((doctor) => doctor.role.toLowerCase().includes('ортопед')) ??
        recommendedDoctor;
    } else if (['Лазерное', 'Домашнее', 'ZOOM 4'].includes(method)) {
      complexity = 15;
      time = '1 - 2 недели';
      cost = '20 000 ₽ - 45 000 ₽';
      plan = ['Профессиональная гигиена', 'Изоляция десен', 'Активация геля'];
      recommendedDoctor =
        doctors.find((doctor) => doctor.role.toLowerCase().includes('гигиен')) ??
        doctors.find((doctor) => doctor.role.toLowerCase().includes('терапевт')) ??
        recommendedDoctor;
    }

    if (loyalty) {
      cost = cost.replace('₽', '₽ (со скидкой)').replace('₽', '₽');
    }

    return { complexity, time, cost, plan, recommendedDoctor };
  }, [goal, method, loyalty]);

  const strokeDasharray = 283;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * data.complexity) / 100;

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', bounce: 0.3, duration: 1 } },
  };

  return (
    <section className="w-full relative z-20 bg-transparent py-16 md:py-20 px-[15px] md:px-[40px] pointer-events-auto overflow-hidden" id="calculator">
      <div className="max-w-[1920px] w-full mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
          className="text-center flex flex-col items-center gap-6 mb-12 md:mb-16 w-full"
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0055ff]"
            style={{ textShadow: '0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8)' }}
          >
            Калькулятор лечения
          </span>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#002f6c] leading-tight w-full px-4 relative z-10"
            style={{ textShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.8)' }}
          >
            Спланируйте путь к своей улыбке
          </h2>
          <p
            className="text-base md:text-lg lg:text-xl font-medium text-slate-500 max-w-[700px] leading-relaxed relative z-10"
            style={{ textShadow: '0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.9)' }}
          >
            Рассчитайте примерную стоимость и время лечения на основе ваших целей. Интерактивно. Бесплатно. Персонально.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 text-white"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-6 md:gap-8 h-full">
            <div className="bg-[#245bb5] rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-xl flex-[4] justify-center relative overflow-hidden">
              <h3 className="text-xl font-medium mb-1 relative z-10">01. Цель лечения</h3>
              {(['Выровнять зубы', 'Восстановить зуб', 'Отбелить зубы', 'Полное преображение'] as Goal[]).map((item) => (
                <label key={item} className="flex items-center gap-4 cursor-pointer group relative z-10" onClick={() => sd_handleGoalChange(item)}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${goal === item ? 'border-white' : 'border-white/40 group-hover:border-white/70'}`}>
                    {goal === item && <motion.div layoutId="goalDot" className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  <span className={`text-[15px] md:text-base leading-snug transition-colors ${goal === item ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'}`}>{item}</span>
                </label>
              ))}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 blur-3xl rounded-full pointer-events-none" />
            </div>

            <div className="bg-[#245bb5] rounded-3xl p-6 md:p-8 flex flex-col justify-center gap-4 shadow-xl flex-[3]">
              <h3 className="text-xl font-medium mb-1">02. Вариант лечения</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {methodsMap[goal].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMethod(item)}
                    className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[13px] md:text-sm font-medium transition-all ${method === item ? 'bg-[#3b82f6] shadow-md scale-[1.02]' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#245bb5] rounded-3xl p-6 md:p-8 flex flex-col justify-center gap-4 shadow-xl flex-[3]">
              <h3 className="text-xl font-medium mb-1">03. Программа лояльности</h3>
              <div className="flex flex-col gap-3 md:gap-4 mt-1">
                <label className="flex items-center gap-4 cursor-pointer group" onClick={() => setLoyalty(true)}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${loyalty ? 'border-white' : 'border-white/40 group-hover:border-white/70'}`}>
                    {loyalty && <motion.div layoutId="loyaltyDot" className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  <span className={`text-[15px] md:text-base transition-colors ${loyalty ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'}`}>Участник клуба Celestia</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer group" onClick={() => setLoyalty(false)}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${!loyalty ? 'border-white' : 'border-white/40 group-hover:border-white/70'}`}>
                    {!loyalty && <motion.div layoutId="loyaltyDot" className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  <span className={`text-[15px] md:text-base transition-colors ${!loyalty ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'}`}>Без участия</span>
                </label>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#245bb5] rounded-3xl p-8 flex flex-col shadow-xl min-h-[450px] md:min-h-[500px] relative overflow-hidden group">
            <div className="flex-1 w-full relative flex items-center justify-center">
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full pointer-events-none" />

              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing">
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[10, 10, 10]} intensity={2} />
                  <directionalLight position={[-10, -10, -5]} intensity={1} color="#1a8aff" />
                  <Environment preset="city" />
                  <PresentationControls global rotation={[0, 0, 0]} polar={[-Math.PI / 4, Math.PI / 4]} azimuth={[-Infinity, Infinity]}>
                    <SdJaw scale={16} position={[0, 0.8, 0]} />
                  </PresentationControls>
                </Canvas>
              </div>

              <div className="absolute inset-x-0 bottom-4 z-20 flex flex-col items-center justify-center drop-shadow-2xl pointer-events-none">
                <span className="text-white/70 tracking-widest uppercase text-sm font-bold">360° Обзор</span>
                <span className="text-white/40 tracking-wider uppercase text-[9px] font-bold mt-1">Тяни для вращения</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#245bb5] rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl relative overflow-hidden">
            <h3 className="text-xl font-medium mb-2 relative z-10">Результат</h3>

            <div className="grid grid-cols-2 gap-4 lg:gap-6 relative z-10">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-between shadow-sm">
                <span className="text-white/75 text-[13px] font-medium w-full text-center mb-4">Сложность лечения</span>
                <div className="relative w-24 h-24 lg:w-28 lg:h-28">
                  <svg className="-rotate-90 w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={strokeDasharray}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1.5, type: 'spring', bounce: 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-white font-bold text-2xl">{data.complexity}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col shadow-sm">
                <span className="text-white/75 text-[13px] font-medium mb-auto">Примерное время</span>
                <div className="flex items-end gap-1.5 h-16 lg:h-20 w-full justify-center my-4">
                  {[30, 50, 70, 40, 90, 60].map((height, index) => (
                    <motion.div key={index} className="w-full max-w-[12px] bg-blue-100 rounded-sm" animate={{ height: `${height}%` }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                      {index === 4 && <motion.div className="w-full bg-[#3b82f6] rounded-sm" animate={{ height: `${data.complexity}%` }} transition={{ duration: 1.5, type: 'spring' }} />}
                    </motion.div>
                  ))}
                </div>
                <span className="text-white font-bold text-center text-lg lg:text-xl">{data.time}</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 lg:p-6 shadow-sm relative z-10 hover:border-[#0055ff]/40 transition-colors">
              <span className="text-white/75 text-[13px] font-medium block mb-3">Рекомендуемые специалисты</span>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#3b82f6] font-bold text-xl">
                  {data.recommendedDoctor.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-base">{data.recommendedDoctor.name}</span>
                  <span className="text-white/65 text-sm">{data.recommendedDoctor.role}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-6 relative z-10 flex-1">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 lg:p-6 shadow-sm">
                <span className="text-white/75 text-[13px] font-medium block mb-4">План лечения</span>
                <ul className="text-white/72 text-[12px] font-medium flex flex-col gap-3">
                  {data.plan.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 lg:p-6 shadow-sm flex flex-col justify-end">
                <span className="text-white/75 text-[13px] font-medium block mb-auto">Примерная стоимость</span>
                <p className="text-white font-bold text-xl lg:text-2xl mt-4 mb-2 leading-tight">{data.cost}</p>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-blue-400 to-[#3b82f6]" initial={{ width: 0 }} animate={{ width: `${data.complexity}%` }} transition={{ duration: 1.5, type: 'spring', bounce: 0.2 }} />
                </div>
                <span className="text-[10px] text-white/55 mt-3 leading-tight">*Только для оценки. Итоговая стоимость в клинике.</span>
              </div>
            </div>

            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-white opacity-5 blur-3xl rounded-full pointer-events-none" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12 w-full pointer-events-auto"
        >
          <Link to={`?modal=appointment&direction=${sd_goalCategoryMap[goal]}`} className="relative overflow-hidden group bg-transparent text-[#002f6c] border border-[#002f6c]/20 px-8 py-4 sm:px-10 sm:py-5 rounded-full flex items-center gap-4 transition-all duration-500 hover:border-[#0055ff]">
            <div className="absolute inset-0 w-full h-full bg-[#0055ff] -translate-x-[105%] group-hover:translate-x-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <span className="relative z-10 font-bold text-[10px] sm:text-[12px] uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500">
              Записаться на прием
            </span>
            <div className="relative z-10 w-8 h-8 rounded-full bg-[#002f6c]/5 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500">
              <ArrowRight className="w-4 h-4 text-[#002f6c] group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
            </div>
          </Link>

          <Link to={`?modal=appointment&direction=${sd_goalCategoryMap[goal]}`} className="relative overflow-hidden group bg-[#002f6c] border border-[#002f6c] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full flex items-center gap-4 transition-all duration-500 hover:shadow-xl hover:shadow-[#002f6c]/30">
            <div className="absolute inset-0 w-full h-full bg-white translate-y-[105%] group-hover:translate-y-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <span className="relative z-10 font-bold text-[10px] sm:text-[12px] uppercase tracking-[0.2em] text-white group-hover:text-[#002f6c] transition-colors duration-500">
              Онлайн консультация
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
