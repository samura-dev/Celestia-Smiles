
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sd_servicesData } from '../data/sd_services';
import { SdBreadcrumbs } from '../components/ui/SdBreadcrumbs';
import { ChevronRight, ShieldCheck, Sparkles, Clock, ArrowRight } from 'lucide-react';

export const CategoryDetail = () => {
  const { categoryId } = useParams();
  const category = sd_servicesData.find(c => c.id === categoryId);

  if (!category) {
    return (
      <div className="pt-40 text-center">
        <h1 className="text-2xl font-bold text-[#002f6c]">Категория не найдена</h1>
        <Link to="/services" className="text-blue-500 mt-4 block underline">Вернуться к услугам</Link>
      </div>
    );
  }

  return (
    <div className="sd_category_page w-full min-h-screen bg-transparent">
      <div className="max-w-[1920px] mx-auto px-[20px] md:px-[40px] pt-32 pb-24 relative z-10">
        <SdBreadcrumbs items={[
          { label: 'Услуги', path: '/services' },
          { label: category.title }
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          {/* Left Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-12 xl:col-span-5"
          >
            <h1 className="sd-mobile-text-glow text-5xl md:text-7xl font-medium text-[#002f6c] mb-10 tracking-tighter leading-[0.95] uppercase">
              {category.title}
            </h1>
            <p className="sd-mobile-text-glow-soft text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12">
              {category.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: 'Безопасность', text: 'Сертифицированные материалы и стерильность по стандартам ISO.' },
                { icon: Sparkles, title: 'Эстетика', text: 'Создаем естественные улыбки, которые выглядят безупречно.' }
              ].map((item, i) => (
                <div key={i} className="sd-mobile-glass flex flex-col gap-4 p-8 rounded-[32px] bg-transparent border border-slate-100 hover:border-[#0055ff]/20 transition-colors">
                  <item.icon className="w-8 h-8 text-[#0055ff]" />
                  <h4 className="font-bold text-[#002f6c] text-lg uppercase tracking-tight">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Services List */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-[#002f6c] mb-4 uppercase tracking-[0.1em]">Основные услуги</h2>
            {category.services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={`/services/${category.id}/${service.id}`}
                  className="group sd-mobile-glass flex flex-col md:flex-row md:items-center justify-between p-6 md:p-10 rounded-[40px] bg-white/[0.07] backdrop-blur-[22px] border border-white/15 hover:border-[#0055ff]/20 hover:bg-white/[0.1] transition-all duration-500"
                >
                  <div className="mb-6 md:mb-0">
                    <h3 className="text-xl md:text-3xl font-bold text-[#002f6c] mb-3 group-hover:text-[#0055ff] transition-colors uppercase tracking-tight">
                      {service.title}
                    </h3>
                    <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6 text-slate-400 font-bold text-[11px] md:text-sm uppercase tracking-[0.2em] md:tracking-widest">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#0055ff]" /> 45-90 мин
                      </span>
                      <span className="text-[#002f6c] whitespace-nowrap">{service.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[#002f6c] font-black uppercase text-[11px] md:text-xs tracking-[0.2em] md:tracking-widest group-hover:translate-x-3 transition-transform">
                    Подробнее 
                    <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#002f6c] group-hover:text-white transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Table Section */}
        <section className="mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4 md:px-0">
             <div>
               <h2 className="sd-mobile-text-glow text-4xl md:text-5xl font-medium text-[#002f6c] tracking-tighter uppercase mb-4">Цены на услуги</h2>
               <p className="sd-mobile-text-glow-soft text-slate-500 text-lg font-medium">Прозрачное ценообразование без скрытых платежей.</p>
             </div>
             <Link to="/#calculator" className="text-[#0055ff] font-bold uppercase tracking-widest text-sm flex items-center gap-2 group">
               Рассчитать стоимость <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
          
          <div className="md:hidden flex flex-col gap-4">
            {category.services.map((s) => (
              <div key={s.id} className="sd-mobile-glass rounded-[32px] border border-white/18 p-5">
                <div className="text-base font-bold text-[#002f6c] leading-snug">{s.title}</div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Clock className="w-4 h-4 text-[#0055ff]" /> 45-90 мин
                  </span>
                  <span className="text-lg font-black text-[#0055ff] whitespace-nowrap">{s.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block rounded-[48px] overflow-hidden border border-slate-100 bg-transparent relative">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-transparent border-b border-slate-100">
                    <th className="p-8 md:p-10 text-[#002f6c] font-black uppercase tracking-widest text-xs">Наименование услуги</th>
                    <th className="p-8 md:p-10 text-[#002f6c] font-black uppercase tracking-widest text-xs text-right">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {category.services.map((s) => (
                    <tr key={s.id} className="hover:bg-white/[0.08] transition-colors group">
                      <td className="p-8 md:p-10 border-b border-slate-100 font-bold text-[#002f6c] text-lg">
                        {s.title}
                      </td>
                      <td className="p-8 md:p-10 border-b border-slate-100 text-right font-black text-[#0055ff] text-xl whitespace-nowrap">
                        {s.price}
                      </td>
                    </tr>
                  ))}
                  {/* Additional detailed rows for table if needed */}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};


