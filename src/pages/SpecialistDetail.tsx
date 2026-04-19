
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sd_specialistsData } from '../data/sd_specialists';
import { SdBreadcrumbs } from '../components/ui/SdBreadcrumbs';
import { SdPrimaryButton } from '../components/ui/sd_primary_button';
import { Star, Award, GraduationCap, Calendar } from 'lucide-react';

export const SpecialistDetail = () => {
  const { specialistId } = useParams();
  const doctor = sd_specialistsData.find(d => d.id === Number(specialistId));

  if (!doctor) {
    return (
      <div className="pt-40 text-center">
        <h1 className="text-2xl font-bold text-[#002f6c]">Врач не найден</h1>
        <Link to="/doctors" className="text-blue-500 mt-4 block underline">Вернуться к списку врачей</Link>
      </div>
    );
  }

  return (
    <div className="sd_specialist_detail_page w-full min-h-screen bg-transparent">
      <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] pt-32 pb-24 relative z-10">
        <SdBreadcrumbs items={[
          { label: 'Специалисты', path: '/doctors' },
          { label: doctor.name }
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left: Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 relative"
          >
            <div className="sd-mobile-glass aspect-[3/4] rounded-[60px] overflow-hidden border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,47,108,0.15)] bg-white/[0.08] backdrop-blur-[24px]">
              <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover object-top" />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-8 right-4 md:-bottom-10 md:-right-6 md:right-10 p-5 md:p-8 rounded-[32px] md:rounded-[40px] sd-mobile-glass bg-white/[0.14] backdrop-blur-2xl border border-white/20 shadow-2xl z-20">
               <div className="text-[#0055ff] font-black text-4xl mb-1">{doctor.experience || '10+'}</div>
               <div className="text-[#002f6c] font-bold text-xs uppercase tracking-widest">Лет практики</div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 pt-12 lg:pt-0"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-5 py-2 rounded-full bg-[#0055ff]/5 text-[#0055ff] text-xs font-black uppercase tracking-widest border border-[#0055ff]/10">
                {doctor.role}
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#0055ff] text-[#0055ff]" />)}
              </div>
            </div>

            <h1 className="sd-mobile-text-glow text-4xl md:text-7xl font-medium text-[#002f6c] mb-10 tracking-tighter leading-[0.9] uppercase">
              {doctor.name}
            </h1>

            <p className="sd-mobile-text-glow-soft text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-[650px]">
              {doctor.description} Один из ведущих специалистов нашей клиники, применяющий в своей работе новейшие цифровые протоколы лечения.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
               <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.12] backdrop-blur-xl border border-white/20 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-[#0055ff]" />
                  </div>
                  <div>
                    <h4 className="sd-mobile-text-glow text-[#002f6c] font-black uppercase text-sm tracking-widest mb-2">Специализация</h4>
                    <p className="sd-mobile-text-glow-soft text-slate-500 text-sm leading-relaxed">{doctor.specialization?.join(', ') || 'Комплексная стоматологическая помощь и диагностика'}</p>
                  </div>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.12] backdrop-blur-xl border border-white/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-[#0055ff]" />
                  </div>
                  <div>
                    <h4 className="sd-mobile-text-glow text-[#002f6c] font-black uppercase text-sm tracking-widest mb-2">Образование</h4>
                    <p className="sd-mobile-text-glow-soft text-slate-500 text-sm leading-relaxed">Высшее медицинское, регулярное повышение квалификации в Европе и США.</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
               <div className="w-full max-w-[220px] sm:w-80">
                 <SdPrimaryButton text="ЗАПИСАТЬСЯ НА ПРИЕМ" link={`?modal=appointment&doctor=${doctor.id}`} />
               </div>
               <div className="sd-mobile-text-glow-soft flex items-center justify-center sm:justify-start gap-4 text-slate-400 font-bold text-[11px] md:text-xs uppercase tracking-[0.2em] md:tracking-widest text-center sm:text-left">
                  <Calendar className="w-5 h-5 text-[#0055ff]" />
                  Ближайшая запись: Завтра
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


